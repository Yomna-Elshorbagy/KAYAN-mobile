import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Star, Truck, Heart, ShoppingCart } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  fetchProductById,
  fetchRelatedProducts,
} from "../../Redux/Slices/products.thunks";
import { fetchProductReviews } from "../../Redux/Slices/reviewsSlice";
import { useTheme } from "../../Contexts/ThemeContext";
import { getProductDetailsStyles } from "../../Styles/ProductDetailsStyles";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { addCartItem } from "../../Redux/Slices/cartSlice";
import { ROUTES } from "../../Constants/routes";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../Redux/Slices/wishlistSlice";
import Toast from "react-native-toast-message";

const ProductDetails = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = getProductDetailsStyles(colors);

  const productId = route.params?.id;

  const { selectedProduct, related, loading } = useAppSelector(
    (state) => state.products
  );
  const { productReviews } = useAppSelector((state) => state.review);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const [activeTab, setActiveTab] = useState("Description");

  const isWishlisted = wishlistItems.some(
    (item: any) => item._id === productId
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchProductReviews(productId));
      dispatch(fetchRelatedProducts(productId));
    }
  }, [dispatch, productId]);

  if (loading && !selectedProduct) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!selectedProduct) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={{ textAlign: "center", color: colors.subText }}>
          Product not found
        </Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addCartItem({ productId: selectedProduct._id, quantity: 1 }));
    Toast.show({
      type: "success",
      text1: "Added to Cart",
      text2: `${selectedProduct.title} added to your cart successfully`,
    });
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeWishlistItem(selectedProduct._id));
    } else {
      dispatch(addWishlistItem(selectedProduct._id));
    }
  };

  const discountedPrice = selectedProduct.discount
    ? selectedProduct.price -
      (selectedProduct.price * selectedProduct.discount) / 100
    : selectedProduct.price;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <Text style={styles.descriptionText}>
            {selectedProduct.description}
          </Text>
        );
      case "Details":
        return (
          <View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Category</Text>
              <Text style={styles.detailsValue}>
                {selectedProduct.category?.name}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Stock</Text>
              <Text style={styles.detailsValue}>
                {selectedProduct.stock} units
              </Text>
            </View>
          </View>
        );
      case "Reviews":
        return (
          <View>
            {productReviews && productReviews.length > 0 ? (
              productReviews.map((review: any, index: number) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>
                      {review.user?.userName || "User"}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          color={
                            s <= review.rate ? "#FFB000" : colors.sage[300]
                          }
                          fill={s <= review.rate ? "#FFB000" : "transparent"}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.subText }}>No reviews yet</Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Shared Header */}
      <SharedHeader title={t("shop.productDetails")} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedProduct.imageCover.secure_url }}
            style={styles.productImage}
          />
        </View>

        <View style={styles.contentWrapper}>
          {/* Title */}
          <Text style={styles.title}>{selectedProduct.title}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Star size={18} color="#FFB000" fill="#FFB000" />
            <Text style={styles.ratingText}>
              {selectedProduct.rate || "4.9"}
            </Text>
            <Text style={styles.reviewsCount}>
              ({productReviews?.length || "156"} Reviews)
            </Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${discountedPrice.toFixed(0)}</Text>
            {selectedProduct.discount > 0 && (
              <Text style={styles.oldPrice}>
                ${selectedProduct.price.toFixed(0)}
              </Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockStatus}>
            <View
              style={[
                styles.stockDot,
                {
                  backgroundColor:
                    selectedProduct.stock > 0 ? "#4CAF50" : "#E63946",
                },
              ]}
            />
            <Text
              style={[
                styles.stockText,
                {
                  color: selectedProduct.stock > 0 ? "#4CAF50" : "#E63946",
                  fontWeight: "bold",
                },
              ]}
            >
              {selectedProduct.stock > 0
                ? `${selectedProduct.stock} items left in stock`
                : "Currently Out of Stock"}
            </Text>
          </View>

          {/* Free Shipping Card */}
          <View style={styles.shippingCard}>
            <View style={styles.shippingIconBox}>
              <Truck size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.shippingTitle}>Free Shipping</Text>
              <Text style={styles.shippingDesc}>On orders over $500</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {["Description", "Details", "Reviews"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>{renderTabContent()}</View>

          {/* Related Products */}
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          <FlatList
            horizontal
            data={related}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: 170, marginRight: 15 }}>
                <ProductCard
                  product={item}
                  onPress={() =>
                    navigation.push(ROUTES.PRODUCT_DETAIlS, { id: item._id })
                  }
                  onAddToCart={() =>
                    dispatch(addCartItem({ productId: item._id, quantity: 1 }))
                  }
                  onToggleWishlist={() => dispatch(addWishlistItem(item._id))}
                  isWishlisted={wishlistItems.some(
                    (w: any) => w._id === item._id
                  )}
                />
              </View>
            )}
            style={styles.relatedList}
          />
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActions}>
        <TouchableOpacity
          style={styles.wishlistActionBtn}
          onPress={handleToggleWishlist}
        >
          <Heart
            size={24}
            color={isWishlisted ? "#E63946" : colors.subText}
            fill={isWishlisted ? "#E63946" : "transparent"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addToCartBtn,
            selectedProduct.stock < 1 && { backgroundColor: colors.sage[300] },
          ]}
          onPress={selectedProduct.stock > 0 ? handleAddToCart : undefined}
          disabled={selectedProduct.stock < 1}
        >
          <Text
            style={[
              styles.addToCartText,
              selectedProduct.stock < 1 && { color: colors.subText },
            ]}
          >
            {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
