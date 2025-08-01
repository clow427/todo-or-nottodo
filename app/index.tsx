// Main entry point for the Todo List app screen
// Handles state, logic, and layout for tasks, input, and sorting
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

// Task type definition
type Task = {
  id: string;
  text: string;
  completed: boolean;
  color: string;
  dueDate: string; // ISO string
};

// Returns today's date in a readable format for the header
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomeScreen() {
  // State for all tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State for new task input
  const [input, setInput] = useState("");
  // State for selected color for new task
  const [color, setColor] = useState<string>("#007bff");
  // State for due date for new task
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  // State for editing task
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState<string>("#007bff");
  const [editDueDate, setEditDueDate] = useState<string>("");
  // State for sorting order
  const [sortAsc, setSortAsc] = useState(true);

  // Add a new task to the list
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
    // Begin editing a task
    Keyboard.dismiss();
  };
  // Begin editing a task
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditColor(task.color);
    // Save edits to a task
    setEditDueDate(task.dueDate);
  };

  // Save edits to a task
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
    // Cancel editing a task
    setEditDueDate("");
    Keyboard.dismiss();
  };

  // Cancel editing a task
  const cancelEdit = () => {
    setEditingId(null);
    // Toggle completion status of a task
    setEditText("");
    setEditColor("#007bff");
    setEditDueDate("");
  };

  // Toggle completion status of a task
  const toggleComplete = (id: string) => {
    setTasks((prev: Task[]) =>
      // Delete a task from the list
      prev.map((task: Task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    // Available color options for tasks
  };

  // Sort tasks by due date (ascending or descending)
  // Delete a task from the list
  const deleteTask = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== id));
  };

  // Available color options for tasks
  const COLORS = ["#007bff", "#ffc107", "#dc3545"]; // blue, yellow, red
  // Render a single task item (edit or view mode)

  // Sort tasks by due date (ascending or descending)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueDate === b.dueDate) return 0;
    return sortAsc
      ? a.dueDate.localeCompare(b.dueDate)
      : b.dueDate.localeCompare(a.dueDate);
  });

  // Render a single task item (edit or view mode)
  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      item={item}
      editing={editingId === item.id}
      editText={editText}
      editColor={editColor}
      editDueDate={editDueDate}
      COLORS={COLORS}
      onToggleComplete={toggleComplete}
      // Main layout: header, input, due date, and task list
      onDelete={deleteTask}
      onStartEdit={startEdit}
      onEditTextChange={setEditText}
      onEditColorChange={setEditColor}
      onEditDueDateChange={setEditDueDate}
      onSaveEdit={saveEdit}
      onCancelEdit={cancelEdit}
    />
  );

  // Main layout: header, input, due date, and task list
  return (
    <View style={styles.container}>
      {/* Header with title and today's date */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
      </View>

      {/* Input row for adding new tasks */}
      <InputRow
        input={input}
        setInput={setInput}
        addTask={addTask}
        color={color}
        setColor={setColor}
        COLORS={COLORS}
      />

      {/* Row for due date input and sort toggle */}
      <DueDateRow
        dueDate={dueDate}
        setDueDate={setDueDate}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />

      {/* List of tasks */}
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

// Styles for the main screen layout and elements
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
