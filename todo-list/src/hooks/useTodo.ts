import { useReducer } from "react";
import { Alert } from "react-native";

export type Task = { name: string; id: number; done: boolean };

export type Actions = "Add" | "Edit" | "Remove";

function tasksReducer(
  tasks: Task[],
  action: { type: Actions } & Partial<Task>
) {
  switch (action.type) {
    case "Add":
      return [...tasks, { name: action.name, id: tasks.length + 1 }];
    case "Remove":
      return tasks.filter((item) => item.id !== action.id);
    case "Edit":
      return tasks.map((t) => {
        if (t.id === action.id) {
          return { name: action.name, id: t.id };
        } else {
          return t;
        }
      });
  }
}

export default function useTodo(initialState: Task[]) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialState,
    () => initialState
  );
  function addTask(task: Task["name"]) {
    if (!task.length) Alert.alert("vous devez écrire quelque chose", "");

    dispatch({
      type: "Add",
      name: task,
    });
  }

  function removeTodo(id: Task["id"]) {
    if (!tasks.find((item: Task) => item.id === id)) {
      Alert.alert("cette tache n'existe pas");
      return;
    }
    dispatch({
      type: "Remove",
      id,
    });
  }
  function editTodo(id: Task["id"], newName: Task["name"]) {
    dispatch({
      type: "Edit",
      id,
      name: newName,
    });
  }

  return {
    addTask,
    removeTodo,
    editTodo,
    tasks,
  };
}
