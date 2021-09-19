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

let imageBasePath;
const Dashboard = ({ navigation }) => {


const [vin , setvin] = useState(true)
  const[spinner , setspinner] = useState(false)
  const[data , setdata] = useState([])
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)
  const [FilteredDataSource , setFilteredDataSource ] = useState([])
  const [vehicleList , setvehicleList] = useState([])
  const [ Search , setSearch ] = useState()
  const toggleSwitch = (value) => {
    //To handle switch toggle
    console.warn(value);
    setvin(value)
    // setvin(value);
    //State changes according to switch
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log(text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = vehicleList.filter(
        function (item) {
      
// alert(item.vehicle[0].lot_number)
        
// 
          //  const itemdata4 = [];
          //  if(vehicle.length !== null){
          //    for(i=0 ; i<v.length ;i++ ){

          //    }
           
          //   }
        //  let myObj = v.find(obj => obj.lot_number.indexOf(text));      

        //  console.log('=='+myObj);
          // const itemdata2 = item.VIN
          
          const itemData = item.vin
            ? item.vin.toUpperCase()
            : ''.toUpperCase();

        const textData = text.toUpperCase();


        itemData.indexOf(textData) > -1  

                 return itemData.indexOf(textData) > -1;   
               
            // const itemData2 = item.vehicle.lot
            // ? item.lot_number.toUpperCase()
            // : ''.toUpperCase();
            
            // const itemdata2 = item.booking_number
            // ? item.booking_number.toUpperCase()
            // : ''.toUpperCase();
          
            // let itemdata3 = '' ;
            // let itemdata4 = '';
            // item.vehicle[0].lot_number  ? item.vehicle[0].lot_number.toUpperCase()
            // : ''.toUpperCase();
            // var dataitem6 ;

          // for(let i =0 ; i < item.vehicle.length ; i++){
          //   itemdata3 += ','+ item.vehicle[i].lot_number
          //   itemdata4 += ','+ item.vehicle[i].vin

          // }
          // itemdata3 = itemdata3.replace(/^\,/, "");
          // itemdata4 = itemdata4.replace(/^\,/, "");


          //   console.log('sfnsdifjfks'+ itemdata3+'------');

          //   const textData = text.toUpperCase();
          
          //   if(itemData.indexOf(textData) > -1){
          //     return itemData.indexOf(textData) > -1;
          //   }else if(itemdata2.indexOf(textData) > -1){
          //     return itemdata2.indexOf(textData) > -1;
          //   }else   
          //    if(itemdata3.indexOf(textData) > -1  ){

          //     return itemdata3.indexOf(textData) > -1;   
          //   }else   
          //   if(itemdata4.indexOf(textData) > -1  ){

          //    return itemdata4.indexOf(textData) > -1;   
          //  }
   
      });
      setFilteredDataSource(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  
  const callingContainerApi = (isFirstTimeCaling) => {
    setspinner(true)
    var url = ''
    if (isFirstTimeCaling) {
      setspinner(false)
      setisFooterLoading(false)
        // this.setState({ isLoading: true, isFooterLoading: false })
        url = AppUrlCollection.VEHILE_LIST
    } else {
      setspinner(false)
      setisFooterLoading(true)
        // this.setState({ isLoading: false, isFooterLoading: true })
        url = AppUrlCollection.VEHILE_LIST 
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
                imageBasePath = responseJson.data.other.vehicle_image
                if (responseJson.data.vehicleList.length > 0) {
                  console.log('response'+responseJson.data.vehicleList);
                    if (isFirstTimeCaling) {
                      setvehicleList(responseJson.data.vehicleList)
                      setFilteredDataSource(responseJson.data.vehicleList)

                      setnoMoreDataFound(false)
                      setisFooterLoading(false)
                      setspinner(false)
                        // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                    } else {
                      
                      setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
                      setFilteredDataSource(old =>[...old, ...responseJson.data.vehicleList])

                      setdata(old => [...old, ...data]);
  
                      setnoMoreDataFound(false)
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                    }
                } else {
                    if (isFirstTimeCaling) {
                      setvehicleList([])
                      setFilteredDataSource([])
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

    var img = [];





    // console.log('images ----- '+JSON.stringify(item.images));

  console.log('items are'+JSON.stringify(item.images));    

  if (item.images != undefined && item.images != null) {
    // setimg(responseJson.data.vehicle.images)
    for (let index = 0; index < item.images.length; index++) {
        const element = item.images[index];
        img.push('https://erp.gwwshipping.com/uploads/' + element.thumbnail)
        console.log('Image vehicle :;;', 'https://erp.gwwshipping.com/uploads/' + element.thumbnail)
    }

  }
//   else{

//     for (let index = 0; index < vehicleDetails.images.length; index++) {
//       const element = vehicleDetails.images[index];
//       images.push(baseImagePath + element.thumbnail)
//       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
//   }
// }
    img ==  "https://erp.gwwshipping.com/uploads/thumb-g_Q7gJSp57bzU7J3TuKZi17TVCz_uZM3.jpeg"

    // if (item.images.length > 0) {

    //   for(let i =0 ; i < item.images.length ; i++){
    //     img +=  'https://erp.gwwshipping.com/uploads/'+ item.images[i].thumbnail + ','

    //   }
    //   console.warn('here is images'+img);
    //   // alert('vghv')
    //   // setimg(item.images)
    //   // for (let index = 0; index < item.images.length; index++) {
    //   //     const element = item.images[index];

    //   //     img.push('https://erp.gwwshipping.com/uploads/' + element.thumbnail)
    //   //     console.log('Image vehicle :;;',  + element.thumbnail)
    //   // }
  
    // }
  //   else{

  //     for (let index = 0; index < vehicleDetails.images.length; index++) {
  //       const element = vehicleDetails.images[index];
  //       images.push(baseImagePath + element.thumbnail)
  //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
  //   }
  // }

    return(
      <TouchableOpacity style={{width:'100%',backgroundColor:'white',borderTopLeftRadius:10 , borderBottomRightRadius:10,  marginTop:5, borderWidth:0.2,borderColor:'white', flexDirection:'column'}}
      
      onPress={()=>navigation.navigate('Vehicle', {'item' : item})}
      >
 {/* {img == null ? */}
 <SliderBox 
          images={img}
          sliderBoxHeight={160}
          
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    
  }}
          resizeMethed={'resize'}  
          resizeMode={'cover'}
  circleLoop

  // currentImageEmitter={index => { setimgpos(index); 
  //  }}

          // onCurrentImagePressed={index =>
          // //setcurrentimg()
          //   // console.warn(`image ${index} pressed`)
          //   setSliderModel(true)
          // }
 
  ImageComponentStyle={{borderTopLeftRadius:10 ,width:'95%',marginLeft:-21,}}
        />
        {/* :null} */}
 
 <View style={{width:'94%',flexDirection:'row', justifyContent:'space-between',marginVertical:5, alignSelf:'center'}}>
<View style={{width:'35%'}}>
<Text style={{paddingVertical:2,}}>VIN NO:</Text>
<Text style={{paddingVertical:2,}}>CUSTOMER:</Text>
<Text style={{paddingVertical:2,}}>LOT NO:</Text>
</View>
<View style={{width:'68%', }}>
<Text style={{paddingVertical:2,}}>{item.vin}</Text>
<Text style={{paddingVertical:2,}}>{item.customer_name}</Text>
<Text style={{paddingVertical:2,}}>{item.lot_number}</Text>
</View>
 </View>
 
             </TouchableOpacity>
    );
  
  }


  useEffect(() => {
    setspinner(true)
    callingContainerApi(true)
    // setspinner(true)
    // callingdashboardApi()
    // setspinner(false)
  
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Dashboard </Text>
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

<View style={{marginHorizontal:17,justifyContent:'center', borderRadius:20,backgroundColor:'white',marginTop:10, flexDirection:'row'}}>
  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchFilterFunction(Text)}
  // this.callingVehicleContainerService()
  placeholder="Enter vin or lot number"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  
  <Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

</View>

<View style={{flexDirection:'row', width:'90%', justifyContent:'space-between', alignSelf:'center', marginVertical:10,}}>

  <Text style={{alignSelf:'center', color:'white', fontWeight:'300', fontSize:16}}>Search By Vin</Text>
  <Switch 
  onValueChange={toggleSwitch}
  value ={vin}
  />
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









export default Dashboard;
