import { useState } from "react";
import { Text } from "react-native";
import { AuthLayout } from "@/src/components/layout/AuthLayout";
import { AppInput } from "@/src/components/ui/AppInput";
import { AppButton } from "@/src/components/ui/AppButton";
import { authService } from "@/src/services/authService";
import { Theme } from "@/src/theme/theme";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!email.includes("@")) return setMessage("Ingresa un correo válido.");
    const { error } = await authService.resetPassword(email);
    setMessage(error ? error.message : "Te enviamos un correo de recuperación.");
  };

  return (
    <AuthLayout title="Recuperar contraseña" subtitle="Recibe un enlace para restablecer tu acceso.">
      <AppInput label="Correo" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      {message ? <Text style={{ color: Theme.colors.warning, marginTop: 12 }}>{message}</Text> : null}
      <AppButton title="Enviar recuperación" onPress={submit} />
    </AuthLayout>
  );
}
