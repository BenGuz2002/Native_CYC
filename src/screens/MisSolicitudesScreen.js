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
import { useSolicitudStore } from '../stores/solicitudStore';
import { COLORS } from '../constants/config';

const MisSolicitudesScreen = ({ navigation }) => {
  const { solicitudes, isLoading, error, fetchMySolicitudes } = useSolicitudStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchMySolicitudes();
    }, [])
  );

  const handleCreateSolicitud = () => {
    navigation.navigate('CreateSolicitud');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return COLORS.success;
      case 'rejected':
        return COLORS.danger;
      case 'pending':
      default:
        return COLORS.warning;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'pending':
      default:
        return 'Pendiente';
    }
  };

  const renderSolicitudItem = ({ item }) => (
    <Card>
      <Card.Header
        title={`Permiso: ${item.type || 'Ausencia'}`}
        subtitle={`Desde: ${item.start_date}`}
      />
      <Card.Body>
        <Text style={styles.reason}>{item.reason || 'Sin descripción'}</Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              { color: getStatusColor(item.status) },
            ]}
          >
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </Card.Body>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mis Solicitudes</Text>
        <Button
          title="+ Nueva"
          onPress={handleCreateSolicitud}
          size="sm"
          style={styles.headerButton}
        />
      </View>

      {error && (
        <Alert
          type="error"
          message={error}
          onDismiss={() => {}}
        />
      )}

      {isLoading ? (
        <Loading message="Cargando solicitudes..." />
      ) : (
        <FlatList
          data={solicitudes}
          renderItem={renderSolicitudItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tienes solicitudes</Text>
              <Button
                title="Crear Solicitud"
                onPress={handleCreateSolicitud}
                style={styles.emptyButton}
              />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reason: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  statusContainer: {
    marginTop: 12,
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  emptyButton: {
    paddingHorizontal: 20,
  },
});

export default MisSolicitudesScreen;
