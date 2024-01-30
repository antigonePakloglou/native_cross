import { create } from "zustand";
import { Task } from "../hooks/useTodo";

type TodoStore = {
  todos: Task[];
  add(name: string): void;
  remove: (todoid: number) => void;
  edit: (todoId: number, newTitle: string) => void;
  toggle: (todoid: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [{ done: false, name: "Clean bedroom", id: 0 }],
  add: (name) =>
    set((state) => ({
      todos: [...state.todos, { name, id: state.todos.length, done: false }],
    })),
  toggle: (todoId) =>
    set((state) => ({
        todos: state.todos.map((t) => {
          return t.id === todoId
            ? {
                ...t,
                done: !t.done,
              }
            : t;
        }),
      })),
  remove: (todoid) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== todoid) })),
  edit: (todoId, newTitle) =>
    set((state) => ({
      todos: state.todos.map((t) => {
        return t.id === todoId
          ? {
              ...t,
              name: newTitle,
            }
          : t;
      }),
    })),
}));
