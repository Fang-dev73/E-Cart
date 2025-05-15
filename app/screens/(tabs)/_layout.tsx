import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Header from "../../components/Header";
import colors from "../../utils/colors";
import { RFValue } from "react-native-responsive-fontsize"

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabbarStyles,
        tabBarIconStyle: {
          margin: 5,
        },
        tabBarAllowFontScaling: true,
        tabBarLabelStyle:{ 
            fontSize: RFValue(10),
            fontWeight: "bold",
            color: colors.black
        },
        lazy: true,
        tabBarHideOnKeyboard: true,
        header: () => <Header showLogout title="Welcome to E-Cart"/>,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          lazy: true,
          title: "Home",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons
              name={"home"}
              size={30}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          lazy: true,
          title: "Cart",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons
              name={"cart"}
              size={30}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabbarStyles: {
    backgroundColor: colors.white,
    width: "100%",
    height: "8%",
    alignSelf: "center",
  },
  home: {
    position: "absolute",
    bottom: 45,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#CFD0D5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
