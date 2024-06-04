import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { CircularProgressBar, Layout, Text, Button, Radio, CheckBox, CheckBoxProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import DateTimePicker from '../component/DateTimePicker';

const useCheckboxState = (initialCheck = false): CheckBoxProps => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
};

const Home = () => {
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

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Layout style={styles.container}>
                <Text category='h1' >Welcome to Home</Text>
                <Text category='s1' >Explore what's new</Text>

                <Layout style={{ marginVertical: 50 }}>
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
                        style={{backgroundColor: 'black'}}
                        appearance='filled'
                    >
                        COLORED
                    </Button>

                    <Radio
                        checked={checked}
                        onChange={nextChecked => setChecked(nextChecked)}
                        style={{ marginVertical: 30 }}
                    >
                        {`Checked: ${checked}`}
                    </Radio>

                    <CircularProgressBar progress={progress} style={{ marginVertical: 30 }} />

                    <Button onPress={increaseProgress}>Increase Progress</Button>
                </Layout>

                <Layout
                    level='1'
                >

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

                <DateTimePicker/>
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 80,
        padding: 16,
    },
    button: {
        margin: 2,
    },
    checkbox: {
        margin: 2,
    },
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    }
});

export default Home;
