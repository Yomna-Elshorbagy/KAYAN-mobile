import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";
import CustomInput from "../../../Shared/CustomInput";
import CustomButton from "../../../Shared/CustomButton";

interface EditViewProps {
  control: any;
  setActiveView: (view: any) => void;
  currentGender: string;
  setValue: any;
  handleSubmit: any;
  onUpdateProfile: (data: any) => void;
  isLoading: boolean;
  colors: ThemeColors;
}

const EditView: React.FC<EditViewProps> = ({
  control,
  setActiveView,
  currentGender,
  setValue,
  handleSubmit,
  onUpdateProfile,
  isLoading,
  colors,
}) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.editHeader}
        onPress={() => setActiveView("info")}
      >
        <ArrowLeft size={24} color={colors.text} />
        <Text style={styles.editTitle}>{t("profile.editDetails")}</Text>
      </TouchableOpacity>

      <CustomInput
        name="userName"
        control={control}
        placeholder={t("profile.namePlaceholder")}
        label={t("profile.nameLabel")}
      />
      <CustomInput
        name="mobileNumber"
        control={control}
        placeholder={t("profile.phonePlaceholder")}
        label={t("profile.phoneLabel")}
        keyboardType="phone-pad"
      />
      <CustomInput
        name="recoveryEmail"
        control={control}
        placeholder={t("profile.recoveryEmailPlaceholder")}
        label={t("profile.recoveryEmailLabel")}
        keyboardType="email-address"
      />

      <Text style={[styles.infoLabel, { marginBottom: 10 }]}>
        {t("profile.genderLabel")}
      </Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            currentGender === "male" && styles.activeGenderOption,
          ]}
          onPress={() => setValue("gender", "male")}
        >
          <Text
            style={[
              styles.genderText,
              currentGender === "male" && styles.activeGenderText,
            ]}
          >
            {t("profile.male")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            currentGender === "female" && styles.activeGenderOption,
          ]}
          onPress={() => setValue("gender", "female")}
        >
          <Text
            style={[
              styles.genderText,
              currentGender === "female" && styles.activeGenderText,
            ]}
          >
            {t("profile.female")}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.sage[100],
          paddingTop: 20,
        }}
      >
        <Text
          style={[
            styles.editTitle,
            { fontSize: 18, marginLeft: 0, marginBottom: 15 },
          ]}
        >
          {t("profile.newPassword")}
        </Text>
        <CustomInput
          name="newPassword"
          control={control}
          placeholder={t("profile.newPasswordPlaceholder")}
          label={t("profile.newPasswordLabel")}
          secureTextEntry
        />
        <CustomInput
          name="confirmPassword"
          control={control}
          placeholder={t("profile.confirmPasswordPlaceholder")}
          label={t("profile.confirmPasswordLabel")}
          secureTextEntry
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomButton
          title={t("common.saveChanges")}
          onPress={handleSubmit(onUpdateProfile)}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default EditView;
