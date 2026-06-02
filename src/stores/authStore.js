import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';
import { authService } from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  // Restaurar sesión guardada
  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.TOKEN);
      const userJson = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER);

      if (token && userJson) {
        const user = JSON.parse(userJson);
        set({
          token,
          user,
          isAuthenticated: true,
          error: null,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring session:', error);
      set({ error: error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;

      // Guardar en storage
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.TOKEN, token);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER, JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error en login';
      set({ error: message, isAuthenticated: false });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Register
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(data);
      const { token, user } = response.data;

      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.TOKEN, token);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER, JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error en registro';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error in logout API call:', error);
    } finally {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    }
  },

  // Actualizar perfil
  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.updateProfile(data);
      const updatedUser = response.data.user;

      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER, JSON.stringify(updatedUser));

      set({ user: updatedUser });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error actualizando perfil';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Helper: verificar si es admin
  isAdmin: () => get().user?.role === 'admin',

  // Helper: verificar si es supervisor
  isSupervisor: () => get().user?.role === 'supervisor',

  // Helper: obtener rol
  getRole: () => get().user?.role,
}));
