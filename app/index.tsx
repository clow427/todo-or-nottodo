import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DueDateRow } from "../components/DueDateRow";
import { InputRow } from "../components/InputRow";
import { TaskItem } from "../components/TaskItem";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  color: string;
  dueDate: string; // ISO string
};

function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [color, setColor] = useState<string>("#007bff");
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState<string>("#007bff");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [sortAsc, setSortAsc] = useState(true);

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
        dueDate,
      },
    ]);
    setInput("");
    setColor("#007bff");
    setDueDate(new Date().toISOString().slice(0, 10));
    Keyboard.dismiss();
  };
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditColor(task.color);
    setEditDueDate(task.dueDate);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      Alert.alert("Task cannot be empty");
      return;
    }
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === editingId
          ? {
              ...task,
              text: editText.trim(),
              color: editColor,
              dueDate: editDueDate,
            }
          : task
      )
    );
    setEditingId(null);
    setEditText("");
    setEditColor("#007bff");
    setEditDueDate("");
    Keyboard.dismiss();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditColor("#007bff");
    setEditDueDate("");
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

  const COLORS = ["#28a745", "#ffc107", "#dc3545"]; // green, yellow, red

  // Sort tasks by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueDate === b.dueDate) return 0;
    return sortAsc
      ? a.dueDate.localeCompare(b.dueDate)
      : b.dueDate.localeCompare(a.dueDate);
  });

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      item={item}
      editing={editingId === item.id}
      editText={editText}
      editColor={editColor}
      editDueDate={editDueDate}
      COLORS={COLORS}
      onToggleComplete={toggleComplete}
      onDelete={deleteTask}
      onStartEdit={startEdit}
      onEditTextChange={setEditText}
      onEditColorChange={setEditColor}
      onEditDueDateChange={setEditDueDate}
      onSaveEdit={saveEdit}
      onCancelEdit={cancelEdit}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
      </View>

      <InputRow
        input={input}
        setInput={setInput}
        addTask={addTask}
        color={color}
        setColor={setColor}
        COLORS={COLORS}
      />

      <DueDateRow
        dueDate={dueDate}
        setDueDate={setDueDate}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />

      <FlatList
        data={sortedTasks}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    textAlign: "left",
  },
  date: {
    fontSize: 16,
    color: "#666",
    textAlign: "right",
    marginLeft: 12,
  },
  list: {
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 16,
  },
});
