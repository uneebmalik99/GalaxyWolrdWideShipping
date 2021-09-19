import React,{useState,useEffect,useRef} from 'react';
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
import { Icon} from 'react-native-elements'
import Animated from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
import ImageCropPicker from 'react-native-image-crop-picker';



const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];

const Vehicle = ({route, navigation }) => {
  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item  } = route.params;

  const [imgpos, setimgpos] = useState(0)

  const [images , setimages] = useState([
      
  ])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const[Details , setDetails] = useState(item)

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Image Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  };

  const checkPermission = async (image) => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(image);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(image);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };


  const downloadImage = (img) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = img;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showSnackbarMessage()
        // alert('Image Downloaded Successfully.');
      });
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

const refRBSheet = useRef();


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
useEffect(() => {

  if (item.images != undefined && item.images != undefined) {
    for (let index = 0; index < item.images.length; index++) {
        const element = item.images[index];
        images.push('https://erp.gwwshipping.com/uploads/' + element.thumbnail)
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

//   setspinner(true)
//   // setInterval(() => {

//   //   setspinner(false)
//   //   // this.setState({
//   //   //   spinner: !this.state.spinner
//   //   // });
//   // }, 100);
//   if(type === 'Containers'){
//     setExport(true)
//   }
//   setvehicleDetails(datapre)

// console.warn(baseImagePath);

  // setimages(vehicleDetails.images)
  // console.warn('length of img'+ images);
  // if (datapre != undefined && datapre.images != undefined) {
  //   for (let index = 0; index < datapre.images.length; index++) {
  //       const element = datapre.images[index];
  //       images.push(baseImagePath + element.thumbnail)
  //       console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
  //   }
  //   setspinner(false)

  // }else if(datapre != undefined && datapre.exportImages != undefined) {
  //   console.warn(datapre.exportImages.length);
  //   for (let index = 0; index < datapre.exportImages.length; index++) {
  //     const element = datapre.exportImages[index];
  //     images.push(baseImagePath + element.thumbnail)
  //     console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
  // }
  // setspinner(false)

  // }
  // setspinner(false)


  return () => {
    
  }
}, [])

const renderlist = ({item}) =>{

  return(
    
<View style={{flexDirection:'row',alignSelf:'center',  width:'100%',height:45}} >

<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'60%', paddingVertical:1,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4, paddingVertical:1, width:'100%'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>{vehicleDetails.year} Toyota Corolla</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>Lot: 327228800</Text>
</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('CarDetails')}

style={{width:'38.7%', paddingVertical:2,paddingHorizontal:3,justifyContent:'center', height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black', alignSelf:'center',  fontSize:11,}}>375295925</Text>




</View>

</TouchableOpacity>

</View>

  
  
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
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Vehicle</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>
<TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}
onPress={()=>{
  navigation.navigate('EditVehicle',{'item': item  })
}}
>
<MaterialIcons  size={20} style={{alignSelf:'center'}} color='white' name='mode-edit'/>
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
{/* 
<View style={{marginTop:-65, height:35,width:35, marginBottom:30,alignSelf:'flex-end',justifyContent:'center', marginRight:20,}}>
  <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' , borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity>
</View> */}


        <View style={{width:'100%',flexDirection:'row',paddingVertical:10, paddingHorizontal:10, backgroundColor:'#2C3E50', justifyContent:'center', alignSelf:'center'}}>
          <View style={{width:'45%'}}>
          <Text style={{color:'white'}}>VIN NUMBER</Text>
          </View>

          <View style={{width:'55%'}}>
          <Text style={{color:'white'}}>{item.vin}</Text>
          </View>

        </View>


<View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:10,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.customer_name}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOT NUMBER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.lot_number}</Text>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.make}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.model}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.year}</Text>
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


export default Vehicle;
