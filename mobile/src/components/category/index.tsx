import { Pressable, PressableProps, Text } from "react-native";

import { categoriesIcons } from "@/utils/categories-icons";

import { colors } from "@/styles/theme";
import { s } from "./styles";

type CategoryProps = PressableProps & {
  iconId: string;
  name: string;
  isSelected?: boolean;
};

export function Category({
  iconId,
  name,
  isSelected,
  ...props
}: CategoryProps) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      style={[s.container, isSelected && s.containerSelected]}
      {...props}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />

      <Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
    </Pressable>
  );
}
