import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

import { Step } from "../step";

import { s } from "./styles";

export function Steps() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Veja como funciona</Text>

      <Step
        title="Encontre estabelecimentos"
        description="Veja locais perto de você que são parceiros Nearby."
        icon={IconMapPin}
      />

      <Step
        title="Ative o cupom com o QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício."
        icon={IconQrcode}
      />

      <Step
        title="Garanta vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos."
        icon={IconTicket}
      />
    </View>
  );
}
