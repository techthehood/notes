# Expo notes

[react navigation getting started | react navigation docs](https://reactnavigation.org/docs/getting-started/)    

**GOTCHA:** [Unable to resolve module 'react-native-screen'](https://stackoverflow.com/questions/59473715/unable-to-resolve-module-react-native-screen)   
[Stack Navigator | react navigation docs](https://reactnavigation.org/docs/stack-navigator/)   


```
  npm i @react-navigation/stack
```

_App.js_
> issue after installing react-navigation/stack

```
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  const Stack = createStackNavigator();



  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
```

```
  npm install --save react-native-gesture-handler react-native-reanimated react-native-screens
```
> needed to install these (dependencies)


#### [using firebase guide](https://docs.expo.io/guides/using-firebase/)   

```
  expo install firebase
```

_App.js_

**GOTCHA:** firebase misfired
```
  // import * as firebase from 'firebase';// failed - maybe deprecated
  import firebase from 'firebase';
```
> i think first method from the walkthrough is deprecated now just import firebase from firebase

**GOTCHA:** [Firebase 3.3.x Nodejs - createUserWithEmailAndPassword is not a function](https://stackoverflow.com/questions/39347591/firebase-3-3-x-nodejs-createuserwithemailandpassword-is-not-a-function)   
[firebase. auth. Auth | The Firebase Auth service interface.](https://firebase.google.com/docs/reference/node/firebase.auth.Auth)   

```
  ~~firebase.auth.createUserWithEmailAndPassword(email, password)~~ // fail
  firebase.auth().createUserWithEmailAndPassword(email, password) // correct
```
> make sure auth() has parenthesis

**GOTCHA:** The early version of Main.js (1st iteration) had a problem in the tutorial because the instructor 
zoomed in his screen and cut off the end of the code

_Main.js_
```
  const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUser
  }, dispatch )

  export default connect(null, mapDispatchProps)(Main);
```
> the dispatch should be passed as the last parameter, not as a part of the props object (1st parameter)

> NOTE: the current setup with the initial signed up user doesn't have a record in the users collection
> nor is there an apparent way to sign out and/or create a user record for an already signed up user.  
> you will have to go to the firebase authentication console and copy the uid and then go to firestore and 
> add a document, paste in the uid and create a name and email field and field value i.e. test@gmail.com and test

> section concludes @1:24:51 min

#### adding bottom navigation tabs and icons

[](https://reactnavigation.org/docs/bottom-tab-navigator/)   
[](https://www.npmjs.com/package/react-native-vector-icons)   
> you can go to the npm react-native-vector-icons page to set links to the available icon sets to choose from

_Main.js_   

```
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  const Tab = createBottomTabNavigator();
  ...
  class Main extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }} />
      </Tab.Navigator>
    );
  ...

```

> we did some serious spaghetti hacking to get the screens how we want them.

_Main.js_

```
  const EmptyScreen = () => null;

  ...

  <Tab.Screen name="AddContainer" component={EmptyScreen} 
  listeners={({navigation}) => ({
    tabPress: event => {
      event.preventDefault();
      navigation.navigate("Add");
    }
  })}
  options={{
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="plus-box" color={color} size={26} />
    )
  }} />
```
> modification to Main.js - NOTE: the EmptyScreen hack at the top and the name changed to AddContainer instead of Add
> this was done so navigate  to Add would navigate to this tab display (buttons remain at the bottom) instead of 
> the Add screen (a display without bottom buttons)

_App.js_

```
  import AddScreen from './components/main/Add';

  ...

  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Add" component={AddScreen} />
  </Stack.Navigator>
```
> App.js took the AddScreen import from Main.js
> NOTE: options={{ headerShown: false }} removes the header with the screen name and the nav back btn (arrow btn)

#### for more custom button display (with colors)

```
  npm install @react-navigation/material-bottom-tabs react-native-paper
```
[react-native-paper | npm](https://www.npmjs.com/package/react-native-paper)   
[react-native-paper | github docs](https://callstack.github.io/react-native-paper/)   

_Main.js_

```
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

  ...

  // const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();
```

concludes @ 1:49:00

#### Camera with Expo
_starts @ 1:50:00_

[Camera | Expo docs](https://docs.expo.io/versions/latest/sdk/camera/)   
> search camera on docs.expo.io
> according to the instructor, web doesn't run all that well   

```
 expo install expo-camera
```
> expo-camera provides a React component that renders a preview for the device's front or back camera.
> Morever, the component is also capable of detecting faces and bar codes appearing in the preview.

_image-picker_

```
  https://docs.expo.io/versions/latest/sdk/imagepicker/
```
> expo-image-picker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.

#### Expo Video element
[video | Expo docs](https://docs.expo.io/versions/latest/sdk/video/)   

```
  expo install expo-av
```