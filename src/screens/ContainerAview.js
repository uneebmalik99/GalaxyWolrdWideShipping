import React,{useState,useEffect ,useRef} from 'react';
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
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from  'react-native-vector-icons/dist/Feather'
import AntDesign from  'react-native-vector-icons/dist/AntDesign'
import ImageCropPicker from 'react-native-image-crop-picker';
import { Icon} from 'react-native-elements'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";



const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];

const ContainerAview = ({route, navigation }) => {


  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item   } = route.params;

  const [imgpos, setimgpos] = useState(0)
  const [images , setimages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", 


  ])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)

  const refRBSheet = useRef();
  
// bs = React.createRef()
// fall = new Animated.Value(1)

// renderInner = () =>(
//   <Text>HEllo</Text>
// );

// RenderHeader =() =>(
//   <View style={{backgroundColor:'white', shadowColor:'#333333', shadowOffset:{width:-1, height:-3}, 
//   shadowRadius:2,shadowOpacity:0.4, paddingTop:20, borderTopLeftRadius:20, borderTopRightRadius:20} } >
//       <View style={{alignItems:'center', }}>
//           <View style={{width:40, height:8, borderRadius:4, backgroundColor:'red', marginBottom:10}}>

//           </View>

//       </View>

//   </View>
// )

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Image Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  };




const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


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
const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
const [Export, setExport] = useState(false)
const [data, setdata] = useState([
  
]
)

useEffect(() => {




  return () => {
    
  }
}, [])

// const renderContent = () => (
//   <View
//     style={{
//       backgroundColor: 'white',
//       padding: 16,
//       height: 450,
//     }}
//   >
//     <Text>Swipe down to close</Text>
//   </View>
// );

// const sheetRef = React.useRef(null);



return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
    {/* <BottomSheet 
// ref={this.bs}
// snapPoints={[330, 0]}
// initialSnap={1}
// renderContent = {this.renderInner}
// RenderHeader={this.RenderHeader}
// callbackNode={this.fall}
// enabledGestureInteraction={true}
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      
/>
 */}
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Container</Text>
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
     
<View style={{marginTop:-60, height:35,width:35, marginBottom:30,alignSelf:'flex-end',justifyContent:'center', marginRight:20,}}>
  <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' , borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity>
</View>

<View style={{flexDirection:'column', justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:10,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>AR no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.ar_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>Container no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.container_number}</Text>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Broker Name:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.broker_name}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Booking no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.booking_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Destination</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.destination}</Text>
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
          onPress={() => {navigation.navigate('ContainerA')}}

      /> 
    <Text style={{alignSelf:'center',color:'white', fontSize:12 }}>Container</Text>  
                </View>




</View>

</SafeAreaView>





  );
};


export default ContainerAview;
