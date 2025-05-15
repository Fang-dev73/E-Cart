import { SafeAreaView, ScrollView } from "react-native";
import colors from "./colors";
import { PropsWithChildren } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainContainer: React.FC<
  PropsWithChildren<{ styles?: any; isScrollView?: boolean }>
> = ({ children, styles, isScrollView }) => {
  return isScrollView ? (
    <ScrollView
      nestedScrollEnabled
      style={[
        {
          flex: 1,
          backgroundColor: colors.white,
        },
        styles,
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.white,
        },
        styles,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export const ApiCall = async(url: string, method?: string, body?: any) => {
  return await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined
  });
}

export const saveUser = async (user: { username: string; password: string }) => {
  try {
    const existingUsers = await AsyncStorage.getItem('users');
    const parsed = existingUsers ? JSON.parse(existingUsers) : [];

    parsed.push(user);

    await AsyncStorage.setItem('users', JSON.stringify(parsed));
    console.log("User saved.");
  } catch (e) {
    console.error("Failed to save user", e);
  }
};

export const getUser = async (username: string) => {
  try {
    const usersData = await AsyncStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const user = users.find((u: { username: string }) => u.username === username);

    return user || null;
  } catch (e) {
    console.error("Failed to fetch user", e);
    return null;
  }
};


