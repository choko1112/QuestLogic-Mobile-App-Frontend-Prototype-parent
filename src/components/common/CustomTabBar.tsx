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
      {/* ハードシャドウ */}
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
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    paddingHorizontal: 15,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  shadow: {
    position: 'absolute',
    top: 8 + 8,   // paddingTop + shadowOffsetY
    left: 15 + 6, // paddingHorizontal + shadowOffsetX
    right: 15 - 6,
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
