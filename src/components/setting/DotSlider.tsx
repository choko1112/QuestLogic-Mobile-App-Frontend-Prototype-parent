import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AppTheme } from '../../theme/theme';

interface DotSliderProps {
  value: number;       // 現在の値 (1-based)
  max: number;         // 最大値
  onChange: (v: number) => void;
  theme: AppTheme;
}

/**
 * 段階選択ドットスライダー。
 * Figma: ⊖  ● ○ ○ ○ ○  ⊕
 * - ⊖ / ⊕ でステップ増減
 * - ドットをタップしても直接選択可能
 */
const DotSlider: React.FC<DotSliderProps> = ({ value, max, onChange, theme }) => {
  const decrement = () => onChange(Math.max(1, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.row}>
      {/* マイナスボタン */}
      <TouchableOpacity onPress={decrement} disabled={value <= 1} activeOpacity={0.7}>
        <Ionicons
          name="remove-circle-outline"
          size={28}
          color={value <= 1 ? '#AAAAAA' : theme.text}
        />
      </TouchableOpacity>

      {/* ドット群 */}
      <View style={styles.dotsRow}>
        {Array.from({ length: max }).map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onChange(i + 1)}
            activeOpacity={0.7}
            style={styles.dotHit}
          >
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: i < value ? theme.text : 'transparent',
                  borderColor: theme.text,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* プラスボタン */}
      <TouchableOpacity onPress={increment} disabled={value >= max} activeOpacity={0.7}>
        <Ionicons
          name="add-circle-outline"
          size={28}
          color={value >= max ? '#AAAAAA' : theme.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotHit: {
    padding: 4, // タップ領域を広げる
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
});

export default DotSlider;
