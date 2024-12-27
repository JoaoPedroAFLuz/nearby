import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Text, useWindowDimensions } from "react-native";

import { useRef } from "react";
import { Place, PlaceProps } from "../place";
import { s } from "./styles";

type PlacesProps = {
  places: PlaceProps[];
};

export function Places({ places }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place place={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
