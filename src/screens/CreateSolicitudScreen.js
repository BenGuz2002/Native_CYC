import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { Button, TextInputField, Alert } from '../components';
import { useForm } from '../hooks/useForm';
import { useSolicitudStore } from '../stores/solicitudStore';
import { COLORS } from '../constants/config';

const CreateSolicitudScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('error');
  const { createSolicitud, isLoading } = useSolicitudStore();

  const form = useForm(
    {
      type: 'ausencia',
      reason: '',
      start_date: '',
      end_date: '',
      justification: '',
    },
    async (values) => {
      const result = await createSolicitud(values);
      if (result.success) {
        setAlertMessage('Solicitud enviada exitosamente');
        setAlertType('success');
        setShowAlert(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        setAlertMessage(result.error);
        setAlertType('error');
        setShowAlert(true);
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Nueva Solicitud</Text>
            <Text style={styles.headerSubtitle}>Solicita un permiso o ausencia</Text>
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
              label="Tipo de Solicitud"
              placeholder="ausencia"
              value={form.values.type}
              onChangeText={(text) => form.handleChange('type', text)}
              error={form.errors.type}
            />

            <TextInputField
              label="Razón"
              placeholder="Cita médica, asuntos personales, etc."
              value={form.values.reason}
              onChangeText={(text) => form.handleChange('reason', text)}
              multiline
              numberOfLines={3}
              error={form.errors.reason}
            />

            <TextInputField
              label="Fecha Inicio"
              placeholder="2026-05-19"
              value={form.values.start_date}
              onChangeText={(text) => form.handleChange('start_date', text)}
              error={form.errors.start_date}
            />

            <TextInputField
              label="Fecha Fin"
              placeholder="2026-05-19"
              value={form.values.end_date}
              onChangeText={(text) => form.handleChange('end_date', text)}
              error={form.errors.end_date}
            />

            <TextInputField
              label="Justificación"
              placeholder="Proporciona detalles adicionales"
              value={form.values.justification}
              onChangeText={(text) => form.handleChange('justification', text)}
              multiline
              numberOfLines={3}
            />

            <Button
              title="Enviar Solicitud"
              onPress={form.handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
            />

            <Button
              title="Cancelar"
              onPress={() => navigation.goBack()}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  formContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginBottom: 12,
  },
});

export default CreateSolicitudScreen;
