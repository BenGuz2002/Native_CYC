import { create } from 'zustand';
import { solicitudService } from '../services/api';

export const useSolicitudStore = create((set, get) => ({
  solicitudes: [],
  currentSolicitud: null,
  isLoading: false,
  error: null,

  // Obtener mis solicitudes
  fetchMySolicitudes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await solicitudService.getMySolicitudes();
      set({ solicitudes: response.data, error: null });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching solicitudes';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear solicitud
  createSolicitud: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await solicitudService.createSolicitud(data);
      set((state) => ({
        solicitudes: [...state.solicitudes, response.data],
        currentSolicitud: response.data,
        error: null,
      }));
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating solicitud';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener solicitudes (admin)
  fetchAllSolicitudes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await solicitudService.getAllSolicitudes();
      set({ solicitudes: response.data, error: null });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching solicitudes';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Aprobar solicitud (admin)
  approveSolicitud: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await solicitudService.approveSolicitud(id);
      set((state) => ({
        solicitudes: state.solicitudes.map((s) => (s.id === id ? response.data : s)),
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error approving solicitud';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Rechazar solicitud (admin)
  rejectSolicitud: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await solicitudService.rejectSolicitud(id);
      set((state) => ({
        solicitudes: state.solicitudes.map((s) => (s.id === id ? response.data : s)),
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error rejecting solicitud';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Limpiar estado
  clearSolicitudes: () => set({ solicitudes: [], currentSolicitud: null, error: null }),
}));
