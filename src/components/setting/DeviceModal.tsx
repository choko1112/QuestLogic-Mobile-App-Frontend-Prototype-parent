import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import type { ConnectedDevice } from '../../types/setting';

interface DeviceModalProps {
  visible: boolean;
  devices: ConnectedDevice[];
  onClose: () => void;
}

/**
 * 連携デバイス一覧モーダル。
 * Figma: 半透明オーバーレイ上にデバイスリスト（アコーディオン展開）+ 決定ボタン。
 */
const DeviceModal: React.FC<DeviceModalProps> = ({
  visible,
  devices,
  onClose,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 半透明オーバーレイ（タップで閉じない → 決定ボタンで閉じる） */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView} pointerEvents="box-none">
        {/* デバイスリストカード */}
        <View style={styles.card}>
          {/* ヘッダー（アコーディオン） */}
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.cardHeader}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>アプリに連携されているデバイス機器</Text>
            <Ionicons
              name={expanded ? 'chevron-down' : 'chevron-forward'}
              size={18}
              color={Colors.blackberry}
            />
          </TouchableOpacity>

          {/* デバイスリスト（展開時） */}
          {expanded && (
            <View>
              {devices.map((device) => (
                <View key={device.id} style={styles.deviceRow}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                </View>
              ))}

              {/* + 機器の追加 */}
              <TouchableOpacity style={styles.addRow} activeOpacity={0.7}>
                <Ionicons name="add" size={18} color={Colors.blackberry} />
                <Text style={styles.addText}>機器の追加</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 決定ボタン */}
        <TouchableOpacity
          onPress={onClose}
          style={styles.okButton}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={Colors.blackberry} />
          <Text style={styles.okText}>決定</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardTitle: {
    fontSize: 14,
    color: Colors.blackberry,
    flex: 1,
  },
  deviceRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.blackberry,
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 14,
    color: Colors.blackberry,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.blackberry,
  },
  addText: {
    fontSize: 14,
    color: Colors.blackberry,
  },
  okButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 100,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 24,
  },
  okText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackberry,
  },
});

export default DeviceModal;
