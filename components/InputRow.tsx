// InputRow: Handles new task input, color selection, and add button
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ColorPicker } from "./ColorPicker";

// Props for InputRow
interface InputRowProps {
  input: string;
  setInput: (text: string) => void;
  addTask: () => void;
  color: string;
  setColor: (color: string) => void;
  COLORS: string[];
}

// InputRow component for adding new tasks
export const InputRow: React.FC<InputRowProps> = ({
  input,
  setInput,
  addTask,
  color,
  setColor,
  COLORS,
}) => (
  // Layout for input, color picker, and add button
  <View style={styles.inputRow}>
    <TextInput
      style={styles.input}
      placeholder="Add a new task..."
      value={input}
      onChangeText={setInput}
      onSubmitEditing={addTask}
      returnKeyType="done"
      selectionColor={"#007bff"}
    />
    <View style={styles.inlineColorPicker}>
      <ColorPicker colors={COLORS} selected={color} onSelect={setColor} />
    </View>
    <TouchableOpacity
      style={styles.addBtn}
      onPress={addTask}
      accessibilityLabel="Add task"
    >
      <Text style={styles.addBtnText}>Add</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
    minWidth: 0,
  },
  addBtn: {
    marginLeft: 4,
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    minWidth: 48,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  inlineColorPicker: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
});
