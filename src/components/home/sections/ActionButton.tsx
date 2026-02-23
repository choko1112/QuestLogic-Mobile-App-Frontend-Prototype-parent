import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/AppContext';

interface ActionButtonProps {
  label: string;
  /**
   * ボタン左に表示するアイコン画像。
   * 絵文字を避け、必ず ImageSourcePropType を渡すこと。
   */
  iconSource: ImageSourcePropType;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * スマホ・ゲーム管理セクションのアクションボタン。
 * Figma 準拠: 外側ピンクボーダー + 内側ダークボーダー。
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  iconSource,
  onPress,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.outerBorder, disabled && styles.disabled]}
    >
      <View style={[styles.innerBorder, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Image
          source={iconSource}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerBorder: {
    borderWidth: 1,
    borderColor: Colors.gojiBerry,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  innerBorder: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 16,
    letterSpacing: 0.32,
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default ActionButton;
