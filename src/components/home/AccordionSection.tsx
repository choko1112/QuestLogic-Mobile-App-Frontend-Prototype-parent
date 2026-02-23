import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/AppContext';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

/**
 * Figma デザイン準拠のアコーディオンコンポーネント。
 * - 外側: 1px ピンク (#FC2865) ボーダー
 * - 内側: 2px ダーク (#000022) ボーダー
 * - 開閉時に + / − アイコンが切り替わる
 * - ダークモード対応: useTheme() でテーマカラーを取得
 */
const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const theme = useTheme();

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  };

  return (
    <View style={styles.outerBorder}>
      {/* ヘッダー: タイトル + アイコン */}
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        style={[styles.innerBorder, { backgroundColor: theme.surface, borderColor: theme.border }]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Ionicons
          name={isOpen ? 'remove' : 'add'}
          size={24}
          color={theme.text}
        />
      </TouchableOpacity>

      {/* コンテンツエリア: 開いているときだけ表示 */}
      {isOpen && (
        <View style={[styles.content, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerBorder: {
    borderWidth: 1,
    borderColor: Colors.gojiBerry,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  innerBorder: {
    borderWidth: 2,
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.4,
    fontWeight: '400',
    flexShrink: 1,
    marginRight: 8,
  },
  content: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
});

export default AccordionSection;
