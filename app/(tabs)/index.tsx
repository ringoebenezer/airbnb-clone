import { useMemo, useState } from "react";
import { View, SafeAreaView } from "react-native";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import ListingsMap from "@/components/ListingsMap";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Home = () => {
  const [category, setCategory] = useState("Tiny Homes");
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[15%]">
        <ExploreHeader onCategoryChanged={onDataChanged} />
      </View>

      {/* <Listings listings={items} category={category} /> */}
      {/* <ListingsMap listings={listingsDataGeo} /> */}
      <ListingsBottomSheet listings={items} category={category} />
    </SafeAreaView>
  );
};

export default Home;
