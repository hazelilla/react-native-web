import React, { useEffect } from 'react';
import { FlatList, Platform, ScrollView, View } from 'react-native';
import { CircularProgressBar, Layout, Text, Button, Radio, CheckBox, CheckBoxProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import DateTimePicker from '../component/DateTimePicker';

const useCheckboxState = (initialCheck = false): CheckBoxProps => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
};

const HomeScreen = () => {
    const [checked, setChecked] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const primaryCheckboxState = useCheckboxState();
    const successCheckboxState = useCheckboxState();
    const infoCheckboxState = useCheckboxState();
    const warningCheckboxState = useCheckboxState();
    const dangerCheckboxState = useCheckboxState();
    const basicCheckboxState = useCheckboxState();
    const controlCheckboxState = useCheckboxState();

    useEffect(() => {
        setProgress(0);
    }, [])

    const increaseProgress = () => {
        setProgress(progress + 10);
    };

    const baseColors = [
        "#FEFDE9", "#FEFBD3", "#FDF9BD", "#FBF5AB", "#FAF190"
    ];

    const colors = Array.from({ length: 100 }, (_, index) => baseColors[index % baseColors.length]);

    const renderItem = ({ item }: { item: any }) => (
        <View style={{ borderRadius: 100, width: 80, height: 80, backgroundColor: item, marginRight: 25 }} />
    );

    return (
        <Layout style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={colors}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                    />
                </View>

                <Layout style={{ marginVertical: 50, alignItems: 'center' }}>

                    <Text category='h1' >Welcome to Home</Text>
                    <Text category='s1' >Explore what's new</Text>

                    <Button
                        style={styles.button}
                        appearance='filled'
                    >
                        FILLED
                    </Button>

                    <Button
                        style={styles.button}
                        appearance='outline'
                    >
                        OUTLINE
                    </Button>

                    <Button
                        style={styles.button}
                        appearance='ghost'
                    >
                        GHOST
                    </Button>

                    <Button
                        style={{ backgroundColor: 'black' }}
                        appearance='filled'
                    >
                        COLORED
                    </Button>

                    <Radio
                        checked={checked}
                        onChange={nextChecked => setChecked(nextChecked)}
                        style={{ marginTop: 20 }}
                    >
                        {`Checked: ${checked}`}
                    </Radio>

                    <CircularProgressBar progress={progress} style={{ marginVertical: 20 }} />

                    <Button onPress={increaseProgress} style={{ marginBottom: 30 }}>Increase Progress</Button>

                    <Layout level='3' style={{ padding: 10 }}>
                        <CheckBox
                            style={styles.checkbox}
                            status='primary'
                            {...primaryCheckboxState}
                        >
                            Primary
                        </CheckBox>

                        <CheckBox
                            style={styles.checkbox}
                            status='success'
                            {...successCheckboxState}
                        >
                            Success
                        </CheckBox>

                        <CheckBox
                            style={styles.checkbox}
                            status='info'
                            {...infoCheckboxState}
                        >
                            Info
                        </CheckBox>

                        <CheckBox
                            style={styles.checkbox}
                            status='warning'
                            {...warningCheckboxState}
                        >
                            Warning
                        </CheckBox>

                        <CheckBox
                            style={styles.checkbox}
                            status='danger'
                            {...dangerCheckboxState}
                        >
                            Danger
                        </CheckBox>

                        <CheckBox
                            style={styles.checkbox}
                            status='basic'
                            {...basicCheckboxState}
                        >
                            Basic
                        </CheckBox>

                        <View style={styles.controlContainer}>
                            <CheckBox
                                style={styles.checkbox}
                                status='control'
                                {...controlCheckboxState}
                            >
                                Control
                            </CheckBox>
                        </View>
                    </Layout>
                    <DateTimePicker />
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
    button: {
        margin: 2,
        marginTop: 15
    },
    checkbox: {
        margin: 2,
    },
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    },
    flatListContainer: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS !== 'web' ? 50 : 0
    },
});

export default HomeScreen;
