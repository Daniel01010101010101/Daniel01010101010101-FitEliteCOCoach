import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AuthLayout } from "@/src/components/layout/AuthLayout";
import { AppInput } from "@/src/components/ui/AppInput";
import { AppButton } from "@/src/components/ui/AppButton";
import { authService } from "@/src/services/authService";
import { Theme } from "@/src/theme/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    setMessage("");
    if (!email || !password) {
      setMessage("Ingresa correo y contraseña.");
      return;
    }
    const { error } = await authService.signIn(email, password);
    if (error) {
      setMessage(error.message || "No fue posible iniciar sesión.");
      return;
    }
    router.replace("/dashboard");
  };

  return (
    <AuthLayout title="FitEliteCO Coach" subtitle="Entrena con una guía premium basada en tus datos reales.">
      <AppInput label="Correo" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <AppInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      {message ? <Text style={{ color: Theme.colors.warning, marginTop: 12 }}>{message}</Text> : null}
      <AppButton title="Iniciar sesión" onPress={submit} />
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ color: Theme.colors.secondary, marginTop: 18, textAlign: "center", fontWeight: "800" }}>Crear cuenta nueva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/reset-password")}>
        <Text style={{ color: Theme.colors.textMuted, marginTop: 12, textAlign: "center" }}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
