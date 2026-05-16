import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Theme } from "@/src/theme/theme";

const items = [
  ["Dashboard", "/dashboard"],
  ["Entreno", "/workouts"],
  ["Nutrición", "/nutrition"],
  ["Perfil", "/profile"]
] as const;

export function NavBar() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
      {items.map(([label, href]) => (
        <TouchableOpacity
          key={href}
          onPress={() => router.push(href)}
          style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: Theme.colors.card, borderWidth: 1, borderColor: Theme.colors.border }}
        >
          <Text style={{ color: Theme.colors.textSoft, fontWeight: "800" }}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
