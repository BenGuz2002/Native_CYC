import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const authStore = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      const restored = await authStore.restoreSession();
      setIsInitializing(false);
    };

    initialize();
  }, []);

  return {
    isInitializing,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    token: authStore.token,
    isLoading: authStore.isLoading,
    error: authStore.error,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    updateProfile: authStore.updateProfile,
    isAdmin: authStore.isAdmin,
    isSupervisor: authStore.isSupervisor,
  };
};

export default useAuth;
