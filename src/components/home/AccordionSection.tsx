import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

// Android で LayoutAnimation を有効化
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

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
 */
const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

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
        style={styles.innerBorder}
      >
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={isOpen ? 'remove' : 'add'}
          size={24}
          color={Colors.blackberry}
        />
      </TouchableOpacity>

      {/* コンテンツエリア: 開いているときだけ表示 */}
      {isOpen && <View style={styles.content}>{children}</View>}
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
    borderColor: Colors.blackberry,
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    color: Colors.blackberry,
    letterSpacing: 0.4,
    fontWeight: '400',
    flexShrink: 1,
    marginRight: 8,
  },
  content: {
    backgroundColor: Colors.white,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.blackberry,
  },
});

export default AccordionSection;
