import React, { useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Platform, View } from 'react-native';
import { BottomNavigation, BottomNavigationTab, IconElement, Icon, Button, Text } from '@ui-kitten/components';
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
const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const tabBarHeight = Platform.OS === 'android' ? 60 : 70;

const HomeIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='home-outline'
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

const navigate = (routeName: any) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(routeName);
    }
};

export const WebNavigation: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState('Home');

    return (
        <NavigationContainer 
            ref={navigationRef}
            onStateChange={() => {
                const route = navigationRef.getCurrentRoute();
                if (route) {
                    setCurrentRoute(route.name);
                }
            }}
            >
            <View style={styles.webContainer}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>E-market</Text>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === 'Home' && styles.activeNavButton
                        ]}
                        onPress={() => navigate('Home')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Home</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === 'Browse' && styles.activeNavButton
                        ]}
                        onPress={() => navigate('Browse')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Browse</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === 'Cart' && styles.activeNavButton
                        ]}
                        onPress={() => navigate('Cart')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Cart</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === 'Profile' && styles.activeNavButton
                        ]}
                        onPress={() => navigate('Profile')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Profile</Text>}
                    </Button>
                </View>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Browse" component={BrowseScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webContainer: {
        flex: 1,
    },
    header: {
        fontSize: 30,
        fontFamily: 'arial',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginRight: 20
    },
    tabBarOptions: {
        flexDirection: 'row',
        height: tabBarHeight,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    tabBarItemText: {
        fontSize: 12.5,
        marginTop: 5,
    },
    navbar: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FAF190',
        width: '80%',
        borderTopRightRadius: 80,
        borderBottomRightRadius: 80
    },
    navButton: {
        width: 200,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    activeNavButton: {
        borderWidth: 2,
        borderColor: '#D4FEFC"',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default MobileNavigation;