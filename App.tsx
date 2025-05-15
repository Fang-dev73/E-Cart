import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { ExpoRoot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "./app/utils/colors";

export default function App() {
  const context = require.context(
    "./app"
  ) as import("expo-router").RequireContext;

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar translucent={false} backgroundColor={colors.primary} showHideTransition={"fade"} />
        <ExpoRoot context={context} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
