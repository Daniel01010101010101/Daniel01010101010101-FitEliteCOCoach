import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: Theme.colors.background, padding: 24, justifyContent: "center" }}>
      <View style={{ width: "100%", maxWidth: 480, alignSelf: "center" }}>
        <Text style={Theme.text.h1}>{title}</Text>
        <Text style={Theme.text.subtitle}>{subtitle}</Text>
        <View style={{ ...Theme.card, marginTop: 28 }}>{children}</View>
      </View>
    </View>
  );
}
