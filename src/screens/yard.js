import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react';
import AppUrlCollection from '../UrlCollection/AppUrlCollection'
import { useEffect } from 'react';
const yard = ({ navigation }) => {


    const [saveYadData , setsaveYadData] = useState('')

    const  callingYardAPI = () => {
        let url = AppUrlCollection.GET_YARD
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log('Invocie ::', responseJson)
                // if (responseJson != undefined && responseJson != null && responseJson != '') {
                //     let value = responseJson.replace(/<\/?[^>]+(>|$\n)/g, '')
                //     let newVal = JSON.parse(value)
                //     this.setState({ isLoading: false })
                //     this.setState({ saveYadData: newVal })
                //     console.log('Invocie dadasdasdd::', JSON.parse(value))
                // } else {

                // }

                // if (responseJson.length > 0) {
                //     this.setState({ saveYadData: responseJson })
                // } else {
                //     this.setState({ saveYadData: [] })
                //     AppConstance.showSnackbarMessage('Data not found')
                // }
            })
            .catch((error) => {
                console.warn(error)
            });
    }




    useEffect(() => {

        callingYardAPI()
        // setspinner(true)
        // callingdashboardApi()
        // setspinner(false)
      
        return () => {
          
        }
      }, [])



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

           
  <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} />



  <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Our Locations</Text>
</View>

<View style={{width:'6%', }}>

</View>
</View>
<View >
                {/* {this.props.isOuterCalling ?
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        <Toolbar headerName={'Our Locations'} />
                    </View> :

                    <InnerToolbar headerName={'Our Locations'} />
                } */}
                {/* <DialogLoader loading={this.state.isLoading} /> */}
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={styles.addressTxtHeader}>OUR LOCATION</Text> */}
                    <View style={{ marginTop: 25 }} />
                    {saveYadData.length > 0 ?
                        <FlatList
                            data={saveYadData}
                            // renderItem={this.renderYardCell}
                            keyExtractor={(item, index) => index}
                            // extraData={this.state}
                        /> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: AppColors.textColor, fontSize: 15 }}>Data Not Found</Text>
                        </View>
                    }


                    {/* <Text style={styles.addressTxtHeader}></Text>  */}
                    {/* <Elavation
                        elevation={3}
                        style={styles.appHeaderElavationStyle}
                    >
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='map-marker-circle' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>UAE, Sharjah, Sharjah 83864, UAE.</Text>
                        </View>
                        <View style={styles.addressDividerStyle} />
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='email-outline' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>info@gwwshipping.com</Text>
                        </View>
                        <View style={styles.addressDividerStyle} />
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='phone' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>065328580</Text>
                        </View>

                    </Elavation> */}



                </View>
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

export default yard;
