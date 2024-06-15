import { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import { View, SafeAreaView } from "react-native";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";

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

      <Listings listings={items} category={category} />
    </SafeAreaView>
  );
};

export default Home;
