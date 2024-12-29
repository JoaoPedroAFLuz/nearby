import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Categories } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

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

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Localização", "Não foi possível obter a localização");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
    getCurrentLocation();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            description={place.address}
            image={require("@/assets/pin.png")}
          />
        ))}
      </MapView>

      <Places places={places} />
    </View>
  );
}
