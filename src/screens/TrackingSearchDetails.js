import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TextInput,
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
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const TrackingSearchDetails = ({ navigation }) => {


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

<View style={{ flex: 1,
backgroundColor:"white",
marginBottom: 1}}>

<ScrollView style={{width:deviceWidth, backgroundColor:"white",}}>

<View
style={{height:deviceHeight*0.18,flexDirection:'column', borderBottomWidth:0.5 }}

>
<Text style={{fontWeight:'bold',paddingTop:55,paddingBottom:10,fontSize:18, alignSelf:'center'}}>Tracking Result</Text>
<Text style={{fontWeight:'bold',alignSelf:'center',fontSize:16}}>7848476</Text>
</View>

<View

style={{height:deviceHeight*0.07,justifyContent:'center', }}>
<Text style={{alignSelf:'center',fontWeight:'bold', fontSize:16}}>Details</Text>




</View>


<View style={{paddingHorizontal:25,marginTop:10, width:deviceWidth,flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'55%',paddingVertical:2,justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Status</Text>
<Text style={{fontSize:12}}>On-Hand</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Year</Text>
<Text style={{fontSize:12}}>2020</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Make</Text>
<Text style={{fontSize:12}}>Honda</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Model</Text>
<Text style={{fontSize:12}}>Civic</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'55%',justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>VIN</Text>
<Text style={{fontSize:12}}>236889</Text>
</View>




<View style={{flexDirection:'row',width:'55%',paddingVertical:2,justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Status</Text>
<Text style={{fontSize:12}}>On-Hand</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Year</Text>
<Text style={{fontSize:12}}>2020</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Make</Text>
<Text style={{fontSize:12}}>Honda</Text>
</View>



<View style={{flexDirection:'row',width:'55%',paddingVertical:2, justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>Model</Text>
<Text style={{fontSize:12}}>Civic</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'55%',justifyContent:'space-between'}} > 
<Text style={{fontSize:12}}>VIN</Text>
<Text style={{fontSize:12}}>236889</Text>
</View>
</View>


</ScrollView>

</View>





    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default TrackingSearchDetails;
