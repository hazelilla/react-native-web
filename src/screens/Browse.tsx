import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  View
} from 'react-native';
import { Layout, Text, Input, Icon, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { categories, subCategories, categoryIcons, categoryImages } from '../utils/constants';
import ProductCard from '../component/ProductCard';

const BrowseScreen = () => {
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [categoryListWidth, setCategoryListWidth] = useState(0);
  const categoryFlatListRef = useRef<FlatList>(null);
  const subCategoryFlatListRef = useRef<FlatList>(null);
  const numColumns = Math.floor(Dimensions.get('window').width / 170);

  useEffect(() => {
    setSelectedCategory("All");
  }, []);
  const SearchIcon = (props: any) => (
    <Icon
      {...props}
      name='search-outline'
    />
  );

  const renderProduct = ({ item, index }: { item: any; index: number }) => (
    <ProductCard index={index} numColumns={numColumns} category={selectedCategory || 'All'} image={item} />
  );

  const getAllCategoryImages = () => {
    return Object.values(categoryImages).flat();
  };

  const selectedImages = selectedCategory === 'All' ? getAllCategoryImages() : categoryImages[selectedCategory] || [];


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
          { CategoryIcon}
        </View>
        <Text category='s2' style={{ color: isSelected ? 'black' : '#CCCCCC' }}>{item}</Text>
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
        <Text category='s2' style={{ color: isSelected ? 'black' : '#CCCCCC' }}>{item}</Text>
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
  return (

    <Layout style={styles.container}>
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
            style={{ width: 20 }}
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
            setCategoryListWidth(event.nativeEvent.layout.width);
          }}
        />
        {Platform.OS === 'web' && (
          <Button
            appearance="ghost"
            status="basic"
            style={{ width: 20 }}
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
      <Layout style={{ alignItems: 'center', flex: 1 }}>
        {selectedImages.length === 0 ?
          <View style={{ flex: 1, marginTop: 50}}>
            <Text category='h3' style={{color: '#CCCCCC', textAlign: 'center'}}>Sorry there is no product to show in this category</Text>
          </View>
          :
          <FlatList
            data={selectedImages}
            renderItem={renderProduct}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={styles.productsContainer}
          />
        }
      </Layout>
    </Layout>

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
  },
  productsContainer: {
    paddingHorizontal: 5,
  },
});

export default BrowseScreen;
