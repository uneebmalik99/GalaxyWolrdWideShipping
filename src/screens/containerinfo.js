import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
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
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';


var baseImagePath = '';

const containerinfo = ({route, navigation }) => {
  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState('');

  const [data, setdata] = useState([
      {
          id:7
      },
      {
        id:7
    }
    ,{
        id:7
    }
    

  ]
)


const callingVehicleApi = async (isCallingFirsttime) => {
  if (isCallingFirsttime) {
     // this.setState({ isLoading: true, isFooterLoading: false })
  } else {
      //this.setState({ isLoading: false, isFooterLoading: true })
  }
//  console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
  // fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {

var url = AppUrlCollection.VEHILE_LIST;
if(type !== 'total'){
  url = AppUrlCollection.VEHILE_LIST + 'location='+type
}
//else{
//   url = AppUrlCollection.VEHILE_LIST;
// }

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              baseImagePath = responseJson.data.other.vehicle_image;
              let data = responseJson.data.vehicleList;
              //this.setState({ isLoading: false, isFooterLoading: false })
              if (data.length > 0) {
                setspinner(false)
                  // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                  //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                  setdata(data)
              } else {
                setdata(data)
                setspinner(false)


                 // this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
              }
             
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


useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
// setspinner(true)
//   callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
   
}, []);   

const renderlist = ({item}) =>{
  
  return(
    
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center', borderColor:'white', width:'100%',height:80,justifyContent:'center', borderTopWidth:0.8}} 
onPress={() =>  navigation.navigate('CarDetails')}
>

    
<Image source={require('../images/logofinal.jpeg')} style={{ width: 75, height: 75,alignSelf:'center', borderRadius:400/2 ,  }} resizeMode='contain' />

<View style={{width:'10%'}}>

</View>
<View style={{flexDirection:'column',justifyContent:'center', width:'70.4%',}} >
<View style={{borderBottomWidth:0.8, borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1, fontSize:12.2}}>2020 toyota corolla</Text>
</View>


<View style={{borderBottomWidth:0.8,paddingVertical:1,borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>lot: 575755755</Text>
</View>



<View style={{borderBottomWidth:0.8,paddingVertical:1, borderColor:'white', width:'100%'}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>Port of landing: TX</Text>
</View>


<View style={{ width:'100%',paddingVertical:1,}}>
<Text style={{paddingVertical:1,fontSize:12.2 }}>Status: Arrived</Text>
</View>






</View>
</TouchableOpacity>
  
  )
  
   }

  return (

    <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight,  }} >

    <SafeAreaView style={{ flex: 1,width:deviceWidth, height: deviceHeight, }}>


<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />



<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container Info</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{width:deviceWidth , height:deviceHeight}}>



<View style={{flexDirection:'row',marginTop:5,paddingVertical:5, width:'100%',paddingHorizontal:20, }}>


<View style={{width:'50%',flexDirection:'column',justifyContent:'center', }}>


<Text >ContainerNumber</Text>
<Text>Booking Number</Text>
<Text>Port Of Loading</Text>

<Text>Export Date</Text>


<Text>ETA</Text>
<Text>Arrived Date</Text>

<Text>Status</Text>

</View>
    


<View style={{width:'50%', justifyContent:'center', }}>
<Text >MUh3663352355</Text>
<Text>t5675757577</Text>
<Text>TX</Text>
<Text>20-12-2020</Text>
<Text>20-12-2020</Text>

<Text>20-12-2020</Text>
<Text>Arrived</Text>
</View>   

</View>



<View style={{backgroundColor:'orange', justifyContent:'center',}}>
    <Text style={{alignSelf:'center',paddingVertical:5}}>Vehicles in Container</Text>
</View>

<FlatList
                         contentContainerStyle={{paddingHorizontal:15,marginTop:0, paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />

</View>

{/* <View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View> */}



    </SafeAreaView>
    </ImageBackground>


  );
};


export default containerinfo;
