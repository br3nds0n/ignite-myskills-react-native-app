import React from 'react';

import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityProps,
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
    skill: string;
}

export default function SkillCard({skill, ...rest}: SkillCardProps) {
    return (
        <TouchableOpacity style={styles.buttonSkill} {...rest} activeOpacity={0.7}>
            <Text style={styles.skill}>{skill}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10,
    },

    skill: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
});
