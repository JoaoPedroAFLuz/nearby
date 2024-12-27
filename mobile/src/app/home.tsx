import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { Categories } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";

export default function Home() {
  const [categories, setCategories] = useState<Categories>([]);
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState<PlaceProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
      router.navigate("/");
    }
  }

  async function fetchPlaces() {
    if (!category) {
      return;
    }

    try {
      const { data } = await api.get(`/markets/category/${category}`);

      setPlaces(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Mercados", "Não foi possível carregar os locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <Places places={places} />
    </View>
  );
}
