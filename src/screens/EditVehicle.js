import React,{useState,useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
  Share,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { Icon} from 'react-native-elements'
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInput } from 'react-native-gesture-handler';
import Feather from  'react-native-vector-icons/dist/Feather'
import RadioButtonRN from 'radio-buttons-react-native';
import AppUrlCollection from '../UrlCollection/AppUrlCollection'
import DatePicker from 'react-native-datepicker';
import Animated, { cond } from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
import ImageCropPicker from 'react-native-image-crop-picker';
import { RadioButton } from 'react-native-paper';


const images = [



    
    
];

const EditVehicle = ({route, navigation }) => {
  const refRBSheet = useRef();

  const { item } = route.params;
const [details , setdetails] = useState(item)

const picture = [
  {
    label: 'PICTURES'
  }
  ]  
  
const [Customerlist , setCustomerlist ] = useState([])
const [Filteredcustomer , setFilteredcustomer ] = useState([])
const[Search , setSearch]= useState()
 const [customername , setcustomername] = useState(item.customer_name)
  const [location_id ,setlocation_id ] = useState(item.location)
  const [location_name, setlocation_name] = useState()
  const [location , setlocation ] = useState(item.location);
  const [make , setmake ] = useState(item.make);
  const [model , setmodel ] = useState(item.model);
  const [color , setcolor ] = useState(item.color);
  const [weight , setweight ] = useState(item.weight);
  const [year , setyear ] = useState(item.year);
  const [hatnumber , sethatnumber ] = useState(item.hat_number);
  const [licensenumber , setlicensenumber ] = useState(item.hat_number);
  const [lotnumber , setlotnumber ] = useState(item.lot_number);
  const [containernmber , setcontainernmber] = useState()
  const [status , setstatus ] = useState();
  const [condition , setcondition ] = useState();
  const [damaged , setdamaged ] = useState();
  const [titlenumber , settitlenumber ] = useState();
  const [pictures , setpictures] = useState();
  const [deliverdate , setdeliverdate ] = useState();
  const [pickupdate , setpickupdate] = useState();
  const [note , setnote ] = useState();
  const [checkoption , setcheckoption ] = useState();
  const [ KEYS ,setKEYS ] = useState('');
  const [ CDPLAYER ,setCDPLAYER ] = useState('');
  const [ SPEAKER ,setSPEAKER ] = useState('');
  const [ WHEELCAPS ,setWHEELCAPS] = useState('');
  const [ MIRROR ,setMIRROR] = useState('');
  const [ OTHERS ,setOTHERS ] = useState('');

  const [frontwindshiled , setfrontwindshiled ] = useState();
  const [bonnet , setbonnet ] = useState();
  const [grill , setgrill ] = useState();
  const [frontbumper , setfrontbumper ] = useState();
  const [frontheadlight , setfrontheadlight ] = useState();
  const [rearwindshield , setrearwindshield ] = useState();
  const [trunkdoor , settrunkdoor ] = useState();
  const [rearbumper , setrearbumper ] = useState();
  const [rearbumpersupport , setrearbumpersupport ] = useState();
  const [taillamp , settaillamp ] = useState();
  const [frontleftfender , setfrontleftfender ] = useState();
  const [leftfrontdoor , setleftfrontdoor ] = useState();
  const [leftreardoor , setleftreardoor ] = useState();
  const [leftrearfender , setleftrearfender ] = useState();
  const [pillar , setpillar ] = useState();
  const [roof, setroof] =useState();
  const [rightrearfender , setrightrearfender ] = useState();
  const [rightreardoor , setrightreardoor ] = useState();
  const [rightfrontdoor , setrightfrontdoor ] = useState();
  const [frontrightfender , setfrontrightfender ] = useState();
  
  const Damaged = [
    {
      label: 'Yes'
     },
     {
      label: 'NO'
     },
    ];
  const [vehicleDetails , setvehicleDetails] = useState([''])
  const [locationslist , setlocationslist] = useState([
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    }

  ])
  const [locmodal,setlocmodal]= useState(false)
  const [custmodal,setcustmodal]= useState(false)
  const [imgpos, setimgpos] = useState(0)
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
  const [Export, setExport] = useState(false)
  const [data, setdata] = useState([
  {
    date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',

  },
  

  {
  date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',
  },

  {
    date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',
  },

]
)
const [date, setDate] = useState('09-10-2020');

const TakePhoto=()=>{
  ImageCropPicker.openCamera({
    width: 300,
    height: 400,
    cropping: false,
  }).then(image => {
    console.log(image1);
    refRBSheet.current.close()

    console.log(images1);
    console.log(images1.length);
    var i ;
    for (i = 0 ; i<images1.length ; i++){
      images.push(images1[i].sourceURL)
    }
  });
}
const searchFilterFunction = (text) => {
  if (text) {
  
    const newData = Customerlist.filter(function (item) {
      const itemData = item.text
        ? item.text.toUpperCase().trim() 
        : ''.toUpperCase();

      let textData = text.toUpperCase();
      textData = textData.trim()
      console.log(textData+'===='+itemData);
      return itemData.indexOf(textData) > -1;
    });
    setFilteredcustomer(newData);
    setSearch(text);
  } else {

    setFilteredcustomer(Customerlist);
    setSearch(text);
  }
};

const searchingCustomer = (text) => {
  if (text) {
    console.log('text is '+text);
console.log('-----==---'+Customerlist.length);
    const newData = Customerlist.filter(
      function (item) {

        const itemData = item.text
          ? item.text.toUpperCase()
          : ''.toUpperCase();

          console.log('--'+itemData);
      const textData = text.toUpperCase();
      // itemData.indexOf(textData) > -1  
      return itemData.indexOf(textData) > -1;

      //  if(itemData.indexOf(textData)  -1){
      //   return  itemData.indexOf(textData)  -1;
      // }             
    });
    setFilteredcustomer(newData);
    setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    console.log('blank');
    // Update FilteredDataSource with masterDataSource
    setFilteredcustomer(data);
    setSearch(text);
  }
};

const Selectphoto = () =>{
  ImageCropPicker.openPicker({
    multiple: true
  }).then(images1 => {
    refRBSheet.current.close()

    console.log(images1);
    console.log(images1.length);
    var i ;
    for (i = 0 ; i<images1.length ; i++){
      images.push(images1[i].sourceURL)
    }


  });
}

const callinglocation =() =>{
  let url = AppUrlCollection.LOCATION
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
      setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const callingCustomer =() =>{
  let url = 'https://erp.gwwshipping.com/webapi/vehicle/customer'
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
      setCustomerlist(responseJson.data.results)
      setFilteredcustomer(responseJson.data.results)
      // setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const callingContainerApi = () => {
  setspinner(true)
  var url = AppUrlCollection.VEHICLE_DETAIL + '?id='+ item.id; 
  // if (isFirstTimeCaling) {
  //   setspinner(false)
  //   setisFooterLoading(false)
  //     // this.setState({ isLoading: true, isFooterLoading: false })
  //     url = AppUrlCollection.VEHILE_LIST
  // } else {
  //   setspinner(false)
  //   setisFooterLoading(true)
  //     // this.setState({ isLoading: false, isFooterLoading: true })
  //     url = AppUrlCollection.VEHILE_LIST 
  // }
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
              
              // if (responseJson.data.vehicle ) {
                let data1= responseJson.data.vehicle;
                setdata(responseJson.data.vehicle)

                sethatnumber(data1.hat_number)

                setyear(data1.year)
                setcolor(data1.color)
                setmodel(data1.model)
                setmake(data1.make)
                setweight(data1.weight)

                setlicensenumber(data1.license_number)
                setlotnumber(data1.lot_number)

                setcontainernmber(data1.containernmber)

                let towingRequest = responseJson.data.vehicle.towingRequest;
                // console.log('--=-=-=-=-=-=-'+responseJson.data.vehicle.towingRequest);

                settitlenumber(towingRequest.title_number)
                setdeliverdate(towingRequest.deliver_date)
                setpickupdate(towingRequest.pickup_date)
                setpictures(towingRequest.pictures)
                setdamaged(towingRequest.damaged)
                setcondition(towingRequest.condition)

                setstatus(data1.status)


                switch(data1.location) {
 
                  case '1':
                    setlocation_name('LA')
                      break;
                      case '2':
                        setlocation_name('GA')
                          break;
                      
       
                          case '3':
                            setlocation_name('NY')
                              break;
                          
           
                              case '4':
                                setlocation_name('TX')
                                  break;
                              
               
                                  case '8':
                                    setlocation_name('TORONTO')
                                      break;
                                  
                   
                                      case '9':
                                        setlocation_name('MONTREAL')
                                          break;
                                      
                       
                                          case '10':
                                            setlocation_name('HALIFAX')
                                              break;
                                          
                           
                                              case '11':
                                                setlocation_name('EDMONTON')
                                                  break;
                                              
                                                  case '12':
                                                    setlocation_name('CALGARY')
                                                      break;
                                                  
                                   
                                                      case '13':
                                                        setlocation_name('Afghanistan')
                                                          break;
                                                      
                                       
                                                          case '15':
                                                            setlocation_name('Turkamanistan')
                                                              break;
                                                          
                                           
                                                              case '19':
                                                                setlocation_name('VANCOUVER')
                                                                  break;
                                                                  case '20':
                                                                    setlocation_name('MANITOBA')
                                                                      break;
                                                                      case '21':
                                                                        setlocation_name('WA')
                                                                          break;
                                                              
  

                  default:
                    // alert("NUMBER NOT FOUND");
                    setlocation_name('Please Select Location')
                
                  }


                let condition = responseJson.data.vehicle.vehicleConditions



                for ( var i=0 ; i<condition.length ; i++ ){
                  let element = condition[i].condition.name
                

                switch(element) {
 
                  case 'FRONT WINDSHILED':
                    setfrontwindshiled(condition[i].value)
                      break;
                  
                  case 'BONNET':
                    setbonnet(condition[i].value)
                  
                    break;
             
                  case 'GRILL':
                    setgrill(condition[i].value)
                    break;
             
                  case 'FRONT BUMPER':
                    setfrontbumper(condition[i].value)
                    break;
             
                    case 'FROTN HEAD LIGHT':
                    setfrontheadlight(condition[i].value)
                    break;
                  
                  case 'REAR WINDSHIELD':
                    setrearwindshield(condition[i].value)
                    break

                    case 'TRUNK DOOR':
                    settrunkdoor(condition[i].value)
                    break;
                  
                  case 'REAR BUMPER':
                    setrearbumper(condition[i].value)
                    break

                    case 'REAR BUMPER SUPPORT':
                    setrearbumpersupport(condition[i].value)
                    break;
                  
                  case 'TAIL LAMP':
                    settaillamp(condition[i].value)
                    break

                    case 'FRONT LEFT FENDER':
                    setfrontleftfender(condition[i].value)
                    break;
                  
                  case 'LEFT FRONT DOOR':
                    setleftfrontdoor(condition[i].value)
                    break


                    case 'LEFT REAR DOOR':
                    setleftreardoor(condition[i].value)
                    break;
                  
                  case 'LEFT REAR FENDER':
                    setleftrearfender(condition[i].value)
                    break;







                    case 'PILLAR':
                      setpillar(condition[i].value)
                      break;
                    
                    case 'ROOF':
                      setroof(condition[i].value)
                      break
  
                      case 'RIGHT REAR FENDER':
                      setrightrearfender(condition[i].value)
                      break;
                    
                    case 'RIGHT REAR DOOR':
                      setrightreardoor(condition[i].value)
                      break
  
  
                      case 'RIGHT FRONT DOOR':
                      setrightfrontdoor(condition[i].value)
                      break;
                    
                    case 'FRONT RIGHT FENDER':
                      setfrontrightfender(condition[i].value)
                      break;


                  default:
                    // alert("NUMBER NOT FOUND");
                
                  }
             
                }

                
                
                  // if (isFirstTimeCaling) {
                  //   setvehicleList(responseJson.data.vehicleList)
                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //   setspinner(false)
                  //     // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                  // } else {
                    
                  //   setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
                  //   setdata(old => [...old, ...data]);

                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                  // }
              } else {
                setdata(responseJson.data.vehicle)

                  // if (isFirstTimeCaling) {
                  //   setvehicleList([])
                  //   setnoMoreDataFound(true);
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                  // } else {
                  //   setisFooterLoading(false)
                  // setnoMoreDataFound(true)
                  //     // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                  // }

              }
          // } else {
          //     AppConstance.showSnackbarMessage(responseJson.message)
          // }
      })
      .catch((error) => {
          console.warn(error)
      });
}

useEffect(() => {


console.log('===='+JSON.stringify());

callingContainerApi()
callinglocation()
callingCustomer()

  if (item.images != undefined && item.images != undefined) {
    for (let index = 0; index < item.images.length; index++) {
        const element = item.images[index];
        images.push('https://erp.gwwshipping.com/uploads/' + element.thumbnail)
        console.log('Image vehicle :;;', 'https://erp.gwwshipping.com/uploads/' + element.thumbnail)
    }

  }

  return () => {
    
  }
}, [])

const renderlist = ({item}) =>{

  return(
    <TouchableOpacity 
    onPress={()=>{setlocation_id(item.id); setlocation_name(item.name); setlocmodal(false) }}
    style={{marginVertical:2,justifyContent:'space-between', flexDirection:'row'}}>
      <Text>{item.id}</Text>
<Text>{item.name}</Text>

    </TouchableOpacity>
  
  
  )
  
   }


   const renderCustomerlist = ({item}) =>{

    let c ;
    if(customername == item.text ){
      c = 1
    }
    return(
      
<TouchableOpacity 
onPress={()=> { setcustmodal(false); setcustomername(item.text)}}
style={{marginVertical:5,borderWidth:0.5,flexDirection:'row', borderColor:'#1a9bef', borderRadius:10,paddingVertical:12,paddingHorizontal:10,}}>

{c == null ? 
  <Ionicons name='ios-radio-button-off-sharp'  color='#1a9bef' style={{alignSelf:'center'}}  size={20} />:
  <Ionicons name='ios-radio-button-on'  color='#1a9bef' style={{alignSelf:'center'}}  size={20} />
}


  <Text style={{alignSelf:'center',color:'#1a9bef', marginLeft:5,}}>{item.text}</Text>
{/* <Text>sfsdfn</Text> */}
</TouchableOpacity>    
    
    )
    
     }  




return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        container: {
                            backgroundColor: '#ECF0F1',
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            height: 300,
                            paddingTop:15,

                        },
                        draggableIcon: {
                            backgroundColor: "grey"
                        }
                    }}
                >
                    <View>

                    <TouchableOpacity>
                        <View style={{ borderBottomWidth: 0.6,paddingVertical:5, borderColor: '#D0D3D4', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',  fontSize:20,fontWeight:'600', paddingVertical:5,  }}>Upload Photo</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>TakePhoto() }
                    >
                        <View style={{ borderWidth: 0.5, borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10,fontWeight:'600', color: '#1a9bef', }}>Take Photo</Text>
                        </View>

                    </TouchableOpacity>
             
                    <TouchableOpacity
                    onPress={()=> Selectphoto()}
                    >
                        <View style={{ borderWidth: 0.5 , borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',fontWeight:'600', padding: 10, color: '#1a9bef', }}>Choose From Library</Text>
                        </View>

                    </TouchableOpacity>
               
                    <TouchableOpacity
                                        onPress={()=> refRBSheet.current.close()}

                    >
                        <View style={{ borderWidth: 1, borderRadius:12,marginTop:10, borderColor: 'red', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10, color: 'red', }}>Cancel</Text>
                        </View>

                    </TouchableOpacity>
                    </View>

               
               <View style={{  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 20
}}>

             
                    <TouchableOpacity 
                    onPress={()=> refRBSheet.current.close()}
                    style={{width:25,justifyContent:'center', height:25, backgroundColor:'grey', borderRadius:50, alignSelf:'flex-end', marginRight:30}}>
                    <Entypo   name='chevron-down' color='white' size={18} style={{alignSelf:'center'}}/>
                    </TouchableOpacity>
                    </View>

                </RBSheet>
           



<Modal
          transparent={true}
          animationType={'slide'}
          visible={custmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              width:deviceWidth,
              justifyContent:'flex-start',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'grey',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground>

                 <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'15%', }}
onPress={()=> setcustmodal(false) }

>
<Text style={{color:'white', fontSize:16}}>Cancel</Text>


</TouchableOpacity>

<View style={{width:'70%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Customer</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>
<TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}>
{/* <AntDesign  size={20} style={{alignSelf:'center'}} color='white' name='check'/> */}
</TouchableOpacity>
</View>
</View>



<View style={{marginHorizontal:10,justifyContent:'center',paddingHorizontal:5, borderRadius:10,backgroundColor:'white', flexDirection:'row'}}>
<Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchFilterFunction(Text)}
  // this.callingVehicleContainerService()
  placeholder="Search Customer"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  

</View>

            <View
              style={{
                width: '100%',
                marginTop:12,
                height:deviceHeight,
                flexDirection: 'column',
                backgroundColor:'white',
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
              }}>
    
    <FlatList
         contentContainerStyle={{ paddingHorizontal:1, paddingVertical:5,}}
         
      data={Customerlist}
     renderItem={renderCustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          />
    {/* <RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  textStyle={{color:'grey'}}
  box={true}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/> */}
        {/* <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:5,}}
         
      data={locationslist}
     renderItem={rendercustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          /> */}

           

            
           
            </View>
         
          </SafeAreaView>
        </Modal>





    <Modal
          transparent={true}
          animationType={'none'}
          visible={locmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'#0005',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '65%',
                flexDirection: 'column',
                backgroundColor:'white',
                borderRadius:15,
              }}>
    
           <View style={{borderBottomWidth:0.3,paddingVertical:7, borderColor:'#D0D3D4'}}>
             <Text style={{alignSelf:'center',fontSize:18, fontWeight:'bold', paddingVertical:10,}}>Location</Text>
           </View>

        <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:5,}}
         
      data={locationslist}
     renderItem={renderlist}
     keyExtractor={(item,index) => index.toString()}
    

          />

              <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'grey',  width:'100%'}}>
                <TouchableOpacity style={{width:'50%',height:40,alignSelf:'center',justifyContent:'center', borderRightWidth:0.5,borderColor:'grey'}}
                onPress={()=>{setlocmodal(false)}}
                >
                  <Text style={{alignSelf:'center', fontSize:15}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{width:'50%', height:40, justifyContent:'center', alignSelf:'center'}}
                                onPress={()=>{setlocmodal(false)}}

                >
                  <Text style={{fontWeight:'bold',fontSize:15, alignSelf:'center'}}>OK</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row',
                }}>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    marginLeft:10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
             
              </View> */}
           
            </View>
         
          </View>
        </Modal>


<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >

 
</ImageBackground>

  {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
     <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'10%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'80%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Edit Vehicle</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>
<TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}>
<AntDesign  size={20} style={{alignSelf:'center'}} color='white' name='check'/>
</TouchableOpacity>
</View>
</View>



<ScrollView style={{width:deviceWidth }}>


<SliderBox 
          images={images}
          sliderBoxHeight={210}
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setSliderModel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{borderTopRightRadius:20,borderTopLeftRadius:20, width: '100%', marginTop: 8}}

        />

<View style={{marginTop:-50, marginBottom:14,height:35, width:35, alignSelf:'flex-end', justifyContent:'center', marginRight:20 }}>
<TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' ,borderColor:'#1a9bef',borderWidth:0.8, borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity>
  </View>
{/* 
<View style={{marginTop:-65, height:35,width:35, marginBottom:30,alignSelf:'flex-end',justifyContent:'center', marginRight:20,}}>
  <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' , borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity>
</View> */}




<View style={{width:'100%',flexDirection:'row',paddingVertical:10, paddingHorizontal:10, backgroundColor:'#2C3E50', justifyContent:'center', alignSelf:'center'}}>
          <View style={{width:'20%', }}>
          <Text style={{color:'white'}}>VIN #:</Text>
          </View>

          <View style={{width:'50%'}}>
            <TextInput 
            placeholderTextColor='#D0D3D4'
            placeholder='Enter vin or scan'
            />
          </View>
          <View style={{width:'20%'}}>
            <TouchableOpacity  style={{alignSelf:'flex-end'}}
            >
              <Text style={{color:'white'}}>H</Text>
              </TouchableOpacity>
          </View>

        </View>

     
<View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:10,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
<TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
onPress={()=>{
  setcustmodal(true)
}}
>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{customername}</Text>
<AntDesign  name='caretdown' color='grey'/>
</TouchableOpacity></View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOCATION</Text>
<TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
onPress={()=>{
  setlocmodal(true)
}}
>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{location_name}</Text>
<AntDesign  name='caretdown' color='grey'/>
</TouchableOpacity>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>HAT NUMBER</Text>
<TextInput  
placeholder={hatnumber}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VEHICLE TYPE</Text>
<TextInput  
placeholder={hatnumber}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
<TextInput  
placeholder={year}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>COLOR </Text>
<TextInput  
placeholder={color}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
<TextInput  
placeholder={model}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
<TextInput  
placeholder={make}
placeholderTextColor='grey'
/>
</View>





<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>WEIGHT</Text>
<TextInput  
placeholder={weight}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LICENSE NUMBER</Text>
<TextInput  
placeholder={weight}
placeholderTextColor='grey'
/>
</View>






<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOT NUMBER</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOAD STATUS</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONTAINER NUMBER</Text>
<TextInput  
placeholder={containernmber}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>KEY NOTE</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PREPAREDBY</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>AUCTION AT</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VCR</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>NOTE2</Text>
<TextInput  
placeholder={lotnumber}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>STATUS</Text>
{/* <RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/> */}


<View style={{flexDirection:'row', marginVertical:10,}}>

<View style={{flexDirection:'column', marginLeft:5,   }}>
  <TouchableOpacity
  
  onPress={()=>{setstatus('1')}}
  >

<Text style={{fontWeight:'500'}}>ON HAND</Text>
</TouchableOpacity >

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('2')}}
>

<Text style={{fontWeight:'500'}}>READY TO LOAD</Text>
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('3')}}
>

<Text style={{fontWeight:'500'}}>ON THE WAY</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('6')}}
>

<Text style={{fontWeight:'500'}}>NEW PURCHASED</Text>
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('10')}}
>

<Text style={{fontWeight:'500'}}>ARRIVED</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('11')}}
>

<Text style={{fontWeight:'500'}}>IS_REQUESTED</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('12')}}
>

<Text style={{fontWeight:'500'}}>DISPATCHED</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setstatus('15')}}
>

<Text style={{fontWeight:'500'}}>LOADED</Text>
</TouchableOpacity>

</View>


<View style={{flexDirection:'column',  marginLeft:10, width:'60%' }}>
  
  <TouchableOpacity 
  onPress={()=>{setstatus('1')}}
  >
{status == '1' ? 
<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:5,}}

  onPress={()=>{setstatus('2')}}
>
{status == '2' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>



<TouchableOpacity
style={{marginTop:5,}}

  onPress={()=>{setstatus('3')}}
>
{status == '3' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 /> 

}
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:5,}}

  onPress={()=>{setstatus('6')}}
>
{status == '6' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:8,}}

  onPress={()=>{setstatus('10')}}
>
{status == '10' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:8}}

  onPress={()=>{setstatus('11')}}
>
{status == '11' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:5,}}

  onPress={()=>{setstatus('12')}}
>
{status == '12' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:7,}}

  onPress={()=>{setstatus('15')}}
>
{status == '15' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity> 
{/*
<TouchableOpacity
style={{marginTop:10,backgroundColor:'yellow'}}

  onPress={()=>{setstatus('10')}}
>
{status == '10' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>



<TouchableOpacity
style={{marginTop:10,backgroundColor:'grey'}}

  onPress={()=>{setstatus('11')}}
>
{status == '11' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}

  onPress={()=>{setstatus('12')}}
>
{status == '12' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}

  onPress={()=>{setstatus('15')}}
>
{status == '15' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<AntDesign name='check' color='transparent' size={20}
 />}
</TouchableOpacity> */}


</View>


</View>

</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONDITION</Text>
<View style={{flexDirection:'row', marginVertical:10,}}>

<View style={{flexDirection:'column', marginLeft:5,   }}>
  <TouchableOpacity
  
  onPress={()=>{setcondition('0')}}
  >

<Text style={{fontWeight:'500'}}>NON-OP</Text>
</TouchableOpacity >

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setcondition('1')}}
>

<Text style={{fontWeight:'500'}}>OPERABLE</Text>
</TouchableOpacity>

</View>


<View style={{flexDirection:'column', marginLeft:10, width:'60%' }}>
  
  <TouchableOpacity 
  onPress={()=>{setcondition('0')}}
  >
{condition == '0' ? 
<AntDesign name='check' color='#1a9bef' size={20} /> :
 <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:8,}}

  onPress={()=>{setcondition('1')}}
>
{condition == '1' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
}
</TouchableOpacity>

</View>


</View>

</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DAMAGED</Text>

<View style={{flexDirection:'row', marginVertical:10,}}>

<View style={{flexDirection:'column',   width:'12%' }}>
  <TouchableOpacity
  
  onPress={()=>{setdamaged('1')}}
  >

<Text style={{alignSelf:'center' ,fontWeight:'500'}}>YES</Text>
</TouchableOpacity >

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{setdamaged('0')}}
>

<Text style={{alignSelf:'center' ,fontWeight:'500'}}>NO</Text>
</TouchableOpacity>

</View>


<View style={{flexDirection:'column',  width:'60%' }}>
  
  <TouchableOpacity 
  onPress={()=>{setdamaged('1')}}
  >
{damaged == '1' ? 
<AntDesign name='check' color='#1a9bef' size={20} /> :
 <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:8,}}

  onPress={()=>{setdamaged('0')}}
>
{damaged == '0' ? 

<AntDesign name='check' color='#1a9bef' size={20} /> :
<Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
}
</TouchableOpacity>

</View>


</View>


{/* <RadioButton.Group onValueChange={newValue => setdamaged(newValue)} value={damaged}>

      <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
      <Text style={{alignSelf:'center' ,fontWeight:'500'}}>Yes</Text>

      <RadioButton value='1' color='#1a9bef'/>

      </View>
      <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
      <Text style={{alignSelf:'center',marginRight:5, fontWeight:'500'}}>No</Text>

      <RadioButton value='0'  color="#1a9bef" />

      </View>
    </RadioButton.Group> */}

{/* <RadioButtonRN
  data={Damaged}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/> */}
</View>


{/* <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View> */}

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<RadioButton
        value='1'
        status={ picture == '1' ? 'checked' : 'unchecked' }
        onPress={() => setpictures('1')}
      />
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TITLE NUMBER</Text>
<TextInput  
placeholder={titlenumber}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DELIVER DATE</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>




<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PICKUP DATE</Text>
<DatePicker
          style={{width: 200,
    marginTop: 20,}}
          date={date} // Initial date from state
          mode="datetime" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="2016-05-01"
          maxDate="2025-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 1,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 0,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
<TextInput  
placeholder='COROLLA'
multiline={true}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CHECK OPTIONS INCLUDED ON THE ..</Text>
<View style={{flexDirection:'row', marginVertical:10,}}>

<View style={{flexDirection:'column',  marginLeft:10, width:'10%' }}>
  
  <TouchableOpacity 
  onPress={()=>{KEYS == 1 ? setKEYS('0'):setKEYS('1')}}
  >
{KEYS == '1' ? 
<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:5,}}

onPress={()=>{ CDPLAYER == 1 ? setCDPLAYER('0'):setCDPLAYER('1')}}
>
{CDPLAYER == '1' ? 

<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 />}
</TouchableOpacity>



<TouchableOpacity
style={{marginTop:5,}}

onPress={()=>{SPEAKER == 1 ? setSPEAKER('0'):setSPEAKER('1')}}
>
{SPEAKER == '1' ? 

<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 /> 

}
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:5,}}

onPress={()=>{ WHEELCAPS == 1 ? setWHEELCAPS('0') : setWHEELCAPS('1')}}
>
{WHEELCAPS == '1' ? 

<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 />}
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:5,}}

onPress={()=>{MIRROR == 1 ? setMIRROR('0'):setMIRROR('1') }}
>
{MIRROR == '1' ? 

<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 />}
</TouchableOpacity>





<TouchableOpacity
style={{marginTop:7,justifyContent:'center'}}

onPress={()=>{OTHERS == 1 ? setOTHERS('0'):setOTHERS('1')}}
>
{OTHERS == '1' ? 

<Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
<Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
 />}
</TouchableOpacity> 

</View>

<View style={{flexDirection:'column', marginLeft:5,   }}>
  <TouchableOpacity
  
  onPress={()=>{KEYS == 1 ? setKEYS('0'):setKEYS('1')}}
  >

<Text style={{fontWeight:'500'}}>KEYS</Text>
</TouchableOpacity >

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{ CDPLAYER == 1 ? setCDPLAYER('0'):setCDPLAYER('1')}}
>

<Text style={{fontWeight:'500'}}>CD PLAYER</Text>
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{SPEAKER == 1 ? setSPEAKER('0'):setSPEAKER('1')}}
>

<Text style={{fontWeight:'500'}}>SPEAKER</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{ WHEELCAPS == 1 ? setWHEELCAPS('0') : setWHEELCAPS('1')}}
>

<Text style={{fontWeight:'500'}}>WHEEL CAPS</Text>
</TouchableOpacity>


<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{MIRROR == 1 ? setMIRROR('0'):setMIRROR('1') }}
>

<Text style={{fontWeight:'500'}}>MIRROR</Text>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:10,}}
  onPress={()=>{OTHERS == 1 ? setOTHERS('0'):setOTHERS('1')}}
>

<Text style={{fontWeight:'500'}}>OTHERS</Text>
</TouchableOpacity>




</View>




</View>

</View>





<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:8,borderColor:'#B3B6B7',  justifyContent:'center'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold',alignSelf:'center', fontSize:14,}}>CONDITION OF VEHICLE</Text>

</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT WINDSHILED</Text>
<TextInput  
  onChangeText={text =>setfrontwindshiled(text) }

placeholder={frontwindshiled}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>BONNET</Text>
<TextInput  
  onChangeText={text =>  setbonnet(text)}

placeholder={bonnet}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>GRILL</Text>
<TextInput  
  onChangeText={text =>  setgrill(text)}

placeholder={grill}
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT BUMPER</Text>
<TextInput  
  onChangeText={text => setfrontbumper(text) }

placeholder={frontbumper}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT HEAD LIGHT</Text>
<TextInput  
  onChangeText={text =>  setfrontheadlight(text)}

placeholder={frontheadlight}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR WINDSHIELD</Text>
<TextInput  
  onChangeText={text =>  setrearwindshield(text)}

placeholder={rearwindshield}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TRUNK DOOR</Text>
<TextInput  
  onChangeText={text =>settrunkdoor(text) }

placeholder={trunkdoor}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER</Text>
<TextInput  
  onChangeText={text => setrearbumper(text)}

placeholder={rearbumper}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER SUPPORT</Text>
<TextInput  
  onChangeText={text => setrearbumpersupport(text) }

placeholder={rearbumpersupport}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TAIL LAMP</Text>
<TextInput  
  onChangeText={text =>  settaillamp(text)}

placeholder={taillamp}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT LEFT FENDER</Text>
<TextInput  
  onChangeText={text =>  setfrontleftfender(text)}

placeholder={frontleftfender}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT FRONT DOOR</Text>
<TextInput  
  onChangeText={text =>setleftfrontdoor(text) }

placeholder={leftfrontdoor}
placeholderTextColor='grey'
/>
</View>




<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR DOOR</Text>
<TextInput  
  onChangeText={text => setleftreardoor(text) }

placeholder={leftreardoor}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR FENDER</Text>
<TextInput  
  onChangeText={text => setleftrearfender(text)}

placeholder={leftrearfender}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PILLAR</Text>
<TextInput  
  onChangeText={text => setpillar(text)}

placeholder={pillar}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>ROOF</Text>
<TextInput  
  onChangeText={text => setroof(text) }

placeholder={roof}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR FENDER</Text>
<TextInput  
  onChangeText={text => setrightrearfender(text)}

placeholder={rightrearfender}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR DOOR</Text>
<TextInput  
  onChangeText={text => setrightreardoor(text)}

placeholder={rightreardoor}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT FRONT DOOR</Text>
<TextInput  
  onChangeText={text =>setrightfrontdoor(text) }

placeholder={rightfrontdoor}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT RIGHT FENDER</Text>
<TextInput  
  onChangeText={text => setfrontrightfender(text)}

placeholder={frontrightfender}
placeholderTextColor='grey'
/>
</View>





</View>

</ScrollView>
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
          onPress={() => {}}

      /> 
    <Text style={{alignSelf:'center',color:'white', fontSize:12 }}>Container</Text>  
                </View>




</View>


</SafeAreaView>




  );
};


export default EditVehicle;
