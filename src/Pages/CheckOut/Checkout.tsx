import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { useTheme } from "../../Contexts/ThemeContext";
import { getCheckoutStyles } from "../../Styles/CheckoutStyles";
import {
  checkoutSchema,
  CheckoutSchemaType,
} from "../../Utilis/Schema/checkoutSchema";
import CustomInput from "../../Shared/CustomInput";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { createOrderWithLocationThunk } from "../../Redux/Slices/orderSlice";
import { ROUTES } from "../../Constants/routes";
import { resetCart } from "../../Redux/Slices/cartSlice";
import LocationPicker from "../../Components/Checkout/LocationPicker";

export default function Checkout() {
  const { colors } = useTheme();
  const styles = getCheckoutStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const { cart, isLoading: isCartLoading } = useAppSelector(
    (state) => state.cart
  );

  //==> to get validation and errors
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
    },
  });

  //==> watch to any change on map
  const selectedLocation = watch("location");

  const onStep1Submit = () => {
    setStep(2);
  };

  const onPlaceOrder = async () => {
    const values = getValues();
    const payload: any = {
      fullName: `${values.firstName} ${values.lastName}`,
      phone: values.phone,
    };

    // ==> if there is map location ok and if there is not put string one
    if (values.location) {
      payload.location = values.location;
    } else {
      payload.address = `${values.address}, ${values.city}, ${values.postalCode}, ${values.country}`;
    }

    // ==> unwrap make me use try catch to return actual error
    try {
      await dispatch(createOrderWithLocationThunk(payload)).unwrap();
      //=> after success
      dispatch(resetCart());
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your order has been placed successfully!",
      });
      setStep(3);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err || "Failed to place order",
      });
    }
  };

  //===> this is the stepper UI
  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      <View style={styles.stepWrapper}>
        <View style={[styles.stepCircle, step >= 1 && styles.activeStepCircle]}>
          <Text
            style={[styles.stepNumber, step >= 1 && styles.activeStepNumber]}
          >
            1
          </Text>
        </View>
        <View style={[styles.stepLine, step >= 2 && styles.activeStepLine]} />
      </View>

      <View style={styles.stepWrapper}>
        <View style={[styles.stepCircle, step >= 2 && styles.activeStepCircle]}>
          <Text
            style={[styles.stepNumber, step >= 2 && styles.activeStepNumber]}
          >
            2
          </Text>
        </View>
        <View style={[styles.stepLine, step >= 3 && styles.activeStepLine]} />
      </View>

      <View style={[styles.stepCircle, step >= 3 && styles.activeStepCircle]}>
        <Text style={[styles.stepNumber, step >= 3 && styles.activeStepNumber]}>
          3
        </Text>
      </View>
    </View>
  );

  const subtotal = cart?.totalPrice || 0;
  const tax = subtotal * 0.05; // assuming 5% tax as in design example
  const total = subtotal + tax;

  //===> step 3 design the confirm screen
  if (step === 3) {
    return (
      <View style={styles.container}>
        <SharedHeader title="Order Confirmed" />
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
          <Text style={styles.successTitle}>Thank You for Your Order!</Text>
          <Text style={styles.successDesc}>
            Your order has been placed successfully. You will receive a
            confirmation email shortly.
          </Text>
          <TouchableOpacity
            style={[styles.continueButton, { marginTop: 40, width: "100%" }]}
            onPress={() =>
              navigation.navigate(ROUTES.BOTTOM_NAV, { screen: ROUTES.HOME })
            }
          >
            <Text style={styles.continueButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showMap && (
        <LocationPicker
          onConfirm={(loc) => {
            setValue("location", loc);
            setShowMap(false);
          }}
          onCancel={() => setShowMap(false)}
          initialLocation={selectedLocation}
        />
      )}
      <SharedHeader title="Checkout" />
      {renderStepper()}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 ? (
          <View>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="location"
                size={24}
                color="#D1A03F"
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Shipping Address</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.summaryCard,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: selectedLocation
                    ? colors.sage[100]
                    : colors.sage[50],
                },
              ]}
              onPress={() => setShowMap(true)}
            >
              <Ionicons
                name="map-outline"
                size={24}
                color={colors.primary}
                style={{ marginRight: 15 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.itemName,
                    { color: selectedLocation ? colors.primary : colors.text },
                  ]}
                >
                  {selectedLocation
                    ? "Location Selected on Map"
                    : "Select on Map (Optional)"}
                </Text>
                {selectedLocation?.description && (
                  <Text style={styles.addressLine} numberOfLines={1}>
                    {selectedLocation.description}
                  </Text>
                )}
              </View>
              {selectedLocation && (
                <TouchableOpacity
                  onPress={() => setValue("location", undefined)}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.subText}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {!selectedLocation && (
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  color: colors.subText,
                }}
              >
                — OR —
              </Text>
            )}

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <CustomInput
                  name="firstName"
                  control={control}
                  placeholder="First Name"
                />
              </View>
              <View style={styles.halfInput}>
                <CustomInput
                  name="lastName"
                  control={control}
                  placeholder="Last Name"
                />
              </View>
            </View>

            {!selectedLocation && (
              <>
                <CustomInput
                  name="address"
                  control={control}
                  placeholder="Address"
                />

                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <CustomInput
                      name="city"
                      control={control}
                      placeholder="City"
                    />
                  </View>
                  <View style={styles.halfInput}>
                    <CustomInput
                      name="postalCode"
                      control={control}
                      placeholder="Postal Code"
                    />
                  </View>
                </View>

                <CustomInput
                  name="country"
                  control={control}
                  placeholder="Country"
                />
              </>
            )}
            <CustomInput
              name="phone"
              control={control}
              placeholder="Phone"
              keyboardType="phone-pad"
            />
          </View>
        ) : (
          <View>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            {/* Products Card */}
            <View style={styles.summaryCard}>
              {cart?.products.map((item) => (
                <View key={item._id} style={styles.orderItem}>
                  <Image
                    source={{ uri: item.productId?.imageCover?.secure_url }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.productId?.title}</Text>
                    <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Address Review Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Shipping Address</Text>
              <View style={styles.addressDetails}>
                <Text style={styles.itemName}>
                  {getValues().firstName} {getValues().lastName}
                </Text>
                {selectedLocation ? (
                  <Text style={styles.addressLine}>
                    Selected via Map: {selectedLocation.description}
                  </Text>
                ) : (
                  <>
                    <Text style={styles.addressLine}>
                      {getValues().address}
                    </Text>
                    <Text style={styles.addressLine}>
                      {getValues().city}, {getValues().postalCode}
                    </Text>
                    <Text style={styles.addressLine}>
                      {getValues().country}
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={styles.breakdownContainer}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Subtotal</Text>
                <Text style={styles.breakdownValue}>
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Shipping</Text>
                <Text style={[styles.breakdownValue, styles.freeShipping]}>
                  Free Shipping
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Tax</Text>
                <Text style={styles.breakdownValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.breakdownRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={step === 1 ? handleSubmit(onStep1Submit) : onPlaceOrder}
        >
          <Text style={styles.continueButtonText}>
            {step === 1 ? "Continue to Payment" : "Place Order"}
          </Text>
        </TouchableOpacity>

        {step === 2 && (
          <TouchableOpacity
            style={{ marginTop: 15, alignItems: "center" }}
            onPress={() => setStep(1)}
          >
            <Text style={{ color: colors.subText }}>
              Go Back to Edit Address
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
