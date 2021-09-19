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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react';

const container = ({ navigation }) => {





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<View style={{height:deviceHeight, width:deviceWidth}}>
                {/* {this.props.isOuterCalling ?
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        <Toolbar headerName={'Our Services'} />
                    </View> :
                    <InnerToolbar headerName={'Our Services'} />} */}
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={ourServiceList}
                        style={{ paddingTop: 10, paddingBottom: 15 }}
                        renderItem={renderOurServiceContent}
                        keyExtractor={(item, index) => index}
                        // extraData={this.state}
                        ListFooterComponent={() => <View style={{ width: 1, height: 10 }} />}
                    />
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

export default container;
