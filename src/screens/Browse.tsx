import React, { useEffect } from 'react';
import { FlatList, Platform, ScrollView, View } from 'react-native';
import { Layout, Text, Radio, Input, IconElement, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BrowseScreen = () => {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('');

  const SearchIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='search-outline'
    />
  );

  const baseColors = [
    "#FEFDE9", "#FEFBD3", "#FDF9BD", "#FBF5AB", "#FAF190"
  ];

  const colors = Array.from({ length: 100 }, (_, index) => baseColors[index % baseColors.length]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ alignItems: 'center', marginRight: 20 }}>
      <View style={[styles.itemStyle, { backgroundColor: item }]} />
      <Text category='s2'>Category</Text>
    </View>

  );

  return (
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
            data={colors}
            renderItem={renderItem}
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
    marginBottom: 6
  },
  flatListContainer: {
    width: '100%',
    marginTop: Platform.OS !== 'web' ? 20 : 0,
  },
  inputWrapper: { 
    marginTop: Platform.OS !== 'web' ? 50 : 0 
  }
});

export default BrowseScreen;
