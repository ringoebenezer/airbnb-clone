import { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const listRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View className="p-2 gap-4 y-4">
          <Image source={{ uri: item.medium_url }} />
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1 bg-[#FDFFFF]">
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Listings;
