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

const invoicelist = ({route, navigation }) => {
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
    },   {
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

const renderSeparator =()=>{
  return(
<View style={{height:4, width:deviceWidth, }}></View>
  );
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
<View style={{width:deviceWidth, paddingHorizontal:15}}>
  <TouchableOpacity style={{flexDirection:'row', borderColor:'grey', backgroundColor:'#E5E7E9',borderRadius:50,paddingRight:10,  width:'100%', height:65,justifyContent:'center', borderWidth:0.2}} 
onPress={() =>  navigation.navigate('invoiceview')}
>

    <View style={{width:'17.5%', height:'100%'}}>
<Image source={require('../images/iii.jpg')} style={{ width: 64.5, height: 64.5,alignSelf:'center', borderRadius:400/2 ,}} resizeMode='cover' />
</View>
<View style={{width:Platform.OS === 'ios' ? '10%' :'8%',}}>

</View>
<View style={{flexDirection:'column', justifyContent:'center', width:'69%',}} >
<View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>Invoice #</Text>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>CT4657778</Text>

</View>


<View style={{justifyContent:'space-between',flexDirection:'row', paddingVertical:1, width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Amount</Text>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>2000</Text>

</View>



<View style={{paddingVertical:1,justifyContent:'space-between',flexDirection:'row',   width:'100%'}}>
<Text style={{paddingVertical:1,color:'#497ebf',fontSize:12.2 }}>Status</Text>
<Text style={{paddingVertical:1,color:'#497ebf', fontSize:12.2}}>Paid</Text>

</View>









</View>
<View style={{width:'4%',}}>

</View>
</TouchableOpacity>

</View>

  
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Account View</Text>
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
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search invoice#, Lot#, VIN"
        />
</View>


<View style={{height:45,flexDirection:'row',justifyContent:'center',marginTop:10,paddingHorizontal:3, width:deviceWidth,}}>

<TouchableOpacity style={{width:'15%',backgroundColor:'orange',borderRadius:10, shadowColor: 'grey',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.6,
   shadowRadius: 1,
   elevation: 5,  justifyContent:'center'}}>

<Text style={{fontSize:15,color:'#F2F3F4', alignSelf:'center'}}>All</Text>    
</TouchableOpacity>



<TouchableOpacity style={{borderWidth:0.4,borderColor:'grey',width:'15%',marginLeft:1, 
shadowColor: 'grey',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.6,
shadowRadius: 1,
elevation: 5,backgroundColor:'orange',borderRadius:10, justifyContent:'center'}}>

<Text style={{fontSize:15,color:'white', alignSelf:'center'}}>Paid</Text>    
</TouchableOpacity>





<TouchableOpacity style={{borderWidth:0.4,borderColor:'grey',width:'15%', marginLeft:1,
shadowColor: 'grey',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.6,
shadowRadius: 1,
elevation: 5, backgroundColor:'orange',borderRadius:10,justifyContent:'center'}}>

<Text style={{fontSize:15,color:'white', alignSelf:'center'}}>Unpaid</Text>    
</TouchableOpacity>



<TouchableOpacity style={{borderWidth:0.4,borderColor:'grey',width:'15%',marginLeft:1,
shadowColor: 'grey',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.6,
shadowRadius: 1,
elevation: 5, backgroundColor:'orange',borderRadius:10, justifyContent:'center'}}>

<Text style={{fontSize:15,color:'white', alignSelf:'center'}}>Partail</Text>    
</TouchableOpacity>





<TouchableOpacity style={{borderWidth:0.4,borderColor:'grey',width:'20%', marginLeft:1,
shadowColor: 'grey',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.6,
shadowRadius: 1,
elevation: 5, backgroundColor:'orange',borderRadius:10,justifyContent:'center'}}>

<Text style={{fontSize:13,color:'white', alignSelf:'center'}}>Passed Due</Text>    
</TouchableOpacity>


<TouchableOpacity style={{borderWidth:0.4,borderColor:'grey',width:'20%',shadowColor: 'grey',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.6,
   shadowRadius: 1,
   elevation: 5, marginLeft:1, backgroundColor:'orange',borderRadius:10, justifyContent:'center'}}>

<Text style={{fontSize:13,textAlign:'center',color:'white', alignSelf:'center'}}>Payment History</Text>    
</TouchableOpacity>


</View>
<FlatList
                         contentContainerStyle={{ marginTop:10, }}
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


export default invoicelist;
