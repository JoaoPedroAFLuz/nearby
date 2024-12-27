import { FlatList } from "react-native";

import { Category } from "../category";
import { s } from "./styles";

export type Categories = {
  id: string;
  name: string;
}[];

type CategoriesProps = {
  categories: Categories;
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({
  categories,
  selected,
  onSelect,
}: CategoriesProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          isSelected={item.id === selected}
          onPress={() => onSelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.content}
    />
  );
}
