import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthMode = () => {
  const [mode, setMode] = useState<"guest" | "auth" | null>(null);

  useEffect(() => {
    const fetchMode = async () => {
      const stored = await AsyncStorage.getItem("USER_MODE");
      setMode(stored === "guest" ? "guest" : "auth");
    };
    fetchMode();
  }, []);

  return mode;
};
