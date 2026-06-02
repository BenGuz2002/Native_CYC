import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Loading, Alert } from '../components';
import { useAsistenciaStore } from '../stores/asistenciaStore';
import { COLORS } from '../constants/config';

const MiAsistenciaScreen = ({ navigation }) => {
  const { asistencias, isLoading, error, fetchMyAttendance, markAttendance } =
    useAsistenciaStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchMyAttendance();
    }, [])
  );

  const handleMarkAttendance = async () => {
    const result = await markAttendance();
    if (result.success) {
      Alert.alert('Éxito', 'Asistencia marcada correctamente');
      await fetchMyAttendance();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_time':
        return COLORS.success;
      case 'late':
        return COLORS.danger;
      case 'justified':
        return COLORS.warning;
      default:
        return COLORS.textLight;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on_time':
        return 'A Tiempo';
      case 'late':
        return 'Atrasado';
      case 'justified':
        return 'Justificado';
      default:
        return 'Pendiente';
    }
  };

  const renderAsistenciaItem = ({ item }) => (
    <Card>
      <Card.Header
        title={`${item.fecha}`}
        subtitle={`Llegada: ${item.hora_llegada}`}
      />
      <Card.Body>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Estado:</Text>
          <Text
            style={[
              styles.status,
              { color: getStatusColor(item.estado) },
            ]}
          >
            {getStatusLabel(item.estado)}
          </Text>
        </View>
        {item.minutos_atraso > 0 && (
          <Text style={styles.delay}>
            Retraso: {item.minutos_atraso} minutos
          </Text>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mi Asistencia</Text>
      </View>

      {error && (
        <Alert
          type="error"
          message={error}
          onDismiss={() => {}}
        />
      )}

      <Button
        title="📍 Marcar Llegada"
        onPress={handleMarkAttendance}
        style={styles.markButton}
      />

      {isLoading ? (
        <Loading message="Cargando asistencia..." />
      ) : (
        <FlatList
          data={asistencias}
          renderItem={renderAsistenciaItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay registros de asistencia</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  markButton: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  status: {
    fontSize: 13,
    fontWeight: '700',
  },
  delay: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});

export default MiAsistenciaScreen;
