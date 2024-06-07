import React, { useState, useRef } from 'react';
import { FlatList, Keyboard, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Layout, Text, Radio, Input, Icon, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { categories, subCategories, categoryIcons } from '../utils/constants';


const BrowseScreen = () => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const categoryFlatListRef = useRef<FlatList>(null);
  const subCategoryFlatListRef = useRef<FlatList>(null);

  const SearchIcon = (props: any) => (
    <Icon
      {...props}
      name='search-outline'
    />
  );

  const renderCategories = ({ item, index }: { item: any, index: number }) => {
    const isSelected = selectedCategory === item;
    const CategoryIcon = categoryIcons[item];

    return (
      <TouchableOpacity
        style={{ alignItems: 'center', marginRight: 20 }}
        onPress={() => {
          setSelectedCategory(item);
          setSelectedSubCategory(null);
          categoryFlatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
        }}
      >
        <View style={[
          styles.itemStyle,
          { borderColor: isSelected ? "#FAF190" : "#FEFBD3" }
        ]}>
          {Platform.OS !== 'web' && CategoryIcon}
        </View>
        <Text category='s2' style={{color: isSelected ? 'black' : '#CCCCCC' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderSubCategories = ({ item, index }: { item: any, index: number }) => {
    const isSelected = selectedSubCategory === item;
    return (
      <TouchableOpacity style={[
        styles.subCategory,
        { borderColor: isSelected ? "#FAF190" : "#FEFBD3" }
      ]}
        onPress={() => {
          setSelectedSubCategory(item);
          subCategoryFlatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
        }}>
        <Text category='s2' style={{color: isSelected ? 'black' : '#CCCCCC' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const filteredSubCategories = selectedCategory && selectedCategory !== 'All' ? subCategories[selectedCategory] : [];

  const scrollToStart = () => {
    categoryFlatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const scrollToEnd = () => {
    categoryFlatListRef.current?.scrollToOffset({ offset: categoryListWidth, animated: true });
  };

  let categoryListWidth = 0;

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
            {Platform.OS === 'web' && (
              <Button
                appearance="ghost"
                status="basic"
                style={{width: 20}}
                accessoryLeft={(props) => <Icon {...props} name='arrow-back-outline' />}
                onPress={scrollToStart}
              />
            )}
            <FlatList
              ref={categoryFlatListRef}
              data={Object.values(categories)}
              renderItem={renderCategories}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={{ paddingRight: 20 }}
              showsHorizontalScrollIndicator={false}
              onLayout={(event) => {
                categoryListWidth = event.nativeEvent.layout.width;
              }}
            />
            {Platform.OS === 'web' && (
              <Button
                appearance="ghost"
                status="basic"
                style={{width: 20}}
                accessoryLeft={(props) => <Icon {...props} name='arrow-forward-outline' />}
                onPress={scrollToEnd}
              />
            )}
          </View>
          {selectedCategory && selectedCategory !== 'All' && (
            <View style={styles.subCatContainer}>
              <FlatList
                ref={subCategoryFlatListRef}
                data={filteredSubCategories}
                renderItem={renderSubCategories}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={{ marginBottom: 40 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
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
    backgroundColor: '#FEFDE9',
    borderRadius: 100,
    width: 80,
    height: 80,
    borderWidth: 4,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS !== 'web' ? 20 : 0,
  },
  subCatContainer: {
    width: '100%',
    marginTop: 15,
    marginLeft: 5
  },
  inputWrapper: {
    marginTop: Platform.OS !== 'web' ? 50 : 0
  },
  subCategory: {
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 3,
    borderRadius: 80,
    paddingHorizontal: 15,
    paddingVertical: 5
  }
});

export default BrowseScreen;
