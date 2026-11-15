import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SessionProvider,
  useSession,
} from "../features/auth/SessionProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session, isLoading } = useSession();

  if (isLoading) return null;
  SplashScreen.hide();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ title: "Log in", headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ title: "Sign up", headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
