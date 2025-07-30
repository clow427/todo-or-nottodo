import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  color: string;
  dueDate: string;
};

interface TaskItemProps {
  item: Task;
  editing: boolean;
  editText: string;
  editColor: string;
  editDueDate?: string;
  COLORS: string[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onEditTextChange: (text: string) => void;
  onEditColorChange: (color: string) => void;
  onEditDueDateChange?: (date: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export function TaskItem({
  item,
  editing,
  editText,
  editColor,
  editDueDate,
  COLORS,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onEditTextChange,
  onEditColorChange,
  onEditDueDateChange,
  onSaveEdit,
  onCancelEdit,
}: TaskItemProps) {
  if (editing) {
    return (
      <View
        style={[
          styles.taskItem,
          { borderLeftColor: editColor, borderLeftWidth: 6 },
        ]}
      >
        <TextInput
          style={styles.editInput}
          value={editText}
          onChangeText={onEditTextChange}
          autoFocus
          onSubmitEditing={onSaveEdit}
        />
        <View style={styles.colorRow}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.colorCircle,
                { backgroundColor: c },
                editColor === c && styles.selectedColorCircle,
              ]}
              onPress={() => onEditColorChange(c)}
            />
          ))}
        </View>
        {onEditDueDateChange && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 14, color: "#666", marginRight: 8 }}>
              Due:
            </Text>
            <TextInput
              style={[styles.editInput, { maxWidth: 120 }]}
              value={editDueDate}
              onChangeText={onEditDueDateChange}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={onSaveEdit}
          accessibilityLabel="Save edit"
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancelEdit}
          accessibilityLabel="Cancel edit"
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.taskItem,
        { borderLeftColor: item.color, borderLeftWidth: 6 },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkCircle,
          item.completed && styles.checkCircleCompleted,
        ]}
        onPress={() => onToggleComplete(item.id)}
        accessibilityLabel={
          item.completed ? "Mark as incomplete" : "Mark as complete"
        }
      >
        {item.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.taskText, item.completed && styles.taskTextCompleted]}
        >
          {item.text}
        </Text>
        <Text style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
          Due: {item.dueDate}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onStartEdit(item)}
        accessibilityLabel="Edit task"
      >
        <Text style={styles.editBtn}>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        accessibilityLabel="Delete task"
      >
        <Text style={styles.deleteBtn}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
