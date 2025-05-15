import { router } from "expo-router"

export const BASE_URL = "https://fakestoreapi.com/"

export const LandingData = [
    {
        id: "1",
        title: "Sign-In",
        onPress: () => {router.push("/screens/SignIn")}
    },
    {
        id: "2",
        title: "Sign-Up",
        onPress: () => {router.push("/screens/SignUp")}
    },
    {
        id: "3",
        title: "Continue as Guest",
        onPress: () => {router.push("/screens/(tabs)/Home")}
    }
]

