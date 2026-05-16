import { Text, TextInput, TextInputProps, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function AppInput({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ color: Theme.colors.textSoft, fontWeight: "800", marginBottom: 8 }}>{label}</Text>
      <TextInput
        placeholderTextColor={Theme.colors.textMuted}
        style={{
          backgroundColor: "#0F141B",
          borderWidth: 1,
          borderColor: Theme.colors.border,
          borderRadius: Theme.radius.md,
          paddingHorizontal: 14,
          paddingVertical: 13,
          color: Theme.colors.text,
          fontSize: 15
        }}
        {...props}
      />
    </View>
  );
}
