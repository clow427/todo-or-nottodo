import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ColorPickerProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  return (
    <View style={styles.colorRow}>
      {colors.map((c) => (
        <TouchableOpacity
          key={c}
          style={[
            styles.colorCircle,
            { backgroundColor: c },
            selected === c && styles.selectedColorCircle,
          ]}
          onPress={() => onSelect(c)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
