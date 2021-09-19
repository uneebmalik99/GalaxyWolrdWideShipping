import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  Switch,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import BottomTabs from '../screens/BottomTabs'
import { SliderBox } from "react-native-image-slider-box";
import { Icon} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';


const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];


const ContainerA = ({ navigation }) => {


const [vin , setvin] = useState(true)
  const[spinner , setspinner] = useState(false)
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)
  const[data , setdata] = useState([])

  const [vehicleList , setvehicleList] = useState([
])
  const toggleSwitch = (value) => {
    //To handle switch toggle
    console.warn(value);
    setvin(value)
    // setvin(value);
    //State changes according to switch
  };

  
  const callingContainerApi = (isFirstTimeCaling) => {
    var url = ''
    if (isFirstTimeCaling) {
      setspinner(false)
      setisFooterLoading(false)
        // this.setState({ isLoading: true, isFooterLoading: false })
        url = 'https://erp.gwwshipping.com/webapi/export'
    } else {
      setspinner(false)
      setisFooterLoading(true)
        // this.setState({ isLoading: false, isFooterLoading: true })
        url = 'https://erp.gwwshipping.com/webapi/export' 
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
             'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // this.setState({ isLoading: false })
          setspinner(false)
            console.log('Response data viw :: ', responseJson)
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                imageBasePath = responseJson.data.other.export_image
                if (responseJson.data.export.length > 0) {
                  console.log('response'+responseJson.data.export);
                    if (isFirstTimeCaling) {
                      setvehicleList(responseJson.data.export)
                      setnoMoreDataFound(false)
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                    } else {
                      
                      setvehicleList(old =>[...old, ...responseJson.data.export])
                      setdata(old => [...old, ...data]);
  
                      setnoMoreDataFound(false)
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                    }
                } else {
                    if (isFirstTimeCaling) {
                      setvehicleList([])
                      setnoMoreDataFound(true);
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                    } else {
                      setisFooterLoading(false)
                    setnoMoreDataFound(true)
                        // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                    }
  
                }
            } else {
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
  } 




  const  renderVehicle = ({ item, index }) => {
    return(
      <TouchableOpacity style={{width:'100%',backgroundColor:'white',borderTopLeftRadius:10 , borderBottomRightRadius:10,  marginTop:5, borderWidth:0.2,borderColor:'white', flexDirection:'column'}}
      
      onPress={()=>navigation.navigate('ContainerAview',{'item':item})}
      >
 
 
 
 <View style={{width:'94%',flexDirection:'row', justifyContent:'space-between',marginVertical:5, alignSelf:'center'}}>
<View style={{width:'45%'}}>
<Text style={{paddingVertical:2,}}>AR no:</Text>
<Text style={{paddingVertical:2,}}>Container no:</Text>
<Text style={{paddingVertical:2,}}>Broker Name:</Text>
<Text style={{paddingVertical:2,}}>Booking no:</Text>
<Text style={{paddingVertical:2,}}>Destination:</Text>
</View>
<View style={{width:'55%'}}>
<Text style={{paddingVertical:2,}}>{item.ar_number}</Text>
<Text style={{paddingVertical:2,}}>{item.container_number}</Text>
<Text style={{paddingVertical:2,}}>{item.broker_name}</Text>
<Text style={{paddingVertical:2,}}>{item.booking_number}</Text>
<Text style={{paddingVertical:2,}}>{item.destination}</Text>
</View>
 </View>
 
             </TouchableOpacity>
    );
  
  }


  useEffect(() => {

    // setspinner(true)
    // callingdashboardApi()
    // setspinner(false)
    callingContainerApi()
    return () => {
      
    }
  }, [])

  return (
    <SafeAreaView style={{flex:1, width:deviceWidth, backgroundColor: AppColors.transplant, height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground>
<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container </Text>
</View>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}

>



</TouchableOpacity>
</View>


{/* <View

style={{height:100,marginTop:50,}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal.jpg')}/>

</View> */}

<View style={{marginHorizontal:17,justifyContent:'center', borderRadius:20,backgroundColor:'white',marginTop:10,marginBottom:10, flexDirection:'row'}}>
  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => onChangeText(text)}
  onSubmitEditing={(Text) => searchingApi(Text)}
  // this.callingVehicleContainerService()
  placeholder="Enter vin or lot number"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  
  <Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

</View>


<View>

  
</View>
<FlatList

                        data={vehicleList}
                        contentContainerStyle={{marginHorizontal:10,alignSelf:'center',justifyContent:'center',paddingBottom:10, paddingHorizontal:10, width:deviceWidth}}
                        renderItem={renderVehicle}
                        keyExtractor={(item, index) => index}
                      //   onEndReached={loadMoreData}
                      //   ListFooterComponent={renderFooter}
                      //  onEndReachedThreshold={0.01}
                      
                    />
                

                <View style={{  height:55, backgroundColor: '#1a9bef',borderRadius:15, width:deviceWidth, justifyContent:'center', flexDirection:'row'}}>



<View style={{width:'32%', justifyContent:'center', flexDirection:'column', }}>
<Ionicons
          name='car-sport'
          type='material'
          color='#fff'
          style={{alignSelf:'center'}}
          size={22}
          onPress={() => navigation.navigate('Dashboard')}

      /> 
    <Text style={{alignSelf:'center',color:'white', fontSize:12}}>My Vehicle</Text>
</View>

<View style={{width:'32%', bottom:30, }}>

  <View>
    
  </View>
  <Icon
          name='add'
          type='material'
          color='#f00'
          containerStyle={{ alignSelf: 'center' }}
          reverse
          size={26}
          onPress={() => navigation.navigate('AddVehicle')}
      /> 

      <Text style={{alignSelf:'center',color:'white', bottom:2,fontSize:12}}>Add Vehcile</Text>

   </View>


<View style={{width:'32%',justifyContent:'center', }}>
<Feather
          name='box'
          type='material'
          color='#fff'
          size={22}
          style={{alignSelf:'center'}}
          onPress={() => {navigation.navigate('ContainerA')}}

      /> 
    <Text style={{alignSelf:'center',color:'white', fontSize:12 }}>Container</Text>  
                </View>




</View>



</SafeAreaView>

  );
};









export default ContainerA;
