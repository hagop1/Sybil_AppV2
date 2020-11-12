import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import {ImageBackground, StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Linking} from "react-native";
// ##5EB4EE
function HomeScreen(props){
    const [userName, setUsername] = useState();
    const [passWord, setPassword] = useState();
    return (
        <ImageBackground 
        source={require("C:/Users/Hagop/Desktop/secondApp/assets/Sybil_blank.png")} 
        style={styles.background}
        >
            {/* <KeyboardAvoidingView behavior="padding" style = {styles.background}> */}
             <TextInput 
                // onSubmitEditing = {() => this.passwordInput.focus()}
                style = {styles.text_Input}
                placeholder = 'Email'  
                returnKeyType = "next"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                autoCapitalize = "none"
                autoCorrect = {false}
                keyboardType = 'email-address'
                onChangeText = {(val) => setUsername(val)}         
            />
            <TextInput 
                style = {styles.text_Input}
                // ref={(input) => this.passwordInput = input}
                placeholder = 'Password'  
                returnKeyType = "go"
                secureTextEntry
                placeholderTextColor = "rgba(255,255,255,0.7)"
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {(val) => setPassword(val)}        
            />
            <TouchableOpacity style={styles.buttonContainer}>
                <Text 
                style={styles.buttonText}
                
                >
                    LOGIN
                </Text>
            </TouchableOpacity>
            {/* </KeyboardAvoidingView> */}
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 20
    },
    text_Input: {
        backgroundColor: '#5EB4EE',
        marginTop: 40,
        padding: 10,
        margin: 10,
        width: 300,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    buttonContainer: {
        backgroundColor: '#5EB4EE',
        // paddingVertical: 10,
        marginTop: 40,
        padding: 10,
        margin: -150,
        width: 250,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center'
    },
})

export default HomeScreen;