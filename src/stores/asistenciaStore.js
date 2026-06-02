import { create } from 'zustand';
import { asistenciaService } from '../services/api';

export const useAsistenciaStore = create((set, get) => ({
  asistencias: [],
  currentAsistencia: null,
  isLoading: false,
  error: null,

  // Obtener mi asistencia
  fetchMyAttendance: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await asistenciaService.getMyAttendance();
      set({ asistencias: response.data, error: null });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching attendance';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Marcar asistencia
  markAttendance: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await asistenciaService.markAttendance();
      set((state) => ({
        asistencias: [...state.asistencias, response.data],
        currentAsistencia: response.data,
        error: null,
      }));
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Error marking attendance';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener asistencia global (admin)
  fetchAllAttendance: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await asistenciaService.getAllAttendance();
      set({ asistencias: response.data, error: null });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching attendance';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Actualizar estado de asistencia (admin)
  updateAttendanceStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await asistenciaService.updateAttendanceStatus(id, status);
      set((state) => ({
        asistencias: state.asistencias.map((a) => (a.id === id ? response.data : a)),
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating attendance';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Limpiar estado
  clearAttendance: () => set({ asistencias: [], currentAsistencia: null, error: null }),
}));
