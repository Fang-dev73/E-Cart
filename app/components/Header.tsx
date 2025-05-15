import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCartStore } from "../store/cartStore";

const Header = ({
  title,
  showLogout,
}: {
  title?: string;
  showLogout?: boolean;
}) => {
  const onPressLogout = async () => {
    await AsyncStorage.setItem("loggedInUsername", "");
    await AsyncStorage.setItem("USER_MODE", "");
    clearCart();
    router.push("/screens/(auth)/Landing");
  };

  const {clearCart} = useCartStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {showLogout && (
        <AntDesign
          onPress={onPressLogout}
          style={styles.icon}
          name="logout"
          size={20}
          color={colors.white}
        />
      )}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: "100%",
    height: heightPercentageToDP(8),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    right: 20,
  },
});
