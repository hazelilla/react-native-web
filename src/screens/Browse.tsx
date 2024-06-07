import React, { useEffect } from 'react';
import { FlatList, Keyboard, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Layout, Text, Radio, Input, IconElement, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { categories } from '../utils/constants';
import { GroceriesSvg } from '../assets/svgs';


const BrowseScreen = () => {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('');

  const SearchIcon = (props: any) => (
    <Icon
      {...props}
      name='search-outline'
    />
  );

  const baseColors = [
    "#FEFDE9", "#FEFBD3", "#FDF9BD", "#FBF5AB", "#FAF190"
  ];


  const renderCategories = ({ item }: { item: any }) => (
    <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
      <View style={[styles.itemStyle]}>
        <GroceriesSvg width={40} height={40} />
      </View>
      <Text category='s2'>{item}</Text>
    </TouchableOpacity>
  );

  const renderSubCategories = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.subCategory}>
      <Text category='s2'>{item}</Text>
    </TouchableOpacity>
  );


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          {Platform.OS !== 'web' &&
            <View style={styles.inputWrapper}>
              <Input
                placeholder='Search for your grocery..'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
                style={{ borderRadius: 80, borderWidth: 2 }}
                placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
                accessoryLeft={SearchIcon}
              />
            </View>
          }
          <View style={styles.flatListContainer}>
            <FlatList
              data={Object.values(categories)}
              renderItem={renderCategories}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={{ marginBottom: 40 }}
            />
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={Object.values(categories)}
              renderItem={renderSubCategories}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={{ marginBottom: 40 }}
            />
          </View>

          <Layout style={{ marginVertical: 50, alignItems: 'center' }}>
            <Text category='h1' >Browse Screen</Text>
            <Text category='s1' >Explore what's new</Text>
            <Radio
              checked={checked}
              onChange={nextChecked => setChecked(nextChecked)}
              style={{ marginTop: 20 }}
            >
              {`Checked: ${checked}`}
            </Radio>
          </Layout>
        </ScrollView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  itemStyle: {
    borderRadius: 100,
    width: 80,
    height: 80,
    borderWidth: 4,
    borderColor: '#FAF190',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    width: '100%',
    marginTop: Platform.OS !== 'web' ? 20 : 0,
  },
  inputWrapper: {
    marginTop: Platform.OS !== 'web' ? 50 : 0
  },
  subCategory: {
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FAF190',
    borderRadius: 80,
    paddingHorizontal: 15,
    paddingVertical: 5
  }
});

export default BrowseScreen;
