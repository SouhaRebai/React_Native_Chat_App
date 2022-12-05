import { View, Text, TextInput, Button,StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import initfirebase from '../../Config/index';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

export default function Profile(props) {
    const database = initfirebase.database();
    const storage = initfirebase.storage();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);


    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
    
  
      if (!result.canceled) {
     
        setImage(result.uri);
      }
    };

    const imageToBlob = async (uri)=>{
      const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e){
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";//arraybuffer ou blob
        xhr.open("GET", uri, true);
        xhr.send(null);
      })
      return blob;
    }

    const uploadImage = async (uri)=>{
      //convert image to blob
      const blob = await imageToBlob(uri);
      //save blob to reference image
      const ref_image = storage.ref().child("imageprofiles").child("image2.jpg");
      await ref_image.put(blob);
      //get url
      const url = await ref_image.getDownloadURL();
      return url;
    }

  return (
    <View>
      <Text style={styles.title} >Profile</Text>
      <TouchableOpacity onPress={()=>{pickImage();}}>
      <Image 
      source={image === null ? 
      require("../../assets/profile.png") :
       {uri: image}}
      style={{
          width:130,
          height:130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom:10,
         alignSelf:'center',
          
          marginTop:20
          
      }}></Image>
      </TouchableOpacity>
        <TextInput          
        onChangeText={(text)=>{setFname(text)}} style={styles.textinput} placeholder="First Name">
        {props.fname}</TextInput>

        <TextInput          
        onChangeText={(text)=>{setLname(text)}} style={styles.textinput} placeholder="Last Name">
        {props.lname}</TextInput>

        <TextInput          
        onChangeText={(text)=>{setUsername(text)}} style={styles.textinput} placeholder="UserName">
        {props.pseudo}</TextInput>

        <Button title="Save changes" onPress={async ()=>{
          if(image !== null)
            {                    
              console.log(image);
             const url = await uploadImage(image);
              var key = database.ref("contacts").push().key;
                    database.ref("contacts").child("profil"+key).set({
                        uid : uuid.v4(),
                        nom: fname,
                        prenom: lname,
                        pseudo: username,
                        url: url
                    })
            }            }}>
            
        </Button>

    </View>
  )
}

const styles = StyleSheet.create({
    textinput: {
        width: "90%",
        height:40,
        backgroundColor: "white",
        borderRadius: 8,
        margin: 10,
        padding: 5,
    },
    title: {
      fontWeight: "bold",
    marginVertical: 4,
    color: "#FFC7C6",
    fontSize: 16,
    textAlign: "center"
    }
})