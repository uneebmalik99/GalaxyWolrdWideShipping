import React, { Component } from 'react';
import { View , Text} from 'react-native';
import { Icon} from 'react-native-elements'
import { deviceHeight, deviceWidth } from '../constance/AppConstance';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';



const BottomTabs = ({ navigation}) =>{


        return (
          <View style={{  height:55, backgroundColor: '#1a9bef',borderRadius:15, width:deviceWidth, justifyContent:'center', flexDirection:'row'}}>



              <View style={{width:'32%', justifyContent:'center', flexDirection:'column', }}>
              <Ionicons
                        name='car-sport'
                        type='material'
                        color='#fff'
                        style={{alignSelf:'center'}}
                        size={22}
                        onPress={() => {}}

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
          
          // <View style={{
          //       flex: 1,
          //       flexDirection: 'column',
          //       backgroundColor: '#f8f4f4',
                
          //   }}>
          //       <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '', width: 70, height: 72, borderRadius: 35, bottom: 25, zIndex: 10 }}>
          //           <Icon
          //               name='add'
          //               type='material'
          //               color='#f00'
          //               containerStyle={{ alignSelf: 'center' }}
          //               reverse
          //               size={28}
          //               onPress={() => {}}
          //           />
          //       </View>
          //       <View style={{ position: 'absolute', backgroundColor: '#2196F3', bottom: 0, zIndex: 1, width: '100%', height: 60, flexDirection:'column', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
          //          <View>

          //          <Icon
          //               name='menu'
          //               type='material'
          //               color='#fff'
          //               onPress={() => {}}

          //           />     
          //          </View>
                   
          //           <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          //               <Icon
          //                   name='favorite'
          //                   type='material'
          //                   color='#fff'
          //                   onPress={() => {}}
          //                   containerStyle={{ marginHorizontal: 16 }}
          //               />
          //               <Icon
          //                   name='search'
          //                   type='material'
          //                   color='#fff'
          //               />
          //           </View>
          //       </View>
            
          //   </View>
        
        
        );
  
        }
export default BottomTabs;



















































// import React from 'react';

// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Animated,
//   Text,
//   Alert,
//   SafeAreaView,
// } from 'react-native';
// import Iconn from 'react-native-vector-icons/dist/Ionicons';
// import Icon from 'react-native-vector-icons/dist/Feather';



//   const BottomTabs = ({ props }) => {

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//       }}>
//       <View
//         style={{
//           position: 'absolute',
//           alignSelf: 'center',
//           width: 70,
//           height: 50,
//           borderRadius: 35,
//           bottom: 35,
//           zIndex: 10,
//         }}>
//         <View style={[styles.button, styles.actionBtn]}>
         
//             <TouchableOpacity  onPress={() => {
//             navigation.navigate('Mario');
//           }}>
              
//               {/* <Iconn
//                 style={{width: 60, padding: 10, height: 60}}
//                 size={40}
//                 name="md-finger-print-sharp"
//               /> */}
//   {/* <Image   style={{width: 75, padding: 1, height: 75}} source={require('../images/Menu_gigaaa_Mic_Inactive.png')} /> */}

             
//             </TouchableOpacity>
//             </View>
          
       
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           backgroundColor: 'white',
//           border: 2,
//           radius: 3,
//           shadowOpacity: 0.3,
//           shadowRadius: 3,
//           shadowOffset: {
//             height: 3,
//             width: 3,
//           },
//           x: 0,
//           y: 0,
//           style: {marginVertical: 5},
//           bottom: 0,
//           width: '100%',
//           height: 70,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           paddingVertical: 10,
//           paddingHorizontal: 25,
//         }}>
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <TouchableOpacity
          
//             onPress={() =>
//                navigation.navigate('Notify')
//               // navigation.navigate('Notify')

//             }>
//             {/* <Image
//               style={{width: 20, height: 20}}
//               source={require('../images/home.png')}

//               // source={{
//               //   uri:
//               //     'http://pluspng.com/img-png/home-icon-png-home-house-icon-image-202-512.png',
//               // }}
//               onPress={() => {
//                 Alert.alert('');
//               }}></Image> */}
//           </TouchableOpacity>
//           <Text style={{justifyContent: 'center',marginTop:2, fontSize:10,color:'#4C749C', alignItems: 'center'}}>
//             Home
//           </Text>
//         </View>

   

      
//         <View
//           style={{
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
          
//             marginHorizontal: 15,
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               Alert.alert('click');
//             }}>
//            {/* <Image
//               style={{width: 20, height: 20, }}
//               source={require('../images/Menu_Wallet_Inactive.png')}

             
//               onPress={() => {
//                 Alert.alert('');
//               }}></Image> */}
           
//             {/* <Iconn
//               name="ios-wallet-outline"
//               size={20}
//               color="#4C749C"

//               style={{marginHorizontal: 16,}}
//               containerStyle={{marginHorizontal: 16}}
//             /> */}
//           </TouchableOpacity>
//           <Text style={{marginTop:4, alignSelf:'center', fontSize:10, color:'#4C749C', alignItems: 'center'}}>
//             Wallet
//           </Text>
//         </View>

//         {/* </View> */}
//       </View>
//     </View>
//   );
 
// };

// export default BottomTabs;

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'blue',
//   },
//   button: {
//     width: 60,
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: 'grey',
//     shadowOpacity: 0.1,
//     shadowOffset: {x: 2, y: 0},
//     shadowRadius: 2,
//     borderRadius: 30,
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     left: 5,
//     shadowOpacity: 5.0,
//   },
//   actionBtn: {
//     textShadowOffset: {width: 5, height: 5},
//     textShadowRadius: 10,

//   },
// });
