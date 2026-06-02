import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button, TextInputField, Alert } from '../components';
import { useForm } from '../hooks/useForm';
import { useAuthStore } from '../stores/authStore';
import { COLORS } from '../constants/config';

const RegisterScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm(
    {
      name: '',
      second_name: '',
      last_name: '',
      second_last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    async (values) => {
      if (values.password !== values.password_confirmation) {
        setAlertMessage('Las contraseñas no coinciden');
        setAlertType('error');
        setShowAlert(true);
        return;
      }

      const result = await register(values);
      if (!result.success) {
        setAlertMessage(result.error);
        setAlertType('error');
      } else {
        setAlertMessage('Registro exitoso');
        setAlertType('success');
      }
      setShowAlert(true);
    }
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>Nuevo Usuario</Text>
          <Text style={styles.appSubtitle}>Completa tu registro</Text>
        </View>

        {showAlert && (
          <Alert
            type={alertType}
            message={alertMessage}
            dismissible
            onDismiss={() => setShowAlert(false)}
          />
        )}

        <View style={styles.formContainer}>
          <TextInputField
            label="Nombre"
            placeholder="Juan"
            value={form.values.name}
            onChangeText={(text) => form.handleChange('name', text)}
            error={form.errors.name}
          />

          <TextInputField
            label="Segundo Nombre"
            placeholder="Carlos"
            value={form.values.second_name}
            onChangeText={(text) => form.handleChange('second_name', text)}
          />

          <TextInputField
            label="Apellido"
            placeholder="Pérez"
            value={form.values.last_name}
            onChangeText={(text) => form.handleChange('last_name', text)}
            error={form.errors.last_name}
          />

          <TextInputField
            label="Segundo Apellido"
            placeholder="García"
            value={form.values.second_last_name}
            onChangeText={(text) => form.handleChange('second_last_name', text)}
          />

          <TextInputField
            label="Usuario"
            placeholder="jperez"
            value={form.values.username}
            onChangeText={(text) => form.handleChange('username', text)}
            error={form.errors.username}
          />

          <TextInputField
            label="Correo Electrónico"
            placeholder="tu.email@example.com"
            value={form.values.email}
            onChangeText={(text) => form.handleChange('email', text)}
            keyboardType="email-address"
            error={form.errors.email}
          />

          <TextInputField
            label="Contraseña"
            placeholder="••••••••"
            value={form.values.password}
            onChangeText={(text) => form.handleChange('password', text)}
            secureTextEntry
            error={form.errors.password}
          />

          <TextInputField
            label="Confirmar Contraseña"
            placeholder="••••••••"
            value={form.values.password_confirmation}
            onChangeText={(text) => form.handleChange('password_confirmation', text)}
            secureTextEntry
            error={form.errors.password_confirmation}
          />

          <Button
            title="Registrarse"
            onPress={form.handleSubmit}
            loading={isLoading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  formContainer: {
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
