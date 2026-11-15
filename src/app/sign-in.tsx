import { Link } from "expo-router";
import { useState } from "react";
import {
  AuthButton,
  AuthField,
  AuthLayout,
  AuthMessage,
} from "../features/auth/AuthForm";
import { useSession } from "../features/auth/SessionProvider";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);
    // On success the auth guard in _layout swaps to the feed.
    if (result.error) setError(result.error);
  }

  return (
    <AuthLayout subtitle="Log in to see what your people are up to." title="Welcome back">
      <AuthField
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        placeholder="you@example.com"
        textContentType="emailAddress"
        value={email}
      />
      <AuthField
        autoCapitalize="none"
        autoComplete="current-password"
        label="Password"
        onChangeText={setPassword}
        onSubmitEditing={submit}
        placeholder="Your password"
        secureTextEntry
        textContentType="password"
        value={password}
      />
      {error ? <AuthMessage kind="error">{error}</AuthMessage> : null}
      <AuthButton label="Log in" loading={loading} onPress={submit} />
      <Link asChild href="/sign-up" replace>
        <AuthButton label="New here? Create an account" onPress={() => {}} variant="link" />
      </Link>
    </AuthLayout>
  );
}
