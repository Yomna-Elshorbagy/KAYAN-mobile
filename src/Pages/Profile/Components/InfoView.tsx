import React from "react";
import { View, TouchableOpacity, Text, Switch } from "react-native";
import {
  User as UserIcon,
  Mail,
  Phone,
  Edit3,
  ChevronRight,
  Moon,
  LogOut,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";

interface InfoViewProps {
  profile: any;
  setActiveView: (view: any) => void;
  theme: string;
  toggleTheme: () => void;
  handleLogout: () => void;
  colors: ThemeColors;
}

const InfoView: React.FC<InfoViewProps> = ({
  profile,
  setActiveView,
  theme,
  toggleTheme,
  handleLogout,
  colors,
}) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.infoCard}>
        <View style={styles.infoIconWrapper}>
          <UserIcon size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.infoLabel}>{t("profile.name")}</Text>
          <Text style={styles.infoValue}>{profile?.userName}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIconWrapper}>
          <Mail size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.infoLabel}>{t("profile.email")}</Text>
          <Text style={styles.infoValue}>{profile?.email}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIconWrapper}>
          <Phone size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.infoLabel}>{t("profile.phone")}</Text>
          <Text style={styles.infoValue}>
            {profile?.mobileNumber || t("common.notAvailable")}
          </Text>
        </View>
      </View>

      <View style={styles.actionList}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => setActiveView("edit")}
        >
          <Edit3 size={20} color={colors.subText} />
          <Text style={styles.actionText}>{t("profile.editDetails")}</Text>
          <ChevronRight size={20} color={colors.sage[300]} />
        </TouchableOpacity>

        <View style={styles.actionItem}>
          <Moon size={20} color={colors.subText} />
          <Text style={styles.actionText}>{t("profile.darkMode")}</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.sage[200], true: colors.primary }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <LogOut size={20} color="#E63946" />
        <Text style={styles.logoutText}>{t("profile.logout")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InfoView;
