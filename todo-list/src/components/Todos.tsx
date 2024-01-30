import React from "react";
import RenderTask from "./RenderTask";
import { useTodoStore } from "../store/todoStore";
import { View } from "react-native";
import { Task } from "../hooks/useTodo";

export default function Todos() {
  const { remove, edit, todos } = useTodoStore();

  return (
    <View style={{ gap: 10 }}>
      {todos.map((item: Task, index: number) =>
        item.done ? null : (
          <RenderTask
            key={index}
            {...item}
            onEditPress={edit}
            onRemovePress={remove}
          />
        )
      )}
    </View>
  );
}
