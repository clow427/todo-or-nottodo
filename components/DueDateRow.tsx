// DueDateRow: Handles due date input and sort toggle
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Props for DueDateRow
interface DueDateRowProps {
  dueDate: string;
  setDueDate: (date: string) => void;
  sortAsc: boolean;
  setSortAsc: (cb: (asc: boolean) => boolean) => void;
}

// DueDateRow component for due date and sort order
export const DueDateRow: React.FC<DueDateRowProps> = ({
  dueDate,
  setDueDate,
  sortAsc,
  setSortAsc,
}) => (
  // Layout for due date input and sort button
  <View style={styles.dueDateRow}>
    <View style={{ flex: 1 }} />
    <Text style={styles.dueDateLabel}>Due:</Text>
    <TextInput
      style={styles.dueDateInput}
      value={dueDate}
      onChangeText={setDueDate}
      placeholder="YYYY-MM-DD"
      keyboardType="numeric"
      maxLength={10}
    />
    <View style={styles.sortRow}>
      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() => setSortAsc((asc) => !asc)}
        accessibilityLabel="Toggle sort order"
      >
        <Text style={styles.sortBtnText}>{sortAsc ? "↑" : "↓"}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  dueDateRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -10,
  },
  dueDateLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
    alignSelf: "center",
  },
  dueDateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    minWidth: 120,
    maxWidth: 160,
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  sortBtn: {
    marginLeft: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    minWidth: 28,
  },
  sortBtnText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  },
});
