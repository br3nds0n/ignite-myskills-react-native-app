import React from 'react';
import {useState, useEffect} from 'react';

import {
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';

import {Button, SkillCard} from '../components';

export function Home() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [gretting, setGretting] = useState('');

    useEffect(() => {
        handleGetGreetings();
        handleGetSkills();
    }, []);

    function handleGetSkills() {
        fetch('http://192.168.137.1:3000/skills')
            .then(response => response.json())
            .then(data => {
                setSkills(data);
            });
    }

    function handleGetGreetings() {
        const currentHour = new Date().getHours();

        if (currentHour < 12 && currentHour >= 6) {
            setGretting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGretting('Good afternoon');
        } else {
            setGretting('Good night');
        }
    }

    function handleAddNewSkill() {
        if (!newSkill) {
            return;
        }

        fetch('http://192.168.137.1:3000/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skill: newSkill,
            }),
        })
            .then(() => {
                setNewSkill('');
                handleGetSkills();
            })
            .catch(() => {
                console.log('Error');
            });
    }

    function handleRemoveSkill(skill: string) {
        return () => {
            fetch(`http://192.168.137.1:3000/skills/${skill}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    handleGetSkills();
                })
                .catch(() => {
                    console.log('Error');
                });
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome, Brendson</Text>

            <Text style={styles.grettings}>{gretting}</Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
                value={newSkill}
            />

            <Button title="Add" onPress={handleAddNewSkill} />

            <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

            <FlatList
                data={skills}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <SkillCard skill={item} onPress={handleRemoveSkill(item)} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },

    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    input: {
        backgroundColor: '#1f1e25',
        color: '#ffffff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },

    grettings: {
        color: '#ffffff',
    },
});
