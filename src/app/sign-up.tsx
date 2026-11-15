import { Link } from "expo-router";
import { useState } from "react";
import {
  AuthButton,
  AuthField,
  AuthLayout,
  AuthMessage,
} from "../features/auth/AuthForm";
import { useSession } from "../features/auth/SessionProvider";

export default function SignUp() {
  const { signUp } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setNotice(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    setLoading(true);
    const result = await signUp(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.needsEmailConfirmation) {
      setNotice("Check your email to confirm your account, then log in.");
    }
    // Otherwise a session exists and the auth guard in _layout opens the feed.
  }

  return (
    <AuthLayout subtitle="Join your community on ConnectSphere." title="Create your account">
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
        autoComplete="new-password"
        label="Password"
        onChangeText={setPassword}
        placeholder="At least 6 characters"
        secureTextEntry
        textContentType="newPassword"
        value={password}
      />
      <AuthField
        autoCapitalize="none"
        autoComplete="new-password"
        label="Confirm password"
        onChangeText={setConfirm}
        onSubmitEditing={submit}
        placeholder="Repeat your password"
        secureTextEntry
        textContentType="newPassword"
        value={confirm}
      />
      {error ? <AuthMessage kind="error">{error}</AuthMessage> : null}
      {notice ? <AuthMessage kind="info">{notice}</AuthMessage> : null}
      <AuthButton label="Sign up" loading={loading} onPress={submit} />
      <Link asChild href="/sign-in" replace>
        <AuthButton label="Already have an account? Log in" onPress={() => {}} variant="link" />
      </Link>
    </AuthLayout>
  );
}
