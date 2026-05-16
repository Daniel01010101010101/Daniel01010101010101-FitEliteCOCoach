import { Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1, minWidth: 160, ...Theme.card }}>
      <Text style={{ color: Theme.colors.textMuted, fontWeight: "800", fontSize: 13 }}>{label}</Text>
      <Text style={{ color: Theme.colors.primary, fontWeight: "900", fontSize: 24, marginTop: 8 }}>{value}</Text>
    </View>
  );
}
