import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, ScrollView,BackHandler ,SafeAreaView, FlatList, WebView, ImageBackground } from 'react-native';
import AppColors from '../Colors/AppColors'
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

let itemObj = null;


const OurServiceDetailScreen = ({route, navigation }) => {

    const { itemObj} = route.params;

    const [saveYadData , setsaveYadData] = useState('')
    return (
        <SafeAreaView >
            <View style={{ width: deviceWidth, height: 250 }}>

                <ImageBackground source={{ uri: itemObj.image }} style={{ width: undefined, height: undefined, flex: 1 }} >
                <View style={{ width: deviceWidth, height: 250,justifyContent:'center', backgroundColor: AppColors.black, opacity: 0.5, position: 'absolute' }} >
                <Text style={{ width: deviceWidth,textAlign: 'center',color:'white',fontWeight:'bold', alignSelf: 'center', textAlignVertical: 'center', fontSize: 20 }}>{itemObj.title.toUpperCase()}</Text>
        
        </View>
        </ImageBackground>
                <TouchableOpacity
                    style={{ top: 0, margin: 10, position: 'absolute' }}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name='arrow-left' color={AppColors.white} size={30} />
                </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal:10,marginTop:10,}}>

<View style={{borderRadius:10,borderColor:'grey', borderWidth:0.5}}>
    




<ScrollView>
                        <Text style={{
                             

                            fontSize: 15, paddingLeft: 10, paddingRight: 10,textAlign:'justify',
                            paddingTop: 5, paddingBottom: 5,
                        }}
                            adjustsFontSizeToFit={true}
                        >{itemObj.detail}</Text>
                    </ScrollView>
                    
                    
                    </View  >
                    </View>

                    
                                {/* <View style={{ flex: 1, alignContent: 'center',  alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <View
                    style={{ width: deviceWidth * 0.95, borderRadius: 5, }}
                >
                    <ScrollView>
                        <Text style={{
                             

                            fontSize: 15, paddingLeft: 10, paddingRight: 10,textAlign:'justify',
                            paddingTop: 5, paddingBottom: 5,
                        }}
                            adjustsFontSizeToFit={true}
                        >{itemObj.detail}</Text>
                    </ScrollView>


                </View>
            </View> */}

        </SafeAreaView>
    );


}









// class OurServiceDetailScreen extends Component {
//     constructor(props) {
//         super(props);
//         itemObj = this.props.navigation.state.params.itemObj;
//     }

//     componentDidMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
//     }

//     handleBackPress = () => {
//         console.log('Dummy : ',this.props.navigation.isFocused())
//         if(this.props.navigation.isFocused()){
//             this.props.navigation.goBack();
//             return true;
//         }
//     }


//     render() {
//         return (
//             <View >
//                 <View style={{ width: deviceWidth, height: 250 }}>

//                     <Image source={{ uri: itemObj.image }} style={{ width: undefined, height: undefined, flex: 1 }} />
//                     <View style={{ width: deviceWidth, height: 250, backgroundColor: AppColors.black, opacity: 0.4, position: 'absolute' }} />
//                     <Text style={{ width: deviceWidth, height: 250, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.white, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, textAlign: 'center', alignSelf: 'center', textAlignVertical: 'center', fontSize: 18 }}>{itemObj.title.toUpperCase()}</Text>

//                     <TouchableOpacity
//                         style={{ top: 0, margin: 10, position: 'absolute' }}
//                         onPress={() => this.props.navigation.goBack()}
//                     >
//                         <MaterialCommunityIcons name='arrow-left' color={AppColors.white} size={30} />
//                     </TouchableOpacity>
//                 </View>


//                 <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
//                     <View
//                         elevation={3}
//                         style={{ width: deviceWidth * 0.95, borderRadius: 5, }}
//                     >
//                         <ScrollView>
//                             <Text style={{
//                                 fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor,
//                                 fontSize: 15, paddingLeft: 10, paddingRight: 10,textAlign:'justify',
//                                 paddingTop: 5, paddingBottom: 5,
//                             }}
//                                 adjustsFontSizeToFit={true}
//                             >{itemObj.detail}</Text>
//                         </ScrollView>


//                     </View>
//                 </View>

//             </View>
//         );
//     }
// }
export default OurServiceDetailScreen;
