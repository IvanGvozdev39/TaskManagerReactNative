import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import colors from '../constants/Colors';
import strings from '../constants/Strings';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / strings.tabs.length;

interface TabMenuProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ selectedTab, onTabPress }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: string, index: number) => {
    onTabPress(tab);
    Animated.spring(translateX, {
      toValue: index * (TAB_WIDTH - 10),
      useNativeDriver: true,
    }).start();
  };

  const activeIndex = strings.tabs.indexOf(selectedTab);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * (TAB_WIDTH - 10),
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Animated.View
          style={[
            styles.activeTab,
            {
              width: TAB_WIDTH - 30,
              transform: [{ translateX }],
            },
          ]}
        />
        {strings.tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => handleTabPress(tab, index)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    backgroundColor: colors.tabBackground,
    borderRadius: 10,
    position: 'relative',
  },
  activeTab: {
    position: 'absolute',
    height: 35,
    backgroundColor: colors.activeTabBackground,
    borderRadius: 10,
    top: 2.5,
    left: 5
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TabMenu;
