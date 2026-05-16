import { Text, TouchableOpacity, View } from "react-native";
import { Theme } from "@/src/theme/theme";

export function SelectRow({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: { label: string; value: string | number }[];
  value: string | number;
  onChange: (value: any) => void;
}) {
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={{ color: Theme.colors.textSoft, fontWeight: "800", marginBottom: 8 }}>{label}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {options.map((item) => {
          const active = item.value === value;
          return (
            <TouchableOpacity
              key={String(item.value)}
              onPress={() => onChange(item.value)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                backgroundColor: active ? Theme.colors.primary : "#0F141B",
                borderWidth: 1,
                borderColor: active ? Theme.colors.primary : Theme.colors.border
              }}
            >
              <Text style={{ color: active ? "#06110D" : Theme.colors.textSoft, fontWeight: "800" }}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
