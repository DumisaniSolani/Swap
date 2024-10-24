import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "./js/User";
import LandingPage from "./screens/LandingPage";
import Registration_Name from "./screens/Registration_name";
import Registration_password from "./screens/Registration_password";
import SaveInfo from "./screens/SaveInfo";
import Registration_DOB from "./screens/Registration_DOB";
import RegistrationResidence from "./screens/Registration_Residence";
import RegistrationMobileNumber from "./screens/Registration_mobile_number";
import RegistrationEmail from "./screens/Registration_email";
import MobileNumberConfirmationCode from "./screens/ConfirmMobileNumber";
import EmailAddressConfirmation from "./screens/ConfirmEmailAddress";
import RegisterUsername from "./screens/Registration_username";
import TermsAndConditions from "./screens/terms_and_policies";
import AddProfilePicture from "./screens/AddProfilePicture";
import Welcome from "./screens/WelcomeSwap";
import SwapHome from "./screens/Dashboard";
import ProfilePage from "./screens/Profile";
import { AuthProvider, useAuth } from "./AuthContext";

import { firebase } from "./config";
import React, { useState, useEffect } from "react";
import AddPost from "./screens/AddPost";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  //const { user, initializing } = useAuth();
  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="Registration_Name"
            component={Registration_Name}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Registration_password"
            component={Registration_password}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="SaveInfo"
            component={SaveInfo}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RegistrationDOB"
            component={Registration_DOB}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RegistrationResidence"
            component={RegistrationResidence}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RegistrationMobileNumber"
            component={RegistrationMobileNumber}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RegistrationEmail"
            component={RegistrationEmail}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="MobileNumberConfirmation"
            component={MobileNumberConfirmationCode}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="EmailAdressConfirmation"
            component={EmailAddressConfirmation}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="RegistrationUsername"
            component={RegisterUsername}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="terms_and_conditions"
            component={TermsAndConditions}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="AddProfilePicture"
            component={AddProfilePicture}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="WelcomeSwap"
            component={Welcome}
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SwapHome"
          component={SwapHome}
          initialParams={{ user: user }}
          options={{ headerShown: false, title: "Swap" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          initialParams={{ user: user }}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          initialParams={{ user: user }}
          options={{ title: "", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
