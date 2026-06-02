import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import {
  DashboardScreen,
  MisBitacorasScreen,
  CreateBitacoraScreen,
  EditBitacoraScreen,
  MisSolicitudesScreen,
  CreateSolicitudScreen,
  MiAsistenciaScreen,
  ProfileScreen,
} from '../screens';

import { COLORS } from '../constants/config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pantallas de Bitácoras
const BitacorasStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTintColor: COLORS.primary,
    }}
  >
    <Stack.Screen
      name="MisBitacorasScreen"
      component={MisBitacorasScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateBitacora"
      component={CreateBitacoraScreen}
      options={{ title: 'Nueva Bitácora' }}
    />
    <Stack.Screen
      name="EditBitacora"
      component={EditBitacoraScreen}
      options={{ title: 'Editar Bitácora' }}
    />
  </Stack.Navigator>
);

// Pantallas de Solicitudes
const SolicitudesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTintColor: COLORS.primary,
    }}
  >
    <Stack.Screen
      name="MisSolicitudesScreen"
      component={MisSolicitudesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateSolicitud"
      component={CreateSolicitudScreen}
      options={{ title: 'Nueva Solicitud' }}
    />
  </Stack.Navigator>
);

// Pantallas de Asistencia
const AsistenciaStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTintColor: COLORS.primary,
    }}
  >
    <Stack.Screen
      name="MiAsistenciaScreen"
      component={MiAsistenciaScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Pantalla de Perfil
const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTintColor: COLORS.primary,
    }}
  >
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Pantallas Principales (Tabs)
const UserTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 4,
        paddingBottom: 4,
      },
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      headerTitleStyle: {
        fontWeight: '700',
      },
      headerTintColor: COLORS.primary,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        title: 'Inicio',
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, backgroundColor: color }} />,
      }}
    />
    <Tab.Screen
      name="MisBitacoras"
      component={BitacorasStack}
      options={{
        title: 'Bitácoras',
        tabBarLabel: 'Bitácoras',
        headerShown: false,
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, backgroundColor: color }} />,
      }}
    />
    <Tab.Screen
      name="MisSolicitudes"
      component={SolicitudesStack}
      options={{
        title: 'Solicitudes',
        tabBarLabel: 'Solicitudes',
        headerShown: false,
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, backgroundColor: color }} />,
      }}
    />
    <Tab.Screen
      name="MiAsistencia"
      component={AsistenciaStack}
      options={{
        title: 'Asistencia',
        tabBarLabel: 'Asistencia',
        headerShown: false,
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, backgroundColor: color }} />,
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={ProfileStack}
      options={{
        title: 'Perfil',
        tabBarLabel: 'Perfil',
        headerShown: false,
        tabBarIcon: ({ color }) => <View style={{ width: 24, height: 24, backgroundColor: color }} />,
      }}
    />
  </Tab.Navigator>
);

// Navegador Principal
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <UserTabs />
    </NavigationContainer>
  );
};

export default RootNavigator;
