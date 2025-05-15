import { Slot, useFocusEffect, usePathname, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

export default function RootLayout() {
  const pathName = usePathname();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (pathName === "/screens/(auth)/Landing" || pathName === "/screens/Auth" || pathName === "/screens/Home") {
          Alert.alert("E-Cart", "Do you want to close this app?", [
            { text: "Cancel", onPress: () => null, style: "cancel" },
            { text: "Yes", onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        } else {
          if (router.canGoBack()) {
            router.back();
          }
          return true;
        }
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [pathName, router])
  );

  return <Slot />;
}
