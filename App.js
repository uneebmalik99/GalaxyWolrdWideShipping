import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Route/AppNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {DrawerContent } from './src/Route/Drawer'



// const App = () => {
    
//  return (
//   <NavigationContainer>
//    <AppNavigator />
//   </NavigationContainer>
//  );
// }

const Drawer = createDrawerNavigator();
const App = () => {
    
 return (
     <NavigationContainer>
         <Drawer.Navigator drawerContent={props => <DrawerContent { ...props}/>}>
             
             
             <Drawer.Screen name='AppNavigator' component={AppNavigator} />
             
              </Drawer.Navigator> 

         
         
     </NavigationContainer>

 );
}

export default App;





























// import React from 'react';
// import {
//   Button,
//   View
// } from 'react-native';
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createDrawerNavigator } from '@react-navigation/drawer'

// import Settings from './src/Screens/Settings'


// const Stack = createStackNavigator();
// const Tabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator()



// class App extends React.Component {

//   state = {
//     loggedIn: false
//   }

//   login = () => {
//     this.setState({loggedIn: true})
    
//   }

//   SignIn = ({navigation}) => {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen name='SignIn' component={SignIn} options={{headerLeft: null, headerRight: () => (
//           <Button title='Logout' onPress={() => this.setState({loggedIn: false})}/>
//         )}}/>
//         <Stack.Screen name='SignUp' component={SignUp} options={{headerRight: () => (
//           <Button title='Logout' onPress={() => this.setState({loggedIn: false})}/>
//         )}}/>
//       </Stack.Navigator>
//     )
//   }

//   SignUp = () => {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name='Settings' component={Settings} />
//       </Drawer.Navigator>
//     )
//   }

//   render() {
//     return (
//       <>
       
//             <NavigationContainer>
//               <Tabs.Navigator>
//                 <Tabs.Screen name='SignIn' children={SignIn} />
//                 <Tabs.Screen name='SignUp' children={SignUp} />
//               </Tabs.Navigator>
//             </NavigationContainer>
//           :
//           <View>
// <Text>Hiii</Text>          </View>
        
//       </>
//     )
//   }
// }

// export default App;
























// // import React from 'react';
// // import Navigation from './src/Route/navigation';
// // import 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import 'react-native-gesture-handler';
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';

// // function App() {
// //     return (
// //         <NavigationContainer>{/* The rest of your code*/}</NavigationContainer>
// //     );
// // }export default App
// // export default () => <Navigation />;

// // <NavigationContainer>
// // {/* Rest of your app code */}
// // </NavigationContainer>

// // const App = () => {
// //     return (
// //       <Navigation>
// //         {/* Rest of your app code */}
// //       </Navigation>
// //     );
// //   };
  
// //   export default App;