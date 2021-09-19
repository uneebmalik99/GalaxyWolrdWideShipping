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
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react';
import  AppMessages  from '../AppMessages/AppMesage';
import Snackbar from 'react-native-snackbar';
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from 'react';
import AppUrlCollection from '../UrlCollection/AppUrlCollection'


const Contactus = ({ navigation }) => {

const [fulName , setfulName] = useState('')
const [email, setemail] = useState('')
const [phone , setphone] = useState('')
const [message, setmessage] = useState('')
const [IsConnected , setIsConnected] = useState(true)


   const sendContactUsData = () => {
        if (fulName.trim().length == 0) {
            AppConstance.showSnackbarMessage(AppMessages.FULL_NAME_NOT_BLANK)
        } else if (email.trim().length == 0) {
            AppConstance.showSnackbarMessage(AppMessages.EMAIL_NOT_BLANK)
        } else if (phone.trim().length == 0) {
            AppConstance.showSnackbarMessage(AppMessages.PHONE_NOT_BLANK)
        } else if (message.trim().length == 0) {
            AppConstance.showSnackbarMessage(AppMessages.MESSAGE_NOT_BLANK)
        } else {
            // NetInfo.fetch().done((IsConnected) => {
                // NetInfo.fetch().then(isConnected => {
                    // if (isConnected) {
                // if (connection == 'Connected') {
                    var formData = new FormData();
                    formData.append('name', fulName)
                    formData.append('email', email)
                    formData.append('phone', phone)
                    formData.append('message',message)

                    fetch(AppUrlCollection.CONTACT_US, {
                        method: 'POST',
                        headers: {
                            'Content-Type': '',
                            'authkey': 'pUshCX5DJwRHW7oVTmm2WYvILZlc8lGR'
                        },
                        body: formData
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            alert(responseJson)
                            console.log('Contact Us Resposne :: ', responseJson)

                        })
                        .catch((error) => {
                            console.warn(error)
                        });
                // }
                // else {
                //     AppConstance.showSnackbarMessage(AppMessages.INTERNEt_NOT_FOUND)
                // }
            // });
        }
    }

  
   
  const    handleFirstConnectivityChange = isConnected => {
        // NetInfo.removeEventListener(
        //   "connectionChange",
        //   handleFirstConnectivityChange()
        // );
    
        if (isConnected === false) {
          alert("You are offline!");
        } else {

        //   alert("You are online!");
        }
      };


  

    useEffect(()=>{
        NetInfo.addEventListener(
            "connectionChange",
        handleFirstConnectivityChange()
          );
       

        return () => {
           
        }
    },[])
      
      return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>


                   
  <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} />



<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Contact Us</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<ScrollView style={{ flex: 1,  }}>
                {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='cover' style={{ width: deviceWidth, height: deviceHeight * 0.95, position: 'absolute' }} /> */}
                {/* {this.props.isOuterCalling ?
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        <Toolbar headerName={'Contact Us'} />
                    </View> :

                    <InnerToolbar headerName={'Contact Us'} />} */}

                <View style={{ flex: 1 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <View
                            elevation={1}
                            style={{ width: deviceWidth * 0.9, height: 50, backgroundColor:'#ECF0F1', shadowColor: '#0003',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.6,
                            shadowRadius: 1,
                            elevation: 5,borderRadius: 20, marginTop: 10 }}
                        >
                            <TextInput
                                placeholder='Full Name*'
                                placeholderTextColor={AppColors.textColor}
                                style={{ flex: 1, paddingLeft: 10,borderRadius:20, borderWidth:0.3, borderColor:'grey',  paddingRight: 10 }}
                                onChangeText={(text) => setfulName(text) }
                            />
                        </View>

                            
                        {/* <View
                            elevation={1}
                            style={{ width: deviceWidth * 0.9,paddingHorizontal:1,  height: 50, borderRadius: 20, marginTop: 20, marginBottom: 20 }}
                        >
                            <TextInput
                                placeholder='Email*'
                                placeholderTextColor={AppColors.textColor}
                                style={{  paddingLeft: 10,borderRadius:20, borderWidth:0.3, borderColor:'white',  paddingRight: 10 }}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View> */}
                         <View
                            elevation={1}
                            style={{ width: deviceWidth * 0.9, height: 50,shadowColor: '#0003',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.6,
                            shadowRadius: 1,
                            elevation: 5,backgroundColor:'#ECF0F1', borderRadius: 20,marginTop: 20, marginBottom: 20 }}
                        >
                            <TextInput
                                placeholder='Email*'
                                placeholderTextColor={AppColors.textColor}
                                style={{ flex: 1, paddingLeft: 10,borderRadius:20, borderWidth:0.3, borderColor:'grey',  paddingRight: 10 }}
                                onChangeText={(text) => setemail(text) }
                            />
                        </View>

                        <View
                            elevation={1}
                            style={{ width: deviceWidth * 0.9, height: 50,shadowColor: '#0003',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.6,
                            shadowRadius: 1,
                            elevation: 5,backgroundColor:'#ECF0F1',  borderRadius: 20, marginBottom: 20 }}
                        >
                            <TextInput
                                placeholder='Phone*'
                                placeholderTextColor={AppColors.textColor}
                                style={{ flex: 1, paddingLeft: 10,borderRadius:20, borderWidth:0.3, borderColor:'grey',  paddingRight: 10 }}
                                onChangeText={(text) => setphone(text)}
                            />
                        </View>

                        <View
                            elevation={1}
                            style={{ width: deviceWidth * 0.9, height: 50,shadowColor: '#0003',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.6,
                            shadowRadius: 1,
                            elevation: 5,backgroundColor:'#ECF0F1',  borderRadius: 20 }}
                        >
                            <TextInput
                                placeholder='Message*'
                                placeholderTextColor={AppColors.textColor}
                                style={{ flex: 1, paddingLeft: 10,borderRadius:20, borderWidth:0.3, borderColor:'grey',  paddingRight: 10 }}
                                onChangeText={(text) => setmessage(text) }
                            />
                        </View>

                        <TouchableOpacity style={{
                            width: deviceWidth * 0.9, height: 50, backgroundColor: '#ECF0F1',borderColor:'#4093c3',borderWidth:1,
                            justifyContent: 'center', borderRadius: 50, marginTop: 25
                        }}
                            onPress={() => sendContactUsData()}
                        >
                            <Text style={{
                                color: 'black',  textAlign: 'center',
                                textAlignVertical: 'center', fontSize: 16
                            }}>SUBMIT</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'grey', fontSize: 18 }}>Get In Touch</Text>
                        <View style={{ width: 80, height: 1, backgroundColor: AppColors.toolbarColor, marginTop: 10 }} />
                    </View>

                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='map-marker-circle' size={18} color='grey' />
                            <Text style={{  color: 'grey',fontSize: 15, marginLeft: 5 }}>
                                {'UAE, Sharjah, Sharjah 83864, UAE'}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10,width:deviceWidth,paddingHorizontal:0,justifyContent:'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, }}>
                                <MaterialCommunityIcons name='email-outline' size={18}style={{alignSelf:'center'}} color='grey'  />
                                <Text style={{
                                    
                                    color: 'grey', fontSize: Platform.OS === 'ios' ? 16 : 15, marginLeft: 5
                                }}>info@gwwshipping.com</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 20, alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='phone' size={16} color='grey'  />
                                <Text style={{
                                    
                                    color:'grey', fontSize: Platform.OS === 'ios' ? 16 : 15, marginLeft: 3
                                }}>+065328580</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', }}>
                            <MaterialCommunityIcons name='earth' size={18} color='grey' />
                            <Text style={{
                                
                                color: 'grey',fontSize: 16, marginLeft: 5
                            }}>www.gwwshipping.com</Text>
                        </View>

                    </View>

                    {/* <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 20,}}>
                        <View style={{ flexDirection: 'row', flex: 1,justifyContent:'flex-end',alignContent:'flex-end',marginRight:10 }}>
                            <MaterialCommunityIcons name='map-marker-circle' size={18} color={AppColors.textColor} />
                            <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 15, marginLeft: 5 }}>{'150 feer Ring Road,\nRajkot,\nGujrat'}</Text>
                        </View>
                        <View style={{ width: 1, height: 50, backgroundColor: AppColors.toolbarColor }} />
                        <View style={{ flex: 1, marginLeft: 10,alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name='email-outline' size={18} color={AppColors.textColor} />
                                <Text style={{
                                    fontFamily: AppFonts.SourceSansProRegular,
                                    color: AppColors.textColor, fontSize: 16, marginLeft: 5
                                }}>galax@gmail.com</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, }}>
                                <MaterialCommunityIcons name='phone' size={18} color={AppColors.textColor} />
                                <Text style={{
                                    fontFamily: AppFonts.SourceSansProRegular,
                                    color: AppColors.textColor, fontSize: 16, marginLeft: 5
                                }}>1234567890   </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name='earth' size={18} color={AppColors.textColor} />
                                <Text style={{
                                    fontFamily: AppFonts.SourceSansProRegular,
                                    color: AppColors.textColor, fontSize: 16, marginLeft: 5
                                }}>www.google.com</Text>
                            </View>

                        </View>

                    </View> */}


                </View>
            </ScrollView >
     

        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Contactus;
