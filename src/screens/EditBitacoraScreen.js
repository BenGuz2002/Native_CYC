import React, { useEffect } from 'react';
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
import { useBitacoraStore } from '../stores/bitacoraStore';
import { COLORS } from '../constants/config';

const EditBitacoraScreen = ({ navigation, route }) => {
  const { bitacora } = route.params;
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('error');
  const { updateBitacora, deleteBitacora, isLoading } = useBitacoraStore();

  const form = useForm(
    {
      title: bitacora?.title || '',
      description: bitacora?.description || '',
      hours: bitacora?.hours?.toString() || '',
      activity_type: bitacora?.activity_type || 'work',
      start_time: bitacora?.start_time || '',
      end_time: bitacora?.end_time || '',
    },
    async (values) => {
      const result = await updateBitacora(bitacora.id, values);
      if (result.success) {
        setAlertMessage('Bitácora actualizada exitosamente');
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

  const handleDelete = async () => {
    const result = await deleteBitacora(bitacora.id);
    if (result.success) {
      setAlertMessage('Bitácora eliminada exitosamente');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Editar Bitácora</Text>
            <Text style={styles.headerSubtitle}>{bitacora?.date}</Text>
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
              label="Título"
              placeholder="Ej: Reunión con cliente"
              value={form.values.title}
              onChangeText={(text) => form.handleChange('title', text)}
              error={form.errors.title}
            />

            <TextInputField
              label="Descripción"
              placeholder="Describe tu actividad..."
              value={form.values.description}
              onChangeText={(text) => form.handleChange('description', text)}
              multiline
              numberOfLines={4}
              error={form.errors.description}
            />

            <TextInputField
              label="Horas"
              placeholder="2.5"
              value={form.values.hours}
              onChangeText={(text) => form.handleChange('hours', text)}
              keyboardType="decimal-pad"
              error={form.errors.hours}
            />

            <TextInputField
              label="Hora Inicio"
              placeholder="08:00"
              value={form.values.start_time}
              onChangeText={(text) => form.handleChange('start_time', text)}
              error={form.errors.start_time}
            />

            <TextInputField
              label="Hora Fin"
              placeholder="10:30"
              value={form.values.end_time}
              onChangeText={(text) => form.handleChange('end_time', text)}
              error={form.errors.end_time}
            />

            <Button
              title="Guardar Cambios"
              onPress={form.handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
            />

            <Button
              title="Eliminar"
              onPress={handleDelete}
              variant="danger"
              style={styles.deleteButton}
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
  deleteButton: {
    marginBottom: 12,
  },
});

export default EditBitacoraScreen;
