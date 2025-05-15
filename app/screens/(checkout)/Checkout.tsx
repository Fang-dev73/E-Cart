import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuthMode } from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCartStore, loadCartFromStorage } from "../../store/cartStore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../utils/colors";

export default function Checkout() {
  const mode = useAuthMode();
  const router = useRouter();

  const cart = useCartStore((s) => s.cart);
  const total = useCartStore((s) => s.total);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (mode === "auth") {
      (async () => {
        try {
          const data = await AsyncStorage.getItem("USER_DATA");
          if (data) {
            const user = JSON.parse(data);
            setName(user.name || "");
            setAddress(user.address || "");
          }
        } catch {}
      })();
    }
  }, [mode]);

  const validate = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return false;
    }
    if (mode === "guest") {
      if (!username.trim()) {
        Alert.alert("Error", "Username is required");
        return false;
      }
      if (!password.trim()) {
        Alert.alert("Error", "Password is required");
        return false;
      }
    }
    if (!address.trim()) {
      Alert.alert("Error", "Address is required");
      return false;
    }
    if (cart.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    if (!validate()) return;

    Alert.alert("Success", "Checkout successful!", [
      { text: "OK", onPress: () => router.push("/screens/(tabs)/Home") },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemQty}>×{item.quantity}</Text>
      <Text style={styles.itemPrice}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Your Name"
        />

        {mode === "guest" && (
          <>
            <Text style={styles.label}>Username *</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholder="Choose a username"
            />

            <Text style={styles.label}>Password *</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Choose a password"
            />
          </>
        )}

        <Text style={styles.label}>Address *</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={[styles.input, { height: hp("12%") }]}
          placeholder="Delivery Address"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={[styles.sectionTitle, { marginTop: hp("2%") }]}>
          Order Summary
        </Text>
        <FlatList
          data={cart}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderItem}
          style={{ maxHeight: hp("25%"), marginBottom: hp("1%") }}
        />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonWrap}>
          <Button title="Checkout" onPress={handleCheckout} color="#4CAF50" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  form: {
    margin: wp("5%"),
    padding: wp("4%"),
    backgroundColor: "#f9f9f9",
    borderRadius: wp("2%"),
    elevation: 3,
  },
  label: {
    fontSize: RFValue(14),
    marginBottom: hp("0.5%"),
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("1%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    marginBottom: hp("1.5%"),
    backgroundColor: "#fff",
    color: colors.black
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: "700",
    marginBottom: hp("1%"),
    color: "#444",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp("0.8%"),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemName: { flex: 2, fontSize: RFValue(13) },
  itemQty: { flex: 0.5, textAlign: "center", fontSize: RFValue(13) },
  itemPrice: { flex: 1, textAlign: "right", fontSize: RFValue(13) },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("1%"),
  },
  totalLabel: { fontSize: RFValue(16), fontWeight: "700" },
  totalValue: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#4CAF50",
  },
  buttonWrap: { marginTop: hp("1%") },
});
