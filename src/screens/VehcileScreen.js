import React, { Component } from 'react';
import { View, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, BackHandler, ActivityIndicator } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
// import DialogLoader from '../screens/DialogLoder';
import AppMessages from '../AppMessages/AppMesage';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from  'react-native-vector-icons/dist/Feather'

let filterItemObj = null;
let setProps = null;

let page = 0;
let onEndReachedCalledDuringMomentum = false;
let vehilceImageBasePath = null;
var baseImagePath = '';
var locationId = 0;
var statusId = 0;
var searchTxt = '';
let locationList = [];

class VehcileScreen extends Component {
    constructor(props) {
        super(props)
        this.onEndReachedCalledDuringMomentum = true;
      
        this.state = {
            isLoading: false,
            isDisplayView: 0,
            tabIndex: 0,
            selectFilterName: '',
            isModalVisible: false,
            locationList: [],
            vehicleList: [],
            searchTxt: '',
            isStopCallingAPI: false,
            isFilterOrSerachEnable: false,
            page: 1,
            isFooterLoading: false,
            noMoreDataFound: false,
            categoryList: [
                'New Purchased', 'On Hand', 'Ready to Ship', 'On the way', 'Arrived', ''
            ],
            refreshing: false,
            statusId: 0,
            locationId: 0
        }

    }

    componentDidMount() {
        console.log('Filter item obj :: ', filterItemObj)
      //  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        statusId = 0;

      //  NetInfo.addEventListener(
   //         'connectionChange',
       //     this._handleConnectivityChange
  //      );
  
  NetInfo.addEventListener(state => {
    'connectionChange',
    this._handleConnectivityChange
 } );

// NetInfo.fetch().then((isConnected) => {
//     if (isConnected == true) {

        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                this.setState({ isLoading: true })
                this.ccallingLocationApi();
                if (filterItemObj != null) {
                    let gettingStatusId = AppConstance.gettingStatusIfFromName(filterItemObj.name.toUpperCase())
                    console.log('My sdadhas ', gettingStatusId)
                    if (gettingStatusId != undefined && gettingStatusId != 'undefined' && gettingStatusId != '') {
                        this.setState({ statusId: gettingStatusId })
                        statusId = gettingStatusId
                    } else {
                        this.setState({ statusId: 0 })
                        statusId = 0
                    }

                    this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
                    this.setState({ selectFilterName: filterItemObj.name })
                } else {
                    this.callingVehicleApi(true)
                }

            }
            else {
                AppConstance.showSnackbarMessage(AppMessages.INTERNEt_NOT_FOUND)
            }
        });


}
          


    

    //Check internet connection
  

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    _handleConnectivityChange = state => {
        if (state.isConnected == true) {
            this.setState({ isInternetNotFound: false })
        }
        else {
            this.setState({ isInternetNotFound: true })
        }
    };
 
    //calling location api
    ccallingLocationApi = () => {
        this.setState({ locationList: [] })

        fetch(AppUrlCollection.LOCATION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var allData = {
                    id: 0,
                    name: 'ALL'
                }
                this.state.locationList.push(allData)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: this.state.locationList.concat(responseJson.data), locationId: responseJson.data[0].id })
                    locationList.push(this.state.locationList)
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //calling Vehicle list
    callingVehicleApi = async (isCallingFirsttime) => {
        if (isCallingFirsttime) {
            this.setState({ isLoading: true, isFooterLoading: false })
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
        }
        console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
        fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    baseImagePath = responseJson.data.other.vehicle_image;
                    let data = responseJson.data.vehicleList;
                    this.setState({ isLoading: false, isFooterLoading: false })
                    if (data.length > 0) {
                        // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                        this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                    } else {
                        this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
                    }
                    // if (data.length > 0) {
                    //     this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                    // } else {
                    //     this.setState({ noMoreDataFound: true, isFooterLoading: false })
                    // }

                    // if (isCallingFirsttime) {
                    //     this.setState({ vehicleList: data })
                    // } else {
                    //     for (let i = 0; i < data.length; i++) {
                    //         let element = data[i]

                    //         let findUniqueData = this.state.vehicleList.find((jobObj) => {
                    //             parseInt(jobObj.id) == parseInt(element.id)
                    //         })

                    //         if (findUniqueData == undefined) {
                    //             this.state.vehicleList.push(element)
                    //             this.setState({ vehicleList: this.state.vehicleList })
                    //         } else {
                    //         }
                    //     }
                    //  }
                    this.setState({ noMoreDataFound: false })
                } else {
                    this.setState({ isLoading: false, isFooterLoading: false })
                    this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
                    // AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingVehicleDetailSCreen = (item) => {
        // if (filterItemObj != null) {
        //     console.log('Filter Obj::: ',filterItemObj)
        //    this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // } else {
        //     this.props.setProps.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // }
    }

    switchToImageGrid = (item) => {
        if (item.images.length > 0) {
            this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item, 'baseImagePath': baseImagePath })
        } else {
            AppConstance.showSnackbarMessage('Image Not Found')
        }

    }

    handleBackPress = () => {
        // this.props.navigation.goBack();
        this.props.navigation("DashboardScreen");

     
    }

    //render Vehicle
    renderVehicle = ({ item, index }) => {
        // uri:vehilceImageBasePath + item.image
        let locationName = this.state.locationList.find((location) => location.id == item.location)

        return <View
                  elevation={2}

          style={{   paddingLeft:10, borderRadius:20, width: deviceWidth * 0.95, height: 106, flexDirection:'column', marginBottom: 10, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}>

<View 
style={{paddingLeft:10, flexDirection:'row'}}>


<TouchableOpacity style={{  flex: 1, justifyContent: 'space-between',  }}
                onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
            >
<ImageBackground 
style={{justifyContent: 'center',  width:55,height:28}}
imageStyle={{borderBottomRightRadius:10,borderBottomLeftRadius:10}}
source={require('../images/backgroundimage.jpg')}
>

<Text style={{ textAlign: 'center',  color:'white', fontSize: 12 }}>{item.year != undefined && item.year != null && item.year != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? item.year : '-'}</Text>


</ImageBackground>
                <Text style={{ color: AppColors.Signincolor, fontSize: 13 }}>{item.make != undefined && item.make != null && item.make != '' ?   item.make.toUpperCase() : '-'}</Text>
                <Text style={{  color: AppColors.Signincolor, fontSize: 13 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase()  : '-'}</Text>

                {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text> */}
                {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={{ borderRadius:5,  width: deviceWidth * 0.42, height:80 }}
                onPress={() => this.switchToImageGrid(item)}
            >
                {item.images.length > 0 ? <Image style={{   borderRadius:20, width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: baseImagePath + item.images[0].thumbnail }} 
                    // imageStyle={{borderRadius:20}}
                    /> :
                    <Image style={{ borderRadius:20, width: undefined, height: undefined, flex: 1 }} 
                    // imageStyle={{borderRadius:20}}

                    source={require('../images/logofinal.jpg')} />}

            </TouchableOpacity>



</View>
<View
  style={{
    borderBottomColor: '#d4eeeb',
    borderBottomWidth: 0,
    justifyContent:'center'
  }}
/>
<View 
style={{ flexDirection:'row', alignSelf:'center'}}>


<TouchableOpacity style={{  flex: 1, justifyContent: 'space-between',  paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
            >


            </TouchableOpacity>

            <TouchableOpacity style={{ borderRadius:5, paddingVertical:3, width: deviceWidth * 0.38, }}
            >
        <Text style={{ alignSelf:'center',  color: AppColors.Signincolor, fontSize: 12 }}>{item.vin != undefined && item.vin != null && item.vin != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? item.vin : '-'}</Text>

            </TouchableOpacity>



</View>


</View>        
        
        
        
        
//         <Elavation
//             elevation={2}
//             style={{   paddingRight:5, borderRadius:20, width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
//         >


// <View 
//             style={{   paddingRight:5, borderRadius:20, width: deviceWidth * 0.95, height: 80, flexDirection: 'column', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}

//  >


// <View style={{flexDirection:'row'}}>



//         {/* <Text>{item.year+item.make+item.model+item.name+item.allData}</Text> */}
            

//             {/* AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath }) */}
//             <TouchableOpacity style={{  flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
//                 onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
//             >

            
//                 <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase() + ' ' + item.make.toUpperCase() : '-'}</Text>
//                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.year != undefined && item.year != null && item.year != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? item.year : '-'}</Text>

//                 {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text> */}
//                 {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text> */}
//             </TouchableOpacity>

//             <TouchableOpacity style={{ borderRadius:5, paddingVertical:5, width: deviceWidth * 0.3, height: 80 }}
//                 onPress={() => this.switchToImageGrid(item)}
//             >
//                 {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
//                     source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
//                     <Image style={{  width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

//             </TouchableOpacity>
// </View>






// </View>
//         </Elavation>
    }

    onTabChange = (event) => {
        let locationvalue = this.state.locationList[event.i]
        locationId = locationvalue.id
        this.setState({ tabIndex: event.i, locationId: locationvalue.id, searchTxt: '', page: 1,isStopCallingAPI:false })
        console.log('ALlTab Selct Vale:: ', event.i, locationvalue.id)
        setTimeout(() => {
            this.callingAPIWithLocation(locationvalue.id, this.state.searchTxt, statusId)
        }, 100)


    }

    //callingApi 
    callingAPIWithLocation = async (location, search, status) => {
        var url = null;
        var locationUrl = null;
        var searchUrl = null;
        var statusUrl = null;
        var baseUrlMain = AppUrlCollection.VEHILE_LIST;
        this.setState({ isLoading: true, isFooterLoading: false })

        url = baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1'
        console.log('STATUS API :;', baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1')
        // if (this.state.locationId > 0) {
        //     locationUrl = baseUrlMain + '&location=' + locationId
        //     url = locationUrl;
        //     console.log('url :location : ', locationUrl)
        // } else if (this.state.searchTxt.trim().length > 0) {
        //     searchUrl = locationUrl != null ? locationUrl.concat('&search_str=' + this.state.searchTxt) : baseUrlMain + '&search_str=' + this.state.searchTxt
        //     url = searchUrl;
        //     console.log('url :search : ', searchUrl)
        // } else if (this.state.statusId > 0) {
        //     statusUrl = searchUrl != null ? searchUrl.concat('&status=' + statusId) : baseUrlMain + '&status=' + statusId
        //     //url = AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID
        //     url = statusUrl;
        //     console.log('url :status : ', statusUrl)
        // }


        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                this.setState({ isLoading: false, page: 1, vehicleList: [], isFooterLoading: false })
                console.log('Load more data :: ', url)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    baseImagePath = responseJson.data.other.vehicle_image;
                    let vehicleList = responseJson.data.vehicleList;
                    if (vehicleList.length > 0) {
                        this.setState({ vehicleList: vehicleList })
                        //this.setState({ vehicleList: responseJson.data.vehicleList, isFilterOrSerachEnable: false })
                        this.setState({ noMoreDataFound: false })

                    } else {
                        this.setState({ noMoreDataFound: true })
                        //   AppConstance.showSnackbarMessage(responseJson.message)
                    }
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //set filter name
    setFiltername = (text) => {
        page = 0;
        let gettingStatusId = AppConstance.gettingStatusIfFromName(text.toUpperCase())
        this.setState({ statusId: gettingStatusId, searchTxt: '', page: 1 })
        statusId = gettingStatusId;
        this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
        this.setState({ selectFilterName: text, isModalVisible: false, isFilterOrSerachEnable: true })
    }

    //Rener Category Content
    renderCategoryContent = ({ item, index }) => {
        return (<TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
            onPress={() => this.setFiltername(item)}
        >
            {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
                : <View style={{ width: 18 }} />}

            <Text style={{  color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
        </TouchableOpacity>
        );
    }

    //clear filter data
    clearFilterData = () => {

        // page = 0;
        // this.setState({ statusId: 0, searchTxt: '', page: 1 })
        // statusId = 0;
        // this.setState({ isFilterOrSerachEnable: true })

        // this.callingAPIWithLocation(0, this.state.searchTxt, 0)
        // this.setState({ tabIndex: 0, locationId: 0, searchTxt: '', vehicleList: [], page: 1 })
        this.setState({ isModalVisible: false })
        this.props.navigation.replace('VehcileScreen', { 'itemObj': filterItemObj, 'setProps': this.props });
    }

    //here is modal content
    renderModalContent = () => {
        return (
            <View style={styles.modalViewStyle}>
                <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{  color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
                   
                   
                    <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10 }}
                        onPress={() => this.clearFilterData()}
                    >
                        <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false })}
                    >
                        {/* <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} /> */}
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.categoryList}
                    renderItem={this.renderCategoryContent}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                />
            </View>
        );
    }

    isOpenFilterDialog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    allServiceCalling = () => {
        setTimeout(() => {
            if (this.state.noMoreDataFound) {

            } else {
                this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
            }
        }, 100)
    }

    //Render Footer
    renderFooter = () => {
        // if (this.state.paidServiceCallStop) {
        // } else {
        //     if (this.state.isFooterLoading) {
        //         return <View>
        //             <ActivityIndicator color={AppColors.toolbarColor} size='large' />
        //         </View>
        //     } else {
        //         return <View>
        //             <TouchableOpacity style={{ width: 150, height: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15, marginTop: 10 }}
        //                 onPress={() => this.allServiceCalling()}
        //             >
        //                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingBottom: 4 }}>Load More</Text>
        //             </TouchableOpacity>
        //             {/* <ActivityIndicator color={AppColors.toolbarColor} size='large' /> */}
        //         </View>
        //     }
        // }
        if (this.state.isStopCallingAPI) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    //calling  free search
    callingSearchAPI = () => {
        this.setState({ isFilterOrSerachEnable: true })
        this.callingAPIWithLocation(this.state.locationId, this.state.searchTxt, this.state.statusId)
    }


    //LoadMore data
    loadMoreData = () => {
        //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

        //page += 1;
        setTimeout(() => {
            if (this.state.isStopCallingAPI) {

            } else {
                if (this.state.noMoreDataFound) {

                } else {
                    this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
                }
            }
        }, 100);
    }


    renderMyTablayout = () => {
        let locationTabGenrate = [];
        for (let index = 0; index < this.state.locationList.length; index++) {
            const element = this.state.locationList[index];
            locationTabGenrate.push(
                <Tab
                    heading={<TabHeading
                        activeTabStyle={{ backgroundColor: AppColors.white, }}
                        activeTextStyle={{ color: '#0c508a', }}
                        tabStyle={{ width: 250 }}
                        textStyle={{ flex: 1 }}
                        style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
                    >
                        <Text style={{
                            color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white,
                            width: 48, fontSize: 12, textAlign: 'center'
                        }}>
                            {element.name}
                        </Text></TabHeading>}
                    activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
                    tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                    textStyle={{ color: AppColors.white,  }}
                    activeTextStyle={{ color: AppColors.toolbarColor,  }}

                >
                    <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground>
                    <View style={{ flex: 1 ,  }}>
                        <View style={styles.searchBarMainView}>
                            <View
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                    
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor='black'
                                        selectionColor={AppColors.toolbarColor}
                                        onChangeText={(text) => this.setState({ searchTxt: text })}
                                        onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' color='black' size={20} />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.filterIconViewStyle}
                                onPress={() => this.setState({ isModalVisible: true })}
                            >
                                {/* <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} /> */}
                            </TouchableOpacity>
                        </View>
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>}
                    </View>
                </Tab>
            )
        }


        return (<Tabs
            ref={(ref) => { this.tabView = ref; }}
            tabBarUnderlineStyle={{ height: 4, backgroundColor: 'grey'}}
            tabContainerStyle={{  height: 50, elevation: 0 }}
            style={{ backgroundColor: AppColors.white, elevation: 0 }}
            tabBarTextStyle={{ color: AppColors.white,  fontSize: 25 }}
            tabBarActiveTextColor='grey'
            tabBarInactiveTextColor={AppColors.black}
            tabBarBackgroundColor='black'

            onChangeTab={(event) => this.onTabChange(event)}
            renderTabBar={() => <ScrollableTab />}
        >
            {locationTabGenrate}
        </Tabs >);
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white, height: deviceHeight, }} >
                {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
                {/* < DialogLoader loading={this.state.isLoading} /> */}
              
              
<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground>

<View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}
onPress={()=> this.props.navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'88%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>All Vehicle</Text>
</View>

<TouchableOpacity
style={{justifyContent:'center',width:'6%', }}

>



</TouchableOpacity>
</View>

{/* <View> */}
{/* <ImageBackground
                        source={require('../Images/ontheway.jpg')}
                          style={{width:"100%", alignSelf:'center', 
                           height:55
                        ,}}
                        >

<TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('NotificationVehicleDetailscreen')}
                                            >
                                                <Image
                                                style={{ resizeMode:'contain',marginVertical:13,marginLeft:20, height:25,width:25}}
                                            
                                                source={require(
                                                '../Images/bell.png'
                                                )}

                                                />

                    </TouchableOpacity> */}



{/* <Image
source={require('../Images/bell.png')}
                          style={{width:20,marginVertical:15, marginLeft:20, justifyContent:"center",
                           height:20
                        ,}}
>


</Image> */}

                        {/* </ImageBackground> */}


{/* </View> */}
   



               
                {/* <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    {filterItemObj != null ?
                        <Toolbar setProps={this.props} headerName={this.state.selectFilterName != '' ? 'Vehicle | ' + this.state.selectFilterName : 'Vehicle'}
                            isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={true} /> : <Toolbar toggle={this.props.toggle} headerName={this.state.selectFilterName != '' ? 'Vehicle | ' + this.state.selectFilterName : 'Vehicle'}
                                isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={false} />}
 <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('NotificationVehicleDetailscreen')}
                                            >
                                                <Image
                                                style={{ resizeMode:'contain',height:30,width:30}}
                                            
                                                source={require(
                                                '../Images/bell.png'
                                                )}

                                                />

                    </TouchableOpacity>
                </View> */}
                {this.renderMyTablayout()}
                {/* <View style={{ flex: 1 }}>
                        <View style={styles.searchBarMainView}>
                            <View
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={AppColors.toolbarColor}
                                        selectionColor={AppColors.toolbarColor}
                                        onChangeText={(text) => this.setState({ searchTxt: text })}
                                        onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.filterIconViewStyle}
                                onPress={() => this.setState({ isModalVisible: true })}
                            >
                                <Image source={require('../images/filter_iconn.png')} style={styles.filterIconStyle} />
                            </TouchableOpacity>
                        </View>
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>}
                    </View> */}

                {/* <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>ALL</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>

                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>LA</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>

                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>GA</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>

                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>NY</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>
                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>TX</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>
                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>LA</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>

                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>GA</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>

                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>NY</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab>
                    <Tab
                        heading={<TabHeading
                            activeTabStyle={{ backgroundColor: AppColors.white }}
                            activeTextStyle={{ color: AppColors.white }}
                            style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                        >
                            <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>TX</Text></TabHeading>}
                        activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                        tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                        textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                        activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.searchBarMainView}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                <TouchableOpacity
                                    style={styles.filterIconViewStyle}
                                    onPress={() => this.setState({ isModalVisible: true })}
                                >
                                    <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                style={{ paddingTop: 5 }}
                                data={this.state.vehicleList}
                                renderItem={this.renderVehicle}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                            />
                        </View>
                    </Tab> */}

                {/* < ModalDialog
                    isVisible={this.state.isModalVisible}
                    style={{
                        justifyContent: "flex-end",
                        margin: 0
                    }}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}
                    backdropOpacity={0.5}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    {this.renderModalContent()}
                </ModalDialog > */}

            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30, color: AppColors.textColor, fontSize: 16
    },
    vehicleCustNameTxtStyle: {
        flex: 1, color: AppColors.textColor, fontSize: 16
    }, vehicleInnerTxtHeadinStyle: {
        fontSize: 14, color: AppColors.textColor, flex: 1.5
    }, vehicleInnerTxtValueStyle: {
       color: AppColors.textColor, fontSize: 15, flex: 2
    },
    vehicleInnerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    vehicleStatusTxtStyle: {
       color: AppColors.textColor, fontSize: 14, marginRight: 10
    },
    vehicleInnreActionOpacityStyle: {
        borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
    },
    vehicleInnreActionTxtStyle: {
         paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
    }, modalViewStyle: {
        backgroundColor: AppColors.white,
        borderRadius: 4, flex: 0,
        //  height:deviceHeight*0.4,
        borderColor: AppColors.white, marginBottom: '-12%'
    },
    dialogMenuTxtStyle: {
        width: deviceWidth, height: 50,
        justifyContent: 'center',
        alignContent: 'center'
    }, dialogMenuTxtViewStyle: {
     
        color: AppColors.textColor,
        fontSize: 15,
        paddingLeft: 10
    }, dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.textColor
    },
    searchBarMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 5
    },
    searchElavationStyle: {
        flex: 1, height: 40,
        borderRadius: 15,
        borderColor:'black',
        marginTop: 8,
        justifyContent:'center',
        marginLeft: 5,
        borderWidth:0.2,
        backgroundColor:'white',
        alignSelf: 'center'
    },
    searchElvationViewStyle: {
        flexDirection: 'row', flex: 1,
        justifyContent:'center',
         alignContent: 'center', alignItems: 'center',
        paddingLeft: 5, marginLeft: 5,
        marginRight: 5, paddingRight: 5
    },
    searchTxtInputStyle: {
        flex: 1,
        color: 'black',
         fontSize: 18,
    },
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 1
    }, filterIconStyle: {
        width: 25, height: 25
    }
})
export default VehcileScreen;


























































































// import React, { Component, useState , useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, NetInfo, BackHandler, ActivityIndicator, SafeAreaView } from 'react-native'
// import AppColors from '../Colors/AppColors';
// import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
// import AppFonts from '../AppFont/AppFonts';
// import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
// import Feather from 'react-native-vector-icons/dist/Feather';
// import Octicons from 'react-native-vector-icons/dist/Octicons';
// import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// import AppUrlCollection from '../UrlCollection/AppUrlCollection';
// import AppMessages from '../AppMessages/AppMesage';







// const VehcileScreen = ({ navigation }) => {

//     const[spinner , setspinner] = useState(false)
//     const[isFooterLoading, setisFooterLoading] = useState(false)
//     const[noMoreDataFound , setnoMoreDataFound] = useState(true)
//     const [vehicleList , setvehicleList] = useState([])
//     const[data1, setdata1] = useState([
//         {
//             id:1
//         }
//     ])
//     const[data , setdata] = useState([])
//     const [locationList , setlocationList] = useState( [ {
//         "id": 1,
//         "name": "LA"
//     },
//     {
//         "id": 2,
//         "name": "GA"
//     },
//     {
//         "id": 3,
//         "name": "NY"
//     },
//     {
//         "id": 4,
//         "name": "TX"
//     },
//     {
//         "id": 8,
//         "name": "TORONTO"
//     },
//     {
//         "id": 9,
//         "name": "MONTREAL"
//     },
//     {
//         "id": 10,
//         "name": "HALIFAX"
//     },
//     {
//         "id": 11,
//         "name": "EDMONTON"
//     },
//     {
//         "id": 12,
//         "name": "CALGARY"
//     },
//     {
//         "id": 13,
//         "name": "Afghanistan"
//     },
//     {
//         "id": 15,
//         "name": "Turkamanistan"
//     },
//     {
//         "id": 19,
//         "name": "VANCOUVER"
//     },
//     {
//         "id": 20,
//         "name": "MANITOBA"
//     },
//     {
//         "id": 21,
//         "name": "WA"
//     }

// ])


//  const renderVehicle = ({ item, index }) => {
//     // uri:vehilceImageBasePath + item.image
//     let locationName = locationList.find((location) => location.id == item.location)
// return(
//     <View>
//         <Text>nnjnjn</Text>
//     </View>
// )
//     // return <View
//     //     elevation={2}
//     //     style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
//     // >
//     //     <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
//     //         onPress={() => this.switchToImageGrid(item)}
//     //     >
//     //         {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
//     //             source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
//     //             <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../images/logofinal.jpg')} />}

//     //     </TouchableOpacity>
//     //     {/* AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath }) */}
//     //     <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
//     //         onPress={() => AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
//     //     >
//     //         <Text style={{ color: AppColors.textColor, fontSize: 13 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase() + ' ' + item.make.toUpperCase() : '-'}</Text>

//     //         <Text style={{  color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text>
//     //         <Text style={{ color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text>
//     //     </TouchableOpacity>
//     // </View>

// }


//     const rendertabs = () => {
//       let locationTabGenrate = [];
//       let tabIndex = 0;
// //       let locationList = [ {
// //         "id": 1,
// //         "name": "LA"
// //     },
// //     {
// //         "id": 2,
// //         "name": "GA"
// //     },
// //     {
// //         "id": 3,
// //         "name": "NY"
// //     },
// //     {
// //         "id": 4,
// //         "name": "TX"
// //     },
// //     {
// //         "id": 8,
// //         "name": "TORONTO"
// //     },
// //     {
// //         "id": 9,
// //         "name": "MONTREAL"
// //     },
// //     {
// //         "id": 10,
// //         "name": "HALIFAX"
// //     },
// //     {
// //         "id": 11,
// //         "name": "EDMONTON"
// //     },
// //     {
// //         "id": 12,
// //         "name": "CALGARY"
// //     },
// //     {
// //         "id": 13,
// //         "name": "Afghanistan"
// //     },
// //     {
// //         "id": 15,
// //         "name": "Turkamanistan"
// //     },
// //     {
// //         "id": 19,
// //         "name": "VANCOUVER"
// //     },
// //     {
// //         "id": 20,
// //         "name": "MANITOBA"
// //     },
// //     {
// //         "id": 21,
// //         "name": "WA"
// //     }

// // ];

//       for (let index = 0; index < locationList.length; index++) {
//         const element =locationList[index];
//         locationTabGenrate.push(
//             <Tab
//                 heading={<TabHeading
//                     activeTabStyle={{ backgroundColor: AppColors.white, }}
//                     activeTextStyle={{ color: AppColors.white, }}
//                     tabStyle={{ width: 250 }}
//                     textStyle={{ flex: 1 }}
//                     style={{ backgroundColor: tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
//                 >
//                     <Text style={{
//                         color: tabIndex == 0 ? AppColors.white : AppColors.white,
//                         // fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold,
//                         width: 48, fontSize: 12, textAlign: 'center'
//                     }}>
//                         {element.name}
//                     </Text></TabHeading>}
//                 activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                 tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                 textStyle={{ color: AppColors.white,  }}
//                 activeTextStyle={{ color: AppColors.toolbarColor,  }}

//             >
//                 <View style={{ flex: 1 ,}}>
//                     <View style={{flexDirection: 'row',
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
//         marginLeft: 8,
//         marginRight: 5}}>
//                         <View
//                             elevation={3}
//                             style={{flex: 1, height: 50,
//                               borderRadius: 10,
//                               marginTop: 8,
//                               marginLeft: 5,
//                               marginRight: 5,
//                               alignSelf: 'center'}}>
//                             <View style={{flexDirection: 'row', flex: 1,
//         alignContent: 'center', alignItems: 'center',
//         paddingLeft: 5, marginLeft: 5,
//         marginRight: 5, paddingRight: 5}}>
//                                 <TextInput style={{flex: 1,
//         color: AppColors.toolbarColor, fontSize: 18,}}
//                                     placeholder='Search'
//                                     placeholderTextColor={AppColors.toolbarColor}
//                                     selectionColor={AppColors.toolbarColor}
//                                     onChangeText={(text) => this.setState({ searchTxt: text })}
//                                     onSubmitEditing={() => this.callingSearchAPI()}
//                                     returnKeyType='search'
//                                 />
//                                 <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                             </View>
//                         </View>
//                         <TouchableOpacity
//                             style={{    marginLeft: 5, marginRight: 5,
//                               justifyContent: 'center', alignContent: 'center',
//                               alignItems: 'center', alignSelf: 'center', marginTop: 5}}
//                             onPress={() => this.setState({ isModalVisible: true })}
//                         >
//                             {/* <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} /> */}
//                         </TouchableOpacity>
//                     </View>
//                     <Text>bjbjbjb</Text>
//                     {data.length > 0 ?
//                         <View style={{ flex: 1 }}>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={data1}
//                                 renderItem={renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={data}
//                                 // ListFooterComponent={this.renderFooter}
//                                 // onEndReached={this.loadMoreData}
//                                 // onEndReachedThreshold={0.5}
//                             />
//                         </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 15 }}>Vehicle Not Found.</Text>
//                         </View>}
//                 </View>
//             </Tab>
//         )
//     }



//     return (<Tabs
//       ref={(ref) => { this.tabView = ref; }}
//       tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
//       tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
//       style={{ backgroundColor: AppColors.white, elevation: 0 }}
//       tabBarTextStyle={{ color: AppColors.white,  fontSize: 25 }}
//       tabBarActiveTextColor={AppColors.white}
//       tabBarInactiveTextColor={AppColors.black}
//       tabBarBackgroundColor={AppColors.toolbarColor}

//       onChangeTab={(event) => onTabChange(event)}
//       renderTabBar={() => <ScrollableTab />}
//   >
//       {locationTabGenrate}
//   </Tabs >);

//         <Container
        
//         style={{backgroundColor:'red'}}>
//         <Header hasTabs/>
//         <Tabs renderTabBar={()=> <ScrollableTab />}>
//           <Tab heading="Tab1">
// <Text>jhgjgjgjhm</Text>       
//    </Tab>
//           <Tab heading="Tab2">
//           <Text>jhgjgjgjhm</Text>       
//           </Tab>
//           <Tab heading="Tab3">
//           <Text>jhgjgjgjhm</Text>       
//           </Tab>
//           <Tab heading="Tab4">
//           <Text>jhgjgjgjhm</Text>       
//           </Tab>
//           <Tab heading="Tab5">
//           <Text>jhgjgjgjhm</Text>       
//           </Tab>
          
//         </Tabs>
//       </Container>
//     }


//     const callingVehicleApi = (isFirstTimeCaling) => {
//         var url = ''
//         if (isFirstTimeCaling) {
//           setspinner(false)
//           setisFooterLoading(false)
//             // this.setState({ isLoading: true, isFooterLoading: false })
//             url = AppUrlCollection.VEHILE_LIST
//                 } else {
//           setspinner(false)
//           setisFooterLoading(true)
//             // this.setState({ isLoading: false, isFooterLoading: true })
//             url = AppUrlCollection.VEHILE_LIST
//         }
//         fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                  'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 // this.setState({ isLoading: false })
//               setspinner(false)
//                 console.log('Response data viw :: ', responseJson)
//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
//                     imageBasePath = responseJson.data.other.export_image
//                     if (responseJson.data.vehicleList.length > 0) {
//                       console.log('response'+responseJson.data.vehicleList);
//                         if (isFirstTimeCaling) {
//                           setvehicleList(responseJson.data.vehicleList)
//                           setnoMoreDataFound(false)
//                           setisFooterLoading(false)
//                             // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
//                         } else {
                          
//                           setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
//                           setdata(old => [...old, ...data]);
      
//                           setnoMoreDataFound(false)
//                           setisFooterLoading(false)
//                             // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
//                         }
//                     } else {
//                         if (isFirstTimeCaling) {
//                           setvehicleList([])
//                           setnoMoreDataFound(true);
//                           setisFooterLoading(false)
//                             // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
//                         } else {
//                           setisFooterLoading(false)
//                         setnoMoreDataFound(true)
//                             // this.setState({ isFooterLoading: false, noMoreDataFound: true })
//                         }
      
//                     }
//                 } else {
//                     AppConstance.showSnackbarMessage(responseJson.message)
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
//       } 

//     const  callingAPIWithLocation = async (location ) => {
//         var url = null;
//         var locationUrl = null;
//         var searchUrl = null;
//         var statusUrl = null;
//         var baseUrlMain = AppUrlCollection.VEHILE_LIST;
//         // this.setState({ isLoading: true, isFooterLoading: false })

//         url = AppUrlCollection.VEHILE_LIST + '&location=' + location 
//         // + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1'
//         // console.log('STATUS API :;', baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1')
//         // if (this.state.locationId > 0) {
//         //     locationUrl = baseUrlMain + '&location=' + locationId
//         //     url = locationUrl;
//         //     console.log('url :location : ', locationUrl)
//         // } else if (this.state.searchTxt.trim().length > 0) {
//         //     searchUrl = locationUrl != null ? locationUrl.concat('&search_str=' + this.state.searchTxt) : baseUrlMain + '&search_str=' + this.state.searchTxt
//         //     url = searchUrl;
//         //     console.log('url :search : ', searchUrl)
//         // } else if (this.state.statusId > 0) {
//         //     statusUrl = searchUrl != null ? searchUrl.concat('&status=' + statusId) : baseUrlMain + '&status=' + statusId
//         //     //url = AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID
//         //     url = statusUrl;
//         //     console.log('url :status : ', statusUrl)
//         // }


//         await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 //   this.setState({ vehicleList: responseJson.data.vehicle_details })
//                 // this.setState({ isLoading: false, page: 1, vehicleList: [], isFooterLoading: false })
//                 console.log('Load more data :: ', url)
//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
//                     baseImagePath = responseJson.data.other.vehicle_image;
//                     let vehicleList = responseJson.data.vehicleList;
//                     if (vehicleList.length > 0) {
//                         alert('bh')
//                         // this.setState({ vehicleList: vehicleList })
//                         setdata(vehicleList)
//                         setnoMoreDataFound(false)
//                         //this.setState({ vehicleList: responseJson.data.vehicleList, isFilterOrSerachEnable: false })
//                         // this.setState({ noMoreDataFound: false })

//                     } else {
//                         setdata('')
//                         setnoMoreDataFound(false)

//                         // this.setState({ noMoreDataFound: true })
//                         //   AppConstance.showSnackbarMessage(responseJson.message)
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
//     }

//     const  onTabChange = (event) => {
//         console.log('---'+event.i);
//         const value = event.i;
//         var locationvalue ;
//         switch(value) {
 
//             case 0:
//             //   setlocation_name('LA')
//               locationvalue = '1'
//                 break;
//                 case 1:
//                 //   setlocation_name('GA')
//                   locationvalue = '2'
//                     break;
//                     case 2:
//                     //   setlocation_name('NY')
//                       locationvalue = '3'
//                         break;
//                         case 3:
//                         //   setlocation_name('TX')
//                           locationvalue = '4'
//                             break;
//                             case 4:
//                             //   setlocation_name('TORONTO')
//                               locationvalue = '8'
//                                 break;
//                                 case 5:
//                                 //   setlocation_name('MONTREAL')
//                                   locationvalue = '9'
//                                     break;
//                                     case 6:
//                                     //   setlocation_name('HALIFAX')
//                                       locationvalue = '10'
//                                         break;
//                                         case 7:
//                                         //   setlocation_name('EDMONTON')
//                                           locationvalue = '11'
//                                             break;
//                                             case 8:
//                                             //   setlocation_name('CALGARY')
//                                               locationvalue = '12'
//                                                 break;
//                                                 case 9:
//                                                 //   setlocation_name('Afghanistan')
//                                                   locationvalue = '13'
//                                                     break;
//                                                     case 10:
//                                                     //   setlocation_name('Turkamanistan')
//                                                       locationvalue = '15'
//                                                         break;
//                                                         case 11:
//                                                         //   setlocation_name('VANCOUVER')
//                                                           locationvalue = '19'
//                                                             break;
//                                                             case 12:
//                                                             //   setlocation_name('MANITOBA')
//                                                               locationvalue = '22'
//                                                                 break;
//                                                                 case 13:
//                                                                 //   setlocation_name('WA')
//                                                                   locationvalue = '21'
//                                                                     break;
                                                        


//             default:
//               // alert("NUMBER NOT FOUND");
//             //   setlocation_name('Please Select Location')
          
//             }

//         // if(event.i == ){
//         //     locationvalue =this.state.locationList[event.i];
//         // }
//         // locationId = locationvalue.id
//         // this.setState({ tabIndex: event.i, locationId: locationvalue.id, searchTxt: '', page: 1,isStopCallingAPI:false })
//         // console.log('ALlTab Selct Vale:: ', event.i, locationvalue.id)
//         setTimeout(() => {
//             callingAPIWithLocation(locationvalue)
//         }, 100)


//     }

    
//   useEffect(() => {

//     // setspinner(true)
//     // callingdashboardApi()
//     // setspinner(false)
//     callingVehicleApi()
//     return () => {
      
//     }
//   }, [])

//     return (<SafeAreaView>




// {rendertabs()}
//     </SafeAreaView>







//     )

//     }



































// class VehcileScreen extends Component {
//     constructor(props) {
//         super(props)
//         this.onEndReachedCalledDuringMomentum = true;
//         if (this.props.isOuterCalling == undefined) {
//             // filterItemObj = this.props.navigation.state.params.itemObj;
//             // setProps = this.props.navigation.state.params.setProps;
//         }
//         else if (this.props.isOuterCalling) {
//             filterItemObj = null;

//         } else {
//         }

//         this.state = {
//             isLoading: false,
//             isDisplayView: 0,
//             tabIndex: 0,
//             selectFilterName: '',
//             isModalVisible: false,
//             locationList: [],
//             vehicleList: [],
//             searchTxt: '',
//             isStopCallingAPI: false,
//             isFilterOrSerachEnable: false,
//             page: 1,
//             isFooterLoading: false,
//             noMoreDataFound: false,
//             categoryList: [
//                 'New Purchased', 'On Hand', 'Ready to Ship', 'On the way', 'Arrived', ''
//             ],
//             refreshing: false,
//             statusId: 0,
//             locationId: 0
//         }

//     }




//    const renderMyTablayout = () => {
//         let locationTabGenrate = [];
//         for (let index = 0; index < this.state.locationList.length; index++) {
//             const element = this.state.locationList[index];
//             locationTabGenrate.push(
//                 <Tab
//                     heading={<TabHeading
//                         activeTabStyle={{ backgroundColor: AppColors.white, }}
//                         activeTextStyle={{ color: AppColors.white, }}
//                         tabStyle={{ width: 250 }}
//                         textStyle={{ flex: 1 }}
//                         style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
//                     >
//                         <Text style={{
//                             color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white,
//                             fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold,
//                             width: 48, fontSize: 12, textAlign: 'center'
//                         }}>
//                             {element.name}
//                         </Text></TabHeading>}
//                     activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                     tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                     textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold, }}
//                     activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

//                 >
//                     <View style={{ flex: 1 }}>
//                         <View style={styles.searchBarMainView}>
//                             <Elavation
//                                 elevation={3}
//                                 style={styles.searchElavationStyle}>
//                                 <View style={styles.searchElvationViewStyle}>
//                                     <TextInput style={styles.searchTxtInputStyle}
//                                         placeholder='Search'
//                                         placeholderTextColor={AppColors.toolbarColor}
//                                         selectionColor={AppColors.toolbarColor}
//                                         onChangeText={(text) => this.setState({ searchTxt: text })}
//                                         onSubmitEditing={() => this.callingSearchAPI()}
//                                         returnKeyType='search'
//                                     />
//                                     <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                 </View>
//                             </Elavation>
//                             <TouchableOpacity
//                                 style={styles.filterIconViewStyle}
//                                 onPress={() => this.setState({ isModalVisible: true })}
//                             >
//                                 <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                             </TouchableOpacity>
//                         </View>
//                         {this.state.vehicleList.length > 0 ?
//                             <View style={{ flex: 1 }}>
//                                 <FlatList
//                                     style={{ paddingTop: 5 }}
//                                     data={this.state.vehicleList}
//                                     renderItem={this.renderVehicle}
//                                     keyExtractor={(item, index) => index}
//                                     extraData={this.state}
//                                     ListFooterComponent={this.renderFooter}
//                                     onEndReached={this.loadMoreData}
//                                     onEndReachedThreshold={0.5}
//                                 />
//                             </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
//                                 <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 15 }}>Vehicle Not Found.</Text>
//                             </View>}
//                     </View>
//                 </Tab>
//             )
//         }


//         return (<Tabs
//             ref={(ref) => { this.tabView = ref; }}
//             tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
//             tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
//             style={{ backgroundColor: AppColors.white, elevation: 0 }}
//             tabBarTextStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 25 }}
//             tabBarActiveTextColor={AppColors.white}
//             tabBarInactiveTextColor={AppColors.black}
//             tabBarBackgroundColor={AppColors.toolbarColor}

//             onChangeTab={(event) => this.onTabChange(event)}
//             renderTabBar={() => <ScrollableTab />}
//         >
//             {locationTabGenrate}
//         </Tabs >);
//     }





//     componentDidMount() {
//         console.log('Filter item obj :: ', filterItemObj)
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//         statusId = 0;

//         // NetInfo.isConnected.addEventListener(
//         //     'connectionChange',
//         //     this._handleConnectivityChange
//         // );

//         // NetInfo.isConnected.fetch().done((isConnected) => {
//             // if (isConnected == true) {
//                 this.setState({ isLoading: true })
//                 this.ccallingLocationApi();
//                 if (filterItemObj != null) {
//                     let gettingStatusId = AppConstance.gettingStatusIfFromName(filterItemObj.name.toUpperCase())
//                     console.log('My sdadhas ', gettingStatusId)
//                     if (gettingStatusId != undefined && gettingStatusId != 'undefined' && gettingStatusId != '') {
//                         this.setState({ statusId: gettingStatusId })
//                         statusId = gettingStatusId
//                     } else {
//                         this.setState({ statusId: 0 })
//                         statusId = 0
//                     }

//                     this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
//                     this.setState({ selectFilterName: filterItemObj.name })
//                 } else {
//                     this.callingVehicleApi(true)
//                 }
//             // }
          
//         // });


//     }

//     //Check internet connection
//     _handleConnectivityChange = (isConnected) => {
//         if (isConnected) {

//         } else {
//             this.setState({ isLoading: false })
//             AppConstance.APP_PROPS.navigation.navigate('NoInternetConnectionFoundScreen')
//         }
//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
//     }

//     handleBackPress = () => {
//         console.log('App BAck ', this.props.isOuterCalling)
//         AppConstance.APP_PROPS.navigation.push('NavigationSideScreen', { 'isRefreshAllScreen': true })
//         return true;
//     }




//     //calling location api
//     ccallingLocationApi = () => {
//         this.setState({ locationList: [] })

//         fetch(AppUrlCollection.LOCATION, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 var allData = {
//                     id: 0,
//                     name: 'ALL'
//                 }
//                 this.state.locationList.push(allData)
//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
//                     this.setState({ locationList: this.state.locationList.concat(responseJson.data), locationId: responseJson.data[0].id })
//                     locationList.push(this.state.locationList)
//                 } else {
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
//     }

//     //calling Vehicle list
//     callingVehicleApi = async (isCallingFirsttime) => {
//         if (isCallingFirsttime) {
//             this.setState({ isLoading: true, isFooterLoading: false })
//         } else {
//             this.setState({ isLoading: false, isFooterLoading: true })
//         }
//         console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
//         fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {

//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
//                     baseImagePath = responseJson.data.other.vehicle_image;
//                     let data = responseJson.data.vehicleList;
//                     this.setState({ isLoading: false, isFooterLoading: false })
//                     if (data.length > 0) {
//                         // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
//                         this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
//                     } else {
//                         this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
//                     }
//                     // if (data.length > 0) {
//                     //     this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
//                     // } else {
//                     //     this.setState({ noMoreDataFound: true, isFooterLoading: false })
//                     // }

//                     // if (isCallingFirsttime) {
//                     //     this.setState({ vehicleList: data })
//                     // } else {
//                     //     for (let i = 0; i < data.length; i++) {
//                     //         let element = data[i]

//                     //         let findUniqueData = this.state.vehicleList.find((jobObj) => {
//                     //             parseInt(jobObj.id) == parseInt(element.id)
//                     //         })

//                     //         if (findUniqueData == undefined) {
//                     //             this.state.vehicleList.push(element)
//                     //             this.setState({ vehicleList: this.state.vehicleList })
//                     //         } else {
//                     //         }
//                     //     }
//                     //  }
//                     this.setState({ noMoreDataFound: false })
//                 } else {
//                     this.setState({ isLoading: false, isFooterLoading: false })
//                     this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
//                     // AppConstance.showSnackbarMessage(responseJson.message)
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
//     }


//     callingVehicleDetailSCreen = (item) => {
//         // if (filterItemObj != null) {
//         //     console.log('Filter Obj::: ',filterItemObj)
//         //    this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
//         // } else {
//         //     this.props.setProps.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
//         // }
//     }

//     switchToImageGrid = (item) => {
//         if (item.images.length > 0) {
//             AppConstance.APP_PROPS.navigation.navigate('VehicleImageListScreen', { 'itemObj': item, 'baseImagePath': baseImagePath })
//         } else {
//             AppConstance.showSnackbarMessage('Image Not Found')
//         }

//     }

//     //render Vehicle
//     renderVehicle = ({ item, index }) => {
//         // uri:vehilceImageBasePath + item.image
//         let locationName = this.state.locationList.find((location) => location.id == item.location)

//         return <View
//             elevation={2}
//             style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
//         >
//             <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
//                 onPress={() => this.switchToImageGrid(item)}
//             >
//                 {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
//                     source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
//                     <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../images/logofinal.jpg')} />}

//             </TouchableOpacity>
//             {/* AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath }) */}
//             <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
//                 onPress={() => AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
//             >
//                 <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase() + ' ' + item.make.toUpperCase() : '-'}</Text>

//                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text>
//                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text>
//             </TouchableOpacity>
//         </View>
//     }

    // onTabChange = (event) => {
    //   console.log(event);
    //     // let locationvalue = this.state.locationList[event.i]
    //     // locationId = locationvalue.id
    //     // this.setState({ tabIndex: event.i, locationId: locationvalue.id, searchTxt: '', page: 1,isStopCallingAPI:false })
    //     // console.log('ALlTab Selct Vale:: ', event.i, locationvalue.id)
    //     // setTimeout(() => {
    //     //     this.callingAPIWithLocation(locationvalue.id, this.state.searchTxt, statusId)
    //     // }, 100)


    // }

//     //callingApi 
//     callingAPIWithLocation = async (location, search, status) => {
//         var url = null;
//         var locationUrl = null;
//         var searchUrl = null;
//         var statusUrl = null;
//         var baseUrlMain = AppUrlCollection.VEHILE_LIST;
//         this.setState({ isLoading: true, isFooterLoading: false })

//         url = baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1'
//         console.log('STATUS API :;', baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1')
//         // if (this.state.locationId > 0) {
//         //     locationUrl = baseUrlMain + '&location=' + locationId
//         //     url = locationUrl;
//         //     console.log('url :location : ', locationUrl)
//         // } else if (this.state.searchTxt.trim().length > 0) {
//         //     searchUrl = locationUrl != null ? locationUrl.concat('&search_str=' + this.state.searchTxt) : baseUrlMain + '&search_str=' + this.state.searchTxt
//         //     url = searchUrl;
//         //     console.log('url :search : ', searchUrl)
//         // } else if (this.state.statusId > 0) {
//         //     statusUrl = searchUrl != null ? searchUrl.concat('&status=' + statusId) : baseUrlMain + '&status=' + statusId
//         //     //url = AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID
//         //     url = statusUrl;
//         //     console.log('url :status : ', statusUrl)
//         // }


//         await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 //   this.setState({ vehicleList: responseJson.data.vehicle_details })
//                 this.setState({ isLoading: false, page: 1, vehicleList: [], isFooterLoading: false })
//                 console.log('Load more data :: ', url)
//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
//                     baseImagePath = responseJson.data.other.vehicle_image;
//                     let vehicleList = responseJson.data.vehicleList;
//                     if (vehicleList.length > 0) {
//                         this.setState({ vehicleList: vehicleList })
//                         //this.setState({ vehicleList: responseJson.data.vehicleList, isFilterOrSerachEnable: false })
//                         this.setState({ noMoreDataFound: false })

//                     } else {
//                         this.setState({ noMoreDataFound: true })
//                         //   AppConstance.showSnackbarMessage(responseJson.message)
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
//     }

//     //set filter name
//     setFiltername = (text) => {
//         page = 0;
//         let gettingStatusId = AppConstance.gettingStatusIfFromName(text.toUpperCase())
//         this.setState({ statusId: gettingStatusId, searchTxt: '', page: 1 })
//         statusId = gettingStatusId;
//         this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
//         this.setState({ selectFilterName: text, isModalVisible: false, isFilterOrSerachEnable: true })
//     }

//     //Rener Category Content
//     renderCategoryContent = ({ item, index }) => {
//         return (<TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
//             onPress={() => this.setFiltername(item)}
//         >
//             {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
//                 : <View style={{ width: 18 }} />}

//             <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
//         </TouchableOpacity>
//         );
//     }

//     //clear filter data
//     clearFilterData = () => {

//         // page = 0;
//         // this.setState({ statusId: 0, searchTxt: '', page: 1 })
//         // statusId = 0;
//         // this.setState({ isFilterOrSerachEnable: true })

//         // this.callingAPIWithLocation(0, this.state.searchTxt, 0)
//         // this.setState({ tabIndex: 0, locationId: 0, searchTxt: '', vehicleList: [], page: 1 })
//         this.setState({ isModalVisible: false })
//         this.props.navigation.replace('VehcileScreen', { 'itemObj': filterItemObj, 'setProps': this.props });
//     }

//     //here is modal content
//     renderModalContent = () => {
//         return (
//             <View style={styles.modalViewStyle}>
//                 <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
//                     <Text style={{ fontFamily: AppFonts.JosefinSansBold, color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
//                     <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10 }}
//                         onPress={() => this.clearFilterData()}
//                     >
//                         <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15 }}>Clear</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={() => this.setState({ isModalVisible: false })}
//                     >
//                         {/* <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} /> */}
//                     </TouchableOpacity>
//                 </View>
//                 <FlatList
//                     style={{ paddingTop: 5 }}
//                     data={this.state.categoryList}
//                     renderItem={this.renderCategoryContent}
//                     keyExtractor={(item, index) => index}
//                     extraData={this.state}
//                     ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
//                 />
//             </View>
//         );
//     }

//     isOpenFilterDialog = () => {
//         this.setState({ isModalVisible: !this.state.isModalVisible })
//     }

//     allServiceCalling = () => {
//         setTimeout(() => {
//             if (this.state.noMoreDataFound) {

//             } else {
//                 this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
//             }
//         }, 100)
//     }

//     //Render Footer
//     renderFooter = () => {
//         // if (this.state.paidServiceCallStop) {
//         // } else {
//         //     if (this.state.isFooterLoading) {
//         //         return <View>
//         //             <ActivityIndicator color={AppColors.toolbarColor} size='large' />
//         //         </View>
//         //     } else {
//         //         return <View>
//         //             <TouchableOpacity style={{ width: 150, height: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15, marginTop: 10 }}
//         //                 onPress={() => this.allServiceCalling()}
//         //             >
//         //                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingBottom: 4 }}>Load More</Text>
//         //             </TouchableOpacity>
//         //             {/* <ActivityIndicator color={AppColors.toolbarColor} size='large' /> */}
//         //         </View>
//         //     }
//         // }
//         if (this.state.isStopCallingAPI) {
//             return null;
//         } else {
//             return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
//         }
//     }

//     //calling  free search
//     callingSearchAPI = () => {
//         this.setState({ isFilterOrSerachEnable: true })
//         this.callingAPIWithLocation(this.state.locationId, this.state.searchTxt, this.state.statusId)
//     }


//     //LoadMore data
//     loadMoreData = () => {
//         //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

//         //page += 1;
//         setTimeout(() => {
//             if (this.state.isStopCallingAPI) {

//             } else {
//                 if (this.state.noMoreDataFound) {

//                 } else {
//                     this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
//                 }
//             }
//         }, 100);
//     }


//     renderMyTablayout = () => {
//         let locationTabGenrate = [];
//         for (let index = 0; index < this.state.locationList.length; index++) {
//             const element = this.state.locationList[index];
//             locationTabGenrate.push(
//                 <Tab
//                     heading={<TabHeading
//                         activeTabStyle={{ backgroundColor: AppColors.white, }}
//                         activeTextStyle={{ color: AppColors.white, }}
//                         tabStyle={{ width: 250 }}
//                         textStyle={{ flex: 1 }}
//                         style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
//                     >
//                         <Text style={{
//                             color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white,
//                             fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold,
//                             width: 48, fontSize: 12, textAlign: 'center'
//                         }}>
//                             {element.name}
//                         </Text></TabHeading>}
//                     activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                     tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                     textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold, }}
//                     activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

//                 >
//                     <View style={{ flex: 1 }}>
//                         <View style={styles.searchBarMainView}>
//                             <View
//                                 elevation={3}
//                                 style={styles.searchElavationStyle}>
//                                 <View style={styles.searchElvationViewStyle}>
//                                     <TextInput style={styles.searchTxtInputStyle}
//                                         placeholder='Search'
//                                         placeholderTextColor={AppColors.toolbarColor}
//                                         selectionColor={AppColors.toolbarColor}
//                                         onChangeText={(text) => this.setState({ searchTxt: text })}
//                                         onSubmitEditing={() => this.callingSearchAPI()}
//                                         returnKeyType='search'
//                                     />
//                                     <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                 </View>
//                             </View>
//                             <TouchableOpacity
//                                 style={styles.filterIconViewStyle}
//                                 onPress={() => this.setState({ isModalVisible: true })}
//                             >
//                                 {/* <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} /> */}
//                             </TouchableOpacity>
//                         </View>
//                         {this.state.vehicleList.length > 0 ?
//                             <View style={{ flex: 1 }}>
//                                 <FlatList
//                                     style={{ paddingTop: 5 }}
//                                     data={this.state.vehicleList}
//                                     renderItem={this.renderVehicle}
//                                     keyExtractor={(item, index) => index}
//                                     extraData={this.state}
//                                     ListFooterComponent={this.renderFooter}
//                                     onEndReached={this.loadMoreData}
//                                     onEndReachedThreshold={0.5}
//                                 />
//                             </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
//                                 <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 15 }}>Vehicle Not Found.</Text>
//                             </View>}
//                     </View>
//                 </Tab>
//             )
//         }


//         return (<Tabs
//             ref={(ref) => { this.tabView = ref; }}
//             tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
//             tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
//             style={{ backgroundColor: AppColors.white, elevation: 0 }}
//             tabBarTextStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 25 }}
//             tabBarActiveTextColor={AppColors.white}
//             tabBarInactiveTextColor={AppColors.black}
//             tabBarBackgroundColor={AppColors.toolbarColor}

//             onChangeTab={(event) => this.onTabChange(event)}
//             renderTabBar={() => <ScrollableTab />}
//         >
//             {locationTabGenrate}
//         </Tabs >);
//     }


//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: AppColors.white, height: deviceHeight, }} >
//                 {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
//                 {/* < DialogLoader loading={this.state.isLoading} /> */}
//                 <View style={{ backgroundColor: AppColors.toolbarColor }}>
//                     {/* {filterItemObj != null ?
//                         <Toolbar setProps={this.props} headerName={this.state.selectFilterName != '' ? 'Vehicle | ' + this.state.selectFilterName : 'Vehicle'}
//                             isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={true} /> : <Toolbar toggle={this.props.toggle} headerName={this.state.selectFilterName != '' ? 'Vehicle | ' + this.state.selectFilterName : 'Vehicle'}
//                                 isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={false} />} */}
//                 {this.renderMyTablayout()}

//                 </View>


//                 {/* <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>ALL</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>

//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>

//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>LA</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>

//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>GA</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>

//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>NY</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>
//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>TX</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>
//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>LA</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}

//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>

//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>GA</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>

//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>NY</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab>
//                     <Tab
//                         heading={<TabHeading
//                             activeTabStyle={{ backgroundColor: AppColors.white }}
//                             activeTextStyle={{ color: AppColors.white }}
//                             style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
//                         >
//                             <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>TX</Text></TabHeading>}
//                         activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
//                         tabStyle={{ backgroundColor: AppColors.toolbarColor }}
//                         textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
//                         activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
//                     >
//                         <View style={{ flex: 1 }}>
//                             <View style={styles.searchBarMainView}>
//                                 <Elavation
//                                     elevation={3}
//                                     style={styles.searchElavationStyle}>
//                                     <View style={styles.searchElvationViewStyle}>
//                                         <TextInput style={styles.searchTxtInputStyle}
//                                             placeholder='Search'
//                                             placeholderTextColor={AppColors.toolbarColor}
//                                             selectionColor={AppColors.toolbarColor}
//                                         />
//                                         <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
//                                     </View>
//                                 </Elavation>
//                                 <TouchableOpacity
//                                     style={styles.filterIconViewStyle}
//                                     onPress={() => this.setState({ isModalVisible: true })}
//                                 >
//                                     <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList
//                                 style={{ paddingTop: 5 }}
//                                 data={this.state.vehicleList}
//                                 renderItem={this.renderVehicle}
//                                 keyExtractor={(item, index) => index}
//                                 extraData={this.state}
//                             />
//                         </View>
//                     </Tab> */}

//                 {/* < ModalDialog
//                     isVisible={this.state.isModalVisible}
//                     style={{
//                         justifyContent: "flex-end",
//                         margin: 0
//                     }}
//                     onBackButtonPress={() => this.setState({ isModalVisible: false })}
//                     backdropOpacity={0.5}
//                     onBackdropPress={() => this.setState({ isModalVisible: false })}
//                 >
//                     {this.renderModalContent()}
//                 </ModalDialog > */}

//             </View >
//         );
//     }
// }

// const styles = StyleSheet.create({
//     vehicleHaxNoTxtStyle: {
//         width: 30, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 16
//     },
//     vehicleCustNameTxtStyle: {
//         fontFamily: AppFonts.SourceSansProSemiBold, flex: 1, color: AppColors.textColor, fontSize: 16
//     }, vehicleInnerTxtHeadinStyle: {
//         fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 14, color: AppColors.textColor, flex: 1.5
//     }, vehicleInnerTxtValueStyle: {
//         fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 15, flex: 2
//     },
//     vehicleInnerMainViewStyle: {
//         flexDirection: 'row',
//         marginTop: 5,
//         marginBottom: 5
//     },
//     vehicleStatusTxtStyle: {
//         fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, marginRight: 10
//     },
//     vehicleInnreActionOpacityStyle: {
//         borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
//     },
//     vehicleInnreActionTxtStyle: {
//         fontFamily: AppFonts.SourceSansProRegular, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
//     }, modalViewStyle: {
//         backgroundColor: AppColors.white,
//         borderRadius: 4, flex: 0,
//         //  height:deviceHeight*0.4,
//         borderColor: AppColors.white, marginBottom: '-12%'
//     },
//     dialogMenuTxtStyle: {
//         width: deviceWidth, height: 50,
//         justifyContent: 'center',
//         alignContent: 'center'
//     }, dialogMenuTxtViewStyle: {
//         fontFamily: AppFonts.JosefinSansRegular,
//         color: AppColors.textColor,
//         fontSize: 15,
//         paddingLeft: 10
//     }, dividerViewStyle: {
//         width: deviceWidth,
//         height: 0.5,
//         backgroundColor: AppColors.textColor
//     },
//     searchBarMainView: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
//         marginLeft: 8,
//         marginRight: 5
//     },
//     searchElavationStyle: {
//         flex: 1, height: 50,
//         borderRadius: 10,
//         marginTop: 8,
//         marginLeft: 5,
//         marginRight: 5,
//         alignSelf: 'center'
//     },
//     searchElvationViewStyle: {
//         flexDirection: 'row', flex: 1,
//         alignContent: 'center', alignItems: 'center',
//         paddingLeft: 5, marginLeft: 5,
//         marginRight: 5, paddingRight: 5
//     },
//     searchTxtInputStyle: {
//         flex: 1,
//         fontFamily: AppFonts.SourceSansProRegular,
//         color: AppColors.toolbarColor, fontSize: 18,
//     },
//     filterIconViewStyle: {
//         marginLeft: 5, marginRight: 5,
//         justifyContent: 'center', alignContent: 'center',
//         alignItems: 'center', alignSelf: 'center', marginTop: 5
//     }, filterIconStyle: {
//         width: 25, height: 25
//     }
// })
// export default VehcileScreen;


