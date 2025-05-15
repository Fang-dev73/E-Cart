import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getUser } from "./utils/helper";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const username = await AsyncStorage.getItem("loggedInUsername");
        if (username) {
          const user = await getUser(username);
          if (user) {
            setIsLoggedIn(true);
          }
        }
      } catch (e) {
        console.error("Error checking login status", e);
      } finally {
        setLoading(false);
      }
    };

    getLoggedInUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Redirect
      href={isLoggedIn ? "/screens/(tabs)/Home" : "/screens/(auth)/Landing"}
    />
  );
}
