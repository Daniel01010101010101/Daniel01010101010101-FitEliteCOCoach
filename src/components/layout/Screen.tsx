import { ReactNode } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const body = (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <View style={{ padding: 20, width: "100%", maxWidth: 1120, alignSelf: "center" }}>{children}</View>
    </SafeAreaView>
  );

  if (!scroll) return body;

  return <ScrollView style={{ flex: 1, backgroundColor: Theme.colors.background }}>{body}</ScrollView>;
}
