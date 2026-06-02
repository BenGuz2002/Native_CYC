import { create } from 'zustand';
import { bitacoraService } from '../services/api';

export const useBitacoraStore = create((set, get) => ({
  bitacoras: [],
  currentBitacora: null,
  isLoading: false,
  error: null,

  // Obtener mis bitácoras
  fetchMyBitacoras: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await bitacoraService.getMyBitacoras();
      set({ bitacoras: response.data, error: null });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching bitácoras';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener bitácora de un día específico
  fetchBitacoraByDate: async (date) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bitacoraService.getMyBitacoraByDate(date);
      set({ currentBitacora: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching bitácora';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear bitácora
  createBitacora: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bitacoraService.createBitacora(data);
      set((state) => ({
        bitacoras: [...state.bitacoras, response.data],
        currentBitacora: response.data,
        error: null,
      }));
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating bitácora';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Actualizar bitácora
  updateBitacora: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bitacoraService.updateBitacora(id, data);
      set((state) => ({
        bitacoras: state.bitacoras.map((b) => (b.id === id ? response.data : b)),
        currentBitacora: response.data,
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating bitácora';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Eliminar bitácora
  deleteBitacora: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await bitacoraService.deleteBitacora(id);
      set((state) => ({
        bitacoras: state.bitacoras.filter((b) => b.id !== id),
        currentBitacora: null,
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error deleting bitácora';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Limpiar estado
  clearBitacoras: () => set({ bitacoras: [], currentBitacora: null, error: null }),
}));
