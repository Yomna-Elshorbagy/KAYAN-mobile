import React, { useRef, useState } from "react";
import { View, StatusBar, Dimensions, ViewToken } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../Contexts/ThemeContext";
import { ROUTES } from "../../Constants/routes";
import CustomButton from "../../Shared/CustomButton";
import { OnBoardStyles } from "../../Styles/OnBoardStyles";
import Slide, { SlideItem } from "./Components/Slide";
import Pagination from "./Components/Pagination";

const { width } = Dimensions.get("window");

/* Main Screen */
export default function Onboarding() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: SlideItem[] = [
    {
      id: "1",
      image: require("../../../assets/3.jpg"),
      title: "Timeless Elegance",
      description: "Discover jewelry crafted with precision and passion.",
    },
    {
      id: "2",
      image: require("../../../assets/2.jpg"),
      title: "Crafted to Perfection",
      description: "Each piece tells a story of beauty and refinement.",
    },
    {
      id: "3",
      image: require("../../../assets/1.jpg"),
      title: "Luxury That Lasts",
      description: "Designed to shine for every moment in your life.",
    },
  ];

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.LOGIN }],
        })
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" />

      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Slide item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={scrollHandler}
        onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        scrollEventThrottle={16}
      />

      <View style={OnBoardStyles.footer}>
        <Pagination scrollX={scrollX} slides={slides} />

        <CustomButton
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
}
