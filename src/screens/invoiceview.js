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
import Icon from 'react-native-vector-icons/Entypo';
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




const images1 = [

    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    
    
    
];
const invoiceview = ({route, navigation }) => {
  const [vehicleDetails , setvehicleDetails] = useState([''])

  // const { type  , datapre , baseImagePath } = route.params;

  const [imgpos, setimgpos] = useState(0)
  const [images , setimages] = useState([
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",

  ])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)


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

useEffect(() => {

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
  <ImageBackground source={require('../images/bg.png')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} />
  {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
     <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Invoice View</Text>
</View>

<View style={{width:'6%', }}>

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
    borderRadius: 15,
    marginHorizontal: -6,
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
  ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 8}}

        />
{/* <TouchableOpacity style={{ marginRight:16, width:80,marginTop:-25,alignSelf:'flex-end', height:28,}}

onPress={()=>
// alert(images1[imgpos])
checkPermission(images[imgpos])

}>

  <Text style={{fontWeight:'bold',fontSize:16, color:'grey',}}>Download</Text>
</TouchableOpacity> */}


<View style={{flexDirection:'column',justifyContent:'center', marginTop:1,paddingHorizontal:15, width:'100%',}} >





<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5,borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Year Make Model</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>2015 Toyota Corolla</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5, borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Issue Date</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>25-10-2020</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Due Date</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>20-10-2020</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5, borderColor:'grey', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Lot #</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>6949466</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>VIN #</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>NSJWINSN7836949466</Text>
</View>



<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5,paddingVertical:5, borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black', paddingVertical:2, fontSize:14,}}>Auction </Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>CCPTAR</Text>
</View>























</View>










<View style={{flexDirection:'column',justifyContent:'center', marginTop:1,paddingHorizontal:15, width:'100%',}} >






<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%',  fontSize:14,}}>Vehicle Value</Text>
<Text>$</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>2500</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%',  fontSize:14,}}>Services</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>2500</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, width:'30%', fontSize:14,}}>Total Amount</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>2500</Text>
</View>


<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%', fontSize:14,}}>Paid Amount</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>2500</Text>
</View>



<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%', fontSize:14,}}>Balance Amount</Text>
<Text>$</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>1500</Text>
</View>

<View style={{width:'100%',flexDirection:'row',borderBottomWidth:0.5, paddingVertical:5,borderColor:'grey',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,width:'30%', fontSize:14,}}>Status</Text>

<Text style={{color:'black',paddingVertical:2, fontSize:14,}}>Partail Paid</Text>
</View>


</View>



</ScrollView>

</SafeAreaView>



//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
//     <Image source={require('../images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} />
//      <Spinner
//           visible={spinner}
//           textContent={'Loading...'}
//           textStyle={{ color: '#FFF'}}
//         />



// <Modal
//           transparent={true}
//           visible={SliderModel}
//          >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               backgroundColor: 'black',
//               paddingVertical: 20,
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 paddingHorizontal: 20,
//                 marginTop: 10,
//                 flexDirection: 'row',
//                 alignItems: 'flex-end',
//                 alignSelf: 'flex-end',
//                 alignContent: 'flex-end',
//               }}>
//               <TouchableOpacity
//                 onPress={() =>setSliderModel(false)}>

//                   <MaterialIcons name='cancel' size={25} color='red'/>
//                 {/* <Image
//                   style={{width: 30, height: 30}}
//                   source={require('../Assets/icons/cancel.png')}
//                 /> */}
//               </TouchableOpacity>
//             </View>
//             <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
//               <SliderBox
//                 images={images}
//                 sliderBoxHeight={500}
//                 dotColor="#FFEE58"
//                 inactiveDotColor="#90A4AE"
//                 resizeMethod={'resize'}  
//           resizeMode={'contain'}
                
//                 dotStyle={{
//                   width: 13,
//                   height: 13,
//                   borderRadius: 15,
//                   marginHorizontal: -6,
//                   padding: 0,
//                   margin: 0,
//                 }}
//                 // resizeMethod={'resize'}
//                 // resizeMode={'cover'}
//                 // autoplay
//                 circleLoop
//                 onCurrentImagePressed={(index) =>
//                   console.log(`image ${index} pressed`)
//                 }
//               />
//             </View>
//           </View>
//         </Modal>
      





// <View
// style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red',justifyContent:'space-between', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>

// <View style={{flexDirection:'row'}}>
// <TouchableOpacity
// style={{justifyContent:'center'}}
// onPress={()=>navigation.goBack()}

// >
// <MaterialIcons  name='keyboard-backspace' size={23}/>
// </TouchableOpacity>

// <Text style={{marginLeft:6,alignSelf:'center'}}>View Vehicle</Text>
// </View>
// <View style={{alignItems:'flex-end',justifyContent:'center', marginRight:5}}>
// <TouchableOpacity
// style={{justifyContent:'center'}}
// onPress={()=>onShare()}
// >
// <Entypo style={{alignSelf:'center'}} name='share' size={20}/>
// </TouchableOpacity>
// </View>
// </View>



// <ScrollView style={{width:deviceWidth,backgroundColor:AppColors.blue, }}>


// <SliderBox 
//           images={images}
//           sliderBoxHeight={180}
          
//           dotColor="#FFEE58"
//   inactiveDotColor="#90A4AE"
//   dotStyle={{
//     width: 10,
//     height: 10,
//     borderRadius: 15,
//     marginHorizontal: -6,
//     padding: 0,
//     margin: 0
//   }}
//           resizeMethod={'resize'}  
//           resizeMode={'cover'}
//   circleLoop
//   currentImageEmitter={index => { setimgpos(index); 
//    }}

//           onCurrentImagePressed={index =>
//           //setcurrentimg()
//             // console.warn(`image ${index} pressed`)
//             setSliderModel(true)
//           }
//   paginationBoxStyle={{
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   }}
//   ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 8}}

//         />
// <TouchableOpacity style={{ marginRight:16, width:80,marginTop:-25,alignSelf:'flex-end', height:28,}}

// onPress={()=>
// // alert(images1[imgpos])
// checkPermission(images[imgpos])

// }>

//   <Text style={{fontWeight:'bold',fontSize:16, color:'grey',}}>Download</Text>
// </TouchableOpacity>


// <View style={{flexDirection:'column',justifyContent:'center', marginTop:1,paddingHorizontal:10, width:'100%',}} >



// <View
// style={{width:'100%', marginTop:3,paddingHorizontal:10, height:deviceHeight*0.13,borderWidth:0.5, paddingVertical:3, borderRadius:5, flexDirection:'row', backgroundColor:'white'}} >

// <View style={{flexDirection:'column',width:'60%',justifyContent:'center'}}>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}</Text>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>Lot: {vehicleDetails.lot_number}</Text>
// <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.vin}</Text>


// </View>
// <View style={{flexDirection:'column',width:'50%',justifyContent:'center'}}>
// <Text style={{color:'grey',paddingVertical:2, fontSize:16,}}>SHIPPED</Text>


// </View>
// </View>




















// </View>

// </ScrollView>








//     </SafeAreaView>

  );
};


export default invoiceview;
