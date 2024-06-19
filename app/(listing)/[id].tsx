import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { Listing } from "@/interfaces/listing";
import listingsData from "@/assets/data/airbnb-listings.json";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ViewListing = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing: Listing = (listingsData as any[]).find(item => item.id === id);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[
            headerAnimatedStyle,
            {
              backgroundColor: "#fff",
              height: 100,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.grey,
            },
          ]}></Animated.View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 300 / 1.5], [0, 1]),
    };
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-300, 0, 300, 300],
            [-300 / 2, 0, 300 * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-300, 0, 300], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}>
        <Animated.Image
          resizeMode="cover"
          source={{ uri: listing.xl_picture_url }}
          className="w-full h-[300] bg-gray-500"
          style={imageAnimatedStyle}
        />

        <View style={{ padding: 24, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {listing.name}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={{ fontSize: 16, color: Colors.grey, marginVertical: 4 }}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{" "}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={{ fontSize: 16 }}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews}{" "}
              reviews
            </Text>
          </View>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.grey,
              marginVertical: 16,
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: Colors.grey,
              }}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.grey,
              marginVertical: 16,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
            }}>
            {listing.description}
          </Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          height: 100,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopColor: Colors.grey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <TouchableOpacity
            style={{
              height: "100%",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}>
            <Text
              style={{
                fontSize: 18,
              }}>
              €{listing.price}
            </Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                backgroundColor: Colors.primary,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              },
              { paddingRight: 20, paddingLeft: 20 },
            ]}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
              }}>
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ViewListing;
