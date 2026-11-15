import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { useSession } from "../features/auth/SessionProvider";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          accessibilityLabel="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>
      {session?.user.email ? (
        <Text style={styles.account}>Signed in as {session.user.email}</Text>
      ) : null}
      <Pressable
        accessibilityLabel="Sign out"
        accessibilityRole="button"
        onPress={signOut}
        style={styles.signOut}
      >
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 24 },
  heading: { fontSize: 24, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 18 },
  account: { fontSize: 14, color: "#5C6B62" },
  signOut: {
    alignItems: "center",
    borderColor: "#E3B7B0",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
  },
  signOutText: { color: "#A23B2C", fontSize: 16, fontWeight: "600" },
});
