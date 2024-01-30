import { useReducer, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Task } from "../hooks/useTodo";
import { useTodoStore } from "../store/todoStore";

type Props = {
  onEditPress: (id: Task["id"], name: Task["name"]) => void;
  onRemovePress: (id: Task["id"]) => void;
} & Task;
export default function RenderTask({
  name,
  id,
  done,
  onEditPress,
  onRemovePress,
}: Props) {
  const toggleTodo = useTodoStore((state) => state.toggle);
  //const {removeTodo} =  ;
  const removeTodo = useTodoStore((state) => state.remove);

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  console.log("render todo list");
  return (
    <View
      testID="CARD_CONTAINER"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        height: 50,
        backgroundColor: "white",
        shadowColor: "gray",
        shadowOffset: {
          height: 2,
          width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
      key={id}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
         testID="COLOR_BUTTON"
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            marginRight: 10,
            backgroundColor: done ? "lightblue" : "transparent",
          }}
          onPress={() => toggleTodo(id)}
        />
        {editing ? (
          <TextInput
            value={newName}
            placeholder="entrer le nouveau nom"
            onChangeText={setNewName}
            autoFocus
          />
        ) : (
          <Text>{name}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          testID="MODIFY_BUTTON"
          onPress={() => {
            if (editing) {
              onEditPress(id, newName);
              setEditing(false);
            } else {
              onEditPress(id, newName);
              setEditing(true);
            }
          }}
        >
          <Text style={{ color: "lightblue", textDecorationLine: "underline" }}>
            {editing ? "Enregistrer" : "Modifier"}
          </Text>
        </Pressable>
        <Text
          testID="DELETE_BUTTON"
          style={{ color: "red" }}
          onPress={() => removeTodo(id)}
        >
          Supprimer
        </Text>
      </View>
    </View>
  );
}
