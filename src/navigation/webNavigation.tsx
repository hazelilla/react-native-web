import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Text, Input } from '@ui-kitten/components';
import BrowseScreen from '../screens/Browse';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';
import { useMediaQuery } from 'react-responsive';

const SearchIcon = (props: any) => (
    <Icon {...props} name='search-outline' />
);

const WebNavigation: React.FC = () => {
    const location = useLocation();
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1397 });
    const isSmallerTablet = useMediaQuery({ minWidth: 768, maxWidth: 1180 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isSearch, setIsSearch] = useState(false);

    const currentRoute = location.pathname;

    const handleNavigation = (route: string) => {
        navigate(route);
    };

    const NavIcon = ({ isMobile, iconName, text }: { isMobile: boolean, iconName: string, text: string }) => (
        isMobile ? <Icon name={iconName} width={24} height={24} fill='black' /> : <Text style={{ color: 'black' }}>{text}</Text>
    );

    const handleBlur = () => {
        setIsSearch(false);
        setValue('');
    };

    return (
        <View style={styles.webContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={[styles.navbar, { width: isTablet || isMobile ? 'auto' : '75%' }]}>
                    {!isSearch && <Text style={[styles.header, { fontSize: isMobile ? 20 : 30 }]}>E-market</Text>}
                    <Button
                        style={[
                            {
                                ...styles.navButton,
                                width: isMobile ? 15 : isSmallerTablet ? 70 : isTablet ? 150 : 200,
                                height: isMobile ? 15 : 0,
                            },
                            currentRoute === '/' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/')}>
                        <NavIcon isMobile={isMobile} iconName='heart-outline' text='Home' />
                    </Button>
                    <Button
                        style={[
                            {
                                ...styles.navButton,
                                width: isMobile ? 10 : isSmallerTablet ? 70 : isTablet ? 150 : 200,
                                height: isMobile ? 15 : 0,
                            },
                            currentRoute === '/browse' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/browse')}>
                        <NavIcon isMobile={isMobile} iconName='grid-outline' text='Browse' />
                    </Button>
                    <Button
                        style={[
                            {
                                ...styles.navButton,
                                width: isMobile ? 10 : isSmallerTablet ? 70 : isTablet ? 150 : 200,
                                height: isMobile ? 15 : 0,
                            },
                            currentRoute === '/cart' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/cart')}>
                        <NavIcon isMobile={isMobile} iconName='shopping-cart-outline' text='Cart' />
                    </Button>
                    <Button
                        style={[
                            {
                                ...styles.navButton,
                                width: isMobile ? 10 : isSmallerTablet ? 70 : isTablet ? 150 : 200,
                                height: isMobile ? 15 : 0,
                            },
                            currentRoute === '/profile' && styles.activeNavButton
                        ]}
                        onPress={() => handleNavigation('/profile')}>
                        <NavIcon isMobile={isMobile} iconName='person-outline' text='Profile' />
                    </Button>
                </View>
                {currentRoute === '/browse' &&
                    <>
                        {(isMobile && !isSearch) &&
                            <Button
                                style={[
                                    {
                                        ...styles.navButton,
                                        width: 15,
                                        height: 15
                                    },
                                    styles.activeNavButton
                                ]}
                                onPress={() => setIsSearch(true)}>
                                <NavIcon isMobile={isMobile} iconName='search-outline' text='search' />
                            </Button>}
                        {!isMobile &&
                            <Input
                                placeholder='Search for your grocery...'
                                value={value}
                                onChangeText={nextValue => setValue(nextValue)}
                                style={{
                                    borderRadius: 80, borderWidth: 2, marginRight: 25,
                                    width: isSmallerTablet ? '32%' : isTablet ? '25%' : '22%'
                                }}
                                placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
                                accessoryLeft={SearchIcon}
                                onBlur={handleBlur}
                            />
                        }
                        {(isMobile && isSearch) &&
                            <Input
                                placeholder='ex. Chocolate Milk..'
                                value={value}
                                onChangeText={nextValue => setValue(nextValue)}
                                style={{
                                    borderRadius: 80, borderWidth: 2, marginRight: 25,
                                    width: '42%'
                                }}
                                placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
                                accessoryLeft={SearchIcon}
                                onBlur={handleBlur}
                            />
                        }
                    </>
                }
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
        fontFamily: 'arial',
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginRight: 20
    },
    navbar: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FAF190',
        borderTopRightRadius: 80,
        borderBottomRightRadius: 80,

    },
    navButton: {
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
