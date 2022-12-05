import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, TextInput, Image} from 'react-native';
import { useState } from 'react';
import initfirebase from '../Config/index'
export default function Register(props) {
    const auth = initfirebase.auth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    return (
      <ImageBackground source={require('../assets/background.webp')} style={{
        height:"102%", width:"100%", marginTop:-10
      }}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source = {require('../assets/chat_icon.webp')} 
      style={{
        height:"40%", width:"100%",marginTop :-50, marginBottom: 20}}/>
           <Text style={{color: "gray", fontSize: 20, fontWeight: "light" , fontStyle :"italic" , marginBottom : 20}}>
          Join our family TODAY!     
       </Text>
      <View
        style={{
            height: 350,
            width: "90%",
            backgroundColor:"rgb(226,226,226)",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"

        }}
        >
            <Text style={{color: "white", fontSize: 36, fontWeight: "bold"}}>
            Sign up
            </Text>
            <TextInput placeholder="email@site.com" 
            keyboardType="email-address"
            style={styles.textinput}
            onChangeText={(text)=>{setEmail(text)}}>

            </TextInput>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textinput}
                        value= {password} onChangeText={(text)=>{setPassword(text)}}>

            </TextInput>
            <TextInput placeholder="Confirm your Password" secureTextEntry={true} style={styles.textinput}
                        password={confPassword} onChangeText={(text)=>{setConfPassword(text)}}>

            </TextInput>
            <Text style={{color: "rgb(255,78,90)"}}
                onPress={()=>{
                  
                  props.navigation.navigate("auth");
                }}>
                    Already a user ? Login now ! 
                </Text>
            <Pressable   
            onPress={()=>{
                //test de saisie
                if((email.length>10 && email.includes("@")))
             if(password===confPassword && password.length>5)
             {      auth.createUserWithEmailAndPassword(email,password).then(()=>{
                    props.navigation.replace("home")
                }).catch((err)=>{
                    alert(err);
                });

             }else{
                alert("Please Verify your data")
             }

              }}
              style={styles.button}
            >
              <Text style={styles.buttontext}>
                Submit
              </Text>
            </Pressable>
            <TouchableOpacity>
                
            </TouchableOpacity>
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
