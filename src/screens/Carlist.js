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
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';


var baseImagePath = '';

const Carlist = ({route, navigation }) => {
  const { type, title } = route.params;
  const [spinner , setspinner] =useState(false)
  // const [loc , setloc] = useState('')

  const [data, setdata] = useState([
    

  ]
)
//   const [data, setdata] = useState([
//     {
//       date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
 
//     },
    

//     {
//     date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
//     },

//     {
//       date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
//     },

//   ]
// )

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
setspinner(true)
  callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
   
}, []);   

const renderlist = ({item}) =>{
  let loc = '';
if(item.location == '1' ){
  loc = 'LA'

}else if(item.location == '2' ){
  loc ='GA'

}else if(item.location == '3'){
  loc ='NJ'

}else if(item.location == '4'){
  loc ='TX'

}else if(item.location == '5'){
  loc ='TX2'

}else if(item.location == '6'){
  loc ='NJ2'

}else if(item.location == '7'){
  loc ='CA'

}
  return(
    
<View style={{flexDirection:'row',alignSelf:'center', marginTop:10, paddingHorizontal:5, width:'100%',height:78}} >

<TouchableOpacity
onPress={()=>navigation.navigate('CarDetails',{ type:type, datapre : item, baseImagePath: baseImagePath,})}

style={{width:'63%', paddingVertical:3,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>
{/* {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />} */}

{item.images.length > 0 ?
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    // <Image style={{width:'35%',height:'100%', resizeMode:'cover'}}  source={require('../images/logofinal.png')} />}
null}

{/* <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={require('../images/img-0928-1535139376.jpg')} /> */}

<View style={{ height:'100%',marginLeft:2,justifyContent:'center',width:'65%'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>{item.year} {item.make} {item.model}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>Lot: {item.lot_number}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>{item.vin}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('CarDetails',{datapre:item, type:type , baseImagePath: imageBasePath,})}

style={{width:'35.7%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>STATUS: {item.status}</Text>



<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>ETA DATE: 03/10/2020</Text>


<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>LOCATION: {loc}</Text>




</View>

</TouchableOpacity>

</View>

  
  
  )
  
   }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>


<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.goBack()}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>
<Text style={{alignSelf:'center', marginLeft:6}}>inventory {data.length}</Text>
</View>
<View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View>


<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

<FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />

                  </View>

    </SafeAreaView>

  );
};


export default Carlist;
