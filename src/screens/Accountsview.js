import React, { useState,useEffect } from 'react';
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
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';

import Spinner from 'react-native-loading-spinner-overlay';

const Accountsview = ({ navigation }) => {

  const [Dashboarddata , setDashboarddata] = useState(


 {"all": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "0",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "16",
      "not_towed": "0",
      "with_title": "16",
      "with_out_title": "0",
      "towed_with_title": "16",
      "towed_with_out_title": "0"
  },
  "LA": {
      "all": "4",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "4",
      "not_towed": "0",
      "with_title": "4",
      "with_out_title": "0",
      "towed_with_title": "4",
      "towed_with_out_title": "0"
  },
  "GA": {
      "all": "1",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "NY": {
      "all": "10",
      "on_hand": "1",
      "manifest": "5",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "3",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "1",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "10",
      "not_towed": "0",
      "with_title": "10",
      "with_out_title": "0",
      "towed_with_title": "10",
      "towed_with_out_title": "0"
  },
  "TX": {
      "all": "1",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "1",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "TX2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "NJ2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "CA": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  }
}
  )
  const[spinner , setspinner] = useState(false)

  const  callingdashboardApi = () => {
    var url = ''
   
     
        url = AppUrlCollection.BASE_URL + 'vehicle/dashboard-report' 
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
              'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //this.setState({ isLoading: false })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
            setDashboarddata(responseJson.data);

            console.warn('data is '+Dashboarddata);

            } else {
              alert(responseJson.message)
               // AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
          alert(error)
            console.warn(error)
        });
  }
  
  useEffect(() => {

    // setspinner(true)
    // callingdashboardApi()
    // setspinner(false)
  
    return () => {
      
    }
  }, [])

  const renderDashboard = ({ item, index }) => {
    return <TouchableOpacity
        onPress={() => this.callingDashbard(item)}
    >
        <Elavation
            elevation={5}
            style={{ width: wp('28%'), height: hp('19%'), borderRadius: 5, borderColor: AppColors.toolbarColor, borderWidth: 0, marginTop: hp('1.5%'), marginBottom: hp('1.5%'), marginLeft: '2.3%', marginRight: '2.3%', paddingTop: 16 }}
        >
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                {this.dashboardiconUI(item, index)}
                <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.black, fontSize: 14, paddingTop: 15, }}>{item.name}</Text>
                {this.dahboardCounter(item, index)}

                {/* <Text style={{ fontFamily: AppFonts.SourceSansProLight, color: AppColors.black, fontSize: 28,paddingTop:15,paddingLeft:25 }}>{item.number}</Text> */}
                {/* {this.dashboardiconUI(item, index)} */}
            </View>
        </Elavation>
    </TouchableOpacity>
}
  return (

    // <SafeAreaView      style={{ flex: 1,  height: deviceHeight, }}>



    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
    <Image source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} />
    {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
    <View style={{width:deviceWidth, backgroundColor:'red',flexDirection:'row', paddingHorizontal:10, height:50}}>

<View style={{alignSelf:'flex-start',height:'100%', backgroundColor:'green', justifyContent:'center'}} >

<Icon name='menu'  size={30} style={{alignSelf:'center'}}/>

</View>



<Text style={{justifyContent:'center' ,position: 'absolute',}}> hhhhh</Text>

         </View>
    <View style={{ flex: 1 }}>
        <View style={{ width: deviceWidth * 0.8, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{alignSelf:'center'}} >WELCOME TO CAR TRACE</Text>
            {/* <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 20, color: AppColors.textColor }}>OUR SERVICES</Text> */}
        </View>



<ScrollView contentContainerStyle={{width:deviceWidth,paddingHorizontal:20, marginTop:30,}}>

<View style={{width:'100%', paddingVertical:15, flexDirection:'row'}} >

<TouchableOpacity style={{width:'50%',paddingVertical:10,  borderWidth:0.5,paddingVertical:10,borderRightWidth:0, height:110,justifyContent:'center', paddingHorizontal:10, }}

onPress={() =>  navigation.navigate('Dashboard')}
>

    <Text style={{fontSize:24, alignSelf:'center'}}>HOME</Text>


</TouchableOpacity>
<TouchableOpacity style={{borderWidth:0.5,justifyContent:'center',paddingVertical:10, paddingHorizontal:10, width:'50%'}}>
<Text style={{alignSelf:'center',fontSize:24, textAlign:'center'}}>Cars for Sell 250</Text>

</TouchableOpacity>

</View>



<View style={{width:'100%', paddingVertical:15,flexDirection:'row'}} >

<TouchableOpacity style={{width:'50%',  borderWidth:0.5,paddingVertical:10,borderRightWidth:0, height:110,justifyContent:'center', paddingHorizontal:10, }}>

    <Text style={{fontSize:24, alignSelf:'center', textAlign:'center'}}>Track your vehicle</Text>


</TouchableOpacity>
<TouchableOpacity style={{borderWidth:0.5,justifyContent:'center',paddingHorizontal:10, width:'50%'}}>
<Text style={{alignSelf:'center',fontSize:24, textAlign:'center'}}>Track your container</Text>

</TouchableOpacity>

</View>


<View style={{width:'100%',paddingVertical:15, flexDirection:'row'}} >

<TouchableOpacity style={{width:'50%', paddingVertical:10, borderWidth:0.5,paddingVertical:10,borderRightWidth:0, height:110,justifyContent:'center', paddingHorizontal:10, }}>

    <Text style={{fontSize:24, alignSelf:'center'}}>Our Services</Text>


</TouchableOpacity>
<TouchableOpacity style={{borderWidth:0.5,justifyContent:'center',paddingHorizontal:10, width:'50%'}}>
<Text style={{alignSelf:'center',fontSize:24, textAlign:'center'}}>Our Yards</Text>

</TouchableOpacity>

</View><View style={{width:'100%',paddingVertical:15, flexDirection:'row'}} >

<TouchableOpacity style={{width:'50%',  borderWidth:0.5,paddingVertical:10,borderRightWidth:0, height:110,justifyContent:'center', paddingHorizontal:10, }}>

    <Text style={{fontSize:24, alignSelf:'center'}}>Notifications</Text>


</TouchableOpacity>
<TouchableOpacity style={{borderWidth:0.5,justifyContent:'center',paddingHorizontal:10, width:'50%'}}>
<Text style={{alignSelf:'center',fontSize:24, textAlign:'center'}}>Contact Us</Text>

</TouchableOpacity>

</View>



</ScrollView>

    </View>
</SafeAreaView>







    
    // </SafeAreaView>

  );
};


export default Accountsview;
