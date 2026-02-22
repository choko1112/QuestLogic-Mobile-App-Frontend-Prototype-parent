import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

/**
 * Setting 画面 (プレースホルダー)
 * 今後設定 UI を実装する際にここを置き換える。
 */
const SettingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="settings-outline" size={48} color={Colors.blackberry} />
        <Text style={styles.title}>Setting</Text>
        <Text style={styles.subtitle}>設定画面は準備中です</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.blackberry,
    shadowOffset: { width: 6, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.blackberry,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.blackberry,
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default SettingScreen;
