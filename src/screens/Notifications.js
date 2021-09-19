import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'

const Notifications = ({route, navigation }) => {


  const [data, setdata] = useState([
    {
      date: '20-12-2020',
      Description: 'Description',
      time:'08:00 pm',
      Lot:'473890',
      N:'CA',
 
    },
    {
      date: '20-12-2020',
      time:'08:00 pm',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

    {
    date: '20-12-2020',
    time:'08:00 pm',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

    {
      date: '20-12-2020',
      time:'08:00 pm',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

  ]
)



const renderlist = ({item}) =>{

  return( <SafeAreaView style={{flexDirection:'row',alignSelf:'center',paddingHorizontal:5, marginTop:5, width:deviceWidth,height:60}} >

  <TouchableOpacity
  // onPress={()=>navigation.navigate('Tracking')}
  
  style={{width:'100%', paddingVertical:3,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'#fbf9e5'}}>
  <View style={{  width:'100%',height:'100%', flexDirection:'column'}}>
  
  <View style={{flexDirection:'row',paddingHorizontal:3, width:'100%',height:'33%'}}>
  
  <View style={{width:'55%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:10,}}>update on Export fee increases</Text>
  </View>
  
  
  <View style={{width:'18%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:9,}}>Date/Time</Text>
  </View>
  
  
  <View style={{width:'17%', }}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:9,}}>2020-07-07</Text>
  </View>
  <View style={{width:'15%', }}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:9}}>08:00pm</Text>
  </View>

  
  
  
  </View>
  

  
  
  
  
  
  <View style={{flexDirection:'row',paddingRight:8,marginTop:3, width:'100%',height:'66%'}}>
  
  <View style={{width:'95%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2,marginLeft:3, fontSize:10,}}>demo textdemo textdemo text demo </Text>
  </View>
  
  
  
  
  
  </View>
  
 
  

  
  
  
  
  </View>
  
  </TouchableOpacity>
  
  
  
  
  
  
  </SafeAreaView>
  
  
  
  )
  
   }




    // const { type, title } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>



<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Dashboard')}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>

<Text style={{marginLeft:10, color:'white' , alignSelf:'center'}}>Notifications </Text>
</View>
<View

style={{height:deviceHeight*0.03, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:8}}></Text>
</View>



<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

<FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />
</View>



    </SafeAreaView>

  );
};


export default Notifications;
