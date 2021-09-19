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
  FlatList,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection'
const ContainerTracking = ({ navigation }) => {

  const [   vehicleList ,setvehicleList ] = useState([]) 

  const[spinner , setspinner] = useState(false)
  const[search , setsearch] =useState('')
  const[res , setres] = useState('0')
  const onChangeText = (Text) =>{

    setsearch(Text)
  
  }
  const searchingApi =()=>{
  
     setspinner(true)
  
  
    var url = '';
        url = AppUrlCollection.CONTAINER_TRACKING + 'search=' + search;
    
    
    
        fetch(url , {
        method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              // 'authkey': AppConstance.USER_INFO.USER_TOKEN
          },
      })
          .then((response) => response.json())
          .then((responseJson) => {
    
            console.warn( 'response');
              if (responseJson.status == AppConstance.API_SUCESSCODE) {
                console.warn('response of trackinh seach is :::::::::::'+responseJson.data.export);
                let data = responseJson.data.export;
  
                
                  setvehicleList(responseJson.data.export)
                  setspinner(false)

                  console.warn(data.length);
                  setres(data.length)
                // if(data != null){
                //     // let vexp =responseJson.data.vehicleList[0].vehicleExport;
                //     // let exp =responseJson.data.vehicleList[0].vehicleExport.export;
                //     // let img =responseJson.data.vehicleList[0].images;
                //     // let towing = responseJson.data.vehicleList[0].towingRequest;
                //     setvehicleList(data)
                //     // navigation.navigate('TrackingSearchDetails',{datapre : data, img:img , exp:exp,tow:towing, vexp,vexp})
                //     setspinner(false)
  
                //   // alert(exports)
  
                // }else{
                //   alert('No Data Found')
                //   setspinner(false)
  
                // }
                 
                // navigation.navigate('TrackingSearchDetails',{})
                  //this.setState({ noMoreDataFound: false })
              } else {
                
                setspinner(false)
    
                 // this.setState({ isLoading: false, isFooterLoading: false })
                 // this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
                  // AppConstance.showSnackbarMessage(responseJson.message)
              }
          })
          .catch((error) => {
            setspinner(false)
    
            alert(error)
              console.warn(error)
          });
    
  
  
      
     
  
  
  
  
  }


const    renderVehicle = ({ item, index }) => {
  return(
    <TouchableOpacity style={{width:'100%',height:80, borderRadius:5,marginTop:5, borderWidth:0.4,borderColor:'white', flexDirection:'row'}}>
<View style={{ width: '30%',justifyContent:'center', height: 80 }}
            // onPress = {()=>this.callingVehicleDetailSCreen(item)}
        >
            {item.exportImages.length > 0 ?
                <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: imageBasePath + item.exportImages[0].thumbnail }} /> :
                <Image style={{width: undefined, height: undefined, flex: 1, resizeMode:'stretch', borderRadius:5, }} source={require('../images/logofinal.jpg')} />}

        </View>  
        <View style={{width:'5%'}}>

        </View>
       <View style={{width:'64%', height:'100%',justifyContent:'center'}}>
         <Text style={{color:'white'}}>Container No : {item.container_number}</Text>
         <Text style={{color:'white'}}>Port of : {item.port != undefined && item.port_of_loading != null && item.port.port_of_loading != null && item.port_of_loading != '' ? item.port.port_name : '-'  }</Text>
         <Text style={{color:'white'}}>ETA : {item.eta}</Text>
       

       </View>
          </TouchableOpacity>
  );

}

  return (
    <SafeAreaView style={{  backgroundColor: AppColors.transplant, height: deviceHeight, }}>
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container Tracking </Text>
</View>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}

>



</TouchableOpacity>
</View>


<Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', color:'white'}}> Search</Text>
<Text style={{alignSelf:'center', fontSize:14, fontWeight:'bold', color:'white'}}>({res})  Results</Text>
{/* <View

style={{height:100,marginTop:50,}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal.jpg')}/>

</View> */}

<View style={{marginHorizontal:20,justifyContent:'center', borderRadius:20,backgroundColor:'white',marginTop:10, flexDirection:'row'}}>
  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => onChangeText(text)}
  onSubmitEditing={(Text) => searchingApi(Text)}
  // this.callingVehicleContainerService()
  placeholder="Search container by Booking NO or Container NO"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  
  <Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

</View>
<View style={{width:deviceWidth, paddingHorizontal:20,marginTop:5,}}>
<FlatList
                        style={{ marginBottom:110, }}
                        data={vehicleList}
                        renderItem={renderVehicle}
                        keyExtractor={(item, index) => index}
                      
                    />

</View>

{/* <View style={{width:'100%',flexDirection:'column',marginTop:15, height:70, paddingHorizontal:30}}> */}


{/* {vehicleList.length > 0 ? <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={vehicleList}
                        renderItem={renderVehicle}
                        keyExtractor={(item, index) => index}
                      
                    />
                </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                        
                            color: AppColors.textColor, fontSize: 15
                        }}>Container data not found</Text>
                    </View>} */}
    {/* </View> */}









        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default ContainerTracking;
