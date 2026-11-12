import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 24 },
  heading: { fontSize: 24, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { fontSize: 18 },
});
