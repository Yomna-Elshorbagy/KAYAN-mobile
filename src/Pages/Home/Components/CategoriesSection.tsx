import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../../Contexts/ThemeContext";
import { HomeStyles } from "../../../Styles/HomeStyles";
import { getCategories } from "../../../Apis/CategoriesApis";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../Constants/routes";
import { useTranslation } from "react-i18next";

interface Category {
  _id: string;
  name: string;
  image?: { secure_url: string };
}

const CategoriesSection = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response?.data || response || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate(ROUTES.BOTTOM_NAV, {
      screen: ROUTES.PRODUCTS,
      params: { category: categoryName },
    });
  };

  const handleSeeAll = () => {
    navigation.navigate(ROUTES.BOTTOM_NAV, { screen: ROUTES.PRODUCTS });
  };

  if (loading && categories.length === 0) {
    return (
      <View style={HomeStyles.sectionContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={HomeStyles.sectionContainer}>
      <View style={HomeStyles.sectionHeader}>
        <Text style={[HomeStyles.sectionTitle, { color: colors.text }]}>
          {t("home.ourCategories")}
        </Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={[HomeStyles.viewAllText, { color: colors.primary }]}>
            {t("home.seeAll")}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={HomeStyles.horizontalList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={HomeStyles.categoryCard}
            onPress={() => handleCategoryPress(item.name)}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={
                item.image?.secure_url
                  ? { uri: item.image.secure_url }
                  : require("../../../../assets/hero_jewelry.png") // Fallback
              }
              style={HomeStyles.categoryImage}
              resizeMode="cover"
            >
              <View style={HomeStyles.categoryOverlay} />
              <View style={HomeStyles.categoryGradient} />
              <Text style={HomeStyles.categoryText}>{item.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesSection;
