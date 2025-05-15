import { Stack } from "expo-router";
import React from "react";
import Header from "../../components/Header";

export default function AuthLayout() {

  return (
    <Stack screenOptions={{ 
        header: () => <Header title="Checkout"/>,
    }}/>
  );
}
