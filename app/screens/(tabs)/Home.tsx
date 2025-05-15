import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Animated,
  ScrollView,
} from "react-native";
import colors from "../../utils/colors";
import { MainContainer } from "../../utils/helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-wp("70%")));

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFiltered(data);

        const cats = Array.from(new Set(data.map((p: Product) => p.category)));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -wp("70%"),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchText, selectedCategory, sortBy]);

  const applyFiltersAndSort = () => {
    let updated = [...products];

    if (searchText.trim() !== "") {
      const lower = searchText.toLowerCase();
      updated = updated.filter((p) => p.title.toLowerCase().includes(lower));
    }

    if (selectedCategory) {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (sortBy) {
      if (sortBy === "priceAsc") {
        updated.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceDesc") {
        updated.sort((a, b) => b.price - a.price);
      } else if (sortBy === "titleAsc") {
        updated.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "titleDesc") {
        updated.sort((a, b) => b.title.localeCompare(a.title));
      }
    }

    setFiltered(updated);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSortBy(null);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const id = item.id.toString();
    return (
      <TouchableOpacity
        onPress={() => router.push(`/screens/(detials)/${id}`)}
        key={item.id}
        style={styles.card}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <MainContainer>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: wp("5%"),
        }}
      >
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={colors.grey}
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openModal} style={{ marginLeft: 10 }}>
          <Ionicons name="filter" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {searchText !== "" && (
        <Ionicons
          name="close"
          size={24}
          color={colors.black}
          style={{ position: "absolute", right: 30, top: 35 }}
          onPress={() => setSearchText("")}
        />
      )}

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />

      <Modal transparent visible={modalVisible} animationType="none">
        <Pressable style={styles.modalOverlay} onPress={closeModal} />
        <Animated.View style={[styles.modalContent, { left: slideAnim }]}>
          <ScrollView>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                sortBy === "priceAsc" && styles.selectedButton,
              ]}
              onPress={() => setSortBy("priceAsc")}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: sortBy === "priceAsc" ? colors.white : colors.black,
                  },
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                sortBy === "priceDesc" && styles.selectedButton,
              ]}
              onPress={() => setSortBy("priceDesc")}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: sortBy === "priceDesc" ? colors.white : colors.black,
                  },
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                sortBy === "titleAsc" && styles.selectedButton,
              ]}
              onPress={() => setSortBy("titleAsc")}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: sortBy === "titleAsc" ? colors.white : colors.black,
                  },
                ]}
              >
                Title: A-Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                sortBy === "titleDesc" && styles.selectedButton,
              ]}
              onPress={() => setSortBy("titleDesc")}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: sortBy === "titleDesc" ? colors.white : colors.black,
                  },
                ]}
              >
                Title: Z-A
              </Text>
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { marginTop: 20 }]}>
              Filter By Category
            </Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.modalButton,
                  selectedCategory === cat && styles.selectedButton,
                ]}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                <Text
                  style={[
                    styles.modalText,
                    {
                      color:
                        selectedCategory === cat ? colors.white : colors.black,
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={clearFilters}
              style={[styles.modalButton, { marginTop: 20 }]}
            >
              <Text style={[styles.modalText]}>Clear Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </Modal>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: hp("5%"),
  },
  card: {
    backgroundColor: colors.white,
    width: CARD_WIDTH,
    borderRadius: 12,
    margin: 6,
    padding: 10,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: hp("15%"),
    marginBottom: 8,
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: RFValue(12),
    color: colors.black,
    marginBottom: 6,
  },
  price: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: colors.primary,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.black,
    opacity: 0.5,
  },
  modalContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: wp("70%"),
    backgroundColor: colors.white,
    padding: wp("5%"),
    zIndex: 9999,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: "700",
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
  },
  modalText: {
    fontSize: RFValue(14),
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
});

export default Home;
