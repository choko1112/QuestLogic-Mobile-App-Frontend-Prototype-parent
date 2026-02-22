import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
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
 * - 吹き出し本体: 白背景・2px 黒枠線・borderRadius: 8
 * - Neo-Brutalism 影: onLayout でバブルの実寸を取得し、
 *   同サイズの黒 View を (SHADOW_X, SHADOW_Y) ずらして配置
 * - テイル（左下の三角）: View の border トリックで作成し
 *   バブルの真下・左端に絶対配置
 *   - 外側（黒）: borderTopWidth + borderRightColor:transparent → 右下向き右三角形
 *   - 内側（白）: 一回り小さく重ねて「枠線」のように見せる
 * - 背景画像は一切使用しない
 */
const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isTyping }) => {
  const [bubbleSize, setBubbleSize] = useState({ width: 0, height: 0 });

  return (
    <View style={styles.container}>
      {/* 送信者ラベル */}
      <Text style={styles.senderName}>AIアシスタント</Text>

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
              },
            ]}
          />
        )}

        {/* ── バブル本体 ── */}
        <View
          style={[styles.bubble, isTyping && styles.bubbleTyping]}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            if (width !== bubbleSize.width || height !== bubbleSize.height) {
              setBubbleSize({ width, height });
            }
          }}
        >
          {isTyping ? (
            <Text style={styles.typingDots}>•  •  •</Text>
          ) : (
            <Text style={styles.bubbleText}>
              {insertNewlinesAfterPunctuation(text)}
            </Text>
          )}
        </View>

        {/*
         * ── テイル（左下の三角形）──
         *
         * View は 0×0。border トリックで三角形を描く:
         *   borderTopWidth: TAIL_H    → 上方向に TAIL_H px 伸びる (バブル底辺に接する)
         *   borderTopColor: blackberry → 黒で塗りつぶし
         *   borderRightWidth: TAIL_W  → 右側を幅 TAIL_W px 確保
         *   borderRightColor: transparent → 右側は透明 → 左下に向かう右三角形になる
         *
         * top = bubbleSize.height + TAIL_H:
         *   この位置から borderTopWidth が「上」へ伸びるため
         *   バブル底辺 〜 バブル底辺 + TAIL_H の空間を埋める
         */}
        {bubbleSize.height > 0 && (
          <>
            {/* 外側テイル（黒・枠線分） */}
            <View
              pointerEvents="none"
              style={[styles.tailOuter, { top: bubbleSize.height + TAIL_H }]}
            />
            {/* 内側テイル（白・塗りつぶし）→ 枠線のように見える */}
            <View
              pointerEvents="none"
              style={[styles.tailInner, { top: bubbleSize.height + TAIL_H - 3 }]}
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
    color: Colors.blackberry,
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
    backgroundColor: Colors.blackberry,
    borderRadius: 8,
  },
  bubble: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    // 左下角をやや鋭く → テイルとの接続を自然に見せる
    borderBottomLeftRadius: 2,
    padding: 12,
  },
  bubbleTyping: {
    // タイピング中は内容が少ないのでパディングを控えめに
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.blackberry,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  typingDots: {
    fontSize: 16,
    color: Colors.blackberry,
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
    borderTopColor: Colors.blackberry,
    borderRightWidth: TAIL_W,
    borderRightColor: 'transparent',
  },
  tailInner: {
    position: 'absolute',
    left: 6,
    width: 0,
    height: 0,
    borderTopWidth: TAIL_H - 3,
    borderTopColor: Colors.white,
    borderRightWidth: TAIL_W - 4,
    borderRightColor: 'transparent',
  },
});

export default ChatBubble;
