import { View, Text, StyleSheet, FlatList, Image, Pressable, Button, SnapshotViewIOSBase} from 'react-native'
import React, { useEffect, useState } from 'react'
import initfirebase from '../../Config/index'

export default function Liste(props) {
  const [data, setData] = useState([])
  const database = initfirebase.database();
  const contacts = database.ref("contacts");
  let {fname, lname, pseudo , uid } = props;
  

  useEffect(() => {
    contacts.on("value",(datasnapshot)=>{
      let d = [];
      datasnapshot.forEach((contact)=>{
        d.push(contact.val());
      });
      setData(d);
  
    });//bech tabda l'écoute
  
  
    return () => {//en cas d'arret de render
      contacts.off();
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={{
        color: "#rgb(255,78,90)",
        fontWeight: "bold",
        fontSize: 34
      }}>Contacts' list </Text>
      <FlatList style={{width: "100%", height: "100%"}} 
      data={data}
      renderItem={({item})=>{
        return <View style={styles.shadowProp}>
        <View style={styles.viewitem}>
        <Image source={{uri: item.url}} style={{
          height:60,
          width: 60,
          borderRadius:50,
          resizeMode: "cover"
        }}></Image>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            marginStart: 20,
          }}
          onPress={()=>{
              props.navigation.navigate("chat")
          }}>{item.pseudo}</Text>
          <View style = {{flexDirection: 'row', alignItems:"flex-end", marginLeft: 5}}>
          <Text style={{ color:"gray"}}>~ {item.nom}</Text>
          <Text style={{marginStart:5 , color:"gray"}}>{item.prenom}</Text>
          </View>
          </View>
          <View style={{width: "35%" , marginTop: -40, marginBottom: 10, flexDirection: "row" ,marginLeft: 220, justifyContent: 'space-evenly' }}>
          <Button title="EDIT" onPress={()=>{
              props.fname = item.fname ;
              props.lname = item.lname ;
              props.pseudo = item.pseudo ;
              props.uid = item.uid ;
              props.navigation.navigate("profile", {uid : item.uid , fname : item.fname , lname : item.lname , pseudo : item.pseudo})}}>Edit</Button>
          <Button title="DELETE" onPress={async() =>{
            contacts.orderByChild('uid').equalTo(item.uid).once('value',(snapshot) =>{
              snapshot.forEach((childSnapshot)=> {
                let nodeKey = childSnapshot.key;
                contacts.child(nodeKey).remove();
              })
            })
            }}>Detete</Button>
          </View>
        </View>
      }}></FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
  viewitem : {
    flexDirection: 'row',
    height: 75,
    width: "100%",
    margin : 5,
    marginBottom : 20, 
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "flex-start"
  },
container: {
alignItems: "center",
justifyContent: "flex-start",
} ,
shadowProp: {
  overflow :"hidden",
  margin : 5,
  marginStart: 20,
  borderRadius :5 ,
  height : "90%",
  width: "90%",
  flex:1,
  shadowColor: "#555",
  shadowOpacity: 0.3,
  elevation: 3
}
});
