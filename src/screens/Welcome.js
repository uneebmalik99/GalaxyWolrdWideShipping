import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Linking,
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
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'
import FontAwesome from  'react-native-vector-icons/dist/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';




const Welcome = ({ navigation }) => {

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
        
<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >

</ImageBackground>
  <View style={{ flex: 1 }}>

    <View style={{ width: deviceWidth, height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{  fontSize: 14, color: AppColors.white }}>WELCOME TO GALAXY WORLD WIDE</Text>
            </View>


        <View style={{ flex: 1 }}>


            <View style={{ width: deviceWidth * 0.6, height: 100, justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <Image source={require('../images/logofinal.jpg')} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='contain' />
                </View>


                <View style={{ position: 'absolute', bottom: 0, width: deviceWidth, marginBottom: 40 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, borderWidth:1,borderColor:'white',justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => { navigation.navigate('services'), AppConstance.APP_TOGGLE_FUN = false }}
                            >  
                                      
                                <AntDesign name='customerservice' size={25} color={AppColors.white} />

                            </TouchableOpacity>
                            <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Services</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30,borderWidth:1,borderColor:'white',  justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.navigate('ContainerTracking')}
                            >
                                
                                <FontAwesome name='ship' size={25} color={AppColors.white} />

                            </TouchableOpacity>
                            <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Container Tracking</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30, borderWidth:1,borderColor:'white', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.navigate('Tracking')}
                            >
                                          
                                <MaterialCommunityIcons name='car-connected' size={25} color={AppColors.white} />

                            </TouchableOpacity>
                            <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Car Tracking</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30,borderWidth:1,borderColor:'white',  justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.navigate('yard')}
                            >
                                         
                                <MaterialCommunityIcons name='map-marker-radius' size={25} color={AppColors.white} />

                            </TouchableOpacity>
                            <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Yard</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30,borderWidth:1,borderColor:'white',  justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.navigate('Contactus')}
                            >
                                          {/* <LinearGradient colors={[   '#D1F2EB',   '#48C9B0', AppColors.toolbarColor]} style={{ flex: 1,
                                justifyContent: 'center',
                                width:'100%',
                                height:'100%',
                                alignItems:'center',
                                borderRadius: 25}}> */}
                                <MaterialIcons name='contact-mail' size={25} color={AppColors.white} />

                                  {/* </LinearGradient> */}
                            </TouchableOpacity>
                            <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Contact Us</Text>
                        </View>

                        {AppConstance.isLoginUser ?
                            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30,borderWidth:1,borderColor:'white', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.callingMainScreen()}>
                                          {/* <LinearGradient colors={[   '#D1F2EB',   '#48C9B0', AppColors.toolbarColor]} style={{ flex: 1,
                                justifyContent: 'center',
                                width:'100%',
                                height:'100%',
                                alignItems:'center',
                                borderRadius: 25}}> */}
                                    <FontAwesome name='user-circle-o' size={25} color={AppColors.white} />

                                  {/* </LinearGradient> */}
                                </TouchableOpacity>
                                <Text style={{  fontSize: 13, marginTop: 7,color:'white' }}>Home</Text>
                            </View> :
                            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30,borderWidth:1,borderColor:'white', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.navigate('Signin')}
                                >
                                          {/* <LinearGradient colors={[   '#D1F2EB',   '#48C9B0', AppColors.toolbarColor]} style={{ flex: 1,
                                justifyContent: 'center',
                                width:'100%',
                                height:'100%',
                                alignItems:'center',
                                borderRadius: 25}}> */}
                                    <FontAwesome name='user-circle-o' size={25}  color={AppColors.white} />

                                  {/* </LinearGradient> */}
                                </TouchableOpacity>
                                <Text style={{  fontSize: 13, marginTop: 7, color:'white' }}>تسجيل الدخول</Text>
                            </View>}
                    </View>

                    
                  </View>  

        </View>
           
           
           
           
          

            {/* <View style={{ flex: 1 }}>
                <View style={{ width: deviceWidth * 0.6, height: 100, justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <Image source={require('../images/logofinal.jpeg')} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='contain' />
                </View>
                <View style={{ position: 'absolute', bottom: 0, width: deviceWidth, marginBottom: 40 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => { this.props.navigation.navigate('OurServiceListScreen'), AppConstance.APP_TOGGLE_FUN = false }}
                            >
                                <AntDesign name='customerservice' size={25} color={AppColors.white} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Services</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('ContainerTrackingScreen')}
                            >
                                <FontAwesome name='ship' size={25} color={AppColors.white} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Container Tracking</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('VehcileContainerListScreen')}
                            >
                                <MaterialCommunityIcons name='car-connected' size={25} color={AppColors.white} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Car Tracking</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('LocationServiceScreen')}
                            >
                                <MaterialCommunityIcons name='map-marker-radius' size={25} color={AppColors.white} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Yard</Text>
                        </View>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('ContactUsScreen')}
                            >
                                <MaterialCommunityIcons name='contact-mail' size={25} color={AppColors.white} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Contact Us</Text>
                        </View>

                        {AppConstance.isLoginUser ?
                            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.callingMainScreen()}>
                                    <FontAwesome name='user-circle-o' size={25} color={AppColors.white} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Home</Text>
                            </View> :
                            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.callingLoginScreen()}>
                                    <FontAwesome name='user-circle-o' size={25} color={AppColors.white} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 13, marginTop: 7 }}>Login</Text>
                            </View>}
                    </View>
                </View>
            </View>
      */}
     
     
        </View>
    

</SafeAreaView>
//     <SafeAreaView style={{  backgroundColor:'white', height: deviceHeight, }}>

//     <ImageBackground 

    
//     style={{flex:1, width:deviceWidth,height:deviceHeight}}
//     source={require('../images/AFGbg.jpg')}>

// <View
// style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
// <TouchableOpacity 
// onPress={()=> navigation.navigate('DrawerWithoutlogin')}>
// <Icon  name='menu' size={30}/>
// </TouchableOpacity>
// </View>
// <View

// style={{height:deviceHeight*0.13}}>
// <Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logo.png')}/>

// </View>

// <View
// style={{width:'100%',marginTop:10,  height:deviceHeight*0.15, flexDirection:'column'}}>
// <Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:16, fontWeight:'bold'}}>Welcome</Text>
// <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'bold'}}>Afg Global Shipping</Text>


// </View>

// <View style={{ flex: 1,
// justifyContent: 'flex-end',
// marginBottom: Platform.OS === 'ios' ? 40 : 70,}}>

// <TouchableOpacity onPress={()=> sendWhatsApp()}>
// <FontAwesome name='whatsapp' size={35} style={{alignSelf:'flex-end',marginRight:20}} color='#4FCE5D'/>
// </TouchableOpacity>

// <View
// style={{width:deviceWidth,marginTop:30, paddingHorizontal:15, height:deviceHeight*0.21, flexDirection:'column'}}>



// <View style={{flexDirection:'row',alignSelf:'center',  width:'100%',height:'50%'}} >

// <TouchableOpacity
// onPress={()=>navigation.navigate('Tracking')}

// style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>
// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

// <AntDesign style={{alignSelf:'center',paddingVertical:3 }} color={AppColors.purple} name='setting' size={23}/>
// <Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Tracking</Text>

// </View>

// </TouchableOpacity>
// <View
// style={{width:'7.2%'}}>

// </View>


// <TouchableOpacity
// onPress={()=>navigation.navigate('Contactus')}

// style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>


// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

// <Feather style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='home' size={23}/>
// <Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Contact Us</Text>

// </View>
// </TouchableOpacity>
// <View
// style={{width:'7.2%'}}>

// </View>

// <TouchableOpacity
// onPress={()=>navigation.navigate('Signin')}
// style={{width:'28.5%',height:'100%',borderRadius:15,justifyContent:'center', backgroundColor:'white'}}>

// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

// <MaterialIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='person-outline' size={25}/>
// <Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Login in</Text>

// </View>

// </TouchableOpacity>

// </View>


// <View style={{flexDirection:'row',marginTop:15, width:'100%',height:'50%'}} >

// <TouchableOpacity
// onPress={()=>navigation.navigate('Towing')}

// style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

// <MaterialCommunityIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='tow-truck' size={24}/>
// <Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Towing</Text>

// </View>

// </TouchableOpacity>
// <View
// style={{width:'7.2%'}}>

// </View>


// <TouchableOpacity
// onPress={()=>navigation.navigate('Shipping')}

// style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

// <Fontisto style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='ship' size={24}/>
// <Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Shipping</Text>

// </View>

// </TouchableOpacity>
// <View
// style={{width:'7.2%'}}>

// </View>

// <TouchableOpacity
// onPress={()=>navigation.navigate('Warehousing')}

// style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

// <View style={{padding:5, width:'100%',height:'100%',justifyContent:'center',  flexDirection:'column'}}>

// <FontAwesome5 style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='warehouse' size={23}/>
// <Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Warehousing</Text>

// </View>

// </TouchableOpacity>

// </View>



// </View>





// </View>





//     </ImageBackground>



//         {/* {this.renderMainContent()} */}
//     </SafeAreaView>

  );
};


export default Welcome;
