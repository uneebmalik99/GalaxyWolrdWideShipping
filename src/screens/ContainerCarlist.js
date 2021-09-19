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
import { set } from 'react-native-reanimated';


var imageBasePath = '';

const ContainerCarlist = ({route, navigation }) => {
  const [spinner , setspinner] =useState(false)
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)

  // const [loc , setloc] = useState('')
  const [search, setSearch] = useState('');
  const [   vehicleList ,setvehicleList ] = useState([{
    id:1
  }]) 

  const [page ,setpage] = useState(1);
  const [data, setdata] = useState([
      {
          id:7
      },
      {
        id:7
    }
    ,{
        id:7
    },
    {
      id:7
  }
  ,
{
id:7
}
,{
id:7
}
  

  ]
)

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



const callingContainerApi = (isFirstTimeCaling) => {
  var url = ''
  if (isFirstTimeCaling) {
    setspinner(false)
    setisFooterLoading(false)
      // this.setState({ isLoading: true, isFooterLoading: false })
      url = AppUrlCollection.VEHICLE_CONTAINER + 'page=1'  
  } else {
    setspinner(false)
    setisFooterLoading(true)
      // this.setState({ isLoading: false, isFooterLoading: true })
      url = AppUrlCollection.VEHICLE_CONTAINER +  'page=' + page
  }
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'multipart/form-data',
          //  'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {
          // this.setState({ isLoading: false })
        setspinner(false)
          console.log('Response data viw :: ', responseJson)
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              imageBasePath = responseJson.data.other.vehicle_image
              if (responseJson.data.vehicleList.length > 0) {
                  if (isFirstTimeCaling) {
                    setvehicleList(responseJson.data.vehicleList)
                    setnoMoreDataFound(false)
                    setisFooterLoading(false)
                      // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                  } else {
                    
                    setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
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


useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
// setspinner(true)
//   callingVehicleApi(true)
  // return () => {
    callingContainerApi(true)
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  callingContainerApi()
   
}, []);   

const renderlist = ({item}) =>{
  
  return(
<View style={{width:deviceWidth, paddingHorizontal:15}}>
<TouchableOpacity style={{flexDirection:'row',  alignSelf:'center',backgroundColor:'#E5E7E9',borderRadius:10,paddingHorizontal:8, borderColor:'grey', width:'100%',height:80,justifyContent:'center', borderBottomWidth:0.2}} 
onPress={() =>  navigation.navigate('containerinfo')}
>


<View style={{width:'50%',flexDirection:'column',justifyContent:'center', }}>
<Text >ContainerNumber</Text>
<Text>Port Of Loading</Text>
<Text>ETA</Text>
<Text>Status</Text>

</View>
    


<View style={{width:'50%', justifyContent:'center', }}>
<Text >MUh3663352355</Text>
<Text>TX</Text>
<Text>20-12-2020</Text>
<Text>Arrived</Text>
</View>    


</TouchableOpacity>

  
  </View>
  )
  
   }

  return (

<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >

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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>

<View style={{width:deviceWidth , height:deviceHeight}}>

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
                  <View style={{height:50}}>

                  </View>

</View>

{/* <View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View> */}



    </SafeAreaView>
    </ImageBackground>


  );
};


export default ContainerCarlist;
