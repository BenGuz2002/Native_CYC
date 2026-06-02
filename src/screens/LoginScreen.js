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

const LoginScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const form = useForm(
    { email: '', password: '' },
    async (values) => {
      const result = await login(values.email, values.password);
      if (!result.success) {
        setAlertMessage(result.error);
        setShowAlert(true);
      }
    }
  );

  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>Bitácoras CYC</Text>
          <Text style={styles.appSubtitle}>Sistema de Gestión</Text>
        </View>

        {showAlert && (
          <Alert
            type="error"
            message={alertMessage}
            dismissible
            onDismiss={() => setShowAlert(false)}
          />
        )}

        <View style={styles.formContainer}>
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

          <Button
            title="Iniciar Sesión"
            onPress={form.handleSubmit}
            loading={isLoading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  formContainer: {
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
