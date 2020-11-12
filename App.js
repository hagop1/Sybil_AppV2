import * as React from 'react';
import {Button, Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import AsyncStorage from '@react-native-community/async-storage';

// import HomeScreen from "C:/Users/Hagop/secondApp/app/screens/HomeScreen.js";
import MainScreen from "C:/Users/Hagop/Sybil_AppV2/app/screens/MainScreen.js";
import ProfileScreen from "C:/Users/Hagop/Sybil_AppV2/app/screens/ProfilleScreen.js";
import SettingScreen from "C:/Users/Hagop/Sybil_AppV2/app/screens/SettingScreen.js";

import { State } from 'react-native-gesture-handler';
// (...)

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <ImageBackground 
    source={require("C:/Users/Hagop/Sybil_AppV2/assets/Sybil_blank.png")} 
    style={styles.background}
    >
    {/* <View> */}
      <TextInput 
        style = {styles.text_Input}
        placeholderTextColor = "rgba(255,255,255,0.7)"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style = {styles.text_Input}
        placeholderTextColor = "rgba(255,255,255,0.7)"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} 
        title="Sign in" 
        onPress={() => signIn({ username, password })}>
          Sign In
        </Text>
        {/* <Button 
        style={styles.buttonText} 
        title="Sign in" 
        onPress={() => signIn({ username, password })} 
        /> */}
      </TouchableOpacity>
    {/* </View> */}
    </ImageBackground>
  );
}

// function HomeScreen(props){
//   const [userName, setUsername] = React.useState();
//   const [passWord, setPassword] = React.useState();
//   return (
//       <ImageBackground 
//       source={require("C:/Users/Hagop/secondApp/assets/Sybil_blank.png")} 
//       style={styles.background}
//       >
//           {/* <KeyboardAvoidingView behavior="padding" style = {styles.background}> */}
//            <TextInput 
//               // onSubmitEditing = {() => this.passwordInput.focus()}
//               style = {styles.text_Input}
//               placeholder = 'Email'  
//               returnKeyType = "next"
//               placeholderTextColor = "rgba(255,255,255,0.7)"
//               autoCapitalize = "none"
//               autoCorrect = {false}
//               keyboardType = 'email-address'
//               onChangeText = {(val) => setUsername(val)}         
//           />
//           <TextInput 
//               style = {styles.text_Input}
//               // ref={(input) => this.passwordInput = input}
//               placeholder = 'Password'  
//               returnKeyType = "go"
//               secureTextEntry
//               placeholderTextColor = "rgba(255,255,255,0.7)"
//               autoCapitalize = "none"
//               autoCorrect = {false}
//               onChangeText = {(val) => setPassword(val)}        
//           />
//           <TouchableOpacity style={styles.buttonContainer}>
//               <Text 
//               style={styles.buttonText}
              
//               >
//                   LOGIN
//               </Text>
//           </TouchableOpacity>
//           {/* </KeyboardAvoidingView> */}
//       </ImageBackground>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();
const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  const Stack = createStackNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <Stack.Navigator>
        {state.userToken == null ? (
          <Stack.Screen name="Home" component={SignInScreen} options={{headerShown: false}}/>
        ) : (
          <Stack.Screen name=" " component={HomeTabs} options={{headerShown: false}}/>
          // <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function HomeTabs() {
  return (
  <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Main') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if(route.name === 'Profile'){
              iconName = focused 
              ? 'ios-person' 
              : 'ios-person';
            } else if (route.name === 'Settings') {
              iconName = focused 
              ? 'ios-settings' 
              : 'ios-settings';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#5eb4ee',
          inactiveTintColor: 'black',
        }}
      >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingScreen}/>
  </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      padding: 20
  },
  text_Input: {
      backgroundColor: '#5EB4EE',
      marginTop: 40,
      padding: 10,
      margin: 10,
      width: 300,
      marginTop: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFF',
  },
  buttonContainer: {
      backgroundColor: '#5EB4EE',
      // paddingVertical: 10,
      marginTop: 40,
      padding: 10,
      margin: -150,
      width: 250,
      marginTop: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFF',
  },
  buttonText: {
      color: '#FFF',
      textAlign: 'center'
  },
})

  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ focused, color, size }) => {
  //           let iconName;

  //           if (route.name === 'Home') {
  //             iconName = focused
  //               ? 'ios-information-circle'
  //               : 'ios-information-circle-outline';
  //           } else if (route.name === 'Settings') {
  //             iconName = focused ? 'ios-list-box' : 'ios-list';
  //           }

  //           // You can return any component that you like here!
  //           return <Ionicons name={iconName} size={size} color={color} />;
  //         },
  //       })}
  //       tabBarOptions={{
  //         activeTintColor: 'tomato',
  //         inactiveTintColor: 'gray',
  //       }}
  //     >
  //       <Tab.Screen name="HomeScreen" component={HomeScreen} />
  //       <Tab.Screen name="Settings" component={SettingsScreen} />
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );
//}