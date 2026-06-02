import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Loading, Alert } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useBitacoraStore } from '../stores/bitacoraStore';
import { useAsistenciaStore } from '../stores/asistenciaStore';
import { COLORS } from '../constants/config';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { bitacoras, isLoading: bitacorasLoading, fetchMyBitacoras } = useBitacoraStore();
  const { asistencias, fetchMyAttendance, markAttendance, isLoading: asistenciaLoading } =
    useAsistenciaStore();

  useFocusEffect(
    React.useCallback(() => {
      if (user?.role === 'user') {
        fetchMyBitacoras();
        fetchMyAttendance();
      }
    }, [])
  );

  const handleNavigateToBitacoras = () => {
    navigation.navigate('MisBitacoras');
  };

  const handleNavigateToSolicitudes = () => {
    navigation.navigate('MisSolicitudes');
  };

  const handleMarkAttendance = async () => {
    const result = await markAttendance();
    if (result.success) {
      Alert.alert('Éxito', 'Asistencia marcada correctamente');
      fetchMyAttendance();
    }
  };

  const renderUserDashboard = () => (
    <View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hola, {user?.name}!</Text>
        <Text style={styles.subText}>Bienvenido a tu panel de control</Text>
      </View>

      {asistenciaLoading ? (
        <Loading message="Cargando asistencia..." fullScreen={false} />
      ) : (
        <Card>
          <Card.Header title="Mi Asistencia" subtitle="Estado de hoy" />
          <Card.Body>
            {asistencias && asistencias.length > 0 ? (
              <View>
                <Text style={styles.cardText}>
                  Última marcación: {asistencias[0]?.hora_llegada || 'No registrado'}
                </Text>
                <Text style={styles.cardStatus}>
                  Estado: {asistencias[0]?.estado || 'Pendiente'}
                </Text>
              </View>
            ) : (
              <Text style={styles.cardText}>Aún no has marcado tu asistencia</Text>
            )}
          </Card.Body>
          <Card.Footer>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMarkAttendance}
            >
              <Text style={styles.actionButtonText}>Marcar Entrada</Text>
            </TouchableOpacity>
          </Card.Footer>
        </Card>
      )}

      {bitacorasLoading ? (
        <Loading message="Cargando bitácoras..." fullScreen={false} />
      ) : (
        <Card>
          <Card.Header title="Mis Bitácoras" subtitle={`Total: ${bitacoras?.length || 0}`} />
          <Card.Body>
            {bitacoras && bitacoras.length > 0 ? (
              <View>
                <Text style={styles.cardText}>
                  Última bitácora: {bitacoras[0]?.date}
                </Text>
                <Text style={styles.cardSubText}>
                  {bitacoras[0]?.title || 'Sin título'}
                </Text>
              </View>
            ) : (
              <Text style={styles.cardText}>Aún no tienes bitácoras registradas</Text>
            )}
          </Card.Body>
          <Card.Footer>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleNavigateToBitacoras}
            >
              <Text style={styles.actionButtonText}>Ver Todas</Text>
            </TouchableOpacity>
          </Card.Footer>
        </Card>
      )}

      <Card>
        <Card.Header title="Mis Solicitudes" subtitle="Permisos y ausencias" />
        <Card.Body>
          <Text style={styles.cardText}>
            Gestiona tus solicitudes de permiso
          </Text>
        </Card.Body>
        <Card.Footer>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNavigateToSolicitudes}
          >
            <Text style={styles.actionButtonText}>Ver Solicitudes</Text>
          </TouchableOpacity>
        </Card.Footer>
      </Card>
    </View>
  );

  const renderAdminDashboard = () => (
    <View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Panel Administrativo</Text>
        <Text style={styles.subText}>Gestión general del sistema</Text>
      </View>

      <Card onPress={() => navigation.navigate('AdminUsers')}>
        <Card.Header title="Gestión de Usuarios" />
        <Card.Body>
          <Text style={styles.cardText}>Administrar usuarios del sistema</Text>
        </Card.Body>
      </Card>

      <Card onPress={() => navigation.navigate('AdminBitacoras')}>
        <Card.Header title="Bitácoras Global" />
        <Card.Body>
          <Text style={styles.cardText}>Ver todas las bitácoras registradas</Text>
        </Card.Body>
      </Card>

      <Card onPress={() => navigation.navigate('AdminSolicitudes')}>
        <Card.Header title="Solicitudes Pendientes" />
        <Card.Body>
          <Text style={styles.cardText}>Aprobar o rechazar solicitudes</Text>
        </Card.Body>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {user?.role === 'user' ? renderUserDashboard() : renderAdminDashboard()}
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
    paddingVertical: 12,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  cardStatus: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DashboardScreen;
