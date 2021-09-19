import * as React from 'react';
import {  Button, } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { View, Text, BlurView,TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import Welcome from '../screens/Welcome'
import Signin from '../screens/Signin'
import Contactus from '../screens/Contactus'
import AppConstance from '../constance/AppConstance';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tracking from '../screens/Tracking';
import Dashboard from '../screens/Dashboard';
import Carlist from '../screens/Carlist';
import CarDetails from '../screens/CarDetails';
import alerts from '../screens/alerts'
import ContainerCarlist from '../screens/ContainerCarlist';
import TrackingSearchDetails from '../screens/TrackingSearchDetails';
import Prices from '../screens/Prices';
import Notifications from '../screens/Notifications'
import Towing from '../screens/Towing'
import Warehousing from "../screens/Warehousing";
import Shipping from "../screens/Shipping";
import Accounts from "../screens/Accounts";
import yard from '../screens/yard';
import services from '../screens/services';
import container from '../screens/container';
import Dashboardmain from '../screens/Dashboardmain';
import Accountsview from '../screens/Accountsview'
import carslist from '../screens/carslist';
import invoicelist from '../screens/invoicelist'
import containerinfo from '../screens/containerinfo';
import  invoiceview from "../screens/invoiceview";
import ContainerTracking from '../screens/ContainerTracking';
import VehcileScreen from '../screens/VehcileScreen';
import OurServiceDetailScreen from '../screens/OurServiceDetailScreen';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import AddVehicle from '../screens/AddVehicle';
import BottomTabs from '../screens/BottomTabs';
import Vehicle from '../screens/Vehicle';
import ContainerA from '../screens/ContainerA';
import ContainerAview from '../screens/ContainerAview';
import EditVehicle from '../screens/EditVehicle.js';
import AccountSectionMainScreen from '../screens/AccountSectionMainScreen';


const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = AnimatedTabBarNavigator();
// const StackAuctions = createStackNavigator();
// const StackInvoice =createStackNavigator();
// const StackBids =createStackNavigator();

// const TopTab = createMaterialTopTabNavigator();




function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={() => {AppConstance.IS_USER_LOGIN='0';
AsyncStorage.setItem('IS_USER_LOGIN', '0');
 AsyncStorage.setItem('pass', '');
 AsyncStorage.setItem('fcmtoken', '');
 AsyncStorage.setItem('startLimit', '');
 AsyncStorage.setItem('endLimit', '');
 AsyncStorage.setItem('profile_pic', '');
 AsyncStorage.setItem('email', '');
 AsyncStorage.setItem('phone', '');
 AsyncStorage.setItem('name', '');

 props.navigation.closeDrawer();

props.navigation.navigate('Welcome');}} />
    </DrawerContentScrollView>
  );
}


const TabScreen =()=>{
  return(
  <Tab.Navigator
  
   options={{  headerShown:false, headerTitleAlign:"center", headerLeft: null ,

     
    }} 
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222",
      keyboardHidesTabBar: true,
    style: {
      position: 'absolute',
    },
    }}
    //  tabBarOptions={{
     

  //   activeTintColor: 'black',
    

  //   keyboardHidesTabBar: true,
  //   style: {
  //     height:55,
  //     position: 'absolute',
  //   },
  // }}
  >
  <Tab.Screen name='Dashboard' component={Dashboard}
   options={{
 headerShown:false,
  
//           tabBarLabel: 'Auctions',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
          // tabBarIcon: ({ color }) => (
          //   <Image
          //   source={require('../Assets/icons/sedan-car-front.png')}

          //   />
          // ),
tabBarIcon: ({ focused, color, size }) => (
  
            <Icon
                name="car-sport-sharp"
                size={size ? size : 20}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
//             // <Image
//             // source={require('../Assets/icons/sedancarfront0.png')}

//             // />
//         )
)
        }}  />
  <Tab.Screen name='services' component={services} 
   options={{
    headerShown:false,
          tabBarLabel: 'Purchases',
          tabBarOptions: {
  labelStyle: {
    fontWeight:'bold'
  },
},
tabBarIcon: ({ focused, color, size }) => (
  
  <Icon
      name="receipt"
      size={size ? size : 20}
      color={focused ? color : "#222222"}
      focused={focused}
      color={color}
  />

)
}}  />
  <Tab.Screen name='ContainerTracking' component={ContainerTracking}
  
  options={{
    
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
  
  <Icon
      name="person"
      size={size ? size : 20}
      color={focused ? color : "#222222"}
      focused={focused}
      color={color}
  />

)
}}  />
 </Tab.Navigator>
  );
}
// const TabScreen =()=>{
//   return(
//   <Tab.Navigator
  
//    options={{  headerShown:false, headerTitleAlign:"center", headerLeft: null 
     
     
//     }} 
//    tabBarOptions={{
     
//     activeTintColor: 'black',
    

//     keyboardHidesTabBar: true,
//     style: {
//       height:55,
//       position: 'absolute',
//     },
//   }}>
//   <Tab.Screen name='Auctions' component={StackAuctionsScreen}
//    options={{
//  headerShown:false,
//     tabBarOptions: { activeTintColor:'red'},
  
//           tabBarLabel: 'Auctions',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/sedan-car-front.png')}

//             />
//           ),
//         }}  />
//   <Tab.Screen name='Invoice' component={StackInvoiceScreen} 
//    options={{
//     headerShown:false,
//           tabBarLabel: 'Purchases',
//           tabBarOptions: {
//   labelStyle: {
//     fontWeight:'bold'
//   },
// },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/invoice.png')}

//             />
//           ),
//         }}
  
//          />
//   <Tab.Screen name='Settings' component={Settings}
  
//   options={{
    
//           tabBarLabel: 'Profile',
          
// //           labelStyle: {
// //     fontWeight: "bold"
// // },
//           tabBarIcon: ({ color }) => (
//             <Image
//             source={require('../Assets/icons/user.png')}

//             />
//           ),
//         }}
  
//    />
//  </Tab.Navigator>
//   );
// }


const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
  return(
  <AppDrawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} 
  />}     >

    {/* <AppDrawer.Screen name="Offers" component={TabScreen}    />
    <AppDrawer.Screen name="Mybids" component={StackBid}  options={{

title:'My Bids',
    }} />
    <AppDrawer.Screen name="invoice1" component={Stackinvoice}  options={{

title:'My Invoice',
    }} /> */}

    <AppDrawer.Screen name="services" component={services} />

  </AppDrawer.Navigator>
);
}
const Dashboard1 =() =>{
  return(
  <Stack.Navigator>
<Stack.Screen name='Dashboard' component={Dashboard}
options={{
  headerShown:false,
}} 
 />
<Stack.Screen name='Vehicle' component={Vehicle} options={{
  headerShown:false
}}/>
  </Stack.Navigator>
  );
}
const AppNavigator = () => {
 return (
   <Stack.Navigator 
   initialRouteName="Welcome" 
   >
  <Stack.Screen name='Welcome' component={Welcome}  options={{headerShown:false,}} />
  <Stack.Screen name='Signin' component={Signin}  options={{headerShown:false,}} />
  <Stack.Screen name='Contactus' component={Contactus} options={{headerShown:false,}} />
  <Stack.Screen name='yard' component={yard} options={{headerShown:false,}}  />
  <Stack.Screen name='services' component={services}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerA' component={ContainerA} options={{headerShown:false,}}/>
  <Stack.Screen name='container' component={container}  />
  <Stack.Screen name='EditVehicle' component={EditVehicle}  options={{headerShown:false,}}/>
  <Stack.Screen name='ContainerAview' component={ContainerAview} options={{headerShown:false,}}/>
  <Stack.Screen name='VehcileScreen' component={VehcileScreen} options={{headerShown:false,}} />
  

  <Stack.Screen name='Tracking' component={Tracking}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerTracking' component={ContainerTracking}  options={{headerShown:false,}} />

  
  <Stack.Screen name='Towing' component={Towing}  options={{headerShown:false,}} />

  <Stack.Screen name='Warehousing' component={Warehousing}  options={{headerShown:false,}} />
  <Stack.Screen name='Shipping' component={Shipping}  options={{headerShown:false,}} />
  <Stack.Screen name='carslist' component={carslist}  options={{headerShown:false,}} />

  <Stack.Screen name='Vehicle' component={Vehicle} options={{headerShown:false}}/>
  
  
  <Stack.Screen name='Dashboard' component={Dashboard1}  options={{headerShown:false,}} />
  <Stack.Screen name='Dashboardmain' component={Dashboardmain}  options={{headerShown:false,}} />
  <Stack.Screen name='Accountsview' component={Accountsview}  options={{headerShown:false,}} />
  <Stack.Screen name='containerinfo' component={containerinfo}  options={{headerShown:false,}} />
  <Stack.Screen name='invoicelist' component={invoicelist}  options={{headerShown:false,}} />
  <Stack.Screen name='invoiceview' component={invoiceview}  options={{headerShown:false,}} />
  <Stack.Screen name='BottomTabs' component={BottomTabs} />
  <Stack.Screen name='OurServiceDetailScreen' component={OurServiceDetailScreen} options={{headerShown:false,}} />
  <Stack.Screen name='AddVehicle' component={AddVehicle} options={{headerShown:false}}/>
  
  <Stack.Screen name='CarDetails' component={CarDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='alerts' component={alerts}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerCarlist' component={ContainerCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='TrackingSearchDetails' component={TrackingSearchDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='Prices' component={Prices}  options={{headerShown:false,}} />
  <Stack.Screen name='Notifications' component={Notifications}  options={{headerShown:false,}} />
  <Stack.Screen name='Accounts' component={Accounts}  options={{headerShown:false,}} />
  {/* <Stack.Screen name='AccountSectionMainScreen' component={AccountSectionMainScreen}  options={{headerShown:false,}} /> */}

  

  {/* <Stack.Screen name='AppDrawerScreen' component={AppDrawerScreen} options={{ headerShown:false, headerTitleAlign:"center", headerLeft: null   }}/> */}

  
  
  

        {/* <Stack.Screen  name='SplashScreen'  component={SplashScreen} options={{headerShown :false}} /> */}
        {/* <Stack.Screen name='Welcome' component={Welcome} options={{headerTitleAlign:"center"} } options={{headerTitleAlign:"center", headerLeft: null }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerTitleAlign:"center"}} />
        <Stack.Screen name='Emailverficationscreens' component={Emailverficationscreens} options={{ title:'Forget Password', headerTitleAlign:"center"}} />
        <Stack.Screen name='forgetpassword' component={forgetpassword} options={{ headerTitleAlign:"center"}} />
        <Stack.Screen name='forgettokenverfication' component={forgettokenverfication} options={{title:'Change Password', headerTitleAlign:"center"}} />

        <Stack.Screen name='SignIn' component={SignIn} options={{headerTitleAlign:"center"}}/>
        <Stack.Screen name='My bids' component={Mybids} options={{headerTitleAlign:"center"}}/>

     <Stack.Screen name='AppDrawerScreen' component={AppDrawerScreen} options={{ headerShown:false, headerTitleAlign:"center", headerLeft: null 
     
     
    }}
      /> */}

   </Stack.Navigator>
 
 );
}

export default AppNavigator;
