import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";

export default function QueryScreen() {
  async function getRecipes() {
    const res = await fetch(
      "https://api.mockaroo.com/api/51b3d800?count=10&key=68d22ed0"
    );
    return await res.json();
  }

  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["todos"],
    queryFn: getRecipes,
    retry: false,
  });
  console.log({ data, isLoading, isError, error, status });
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text>An error occured 😔</Text>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  function renderItem({
    item,
  }: ListRenderItemInfo<{ id: string; name: string; description: string }>) {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {isLoading ? (
        <Text>Loading recipes</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
}
