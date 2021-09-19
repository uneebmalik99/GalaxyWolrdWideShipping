import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import SideMenu from '../../styles/CustomeSideMenu/SideMenu';
import LeftNavMenuHeadingTxt from '../../styles/LeftNavMenuHeadingTxt';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AppColors from '../../Colors/AppColors';
import AppConstance, { deviceWidth } from '../../constance/AppConstance';
import AppFonts from '../../AppFont/AppFonts';
import NavigationSideScreen from '../LeftMenuSlider/NavigationSideScreen';

class Toolbar extends Component {
    constructor(props) {
        super(props)

    }
    //this.props.toggle()
    render() {
        return (
            <View style={{ width: deviceWidth, height: 50, flexDirection: 'row', backgroundColor: AppColors.transplant, alignContent: 'center', alignItems: 'center' }}>
                {this.props.isInnerScreen ? <TouchableOpacity
                   style={{ width: 50, height: 50,justifyContent:'center',alignContent:'center' ,marginLeft:-3}}
                    onPress={() => AppConstance.APP_PROPS.navigation.pop()}
                >
                    <MaterialCommunityIcons name='chevron-left' color={AppColors.white} size={35} />
                </TouchableOpacity> : <TouchableOpacity
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    onPress={() => AppConstance.APP_TOGGLE_FUN()}
                >
                        <MaterialCommunityIcons name='menu' color={AppColors.white} size={25} />
                    </TouchableOpacity>}

                <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.white, fontSize: 17, flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>{this.props.headerName}</Text>
                <View style={{width:60,height:1}}/>

                {/* <View style={{ width: 1, height: 20, marginLeft: 3, marginRight: 3 }} />
                <MaterialCommunityIcons name='alert-circle-outline' color={AppColors.white} size={25} />
                <View style={{ width: 1, height: 20, marginLeft: 3, marginRight: 3 }} />
                <MaterialIcons name='notifications-none' color={AppColors.white} size={25} style={{ marginRight: 8 }} /> */}
            </View>
        );
    }
}
export default Toolbar;
