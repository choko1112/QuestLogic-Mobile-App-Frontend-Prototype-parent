import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { AppTheme } from '../../theme/theme';

interface NoteBoxProps {
  /** 説明文 */
  note: string;
  /** × ボタンで非表示にしたときのコールバック */
  onDismiss: () => void;
  theme: AppTheme;
}

/**
 * アコーディオン内に表示する注釈（説明文）ボックス。
 * Figma: 2px 枠線の矩形 + 右上に × ボタン。
 * × で閉じられる（親から visible を管理、アコーディオンを再開くと再表示）。
 */
const NoteBox: React.FC<NoteBoxProps> = ({ note, onDismiss, theme }) => {
  return (
    <View
      style={[
        styles.box,
        { borderColor: theme.border, backgroundColor: theme.surface },
      ]}
    >
      {/* 閉じるボタン */}
      <TouchableOpacity
        onPress={onDismiss}
        style={styles.closeButton}
        activeOpacity={0.7}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Text style={[styles.closeText, { color: theme.text }]}>×</Text>
      </TouchableOpacity>

      <Text style={[styles.noteText, { color: theme.text }]}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
    paddingTop: 16,
    marginVertical: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '400',
  },
  noteText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default NoteBox;
