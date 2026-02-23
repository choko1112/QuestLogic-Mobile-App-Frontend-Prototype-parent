import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme/theme';

interface NgToggleRowProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  theme: AppTheme;
}

/**
 * NG行為設定の各トグル行。
 * Figma: ラベル + 丸いトグルボタン（ON=赤塗り, OFF=空白円）
 */
const NgToggleRow: React.FC<NgToggleRowProps> = ({
  label,
  value,
  onChange,
  theme,
}) => {
  return (
    <View
      style={[styles.row, { borderBottomColor: theme.separator }]}
    >
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      {/* サークルトグル: ON=赤塗り, OFF=枠のみ */}
      <TouchableOpacity
        onPress={() => onChange(!value)}
        activeOpacity={0.7}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <View
          style={[
            styles.circle,
            { borderColor: value ? '#FC2865' : theme.border },
            value && styles.circleOn,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    flex: 1,
    paddingRight: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  circleOn: {
    backgroundColor: '#FC2865',
  },
});

export default NgToggleRow;
