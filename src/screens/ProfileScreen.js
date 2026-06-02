import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card, Button } from '../components';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../constants/config';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
        </View>

        <Card>
          <Card.Header title="Información Personal" />
          <Card.Body>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{user?.name} {user?.second_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Apellidos:</Text>
              <Text style={styles.value}>
                {user?.last_name} {user?.second_last_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Usuario:</Text>
              <Text style={styles.value}>{user?.username}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Rol:</Text>
              <Text style={[styles.value, { color: COLORS.primary, fontWeight: '600' }]}>
                {user?.role?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Estado:</Text>
              <Text
                style={[
                  styles.value,
                  { color: user?.status === 'active' ? COLORS.success : COLORS.danger },
                ]}
              >
                {user?.status === 'active' ? 'Activo' : 'Bloqueado'}
              </Text>
            </View>
          </Card.Body>
        </Card>

        {user?.area && (
          <Card>
            <Card.Header title="Área" />
            <Card.Body>
              <Text style={styles.value}>{user.area.name}</Text>
            </Card.Body>
          </Card>
        )}

        <Button
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.button}
        />

        <Button
          title="Cambiar Contraseña"
          onPress={() => navigation.navigate('ChangePassword')}
          variant="secondary"
          style={styles.button}
        />

        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
          loading={isLoading}
          variant="danger"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  button: {
    marginBottom: 12,
  },
});

export default ProfileScreen;
