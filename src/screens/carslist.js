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
  TextInput,
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

const carslist = ({route, navigation }) => {
  const { type} = route.params;
  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')

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
const renderSeparator =()=>{
  return(
<View style={{height:4, width:deviceWidth, }}></View>
  );
}
const renderlist = ({item}) =>{
  
  return(
    
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center',backgroundColor:'#E5E7E9', borderColor:'grey',borderRadius:50, width:'100%',height:80,justifyContent:'center', borderWidth:0.1, }} 
onPress={() =>  navigation.navigate('CarDetails')}
>

    
<Image source={require('../images/iii.jpg')} style={{ width: 80, height: 80,alignSelf:'center',marginRight:5, borderRadius:400/2 , }} resizeMode='cover' />

<View style={{width:'8%'}}>

</View>
<View style={{flexDirection:'column',justifyContent:'center', width:'69.0%',}} >
<View style={{ width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>2020 toyota corolla</Text>
</View>


<View style={{paddingVertical:1,width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2 }}>lot: 575755755</Text>
</View>



<View style={{paddingVertical:1,  width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Purchase Date: 20-10-2020</Text>
</View>


<View style={{ width:'100%',paddingVertical:1,}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Status: Arrived</Text>
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>{type}</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{width:deviceWidth , height:deviceHeight}}>
<View

style={{height:50,paddingHorizontal:15, justifyContent:'center'}}>
 <TextInput
          style={{height:35,
    borderWidth: 0.4,
    paddingLeft: 20,
    borderRadius:30,
    fontSize:14,
    paddingVertical:5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',}}
          onChangeText={(text) => searchFilterFunction(text)}
          underlineColorAndroid="transparent"
          placeholder="Search Container Number,status,port of loading"
        />
</View>

<FlatList
                         contentContainerStyle={{paddingHorizontal:15,marginTop:15, }}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                     ItemSeparatorComponent={renderSeparator}

                    
 
                     
 
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


export default carslist;
