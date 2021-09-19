import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import { TextInput } from 'react-native-gesture-handler';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';

const Accounts = ({route, navigation }) => {
  const [search, setSearch] = useState('');
  const [activetab , setactivetab] = useState(0)
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)
  const [ isStopCallingAPI , setisStopCallingAPI] =useState(false)
  const [page , setpage] = useState(1)
  const [spinner , setspinner] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([
    {
      date: '20-01-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    {
      date: '20-12-2019',
      Name: 'KHU62389JBB',
      price:'$26,00.00'
    },
    {
      date: '20-12-2020',
      Name: 'M97K62389JBB',
      price:'$22,80.00'
    },
    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },

    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    ]
  )


  const [data, setdata] = useState([
    {
      date: '20-01-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00',
      vehicle:{
        model: '',
        year:'',
        make:''
      }
    },
    {
      date: '20-12-2019',
      Name: 'KHU62389JBB',
      price:'$26,00.00',
      vehicle:{
        model: '',
        year:'',
        make:''
      }
    },
    {
      date: '20-12-2020',
      Name: 'M97K62389JBB',
      price:'$22,80.00',
      vehicle:{
        model: '',
        year:'',
        make:''
      }
    },
    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },

    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    ]
  )




  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log(text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(
        function (item) {
          const itemData = item.Name
            ? item.Name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const renderFooter = () => {
    if (isFooterLoading == true) {
        return <View style={{paddingVertical:15}}><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
    } else {
        return null;
    }
  }
  
  const loadMoreData = () => {
    // setisFooterLoading(true)
    setTimeout(() => {
        if (isStopCallingAPI === true) {
          setisFooterLoading(false)
  alert('stop calling')
        } else {
            if (noMoreDataFound === true) {
              alert('nomoredata')
              setisFooterLoading(false)

  
            } else {
              setpage(prevState => prevState + 1);
  
              // setpage(page+1)
              callingInvoiceApi(false, activetab)
            }
        }
    }, 100);
  }
const renderlist = ({item}) =>{

  return(
    
<View style={{flexDirection:'row', backgroundColor:'red', justifyContent:'space-between',paddingHorizontal:7, alignSelf:'center', marginTop:5, width:'100%',height:55}} >


<View style={{flexDirection:'column', justifyContent:'center'}}>


<Text style={{color:'white',paddingVertical:2, fontSize:15,}}>{item.vehicle ? item.vehicle.year :''} {item.vehicle ? item.vehicle.make :''} {item.vehicle ? item.vehicle.model :''}</Text>
<Text style={{color:'grey',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>Status: {item.status == '3'? 'Paid': item.status == '1' ? 'Unpaid':'' }</Text>


</View>
<View style={{height:'100%',justifyContent:'center',}}>

<View style={{paddingHorizontal:10, backgroundColor:'#fd6b73', borderRadius:15,paddingVertical:5, }}>
<Text style={{alignSelf:'center',color:'black',fontWeight:'bold', }} >{item.final_total}</Text>

</View>
</View>

{/* <View style={{justifyContent:'flex-end'}}>

  <Text style={{color:'white', alignSelf:'center'}}>jhhhh</Text>
</View> */}




{/* <TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'100%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6,}}>
<View style={{  width:'100%',height:'100%', flexDirection:'row'  ,justifyContent:'space-between'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4,alignSelf:'center', paddingVertical:2, width:'62%'}}>

<Text style={{color:'white',paddingVertical:2, fontSize:15,}}>{item.name}</Text>
<Text style={{color:'grey',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>ETA {item.date}</Text>


</View>

</View>
<View
// onPress={()=>navigation.navigate('CarDetails')}
style={{  paddingVertical:1,borderRadius:6,alignSelf:'flex-end',borderRadius:20, backgroundColor:'#fd6b73'}}>

<Text style={{alignSelf:'center', paddingVertical:2}} >$2456.00</Text>

</View>



</View>

</TouchableOpacity>
 */}









</View>

  
  
  )
  
   }


const  callingInvoiceApi = (isFirstTimeCaling ,activetab ) => {
    var url = ''
    if (isFirstTimeCaling) {
      setdata('')
      setspinner(false)
      setisFooterLoading(false)
        // this.setState({ isLoading: true, isFooterLoading: false })
        url = AppUrlCollection.INVOICE + '&status='+activetab
    } else {
      setspinner(false)
      setisFooterLoading(true)
        // this.setState({ isLoading: false, isFooterLoading: true })
        url = AppUrlCollection.INVOICE + 'page=' + page + '&status='+activetab
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
             'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // this.setState({ isLoading: false })
          setspinner(false)
            console.log('Response data viw :: ', responseJson)
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                // imageBasePath = responseJson.data.other.export_image
                if (responseJson.data.length > 0) {
                  console.log('response'+responseJson.data);
                    if (isFirstTimeCaling) {
                      setdata(responseJson.data)
                      // setvehicleList(responseJson.data)
                      setnoMoreDataFound(false)
                      // setisStopCallingAPI(false)
                      // alert(page)
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                    } else {
                      // alert(page)

                      setdata(old =>[...old, ...responseJson.data])
                      // setdata(old => [...old, ...data]);
                      // setisStopCallingAPI(false)

                      setnoMoreDataFound(false)
                      setisFooterLoading(false)
                        // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                    }
                } else {
                    if (isFirstTimeCaling) {
                      setvehicleList([])
                      setnoMoreDataFound(true);
                      setisFooterLoading(false)
                      setisStopCallingAPI(true)
                        // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                    } else {
                      alert('fininsh')
                      setnoMoreDataFound(true);
                      setisFooterLoading(false)
                      setisStopCallingAPI(true)

                        // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                    }
  
                }
            } else {
              setnoMoreDataFound(true);
              setisFooterLoading(false)
              setisStopCallingAPI(true)
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
  } 

const  callingAllInvoceAPI = () => {
    let url = '';
    url = AppUrlCollection.INVOICE + 'page=' + page
    console.log('url Change ::NewDost', url)

    // this.setState({ allFooterCalling: true, unPaidFooterCalling: false, paidFooterCalling: false })
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          setspinner(false)
            // this.setState({ isLoading: false })
            console.log('Invocie ::', responseJson)
            // this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
              setdata(responseJson.data)
                //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                // this.setState({
                //     allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                //     unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList,
                //     allPageServiceCallStop: false,
                //     allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                // })
            } else {
                // this.setState({ allPageServiceCallStop: true, paidFooterCalling: false })
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
}


const  callingUnpaidInvoceAPI = () => {
    let url = '';
    url = AppUrlCollection.INVOICE + 'page=' + this.state.unPaidPage + '&status=1'
    this.setState({ allFooterCalling: false, unPaidFooterCalling: true, paidFooterCalling: false })
    console.log('url Change ::NewDost', url)
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoading: false })
            console.log('Invocie ::', responseJson)
            this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                this.setState({
                    //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                    allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                    unpaidInvoiceList: this.state.unpaidInvoiceList,
                    paidInvoiceList: this.state.paidInvoiceList,
                    unPaidServiceCallStop: false,
                    paidFooterCalling: false
                })
            } else {

                this.setState({ unPaidServiceCallStop: true })
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
}

const  callingPaidInvoceAPI = () => {
    let url = AppUrlCollection.INVOICE + 'page=' + this.state.paidPage + '&status=3'
    this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: true })
    console.log('paid API Caliing ::', url)
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoading: false })
            console.log('Invocie ::', responseJson)
            this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                this.setState({
                    //   allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                    allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                    unpaidInvoiceList: this.state.unpaidInvoiceList,
                    paidInvoiceList: this.state.paidInvoiceList,
                    paidServiceCallStop: false,
                    paidFooterCalling: false
                })
            } else {
                this.setState({ paidServiceCallStop: true, paidFooterCalling: false })
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
}


const  callingPaymentHistoryAPI = () => {
    this.setState({ paymentHisFooterCalling: true })
    console.log('payment_historyv::', AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, AppConstance.USER_INFO.USER_TOKEN)
    fetch(AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoading: false })
            console.log('Invocie ::', responseJson)
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                console.log('payment histtot sdadada:: ', responseJson)
                if (responseJson.data.history.length > 0) {
                    this.setState({
                        paymentHistoryList: this.state.paymentHistoryList.concat(responseJson.data.history),
                        balancePrice: responseJson.data.balance,
                        paymentHisServiceCallStop: false,
                        paymentHisFooterCalling: false
                    })
                } else {
                    this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                    //AppConstance.showSnackbarMessage(responseJson.message)
                }

            } else {
                this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
}


useEffect(() => {

  // setspinner(true)
  // callingdashboardApi()
  // setspinner(false)
  callingInvoiceApi(true , 0)
  return () => {
    
  }
}, [])

  return (
    <SafeAreaView style={{ flex: 1, width:deviceWidth, height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
<ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground>

     <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'10%', }}
onPress={()=>navigation.goBack()}

>
<Ionicons  name='chevron-back' size={25} color='white'/>



</TouchableOpacity>

<View style={{width:'80%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Account</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>

</View>
</View>
 
 <View style={{height:deviceHeight*0.12 ,  width:deviceWidth, flexDirection:'row', justifyContent:'space-around'}}> 
    <TouchableOpacity 
        onPress={()=> {setactivetab('0'), callingInvoiceApi(true,0); setpage(1)}}
    style={{backgroundColor:'#ECF0F1',flexDirection:'column', justifyContent:'center', borderRadius:5, width:'22%'}}>
      {activetab == '0' ? 
        <Image source={require('../images/invoice_price_icon.png')} style={styles.imageIconStyle} /> 
   
      :
      <Image source={require('../images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />

      }
      <Text style={{alignSelf:'center', marginTop:10,fontSize:12}} >ALL</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={()=> {setactivetab('1'), callingInvoiceApi(true,1); setpage(1) }}
    style={{backgroundColor:'#ECF0F1', justifyContent:'center', borderRadius:5, width:'22%'}}>
    {activetab == '1' ?
                                        <Image source={require('../images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
      <Text style={{alignSelf:'center', marginTop:10,fontSize:12}} >UNPAID</Text>
    </TouchableOpacity>

    <TouchableOpacity 
        onPress={()=> {setactivetab('3'), callingInvoiceApi(true,3); setpage(1)}}
    style={{backgroundColor:'#ECF0F1', justifyContent:'center', borderRadius:5, width:'22%'}}>
    {activetab == '3' ?
                                        <Image source={require('../images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
      <Text style={{alignSelf:'center', marginTop:10,fontSize:12}} >PAID</Text>
    </TouchableOpacity>

    <TouchableOpacity 
        onPress={()=> {setactivetab('4')}}
    style={{backgroundColor:'#ECF0F1', justifyContent:'center', borderRadius:5, width:'22%'}}>
    {activetab == '4' ?
                                        <Image source={require('../images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
    <Text style={{alignSelf:'center', marginTop:10,fontSize:10}} >Payment History</Text>
    </TouchableOpacity>







 </View>


 <FlatList

                        data={data}
                        contentContainerStyle={{marginHorizontal:10,alignSelf:'center',justifyContent:'center',paddingBottom:10, paddingHorizontal:10, width:deviceWidth}}
                        renderItem={renderlist}
                        extraData={data}
                        keyExtractor={(item, index) => index}
                        onEndReached={loadMoreData}
                        ListFooterComponent={renderFooter}
                       onEndReachedThreshold={0.01}
                      
                    />

    
    </SafeAreaView>

  );
};


export default Accounts;

const styles = StyleSheet.create({
  dividerViewStyle: {
      width: deviceWidth,
      height: 0.5,
      backgroundColor: AppColors.te
  },

  imageIconStyle: {
      width: 30, height: 30 ,alignSelf:'center'
  },
  headingTxtStyle: {
       color: AppColors.Signincolor,
      fontSize: 15, paddingTop: 11,
  },
  searchElavationStyle: {
      height: 50, flex: 0.8,
      borderRadius: 10,
      marginTop: 8,
      marginLeft: 5,
      marginRight: 5,
      alignSelf: 'center'
  },
  searchElvationViewStyle: {
      flexDirection: 'row', flex: 1,
      alignContent: 'center', alignItems: 'center',
      paddingLeft: 5, marginLeft: 5,
      marginRight: 5, paddingRight: 5
  },
  searchTxtInputStyle: {
      flex: 1,
      color: AppColors.toolbarColor, fontSize: 18,
  },
  detailMainViewStyle: {
      flexDirection: 'row',
      flex: 1, width: deviceWidth * 0.85,
      alignContent: 'center', alignItems: 'center', justifyContent: 'center'
  },
})