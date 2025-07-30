import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ColorPicker } from "../components/ColorPicker";
import { TaskItem } from "../components/TaskItem";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  color: string;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [color, setColor] = useState<string>("#007bff");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState<string>("#007bff");

  const addTask = () => {
    if (!input.trim()) {
      Alert.alert("Task cannot be empty");
      return;
    }
    setTasks((prev: Task[]) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input.trim(),
        completed: false,
        color,
      },
    ]);
    setInput("");
    setColor("#007bff");
    Keyboard.dismiss();
  };
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditColor(task.color);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      Alert.alert("Task cannot be empty");
      return;
    }
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === editingId
          ? { ...task, text: editText.trim(), color: editColor }
          : task
      )
    );
    setEditingId(null);
    setEditText("");
    setEditColor("#007bff");
    Keyboard.dismiss();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditColor("#007bff");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== id));
  };

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      item={item}
      editing={editingId === item.id}
      editText={editText}
      editColor={editColor}
      COLORS={COLORS}
      onToggleComplete={toggleComplete}
      onDelete={deleteTask}
      onStartEdit={startEdit}
      onEditTextChange={setEditText}
      onEditColorChange={setEditColor}
      onSaveEdit={saveEdit}
      onCancelEdit={cancelEdit}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={addTask}
          accessibilityLabel="Add task"
        >
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
      <ColorPicker colors={COLORS} selected={color} onSelect={setColor} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
    alignSelf: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  list: {
    paddingBottom: 40,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    minHeight: 56,
  },
  colorRow: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "#eee",
  },
  selectedColorCircle: {
    borderColor: "#222",
    borderWidth: 2.5,
  },
  editBtn: {
    fontSize: 18,
    marginLeft: 10,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkCircleCompleted: {
    backgroundColor: "#007bff",
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteBtn: {
    fontSize: 18,
    marginLeft: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 16,
  },
});
