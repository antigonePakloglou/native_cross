import React from "react";
import DoneTodos from "../components/DoneTodos";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Todos from "../components/Todos";
import { useTodoStore } from "../store/todoStore";
import useTodo, { Task } from "../hooks/useTodo";


const initialState: Array<Task> = [
    {
      name: "tache 1",
      id: 1,
      done: false,
    },
  ];

  
export default function TodosScreen() {
  const [value, setValue] = React.useState("");
  const add = useTodoStore((s) => s.add);
  const { addTask, removeTodo, editTodo, tasks } = useTodo(initialState);
 
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: "10%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Ajouter une tache"
          value={value}
          onChangeText={setValue}
          style={{ borderWidth: 1, width: "70%", paddingLeft: 10 }}
        />
        <Button
          testID="AJOUTER_BUTTON"
          title="Ajouter"
          onPress={() => value.length > 0 && add(value)}
        />
      </View>
      <Todos />
      <DoneTodos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
