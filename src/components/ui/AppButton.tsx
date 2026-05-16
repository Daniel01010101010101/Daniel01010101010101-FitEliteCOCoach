import { Text, TouchableOpacity } from "react-native";
import { Theme } from "@/src/theme/theme";

export function AppButton({ title, onPress, variant = "primary" }: { title: string; onPress: () => void; variant?: "primary" | "secondary" | "danger" }) {
  const bg = variant === "primary" ? Theme.colors.primary : variant === "danger" ? Theme.colors.danger : Theme.colors.cardSoft;
  const color = variant === "primary" ? "#06110D" : Theme.colors.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bg,
        borderRadius: Theme.radius.md,
        paddingVertical: 15,
        paddingHorizontal: 18,
        alignItems: "center",
        marginTop: 14,
        borderWidth: variant === "primary" ? 0 : 1,
        borderColor: Theme.colors.border
      }}
    >
      <Text style={{ color, fontWeight: "900", fontSize: 15 }}>{title}</Text>
    </TouchableOpacity>
  );
}
