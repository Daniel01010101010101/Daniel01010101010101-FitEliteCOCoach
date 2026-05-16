import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AuthLayout } from "@/src/components/layout/AuthLayout";
import { AppInput } from "@/src/components/ui/AppInput";
import { AppButton } from "@/src/components/ui/AppButton";
import { authService } from "@/src/services/authService";
import { Theme } from "@/src/theme/theme";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    setMessage("");
    if (!email.includes("@") || password.length < 6) {
      setMessage("Usa un correo válido y una contraseña de mínimo 6 caracteres.");
      return;
    }
    const { error } = await authService.signUp(email, password);
    if (error) {
      setMessage(error.message || "No fue posible crear la cuenta.");
      return;
    }
    setMessage("Cuenta creada. Si Supabase pide confirmación, revisa tu correo.");
    setTimeout(() => router.replace("/dashboard"), 900);
  };

  return (
    <AuthLayout title="Crear cuenta" subtitle="Registra tu acceso para guardar tus planes y progreso.">
      <AppInput label="Correo" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <AppInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      {message ? <Text style={{ color: Theme.colors.warning, marginTop: 12 }}>{message}</Text> : null}
      <AppButton title="Registrarme" onPress={submit} />
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={{ color: Theme.colors.secondary, marginTop: 18, textAlign: "center", fontWeight: "800" }}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
