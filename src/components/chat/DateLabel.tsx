import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface DateLabelProps {
  /** "今日" | "昨日" | "YYYY/MM/DD" */
  label: string;
}

/**
 * チャット画面の日付区切りラベル。
 * Figma デザイン: 画面中央、白背景の角丸ピル型、2px 黒枠線。
 */
const DateLabel: React.FC<DateLabelProps> = ({ label }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.pill}>
        <Text style={styles.text}>{label}</Text>
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
    borderColor: Colors.blackberry,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 12,
    color: Colors.blackberry,
    letterSpacing: 0.36,
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default DateLabel;
