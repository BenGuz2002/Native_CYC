import Constants from 'expo-constants';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.100:8000/api';
export const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || 'Bitacoras CYC';

export const ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  USER: 'user',
};

export const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
};

export const PERMISSION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const ATTENDANCE_STATUS = {
  ON_TIME: 'on_time',
  LATE: 'late',
  JUSTIFIED: 'justified',
};

export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#f8fafc',
  border: '#e2e8f0',
  text: '#1e293b',
  textLight: '#64748b',
};

export const ASYNC_STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  BITACORAS: '@bitacoras_cache',
};
