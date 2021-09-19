import React,{useState,useEffect} from 'react';
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



const images = [



    
    
];

const datacustomer = [
  {
    label: 'Customer1'
   },
   {
    label: 'Customer 2'
   },
   {
    label: 'Customer3'
   },
   {
    label: 'Customer 4'
   }
  ];

  const [location , setlocation ] = useState([]);
  const Damaged = [
    {
      label: 'Yes'
     },
     {
      label: 'NO'
     },
    ];
const EditVehicle = ({route, navigation }) => {
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
  const { item } = route.params;
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



// const callinglocation =() =>{
//   let url = AppUrlCollection.LOCATION
//   fetch(url, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'multipart/form-data',
//          'authkey': AppConstance.USER_INFO.USER_TOKEN
//     },
// })
//     .then((response) => response.json())
//     .then((responseJson) => {
//         // this.setState({ isLoading: false })
//       setspinner(false)
//       setlocation(responseJson.data)
//         console.log('Response data viw :: ', responseJson)
       
//     })
//     .catch((error) => {
//       setspinner(false)

//         console.warn(error)
//     }); 

// }

useEffect(() => {


// callinglocation()


  // if (item.images != undefined && item.images != undefined) {
  //   for (let index = 0; index < item.images.length; index++) {
  //       const element = item.images[index];
  //       images.push('https://erp.gwwshipping.com/uploads/' + element.thumbnail)
  //       console.log('Image vehicle :;;', 'https://erp.gwwshipping.com/uploads/' + element.thumbnail)
  //   }

  // }

  return () => {
    
  }
}, [])

const renderlist = ({item}) =>{

  return(
    
<Text>Loc</Text>
  
  
  )
  
   }


   const rendercustomerlist = ({item}) =>{

    return(
      
<View>
  
</View>    
    
    )
    
     }  




return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>



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
  onChangeText={text => onChangeText(text)}
  onSubmitEditing={(Text) => searchingApi(Text)}
  // this.callingVehicleContainerService()
  placeholder="Search vehicle by LOT number"
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
    
        
    <RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  textStyle={{color:'grey'}}
  box={true}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
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
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>6949466</Text>
<AntDesign  name='caretdown' color='grey'/>
</TouchableOpacity></View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOCATION</Text>
<TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
onPress={()=>{
  setlocmodal(true)
}}
>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>6949466</Text>
<AntDesign  name='caretdown' color='grey'/>
</TouchableOpacity>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
<TextInput  
placeholder={item.make}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
<TextInput  
placeholder={item.modal}
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>COLOR </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>2019</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>WEIGHT</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>HAT NUMBER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOT NUMBER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>STATUS</Text>
<RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONDITION</Text>
<RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DAMAGED</Text>
<RadioButtonRN
  data={Damaged}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TITLE NUMBER</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>2019</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DELIVER DATE</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>2019</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>




<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>NOTE</Text>
<TextInput  
placeholder='COROLLA'
multiline={true}
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CHECK OPTIONS INCLUDED ON THE ..</Text>
<RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  box={false}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/>
</View>





<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:8,borderColor:'#B3B6B7',  justifyContent:'center'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold',alignSelf:'center', fontSize:14,}}>CONDITION OF VEHICLE</Text>

</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT WINDSHILED</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>






<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>BONNET</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>GRILL</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>



<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT BUMPER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT HEAD LIGHT</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR WINDSHIELD</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TRUNK DOOR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER SUPPORT</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TAIL LAMP</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>







<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT LEFT FENDER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT FRONT DOOR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>




<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR DOOR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR FENDER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PILLAR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>ROOF</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR FENDER</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR DOOR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT FRONT DOOR</Text>
<TextInput  
placeholder='COROLLA'
placeholderTextColor='grey'
/>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT RIGHT FENDER</Text>
<TextInput  
placeholder='COROLLA'
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
