import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/AppContext';
import { insertNewlinesAfterPunctuation } from '../../utils/textUtils';

// ─── 影・テイルの定数 ──────────────────────────────────────────────────────────
const SHADOW_X = 4; // 影の右オフセット (px)
const SHADOW_Y = 4; // 影の下オフセット (px)
const TAIL_H = 11;  // テイルの高さ (px)
const TAIL_W = 13;  // テイルの幅  (px)

interface ChatBubbleProps {
  text: string;
  /**
   * true: タイピング中 → 「・ ・ ・」を表示
   * false: 送信完了  → text を表示
   */
  isTyping: boolean;
}

/**
 * AIアシスタントのチャット吹き出しコンポーネント。
 *
 * 【実装方針】
 * - 吹き出し本体: theme.surface 背景・2px theme.border 枠線・borderRadius: 8
 * - Neo-Brutalism 影: onLayout でバブルの実寸を取得し、
 *   同サイズの theme.border 色 View を (SHADOW_X, SHADOW_Y) ずらして配置
 * - テイル（左下の三角）: View の border トリックで作成し
 *   バブルの真下・左端に絶対配置
 * - 背景画像は一切使用しない
 */
const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isTyping }) => {
  const [bubbleSize, setBubbleSize] = useState({ width: 0, height: 0 });
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* 送信者ラベル */}
      <Text style={[styles.senderName, { color: theme.text }]}>AIアシスタント</Text>

      {/*
       * outerWrapper:
       *   paddingRight  = SHADOW_X → 影が右に見える余白
       *   paddingBottom = SHADOW_Y + TAIL_H → 影とテイルが下に見える余白
       */}
      <View style={styles.outerWrapper}>

        {/* ── 影層 ── */}
        {bubbleSize.width > 0 && (
          <View
            pointerEvents="none"
            style={[
              styles.shadow,
              {
                top: SHADOW_Y,
                left: SHADOW_X,
                width: bubbleSize.width,
                height: bubbleSize.height,
                backgroundColor: theme.border,
              },
            ]}
          />
        )}

        {/* ── バブル本体 ── */}
        <View
          style={[
            styles.bubble,
            isTyping && styles.bubbleTyping,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            if (width !== bubbleSize.width || height !== bubbleSize.height) {
              setBubbleSize({ width, height });
            }
          }}
        >
          {isTyping ? (
            <Text style={[styles.typingDots, { color: theme.text }]}>•  •  •</Text>
          ) : (
            <Text style={[styles.bubbleText, { color: theme.text }]}>
              {insertNewlinesAfterPunctuation(text)}
            </Text>
          )}
        </View>

        {/*
         * ── テイル（左下の三角形）──
         *
         * 外側テイル（theme.border 色）と内側テイル（theme.surface 色）を重ねて
         * 枠線付き三角形のように見せる。
         */}
        {bubbleSize.height > 0 && (
          <>
            {/* 外側テイル（枠線色） */}
            <View
              pointerEvents="none"
              style={[
                styles.tailOuter,
                { top: bubbleSize.height + TAIL_H, borderTopColor: theme.border },
              ]}
            />
            {/* 内側テイル（バブル背景色）→ 枠線のように見える */}
            <View
              pointerEvents="none"
              style={[
                styles.tailInner,
                { top: bubbleSize.height + TAIL_H - 3, borderTopColor: theme.surface },
              ]}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '85%',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.24,
    marginBottom: 4,
    marginLeft: 2,
  },
  outerWrapper: {
    paddingRight: SHADOW_X,
    paddingBottom: SHADOW_Y + TAIL_H,
  },
  shadow: {
    position: 'absolute',
    borderRadius: 8,
  },
  bubble: {
    borderWidth: 2,
    borderRadius: 8,
    borderBottomLeftRadius: 2,
    padding: 12,
  },
  bubbleTyping: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  typingDots: {
    fontSize: 16,
    letterSpacing: 5,
    lineHeight: 22,
  },

  // ── テイル ──────────────────────────────────────────────────────────────────
  tailOuter: {
    position: 'absolute',
    left: 4,
    width: 0,
    height: 0,
    borderTopWidth: TAIL_H,
    borderRightWidth: TAIL_W,
    borderRightColor: 'transparent',
  },
  tailInner: {
    position: 'absolute',
    left: 6,
    width: 0,
    height: 0,
    borderTopWidth: TAIL_H - 3,
    borderRightWidth: TAIL_W - 4,
    borderRightColor: 'transparent',
  },
});

export default ChatBubble;
