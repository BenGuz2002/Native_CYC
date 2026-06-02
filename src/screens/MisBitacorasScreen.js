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
import { useBitacoraStore } from '../stores/bitacoraStore';
import { COLORS } from '../constants/config';

const MisBitacorasScreen = ({ navigation }) => {
  const { bitacoras, isLoading, error, fetchMyBitacoras } = useBitacoraStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchMyBitacoras();
    }, [])
  );

  const handleCreateBitacora = () => {
    navigation.navigate('CreateBitacora');
  };

  const handleEditBitacora = (bitacora) => {
    navigation.navigate('EditBitacora', { bitacora });
  };

  const renderBitacoraItem = ({ item }) => (
    <Card onPress={() => handleEditBitacora(item)}>
      <Card.Header
        title={item.title || 'Sin título'}
        subtitle={`${item.date}`}
      />
      <Card.Body>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.hours}>Horas: {item.hours}</Text>
      </Card.Body>
      <Card.Footer>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditBitacora(item)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </Card.Footer>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mis Bitácoras</Text>
        <Button
          title="+ Nueva"
          onPress={handleCreateBitacora}
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
        <Loading message="Cargando bitácoras..." />
      ) : (
        <FlatList
          data={bitacoras}
          renderItem={renderBitacoraItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tienes bitácoras registradas</Text>
              <Button
                title="Crear Primera Bitácora"
                onPress={handleCreateBitacora}
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
  description: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 8,
    lineHeight: 18,
  },
  hours: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

export default MisBitacorasScreen;
