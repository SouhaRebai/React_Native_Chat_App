import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, TextInput ,Image } from 'react-native';
import { useState } from 'react';
import initfirebase from '../Config/index';
export default function Login(props) {
    // add valid credentials manually
    const auth = initfirebase.auth();
    const [email, setEmail] = useState('souharebai456@gmail.com');
    const [password, setPassword] = useState('123');

    return (
    <ImageBackground source={require('../assets/background.webp')} style={{
      height:"101%", width:"100%"
    }}>
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source = {require('../assets/chat_icon.webp')} 
      style={{
        height:"40%", width:"100%" , marginTop : -85}}/>
      <Text style={{color: "rgb(255,78,90)", fontSize: 50, fontWeight: "bold" , fontStyle :"normal" }}>
            Talkoo!
            </Text>  
            <Text style={{color: "gray", fontSize: 20, fontWeight: "light" , fontStyle :"italic" }}>
            your new favorite chat application !! 
            </Text>  
      <View
        style={{
            marginTop : 20,
            height: 300,
            width: "90%",
            backgroundColor:"rgb(226,226,226)",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"

        }}>

            <Text style={{color: "white", fontSize: 35, fontWeight: "bold"}}>
            Authentication
            </Text>
            <TextInput placeholder="email@site.com" 
            keyboardType="email-address"
            style={styles.textinput} value = {email}
            onChangeText={(text)=>{setEmail(text)}}>
            </TextInput>
            <TextInput placeholder="password" secureTextEntry={true} style={styles.textinput}
            value = {password} onChangeText={(text)=>{setPassword(text)}}>

            </TextInput>
            <TouchableOpacity>
                <Text style={{color: "rgb(255,78,90)" , marginBottom:10}} 
                onPress={()=>{
                  
                  props.navigation.navigate("reset");
                }}>
                    Forgot your password ? get reset email
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{color: "rgb(255,78,90)"}} 
                onPress={()=>{
                  
                  props.navigation.navigate("signup");
                }}>
                    New to our app ? become a user now !
                </Text>
            </TouchableOpacity>
            <Pressable
            onPress={()=>{
              if((email.length>0 && email.includes("@")))
                    {
                      if(password.length>5){
                        auth.signInWithEmailAndPassword(email,password).then(()=>{
                    props.navigation.replace("home")
                }).catch((err)=>{
                    alert(err);
                });
                      }
                    }
                    else{
                      alert("Username or password is invalid. Verify your credentials !")
                    }
                

              }}
              style={styles.button}
            >
              <Text style={styles.buttontext}>
                Submit
              </Text>
            </Pressable>
            
        </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor:"rgb(255,78,90)",
    padding: 15,
    borderRadius: 5,
    margin: 15,
  },
  buttontext:{
    color: "white",
    fontWeight:"bold"
    
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
