import { useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/layout/Screen";
import { AppCard } from "@/src/components/ui/AppCard";
import { AppInput } from "@/src/components/ui/AppInput";
import { AppButton } from "@/src/components/ui/AppButton";
import { SelectRow } from "@/src/components/ui/SelectRow";
import { Theme } from "@/src/theme/theme";
import { UserProfile } from "@/src/models/user";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserProfile } from "@/src/hooks/useUserProfile";

export default function ProfileSetupScreen() {
  const { session, loading: authLoading } = useAuth();
  const { save } = useUserProfile();
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    name: "", age: 25, weight_kg: 70, height_cm: 170, sex: "male",
    fitness_level: "beginner", goal: "gain_muscle", available_days: 3,
    injuries: [], experience: "", equipment: ["gym"], dietary_restrictions: []
  });

  if (authLoading) return <Screen><Text style={Theme.text.h2}>Cargando...</Text></Screen>;
  if (!session) {
    router.replace("/login");
    return <Screen><Text style={Theme.text.h2}>Redirigiendo al inicio de sesión...</Text></Screen>;
  }

  const update = (key: keyof UserProfile, value: any) => setProfile((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    setMessage("");
    if (!profile.name.trim() || profile.age < 12 || profile.weight_kg < 30 || profile.height_cm < 120) {
      setMessage("Completa nombre, edad, peso y estatura con valores reales.");
      return;
    }
    await save(profile);
    router.replace("/dashboard");
  };

  return (
    <Screen>
      <Text style={Theme.text.h1}>Configurar perfil</Text>
      <Text style={Theme.text.subtitle}>Estos datos generan tu entrenamiento y nutrición personalizada.</Text>
      <AppCard title="Datos personales">
        <AppInput label="Nombre" value={profile.name} onChangeText={(v) => update("name", v)} />
        <AppInput label="Edad" value={String(profile.age)} keyboardType="numeric" onChangeText={(v) => update("age", Number(v) || 0)} />
        <AppInput label="Peso kg" value={String(profile.weight_kg)} keyboardType="numeric" onChangeText={(v) => update("weight_kg", Number(v) || 0)} />
        <AppInput label="Estatura cm" value={String(profile.height_cm)} keyboardType="numeric" onChangeText={(v) => update("height_cm", Number(v) || 0)} />
        <SelectRow label="Sexo" value={profile.sex} onChange={(v) => update("sex", v)} options={[
          { label: "Masculino", value: "male" },
          { label: "Femenino", value: "female" },
          { label: "Otro", value: "other" }
        ]} />
      </AppCard>
      <AppCard title="Objetivo y nivel">
        <SelectRow label="Objetivo" value={profile.goal} onChange={(v) => update("goal", v)} options={[
          { label: "Ganar músculo", value: "gain_muscle" },
          { label: "Perder grasa", value: "lose_fat" },
          { label: "Mantener", value: "maintain" },
          { label: "Fuerza", value: "strength" },
          { label: "Resistencia", value: "endurance" }
        ]} />
        <SelectRow label="Nivel físico" value={profile.fitness_level} onChange={(v) => update("fitness_level", v)} options={[
          { label: "Principiante", value: "beginner" },
          { label: "Intermedio", value: "intermediate" },
          { label: "Avanzado", value: "advanced" }
        ]} />
        <SelectRow label="Días disponibles" value={profile.available_days} onChange={(v) => update("available_days", Number(v))} options={[
          { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 }, { label: "6", value: 6 }
        ]} />
        <AppInput label="Experiencia, lesiones o restricciones" value={profile.experience} onChangeText={(v) => update("experience", v)} multiline />
      </AppCard>
      {message ? <Text style={{ color: Theme.colors.warning, marginTop: 12 }}>{message}</Text> : null}
      <AppButton title="Guardar y generar mi plan" onPress={submit} />
    </Screen>
  );
}
