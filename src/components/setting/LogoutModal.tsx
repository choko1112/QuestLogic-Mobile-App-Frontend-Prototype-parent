import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface LogoutModalProps {
  visible: boolean;
  onKeepLogin: () => void;
  onLogout: () => void;
}

/**
 * ログアウト確認モーダル。
 * Figma: 中央配置の白いカード、「ログインを維持 / ログアウトする」の2択ボタン。
 */
const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onKeepLogin,
  onLogout,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onKeepLogin}
    >
      {/* オーバーレイ */}
      <TouchableWithoutFeedback onPress={onKeepLogin}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={styles.card}>
          {/* タイトル */}
          <Text style={styles.title}>
            {'ログアウト画面に\n本当に戻りますか？'}
          </Text>

          {/* ボタン行 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onKeepLogin}
              style={[styles.button, styles.keepButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.keepLabel}>ログインを維持</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={onLogout}
              style={[styles.button, styles.logoutButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutLabel}>ログアウトする</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 34, 0.4)',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackberry,
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: Colors.blackberry,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepButton: {
    backgroundColor: Colors.white,
  },
  keepLabel: {
    fontSize: 14,
    color: Colors.blackberry,
  },
  divider: {
    width: 2,
    backgroundColor: Colors.blackberry,
  },
  logoutButton: {
    backgroundColor: Colors.white,
  },
  logoutLabel: {
    fontSize: 14,
    color: Colors.blackberry,
    fontWeight: '700',
  },
});

export default LogoutModal;
