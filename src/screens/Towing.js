import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'

const Towing = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.transplant, height: deviceHeight, }}>

    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>

<View
style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
<TouchableOpacity
onPress={()=> navigation.goBack()}>

<Ionicons  name='chevron-back-outline' size={30}/>
</TouchableOpacity>
</View>
<View

style={{height:deviceHeight*0.13}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logo.png')}/>

</View>

<View
style={{width:'100%',marginTop:30,paddingHorizontal:30,  alignSelf:'center', justifyContent:'center', height:240 }}>
<View

style={{width:'100%',paddingHorizontal:10,justifyContent:'center', backgroundColor:'white',borderRadius:5,height:'100%',flexDirection:'column'}}>








<Text>By road or barge, our flexible and reliable inland transportation services include both LCL and HCL.
We ensure your commodities are delivered at the destinations on time.
We also offer reliable and trustworthy warehouses to let you store your commodity for a period of time during the movement. 

</Text>

<Text style={{marginTop:5}}>  • From seaport to inland destination</Text>
<Text>  • From airport to inland destination</Text>
<Text>  • Any Inland origin to sea Port or airport</Text>
<Text>  • Combined transportation by barge </Text>

</View>

</View>






    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Towing;
