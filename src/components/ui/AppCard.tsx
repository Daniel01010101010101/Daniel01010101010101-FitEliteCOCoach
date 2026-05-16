import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function AppCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <View style={{ ...Theme.card, marginTop: 16 }}>
      <Text style={Theme.text.h2}>{title}</Text>
      {subtitle ? <Text style={Theme.text.subtitle}>{subtitle}</Text> : null}
      <View style={{ marginTop: 12 }}>{children}</View>
    </View>
  );
}
