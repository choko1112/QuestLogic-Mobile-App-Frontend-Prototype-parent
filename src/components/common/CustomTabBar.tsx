import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const ROUTE_ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  Home: {
    active: 'calendar',
    inactive: 'calendar-outline',
  },
  Chat: {
    active: 'arrow-undo',
    inactive: 'arrow-undo-outline',
  },
  Setting: {
    active: 'settings',
    inactive: 'settings-outline',
  },
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.outerWrapper,
        { paddingBottom: insets.bottom + 8 },
      ]}
    >
      {/*
       * tabBarWrapper に paddingRight:6 / paddingBottom:8 を持たせ、
       * shadow を absolute で (top:8, left:6, right:0, bottom:0) に配置する。
       * これにより shadow は tabBar の実寸と同じ高さ・幅になる。
       *   right:0  → tabBarWrapper 右端 = tabBar 右端 + 6px のちょうどその位置
       *   bottom:0 → tabBarWrapper 底端 = tabBar 底端 + 8px のちょうどその位置
       */}
      <View style={styles.tabBarWrapper}>
        <View style={styles.shadow} />

        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const icons = ROUTE_ICONS[route.name];
            const iconName: IconName = isFocused
              ? icons?.active ?? 'ellipse'
              : icons?.inactive ?? 'ellipse-outline';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
              >
                <Ionicons
                  name={iconName}
                  size={32}
                  color={Colors.blackberry}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    paddingHorizontal: 15,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  tabBarWrapper: {
    paddingRight: 6,
    paddingBottom: 8,
  },
  shadow: {
    position: 'absolute',
    top: 8,
    left: 6,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.blackberry,
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 24,
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
      },
      android: {
        elevation: 0,
      },
    }),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
