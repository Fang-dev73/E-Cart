import { Keyboard, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../utils/colors";
import {
  ApiCall,
  getUser,
  MainContainer,
  saveUser,
} from "../../utils/helper";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-simple-toast";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BASE_URL } from "../../utils/constants";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Auth = () => {
  //   const [username, setUsername] = React.useState("mor_2314");
  // const [password, setPassword] = React.useState("83r5^_");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [toggleEye, setToggleEye] = React.useState(true);

  const onPressBtn = async () => {
    const user = await getUser(username);
    if (!username) {
      return Toast.show("Please Enter your Username", Toast.LONG);
    }
    if (!password) {
      return Toast.show("Please Enter your Password", Toast.LONG);
    }
    if (username == "mor_2314" && password == "83r5^_") {
      try {
        const res = await ApiCall(`${BASE_URL}auth/login`, "POST", {
          username,
          password,
        });

        const responseData = await res.json();

        if (res.status === 200) {
          Toast.show("Login Successful", Toast.LONG);
          await AsyncStorage.setItem("loggedInUsername", username);
          await AsyncStorage.setItem("USER_MODE", "auth");
          router.push("/screens/(tabs)/Home");
        } else {
          Toast.show(responseData.message || "Login Failed", Toast.LONG);
        }
      } catch (error) {
        console.error(error);
        Toast.show("Something went wrong.", Toast.LONG);
      }
    } else if (user == username) {
      Toast.show("Login Successful", Toast.LONG);
      router.push("/screens/(tabs)/Home");
      await AsyncStorage.setItem("loggedInUsername", username);
      await AsyncStorage.setItem("USER_MODE", "auth");
    } else {
      try {
        const res = await ApiCall(`${BASE_URL}users`, "POST", {
          username,
          password,
        });

        if (res?.status === 200) {
          await saveUser({ username, password });
          Toast.show("User Created Successfully", Toast.LONG);
          await AsyncStorage.setItem("loggedInUsername", username);
          await AsyncStorage.setItem("USER_MODE", "auth");
          router.push("/screens/(tabs)/Home");
        } else {
          Toast.show("User Creation Failed.", Toast.LONG);
        }
      } catch (error) {
        Toast.show("Something went wrong.", Toast.LONG);
      }
    }

    Keyboard.dismiss();
  };

  return (
    <MainContainer styles={styles.container}>
      <Text style={styles.header}>Login / Register</Text>
      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
      />
      <View style={{ marginVertical: heightPercentageToDP(1) }} />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry={toggleEye}
      />
      {password.length > 0 && (
        <Ionicons
          name={toggleEye ? "eye-off" : "eye"}
          size={20}
          color={colors.primary}
          onPress={() => {
            setToggleEye(!toggleEye);
          }}
          style={styles.eye}
        />
      )}
      <CustomButton
        customStyles={{ marginVertical: heightPercentageToDP(5) }}
        text={"Sign In"}
        onPress={onPressBtn}
      />
    </MainContainer>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Inter_28pt-Bold",
    marginVertical: heightPercentageToDP(5),
    fontSize: RFValue(20),
    color: colors.primary,
  },
  eye: {
    right: widthPercentageToDP(-33),
    bottom: heightPercentageToDP(3.5),
  },
});
