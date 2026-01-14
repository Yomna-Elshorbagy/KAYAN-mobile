import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";

interface HeaderProps {
  activeView: string;
  pickImage: () => void;
  selectedImage: any;
  profile: any;
  colors: ThemeColors;
}

const Header: React.FC<HeaderProps> = ({
  activeView,
  pickImage,
  selectedImage,
  profile,
  colors,
}) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  return (
    <View style={styles.headerBackground}>
      <TouchableOpacity
        style={styles.avatarWrapper}
        onPress={activeView === "edit" ? pickImage : undefined}
      >
        <Image
          source={{
            uri:
              selectedImage?.uri ||
              profile?.image?.secure_url ||
              "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />
        {activeView === "edit" && (
          <View style={styles.editAvatarOverlay}>
            <Camera size={24} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: 10, marginTop: 4 }}>
              {t("profile.changePhoto")}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
