import { IconTicket } from "@tabler/icons-react-native";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { colors } from "@/styles/theme";

import { s } from "./styles";

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  couponsAvailableQuantity: number;
  cover: string;
  address: string;
};

type Props = TouchableOpacityProps & {
  place: PlaceProps;
};

export function Place({ place, ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <Image style={s.image} source={{ uri: place.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{place.name}</Text>

        <Text style={s.description}>{place.description}</Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />

          <Text style={s.tickets}>
            {place.couponsAvailableQuantity} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
