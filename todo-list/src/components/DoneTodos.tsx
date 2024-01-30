import React from "react";
import { View } from "react-native";
import { useTodoStore } from "../store/todoStore";
import RenderTask from "./RenderTask";
import { Task } from "../hooks/useTodo";

export default function DoneTodos() {
  const { remove, edit, todos } = useTodoStore();
  return (
    <>
      {!!todos.filter((t) => t.done).length && (
        <View
          style={{
            width: "80%",
            height: 1,
            backgroundColor: "gray",
            alignSelf: "center",
            opacity: 0.5
          }}
        />
      )}
      <View
        style={{
          gap: 10,
        }}
      >
        {todos.map((item: Task, index: number) =>
          item.done ? (
            <RenderTask
              key={index}
              {...item}
              onEditPress={edit}
              onRemovePress={remove}
            />
          ) : null
        )}
      </View>
    </>
  );
}
