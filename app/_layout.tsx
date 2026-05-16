import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Theme } from "@/src/theme/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={Theme.colors.background} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Theme.colors.background } }} />
    </>
  );
}
