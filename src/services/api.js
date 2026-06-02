import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, ASYNC_STORAGE_KEYS } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar token a las requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER);
    }
    return Promise.reject(error);
  }
);

export default api;

// =====================
// SERVICIOS DE AUTENTICACIÓN
// =====================

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (data) =>
    api.post('/auth/register', data),

  logout: () =>
    api.post('/auth/logout'),

  getProfile: () =>
    api.get('/user'),

  updateProfile: (data) =>
    api.put('/user', data),
};

// =====================
// SERVICIOS DE BITÁCORAS
// =====================

export const bitacoraService = {
  // Mis bitácoras
  getMyBitacoras: () =>
    api.get('/mis-bitacoras'),

  getMyBitacoraByDate: (date) =>
    api.get(`/api/mis-bitacoras/dia/${date}`),

  createBitacora: (data) =>
    api.post('/mis-bitacoras', data),

  getBitacora: (id) =>
    api.get(`/mis-bitacoras/${id}`),

  updateBitacora: (id, data) =>
    api.put(`/mis-bitacoras/${id}`, data),

  deleteBitacora: (id) =>
    api.delete(`/mis-bitacoras/${id}`),

  // Para admin
  getAllBitacoras: () =>
    api.get('/admin/bitacoras'),

  getBitacorasByDay: (date) =>
    api.get(`/admin/bitacoras/${date}`),

  getUserBitacoraDay: (date, userId) =>
    api.get(`/admin/bitacoras/${date}/usuario/${userId}`),
};

// =====================
// SERVICIOS DE SOLICITUDES
// =====================

export const solicitudService = {
  // Mis solicitudes
  getMySolicitudes: () =>
    api.get('/mis-solicitudes'),

  getSolicitud: (id) =>
    api.get(`/mis-solicitudes/${id}`),

  createSolicitud: (data) =>
    api.post('/mis-solicitudes/crear', data),

  // Admin
  getAllSolicitudes: () =>
    api.get('/admin/solicitudes'),

  approveSolicitud: (id) =>
    api.patch(`/admin/solicitudes/${id}/aprobar`),

  rejectSolicitud: (id) =>
    api.patch(`/admin/solicitudes/${id}/rechazar`),
};

// =====================
// SERVICIOS DE ASISTENCIA
// =====================

export const asistenciaService = {
  // Usuario
  getMyAttendance: () =>
    api.get('/mi-asistencia'),

  markAttendance: () =>
    api.post('/marcar-asistencia'),

  // Admin
  getAllAttendance: () =>
    api.get('/admin/asistencia'),

  updateAttendanceStatus: (id, status) =>
    api.post(`/admin/asistencia/actualizar-estado`, { id, status }),

  getAttendancePDF: (week) =>
    api.get(`/admin/asistencia/pdf?week=${week}`, { responseType: 'blob' }),
};

// =====================
// SERVICIOS DE ADMIN
// =====================

export const adminService = {
  // Usuarios
  getUsers: () =>
    api.get('/admin/usuarios'),

  createUser: (data) =>
    api.post('/admin/usuarios/crear', data),

  getUser: (id) =>
    api.get(`/admin/usuarios/${id}`),

  updateUser: (id, data) =>
    api.put(`/admin/usuarios/${id}`, data),

  deleteUser: (id) =>
    api.delete(`/admin/usuarios/${id}`),

  blockUser: (id) =>
    api.patch(`/admin/usuarios/${id}`, { status: 'blocked' }),

  // Áreas
  getAreas: () =>
    api.get('/admin/areas'),

  createArea: (data) =>
    api.post('/admin/areas', data),

  updateArea: (id, data) =>
    api.put(`/admin/areas/${id}`, data),

  deleteArea: (id) =>
    api.delete(`/admin/areas/${id}`),

  // Permisos
  getPermisos: () =>
    api.get('/admin/permisos'),

  createPermiso: (data) =>
    api.post('/admin/permisos', data),

  updatePermiso: (id, data) =>
    api.put(`/admin/permisos/${id}`, data),

  deletePermiso: (id) =>
    api.delete(`/admin/permisos/${id}`),
};
