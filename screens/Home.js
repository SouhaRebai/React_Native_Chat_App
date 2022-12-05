import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Groupe from './fragment_home/Groupe';
import Liste from './fragment_home/Liste';
import Profile from './fragment_home/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator 
    initialRouteName="Liste"
  activeColor="white"
  inactiveColor="rgb(150,150,150)"
  barStyle={{ backgroundColor: 'rgb(255,78,90)' , padding:10, marginHorizontal : 10 , marginVertical : 10, borderRadius: 50,
  justifyContent: "center" ,  alignItems: 'center'}}>

    <Tab.Screen name="liste" component={Liste}/>
    <Tab.Screen name="groupe" component={Groupe} />
    <Tab.Screen name="profile" component={Profile} />
  </Tab.Navigator>
  );
}
