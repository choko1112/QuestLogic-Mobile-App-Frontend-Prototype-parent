import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import HardShadowBox from '../../common/HardShadowBox';
import { Colors } from '../../../theme/colors';

interface NotificationCardProps {
  /** カード左に表示するアイコン画像。Figma エクスポートの PNG を require() で渡す */
  iconSource: ImageSourcePropType;
  label: string;
  remainingMinutes: number;
}

/** ゲーム/スマホ残り時間を表示する通知カード */
const NotificationCard: React.FC<NotificationCardProps> = ({
  iconSource,
  label,
  remainingMinutes,
}) => {
  return (
    <HardShadowBox offsetX={6} offsetY={8} borderRadius={8}>
      <View style={styles.card}>
        {/* アイコン (Image コンポーネントで表示 / 絵文字不使用) */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBorder}>
            <Image
              source={iconSource}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* メッセージエリア */}
        <View style={styles.messageArea}>
          <View style={styles.topRow}>
            <Text style={styles.label} numberOfLines={1}>{label}</Text>
            <Text style={styles.dateLabel}>本日</Text>
          </View>
          <Text style={styles.timeText}>残り{remainingMinutes}分</Text>
        </View>
      </View>
    </HardShadowBox>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    height: 80,
    overflow: 'hidden',
  },
  iconContainer: {
    borderRightWidth: 2,
    borderRightColor: Colors.blackberry,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconBorder: {
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  messageArea: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: Colors.blackberry,
    letterSpacing: 0.32,
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: Colors.blackberry,
    letterSpacing: 0.36,
    marginLeft: 4,
  },
  timeText: {
    fontSize: 28,
    color: Colors.textDark,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default NotificationCard;
