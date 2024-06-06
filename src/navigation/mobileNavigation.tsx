import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Platform, View } from 'react-native';
import { BottomNavigation, BottomNavigationTab, IconElement, Icon } from '@ui-kitten/components';
import BrowseScreen from '../screens/Browse';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';

export type RootStackParamList = {
    Home: undefined;
    Browse: undefined;
    Cart: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator();

const tabBarHeight = Platform.OS === 'android' ? 60 : 70;

const HomeIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='heart-outline'
    />
);

const SearchIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='search-outline'
    />
);

const CartIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='shopping-cart-outline'
    />
);

const ProfileIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='person-outline'
    />
);


const TabBarNavigation: React.FC = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <Tab.Navigator
                tabBar={props => <BottomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    unmountOnBlur: true,
                }}
                initialRouteName={'Home'}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Browse" component={BrowseScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(state.index);

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => {
                setSelectedIndex(index);
                navigation.navigate(state.routeNames[index]);
            }}
            style={{ paddingBottom: 20 }}
        >
            <BottomNavigationTab title="Home" icon={HomeIcon} />
            <BottomNavigationTab title="Browse" icon={SearchIcon} />
            <BottomNavigationTab title="Cart" icon={CartIcon} />
            <BottomNavigationTab title="Profile" icon={ProfileIcon} />
        </BottomNavigation>
    );
};

const MobileNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <TabBarNavigation />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MobileNavigation;