import React from 'react';

import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function Button({title, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest} activeOpacity={0.7}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#a370f7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});
