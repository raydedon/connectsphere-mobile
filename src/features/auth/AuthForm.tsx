import type { ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.wordmark}>ConnectSphere</Text>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.form}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function AuthField({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#9AA094"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

export function AuthButton({
  label,
  onPress,
  loading,
  variant = "primary",
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "link";
}) {
  const primary = variant === "primary";
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ busy: !!loading, disabled: !!loading }}
      disabled={loading}
      onPress={onPress}
      style={[primary ? styles.button : styles.linkButton, loading && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={primary ? styles.buttonText : styles.linkText}>{label}</Text>
      )}
    </Pressable>
  );
}

export function AuthMessage({ kind, children }: { kind: "error" | "info"; children: string }) {
  return (
    <Text
      accessibilityLiveRegion="polite"
      style={kind === "error" ? styles.error : styles.info}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { backgroundColor: "#F7F6F1", flex: 1 },
  content: { flexGrow: 1, justifyContent: "center", padding: 24 },
  wordmark: { color: "#25372A", fontSize: 20, fontWeight: "800", letterSpacing: -0.6 },
  title: { color: "#222920", fontSize: 28, fontWeight: "700", letterSpacing: -0.5, marginTop: 28 },
  subtitle: { color: "#85897F", fontSize: 14, marginTop: 6 },
  form: { gap: 16, marginTop: 28 },
  field: { gap: 6 },
  label: { color: "#425547", fontSize: 12, fontWeight: "700" },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE0D5",
    borderRadius: 12,
    borderWidth: 1,
    color: "#222920",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#48634D",
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  linkButton: { alignItems: "center", minHeight: 44, justifyContent: "center" },
  linkText: { color: "#48634D", fontSize: 14, fontWeight: "600" },
  disabled: { opacity: 0.7 },
  error: { color: "#B3392F", fontSize: 13 },
  info: { color: "#48634D", fontSize: 13 },
});
