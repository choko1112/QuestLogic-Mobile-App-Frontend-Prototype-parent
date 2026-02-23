import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/AppContext';

interface DateLabelProps {
  /** "今日" | "昨日" | "YYYY/MM/DD" */
  label: string;
}

/**
 * チャット画面の日付区切りラベル。
 * Figma デザイン: 画面中央、白背景の角丸ピル型、2px 黒枠線。
 * ダークモード時は背景・枠線・文字色がテーマに連動。
 */
const DateLabel: React.FC<DateLabelProps> = ({ label }) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.text, { color: theme.text }]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  pill: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.36,
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default DateLabel;
