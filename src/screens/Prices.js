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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'

const Prices = ({route, navigation }) => {


  const [data, setdata] = useState([
    {
      date: '20-12-2020',
      name: 'Ocean Freight',
     
 
    },
    

    {
    date: '20-12-2020',
      name: 'Towing fee',
     
    },

   

  ]
)



const renderlist = ({item}) =>{

  return(
    
<View style={{flexDirection:'row',alignSelf:'center', marginTop:5, paddingHorizontal:5, width:'100%',height:55}} >

<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'57%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4,alignSelf:'center', paddingVertical:2, width:'62%'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{item.name}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{item.date}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'20%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons name='download-circle' style={{alignSelf:'center'}} size={50} />




</View>
</TouchableOpacity>
<View
style={{width:'1.3%'}}>

</View>

<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'20%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons name='file-download-outline' style={{alignSelf:'center'}} size={50} />




</View>

</TouchableOpacity>

</View>

  
  
  )
  
   }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>



<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Dashboard')}

>
<MaterialIcons  name='keyboard-backspace' color='white' size={20}/>
</TouchableOpacity>
<View style={{justifyContent:'center'}}>
<Text style={{marginLeft:10,color:'white'}}>Ocean Freight and Towing Fee</Text>
</View>

</View>
<View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Monthwise</Text>
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


export default Prices;
