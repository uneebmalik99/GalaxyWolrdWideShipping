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
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'

const alerts = ({route, navigation }) => {


  const [data, setdata] = useState([
    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
 
    },
    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

    {
    date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      N:'CA',
    },

  ]
)



const renderlist = ({item}) =>{

  return( <View style={{flexDirection:'row',alignSelf:'center',paddingHorizontal:5, marginTop:5, width:deviceWidth,height:70}} >

  <TouchableOpacity
  // onPress={()=>navigation.navigate('Tracking')}
  
  style={{width:'100%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'#fbf9e5'}}>
  <View style={{  width:'100%',height:'100%', flexDirection:'column'}}>
  
  <View style={{flexDirection:'row',paddingHorizontal:3, width:'100%',height:'33%'}}>
  
  <View style={{width:'25%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>date</Text>
  </View>
  
  
  <View style={{width:'45%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>Description</Text>
  </View>
  
  
  <View style={{width:'20%'}}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:12,}}>Lot#</Text>
  </View>
  
  <View style={{width:'10%',}}>
  <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',paddingVertical:2, fontSize:12,}}>N</Text>
  </View>
  
  
  
  </View>
  
  
  <View style={{flexDirection:'row',paddingHorizontal:3, width:'100%',height:'33%'}}>
  
  <View style={{width:'25%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{item.date}</Text>
  </View>
  
  
  <View style={{width:'45%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{item.Description}</Text>
  </View>
  
  
  <View style={{width:'20%'}}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:12,}}>{item.Lot}</Text>
  </View>
  
  <View style={{width:'10%',}}>
  <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',paddingVertical:2, fontSize:12,}}>{item.N}</Text>
  </View>
  
  
  
  </View>
  
  
  
  
  
  
  <View style={{flexDirection:'row',paddingHorizontal:3,marginTop:3, width:'100%',height:'100%'}}>
  
  <View style={{width:'95%'}}>
  <Text style={{color:'red',fontWeight:'bold',paddingVertical:2,marginLeft:5, fontSize:12,}}>Vehicle Added into your inventory</Text>
  </View>
  
  
  
  
  
  </View>
  
  
  
  
  </View>
  
  </TouchableOpacity>
  
  
  
  
  
  
  </View>
  
  
  
  )
  
   }




    // const { type, title } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>



<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.goBack()}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>
<View style={{justifyContent:'center'}}></View>
<Text style={{alignSelf:'center', marginLeft:6}}>Alerts </Text>
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


export default alerts;
