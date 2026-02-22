import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../../../theme/colors';

interface ConfirmModalProps {
  visible: boolean;
  /** モーダルタイトル */
  title: string;
  /** 説明文 */
  message: string;
  /**
   * 顔アイコン画像。絵文字は使用しない。
   * 例: require('../../../../asset/home/images/smiley-x-eyes.png')
   */
  iconSource: ImageSourcePropType;
  /** 実行ボタンのラベル */
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 強制ロック / 強制解除 確認モーダル。
 * Neo-Brutalism スタイル: 白カード + 2px ダークボーダー + ハードシャドウ。
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  iconSource,
  confirmLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* 半透明オーバーレイ（タップで閉じる） */}
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* モーダルカード (ハードシャドウ付き) */}
      <View style={styles.centeredView} pointerEvents="box-none">
        {/* wrapper → shadow + card の重ね構造でハードシャドウを実現 */}
        <View style={styles.cardWrapper}>
          <View style={styles.shadowLayer} />
          <View style={styles.card}>
          {/* アイコン画像 */}
          <Image
            source={iconSource}
            style={styles.iconImage}
            resizeMode="contain"
          />

          {/* タイトル */}
          <Text style={styles.title}>{title}</Text>

          {/* メッセージ */}
          <Text style={styles.message}>{message}</Text>

          {/* ボタン行 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelLabel}>キャンセル</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmLabel}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 34, 0.5)',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  /**
   * Neo-Brutalism ハードシャドウ:
   * カードと同サイズの黒矩形を右 6px / 下 8px ずらして配置。
   * React Native は CSS calc() 非対応なため
   * wrapper → shadow → card の重ね方式で実現。
   */
  shadowLayer: {
    position: 'absolute',
    top: 8,
    left: 6,
    right: -6,
    bottom: -8,
    backgroundColor: Colors.blackberry,
    borderRadius: 8,
  },
  cardWrapper: {
    width: '100%',
    paddingRight: 6,
    paddingBottom: 8,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  iconImage: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.blackberry,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  message: {
    fontSize: 16,
    color: Colors.blackberry,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.32,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.white,
  },
  cancelLabel: {
    fontSize: 16,
    color: Colors.blackberry,
    fontWeight: '400',
  },
  confirmButton: {
    backgroundColor: Colors.blackberry,
  },
  confirmLabel: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '700',
  },
});

export default ConfirmModal;
