import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MainContainer } from "../../utils/helper";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Landing = () => {
  return (
    <MainContainer styles={styles.container}>
      <Text style={styles.header}>Welcome to E-Cart</Text>
      <CustomButton
        text={"Sign Up / Sign In"}
        onPress={() => {
          router.push("/screens/(auth)/Auth");
        }}
      />
      <Text style={styles.OR}>----OR-----</Text>
      <TouchableOpacity
        onPress={async() => {
          await AsyncStorage.setItem("USER_MODE", "guest");
          router.push("/screens/(tabs)/Home");
        }}
        style={styles.subContainer}
      >
        <Text style={styles.text}>Continue as Guest</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.primary} />
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Inter_28pt-Bold",
    textAlign: "center",
    position: "absolute",
    top: heightPercentageToDP(20),
    fontSize: RFValue(20),
    color: colors.primary,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.primary,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Inter_18pt-Bold",
  },
  OR: {
    color: colors.primary,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Inter_18pt-Bold",
    marginVertical: heightPercentageToDP(2),
  },
});
