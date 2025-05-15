import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../utils/colors";
import { MainContainer } from "../../utils/helper";
import { useCartStore } from "../../store/cartStore";

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

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProductAdded, setIsProductAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const onPressBtn = () => {
    if (product) {
      useCartStore.getState().addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      });
    }
    setIsProductAdded(true);
  };

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      {isProductAdded ? (
        <TouchableOpacity disabled style={styles.addedBox}>
          <Text style={styles.addedText}>Product added to cart</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressBtn} style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: wp(5),
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: wp(80),
    height: hp(40),
    resizeMode: "contain",
    marginBottom: hp(2),
    borderRadius: wp(2),
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: hp(1),
    color: colors.primary,
    fontFamily: "Inter_28pt-Bold",
  },
  category: {
    fontSize: RFValue(14),
    color: colors.black,
    marginBottom: hp(1),
  },
  price: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: hp(1),
  },
  rating: {
    fontSize: RFValue(14),
    color: colors.grey,
    marginBottom: hp(2),
  },
  description: {
    fontSize: RFValue(14),
    color: colors.black,
    textAlign: "justify",
  },
  addedBox: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: wp(3),
    borderRadius: wp(3),
    elevation: 2,
  },
  addedText: {
    color: colors.primary,
    fontFamily: "Inter_24pt-Bold",
    fontSize: RFValue(16),
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    padding: wp(3),
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: wp(3),
    elevation: 2,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Inter_24pt-Bold",
    fontSize: RFValue(16),
    textAlign: "center",
  },
});
