import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useCartStore, loadCartFromStorage } from "../../store/cartStore";
import { Swipeable } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../utils/colors";
import Checkout from "../(checkout)/Checkout";
import { router } from "expo-router";
import { useAuthMode } from "../../hooks/useAuth";

export default function CartScreen() {
  const { cart, increment, decrement, removeFromCart, total, clearCart } =
    useCartStore();
   const mode = useAuthMode();

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const renderRightActions = (id: number) => (
    <TouchableOpacity
      style={styles.deleteBox}
      onPress={() => removeFromCart(id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: any) => (
    <Swipeable
      key={item.id}
      renderRightActions={() => renderRightActions(item.id)}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => decrement(item.id)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => increment(item.id)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.container}
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push("/screens/(checkout)/Checkout")}>
              <Text style={styles.clearBtnText}>{mode == "guest" ? "Checkout as Guest" : "Checkout"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearBtnText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    paddingBottom: hp(10),
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginBottom: hp(1.5),
    padding: wp(3),
    borderRadius: wp(2),
    elevation: 2,
  },
  image: {
    width: wp(20),
    height: wp(20),
    resizeMode: "contain",
    marginRight: wp(4),
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: colors.black,
  },
  price: {
    fontSize: RFValue(14),
    color: colors.primary,
    marginVertical: hp(0.5),
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  qty: {
    fontSize: RFValue(16),
    fontWeight: "500",
    color: colors.primary,
  },
  qtyBtn: {
    padding: wp(2),
    borderRadius: wp(2),
    backgroundColor: "#eee",
  },
  qtyText: {
    fontSize: RFValue(18),
    color: colors.primary,
    fontFamily: "Inter_28pt-Bold",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: wp(20),
    borderRadius: wp(2),
    marginVertical: hp(1),
  },
  deleteText: {
    color: colors.white,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: wp(4),
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },
  totalLabel: {
    fontSize: RFValue(14),
    color: "#888",
  },
  totalValue: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: colors.primary,
  },
  clearBtn: {
    backgroundColor: "red",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  clearBtnText: {
    color: colors.white,
    fontWeight: "600",
    fontFamily: "Inter_18pt-Bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: RFValue(16),
    color: "#999",
    fontWeight: "500",
  },
  checkoutBtn: {
    backgroundColor: "#008000",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
});
