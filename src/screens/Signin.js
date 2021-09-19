import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ImageBackground,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import SimpleLineIcons from  'react-native-vector-icons/dist/SimpleLineIcons'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';




const Signin = ({ navigation }) => {

  // const [email ,setemail] = useState('Moontest')
  const [email ,setemail] = useState('20190267')

  // const [pass ,setpass] =useState('Haq@123')
  const [pass ,setpass] =useState('20190267')
  
  const [spinner , setspinner] =useState(false)




  const  callingLoginApi = () => {
    // var uniqueId = DeviceInfo.getUniqueId();
    // // deviceId = uniqueId;
    // console.log('Device id Is '+uniqueId);
setspinner(true)
    if (email.trim().length == 0) {

    alert('username can not be blank'); 
    setspinner(false)

    } else if (pass.trim().length == 0) {
        alert("password can not be blank"); 
        setspinner(false)

    } else {
      // NetInfo.fetch().then(state => {
      //   console.log("Connection type", state.type);
      //   console.log("Is connected?", state.isConnected);
      //   alert(isConnected)
      // });
     
    //       var token= AppConstance.USER_TOKEN;
    //       var uniqueId = DeviceInfo.getUniqueId();

    // console.warn('deivce id is :::::::::::'+token)
    //         console.warn("working1")
                // this.setState({ isLoading: true });

            // var url = 'https://customer.afgglobalshipping.com/webapi/login';
                var url = AppUrlCollection.BASE_URL+ 'login';

                var value = new FormData();
                // value.append('username', 'info@impulsiontechnologies.com');
                // value.append('password', '20190021');
                value.append('username',email);
                value.append('password', pass);
                // value.append('token', token);
                // value.append('device_id', token);

                console.log('Login_key_vale ',value)
                fetch(url, {
                    method: 'POST',
                    headers: {
                       
                       'Content-Type': 'multipart/form-data',
                    },
                    body: value,
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      
                      setspinner(false)
                     
                        console.log(responseJson);
                        loginServiceCall(responseJson)
                      
                        // this.setState({ isLoading: false })
                       
                    })
                    .catch((error) => {
                      setspinner(false)
                      alert('Error while login'+ error)
                        // this.setState({ isLoading: false })
                        console.warn(error)
                    });
           



    }
    //  this.props.navigation.navigate('NavigationSideScreen')
}


const loginServiceCall = (responseJson) => {
  console.warn(responseJson)

  if (responseJson.status == AppConstance.API_SUCESSCODE) {

   AppConstance.IS_USER_LOGIN='1';
      // this.props.navigation.push('Dashboard');
      
      //AppConstance.showSnackbarMessage(responseJson.message)
    callingUserService(responseJson.data.auth_key)
  } else {
      
      alert(responseJson.message);
  }
}

const callingUserService = async (authKey) => {
  var url = AppUrlCollection.USER;
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          
          'authkey': authKey
      },
      // body: value,
  })
      .then((response) => response.json())
      .then((responseJson) => {
        
          console.warn('USER::: ', responseJson)
          AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson.data))
           
          

        //  this._storeData();
        AsyncStorage.setItem('IS_USER_LOGIN1', '1')

        // let paid = responseJson.data.invoice.paid_amount;
        // let Unpaid = responseJson.data.invoice.total_amount;
        // let total = responseJson.data.invoice.balance;


        // AsyncStorage.setItem('paid',paid)
        // AsyncStorage.setItem('Unpaid',Unpaid)
        // AsyncStorage.setItem('total',total)

        // AppConstance.PAID = paid;
        // AppConstance.UNPAID = Unpaid;
        // AppConstance.TOTAL =total; 
          
          let data = responseJson.data
          console.warn('json value', data)
          AppConstance.USER_INFO.USER_ID = data.id;
          AppConstance.USER_INFO.USER_NAME = data.username;
          AppConstance.USER_INFO.USER_TOKEN = data.auth_key;
          AppConstance.USER_INFO.USER_EMAIL = data.email;
          AppConstance.USER_INFO.USER_STATUS = data.status;
          AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
          AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
          AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
          AppConstance.USER_INFO.USER_CITY = data.city;
          AppConstance.USER_INFO.USER_STATE = data.state;
          AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
          AppConstance.USER_INFO.USER_MOBILE = data.phone;
          AppConstance.USER_INFO.USER_FAX = data.fax;
          AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
          AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;


// AsyncStorage.setItem('k','1')

          navigation.navigate('Dashboardmain')

          setspinner(false)


          // //this.props.navigation.goBack();
          // this.props.navigation.navigate('NavigationSideScreen')
      })
      .catch((error) => {
          this.setState({ isLoading: false })
          console.warn('user error'+error)
      });
}



// useEffect(() => {

//   const unsubscribe = NetInfo.addEventListener(state => {
//     console.log("Connection type", state.type);
//     console.log("Is connected?", state.isConnected);
//   });
  
//   // Unsubscribe
//   unsubscribe();

  
// }, []);   










  return (
    <SafeAreaView style={{  backgroundColor: 'white', height: deviceHeight, }}>
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Sign In</Text>
</View>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}

>



</TouchableOpacity>
</View>


<View

style={{height:100,marginTop:50,}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal.jpg')}/>

</View>





<View style={{flexDirection:'column', width:'85%', justifyContent:'center',backgroundColor:'#4093c3',opacity:0.9,paddingVertical:5, paddingHorizontal:7, alignSelf:'center', marginTop:70,borderWidth:0.7,borderColor:'#064992', borderRadius:10,}}>
<View style={{flexDirection:'row',marginLeft:5, width:'100%'}}>
<MaterialIcons name='alternate-email' color='white' style={{justifyContent:'center', alignSelf:'center'}} size={20} />
<TextInput
      style={{ height: 55,width:'90%', paddingHorizontal:10,marginLeft:5,fontSize:16  }}
      // onChangeText={text => onChangeText(text)}
      onChangeText={(text) => {setemail(text) }}
      
      placeholder="Username"
      placeholderTextColor='white'
        underlineColorAndroid="transparent"
    />

</View>
<View style={{height:1, backgroundColor:'#F8F9F9',opacity:0.8,  justifyContent:'center', alignSelf:'center',marginVertical:1, width:'80%'}}>

</View>
    
<View style={{flexDirection:'row',marginLeft:5,}}>
<SimpleLineIcons  name='lock' color='white'  style={{justifyContent:'center', alignSelf:'center'}} size={20}  />
<TextInput
      style={{ height: 55,width:'100%',borderColor:'#2ECC71',  paddingHorizontal:10,marginLeft:5,fontSize:16    }}
      onChangeText={(text) =>  setpass(text)}
      placeholder="Password"
      placeholderTextColor='white'
      

      inlineImageLeft='search_icon'
    />


</View>

</View>







<View style={{width:'100%',flexDirection:'column',marginTop:10, elevation:5, borderTopRightRadius:40,borderTopLeftRadius:40, paddingHorizontal:40}}>




<TouchableOpacity style={{ marginTop:1}}>

<Text style={{alignSelf:'flex-end', color:'white', fontWeight:'bold',fontSize:14}}>Forgot Password</Text>
</TouchableOpacity>

<TouchableOpacity
                        onPress={() =>           
                          callingLoginApi()
                          // navigation.navigate('Dashboardmain')
                          // navigation.openDrawer()

                      }

// onPress={()=> {AppConstance.IS_USER_LOGIN='1';navigation.navigate('Dashboard')}}
 style={{width: '100%',marginVertical:20,justifyContent:'center',borderRadius:10,borderColor:'white',borderWidth:1, alignSelf:'center',backgroundColor:'#053e86',
    height: 43,}}>
     
        <Text style={{  color: 'white',
    fontSize: 16, alignSelf:'center'}}>SIGN IN</Text>
      </TouchableOpacity>


</View>










        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Signin;
