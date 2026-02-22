import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';

interface HardShadowBoxProps {
  children: React.ReactNode;
  /** 右方向のオフセット (default: 6) */
  offsetX?: number;
  /** 下方向のオフセット (default: 8) */
  offsetY?: number;
  borderRadius?: number;
  /** 外側ラッパーに追加するスタイル */
  wrapperStyle?: ViewStyle;
  /** コンテンツ View に追加するスタイル */
  contentStyle?: ViewStyle;
}

/**
 * Neo-Brutalism スタイルのハードシャドウを再現するラッパーコンポーネント。
 *
 * 【影が縦に伸びる問題の修正方針】
 * `right: -offsetX / bottom: -offsetY` を使った絶対配置は、
 * 親コンテナが flex で引き伸ばされるとシャドウも一緒に伸びてしまう。
 * `onLayout` でコンテンツの実寸を取得し、
 * シャドウに明示的な `width / height` を指定することで正確に一致させる。
 */
const HardShadowBox: React.FC<HardShadowBoxProps> = ({
  children,
  offsetX = 6,
  offsetY = 8,
  borderRadius = 8,
  wrapperStyle,
  contentStyle,
}) => {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  return (
    <View
      style={[
        {
          // シャドウが見える余白をあらかじめ確保
          paddingRight: offsetX,
          paddingBottom: offsetY,
        },
        wrapperStyle,
      ]}
    >
      {/* シャドウ層: onLayout で取得した実寸に合わせて描画 */}
      {contentSize.width > 0 && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: offsetY,
            left: offsetX,
            width: contentSize.width,
            height: contentSize.height,
            backgroundColor: Colors.blackberry,
            borderRadius,
          }}
        />
      )}

      {/* コンテンツ層: レイアウト確定後にシャドウへサイズを伝える */}
      <View
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (
            width !== contentSize.width ||
            height !== contentSize.height
          ) {
            setContentSize({ width, height });
          }
        }}
        style={[{ borderRadius, overflow: 'hidden' }, contentStyle]}
      >
        {children}
      </View>
    </View>
  );
};

// StyleSheet は不要になったが将来拡張のため残す
const styles = StyleSheet.create({});  // eslint-disable-line @typescript-eslint/no-unused-vars

export default HardShadowBox;
