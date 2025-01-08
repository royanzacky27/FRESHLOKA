import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoScreen from "./src/screens/LogoScreen";
import AuthScreen from "./src/screens/AuthScreen";
import RegisterScreen1 from "./src/screens/RegisterScreen1"; // Tambahkan ini
import RegisterScreen2 from "./src/screens/RegisterScreen2"; // Tambahkan ini
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Logo">
        <Stack.Screen
          name="Logo"
          component={LogoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen1"
          component={RegisterScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen2"
          component={RegisterScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
