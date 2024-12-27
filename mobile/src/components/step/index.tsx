import { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

import { colors } from "@/styles/theme";

import { s } from "./styles";

interface StepProps {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View style={s.container}>
      {Icon && <Icon color={colors.red.base} size={32} />}

      <View style={s.details}>
        <Text style={s.title}>{title}</Text>

        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  );
}
