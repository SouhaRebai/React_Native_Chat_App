import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import initfirebase from '../Config/index';

export default function ResetPassword(props) {
    const auth = initfirebase.auth();
    const [email, setEmail] = useState('');

  return (
    <ImageBackground source={require('../assets/background.webp')} 
    style={{
      height:"100%", width:"100%"
    }}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
            height: 300,
            width: "90%",
            backgroundColor:"#0005",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"

        }}
        >
            <Text style={{color: "white", fontSize: 26, fontWeight: "bold", textAlign: "center"}}>
            Re-initialise Password
            </Text>
            <TextInput placeholder="email@site.com" 
            keyboardType="email-address"
            style={styles.textinput}
            onChangeText={(text)=>{setEmail(text)}}>

            </TextInput>
            <Pressable   
            onPress={()=>{
              if((email.length>0 && email.includes("@")))
                    {
                      auth.sendPasswordResetEmail(email);
                      alert("Password reset link sent to your email");
                    }
                    else{
                      alert("Please verify your email");
                    }
                

              }}
              style={styles.button}
            >
              <Text style={styles.buttontext}>
                Submit
              </Text>
            </Pressable>
            <TouchableOpacity>
                <Text style={{color: "white"}} 
                onPress={()=>{
                  
                  props.navigation.navigate("auth");
                }}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    button: {
      
      backgroundColor:"#FFC7C6",
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
    buttontext:{
      color: "#999",
      
    },
    
      textinput: {
          width: "90%",
          height:40,
          backgroundColor: "white",
          borderRadius: 8,
          margin: 10,
          padding: 5,
      },
    container: {
      flex: 1,//weight ./. l'element pere
      alignItems: 'center',//alignement horiz
      justifyContent: 'center',//align vert
    },
  });
  