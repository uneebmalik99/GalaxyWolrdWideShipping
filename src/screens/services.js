import React from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react';

const services = ({ navigation }) => {


    const [saveYadData , setsaveYadData] = useState('')
    const [ ourServiceList , setourServiceList] = useState([
        
        {
            image: '../images/autoshipping.jpg',
            title: 'Ground Transportation',
            detail: 'We offer fully integrated custom logistic service for freight transportation on LTL and FTL to/from anywhere in the USA. We can integrate all of your transportation needs into a simple and cost effective solution to ensure a safe and rapid delivery for all your valuable goods.'
        }, {
            image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/Towing-694-458.jpg',
            title: 'Auto Shipping',
            detail: 'We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it'
        }, {
            image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/custom-clearence-694-458-1.jpg',
            title: 'Customs Clearance',
            detail: 'We provide a comprehensive U.S customs clearance service, ensuring speedy delivery of your cargo to its final destination. We help you to prepare all required documents..'
        }, {
            image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Warehousing-694-458.jpg',
            title: 'Warehousing',
            detail: 'As part of our comprehensive logistics solutions, we also offer our clients a range of warehousing services. Two warehouses in New York and Florida are in your service.'
        }, {
            image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Loading-694-458.jpg',
            title: 'Tracking and Tracing',
            detail: 'We provide internet tracking and tracing to all out customers. Our custom made tracking solution provides complete cargo and shipping information.'
        }, {
            image: '../images/autoshipping.jpg',
            title: 'Car Sales',
            detail: 'Here at GALAXY SHIPPING we can help you with  purchasing your brand new or used vehicle, boat,bike,ATV and so on.   Custom made cars and trucks are made to order thru our licensed used car  dealer GALAXY USED CARS LLC.'
        },
    ]
    )

const  renderOurServiceContent = ({ item, index }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('OurServiceDetailScreen', { 'itemObj': item })}>
            <View
                elevation={1}
                style={{ flexDirection: 'row', width: '100%',borderColor:'white',borderWidth:0.4, height: 120, borderRadius: 10, marginBottom: 10 }}>
                <Image source={{ uri: item.image }} style={{ flex: 0.5, height: 119,alignSelf:'center', borderTopLeftRadius: 10, borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} />
                <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={{  color: 'white', fontSize: 15 }}>{item.title}</Text>
                    <Text style={{  color: 'white', fontSize: 14, marginTop: 5 }} numberOfLines={4} ellipsizeMode='tail'>{item.detail}</Text>
                    <Text style={{  fontSize: 10, color:'white', textAlign: 'right' }}>Read More..</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

           
  <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight*1.1, position: 'absolute' }} />



  <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Our Services</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
<View style={{height:deviceHeight,paddingHorizontal:5, width:deviceWidth}}>

<FlatList
                         contentContainerStyle={{ paddingBottom: 80}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={ourServiceList}
                     renderItem={renderOurServiceContent}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />


                {/* {this.props.isOuterCalling ?
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        <Toolbar headerName={'Our Services'} />
                    </View> :
                    <InnerToolbar headerName={'Our Services'} />} */}
                {/* <ScrollView style={{ flex:1, paddingHorizontal:10, }}>
<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
 <Image     source={require('../images/AotoShipping.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',justifyContent:'center'}}>
<Text style={{color:'#2596be', }}>Ocean Freight</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>Being a licensed NVOCC “OLFAT SHIPPING LLC” deals and has experience of shipping vehicles and transportation of containers by ship. Ensuring cost effective transport through its supply chain management and operations within the business which helps in keeping the prices lower for customers.
</Text>
</View>
</TouchableOpacity>


<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/GrountTransport.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', justifyContent:'center'}}>Ground Transportation</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>Whether it’s USA or Canada we provide qualitative and fast ground transportation service that matters and adds value to the services we provide.
</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/autoshipping1.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', justifyContent:'center'}}>Auto Shipping</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>Need to transport your vehicle to an overseas destination? We can help you in that as well. We pick up vehicles from any location within USA and Canada and ship it to your oversees location. We assure you that your vehicle will be in the same condition in which it was picked up from auction.
</Text>
</View>
</TouchableOpacity>




<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/Customsbrokrageandclearance.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Customs Brokerage</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>In order to meet the custom regulations, we have strong connections with local and overseas Custom Brokers that are licensed regulated and empowered by the concerned country government. Which helps in speeding the shipments through customs.
</Text>
</View>
</TouchableOpacity>



<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/Clearence.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Customs Clearance</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>To facilitate the shipment of vehicles we provide custom clearance services and assist customers in preparing the required documents allowing vehicles to be transported speedily to final destination.
</Text>
</View>
</TouchableOpacity>



<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/warehouse2.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Warehousing</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>As a business, we are always looking to improve the way we work and the value we deliver. As part of our services we provide warehousing to our customers whether its USA, Canada U.A.E.
</Text>
</View>
</TouchableOpacity>


<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/trackandtrace.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Tracking And Tracing</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>We provide a system through which customers can easily trace the location of their shipment. At every processing location, the goods are identified and data relay to the central processing system. The data is then used to give status/update of the vehicle’s location to the shippers.
</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/warehouse.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Car Sales</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>Through our licensed used cars dealers “Abdul Razeq Olfat Used Cars Tr LLC” we can help you with purchasing and selling new or used vehicles, boats, bikes etc
</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:'#E5E7E9',paddingVertical:3,marginTop:10, flexDirection:'row', borderRadius:10, width:'100%'}}>
<View style={{width:'35%',marginLeft:3}}>
<Image     source={require('../images/cont.jpg')}
style={{  height: 130,width:120, borderTopLeftRadius: 10,borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> 
</View>

<View style={{flexDirection:'column' ,width:'62%',}}>
<Text style={{color:'#2596be', }}>Containerization</Text>
<Text style={{fontSize:12, textAlign:'auto',paddingVertical:2}}>We have experienced personnel that specialises in loading and unloading of vehicles into the containers using appropriate tools and equipment ensuring that vehicles are properly secured against unnecessary damage.
</Text>
</View>
</TouchableOpacity>

<TouchableOpacity style={{paddingVertical:3,marginTop:10,height:120, flexDirection:'row', borderRadius:10, width:'100%'}}>


</TouchableOpacity>



              
                </ScrollView> */}

            </View>
  
   {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
    addressTxtHeader: {
        fontFamily: AppFonts.JosefinSansBold, color: AppColors.textColor,
        fontSize: 15, height: 80, textAlign: 'center', textAlignVertical: 'center'
    },
    appHeaderElavationStyle: {
        width: deviceWidth * 0.9,
        paddingLeft: 15, paddingRight: 15,
        borderRadius: 10, marginBottom: 10
    },
    appHeaderEmailmainViewStyle: {
        flexDirection: 'row',
        paddingTop: 15, paddingBottom: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    addressTextStyle: {
        fontFamily: AppFonts.SourceSansProRegular,
        fontSize: 15, color: AppColors.textColor,
        marginLeft: 8
    },
    addressDividerStyle: {
        width: deviceWidth * 0.80,
        height: 0.5, backgroundColor: AppColors.toolbarColor,
        alignContent: 'center', alignItems: 'center',
        justifyContent: 'center', alignSelf: 'center'
    }
})

export default services;

//    <TouchableOpacity
//             onPress={() => AppConstance.APP_PROPS.navigation.push('OurServiceDetailScreen', { 'itemObj': item })}>
//             <View
//                 elevation={1}
//                 style={{ flexDirection: 'row', width: deviceWidth * 0.95, height: 120, borderRadius: 10, marginBottom: 10 }}>
//                 {/* <Image source={{ uri: item.image }} style={{ flex: 0.5, height: 120, borderTopLeftRadius: 10, borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} /> */}
//                 <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
//                     <Text style={{  color: AppColors.textColor, fontSize: 15 }}>title</Text>
//                     <Text style={{  color: AppColors.textColor, fontSize: 14, marginTop: 5 }} numberOfLines={4} ellipsizeMode='tail'>d etail</Text>
//                     <Text style={{  fontSize: 10, color: AppColors.toolbarColor, textAlign: 'right' }}>Read More..</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//                     <FlatList
//                         data={ourServiceList}
//                         style={{ paddingTop: 10, paddingBottom: 15 }}
//                         renderItem={renderOurServiceContent}
//                         keyExtractor={(item, index) => index}
//                         // extraData={this.state}
//                         ListFooterComponent={() => <View style={{ width: 1, height: 10 }} />}/> 