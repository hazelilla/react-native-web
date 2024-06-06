import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Text, Input } from '@ui-kitten/components';
import BrowseScreen from '../screens/Browse';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';

const SearchIcon = (props: any) => (
    <Icon {...props} name='search-outline' />
);

const WebNavigation: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState('/');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (route: string) => {
        setCurrentRoute(route);
        navigate(route);
    };

    return (
        <View style={styles.webContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.navbar}>
                    <Text style={styles.header}>E-market</Text>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === '/' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Home</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === '/browse' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/browse')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Browse</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === '/cart' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/cart')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Cart</Text>}
                    </Button>
                    <Button
                        style={[
                            styles.navButton,
                            currentRoute === '/profile' && styles.activeNavButton
                        ]}
                        onPress={() => navigate('/profile')}>
                        {evaProps => <Text {...evaProps} style={{ color: 'black' }}>Profile</Text>}
                    </Button>
                </View>
                {currentRoute === '/browse' &&
                    <Input
                        placeholder='Search for your grocery...'
                        value={value}
                        onChangeText={nextValue => setValue(nextValue)}
                        style={{ borderRadius: 80, borderWidth: 2, marginRight: 20, width: '18%' }}
                        placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
                        accessoryLeft={SearchIcon}
                    />}
            </View>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/browse" element={<BrowseScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderColor: 'rgba(128, 128, 128, 0.16)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default WebNavigation;
