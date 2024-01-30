import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useTodo, { Task } from "./src/hooks/useTodo";
import RenderTask from "./src/components/RenderTask";
import { useTodoStore } from "./src/store/todoStore";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import DoneTodos from "./src/components/DoneTodos";
import Todos from "./src/components/Todos";
import TodosScreen from "./src/screen/TodosScreen";
import QueryScreen from "./src/screen/QueryScreen";


const queryClient = new QueryClient();
export default function App() {
  console.log("rerender app");
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <TodosScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
