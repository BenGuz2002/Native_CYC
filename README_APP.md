# 📱 Bitácoras CYC - React Native App

## 📋 Descripción

Aplicación móvil en React Native para gestionar bitácoras, solicitudes de permisos, y control de asistencia. Se conecta a la API del backend Laravel en `appbitacoras.consultorescyc.cl`.

## 🏗️ Estructura del Proyecto

```
src/
├── screens/              # Componentes de pantalla
│   ├── LoginScreen.js           - Pantalla de login
│   ├── RegisterScreen.js         - Pantalla de registro
│   ├── DashboardScreen.js        - Dashboard/Inicio
│   ├── MisBitacorasScreen.js     - Listado de bitácoras
│   ├── CreateBitacoraScreen.js   - Crear bitácora
│   ├── EditBitacoraScreen.js     - Editar bitácora
│   ├── MisSolicitudesScreen.js   - Mis solicitudes
│   ├── CreateSolicitudScreen.js  - Crear solicitud
│   ├── MiAsistenciaScreen.js     - Control de asistencia
│   ├── ProfileScreen.js          - Perfil de usuario
│   └── index.js                   - Exports
│
├── navigation/           # Configuración de navegación
│   ├── RootNavigator.js          - Navegador principal con tabs
│   └── index.js
│
├── services/            # Servicios y API
│   ├── api.js                    - Cliente HTTP (Axios) + endpoints
│   └── index.js
│
├── stores/              # Estado global (Zustand)
│   ├── authStore.js              - Autenticación y perfil
│   ├── bitacoraStore.js          - Bitácoras
│   ├── solicitudStore.js         - Solicitudes
│   ├── asistenciaStore.js        - Asistencia
│   └── index.js
│
├── components/          # Componentes reutilizables
│   ├── Button.js                 - Botón personalizado
│   ├── TextInputField.js         - Campo de entrada con validación
│   ├── Card.js                   - Card/Tarjeta
│   ├── Loading.js                - Spinner
│   ├── Alert.js                  - Notificaciones
│   └── index.js
│
├── hooks/               # Hooks personalizados
│   ├── useForm.js                - Manejo de formularios
│   ├── useAuth.js                - Contexto de autenticación
│   └── index.js
│
├── constants/           # Constantes de la app
│   ├── config.js                 - URLs, roles, colores, etc.
│   └── index.js
│
├── utils/               # Utilidades (a expandir)
│   └── index.js
│
├── types/               # TypeScript types (opcional)
│   └── index.js
│
├── App.js               # Entry point
├── index.js             # Registro root
└── .env                 # Variables de entorno
```

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd native
npm install
```

### 2. Configurar Backend

Editar `.env`:
```
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000/api
EXPO_PUBLIC_APP_NAME=Bitacoras CYC
```

Cambia `192.168.1.100` por la IP/host de tu servidor Laravel.

### 3. Ejecutar en Web

```bash
npm run web
```

### 4. Ejecutar en Android (requiere emulador)

```bash
npm run android
```

### 5. Ejecutar en iOS (requiere Mac y Xcode)

```bash
npm run ios
```

## 🔑 Tecnologías Utilizadas

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | React Native 0.83.6 |
| **Expo** | 55.0.25 |
| **Navegación** | React Navigation 6 |
| **HTTP** | Axios |
| **Estado Global** | Zustand |
| **Formularios** | React Hook Form |
| **Storage** | AsyncStorage |
| **Componentes UI** | React Native Elements |

## 📋 Funcionalidades Implementadas

### ✅ Fase 1: Infraestructura Base
- [x] Estructura de carpetas
- [x] Configuración de API (Axios con interceptors)
- [x] Zustand stores para estado global
- [x] Componentes UI reutilizables
- [x] Sistema de routing (React Navigation)

### ✅ Fase 2: Autenticación
- [x] Pantalla de Login
- [x] Pantalla de Registro
- [x] Store de autenticación (Zustand)
- [x] Persistencia de sesión (AsyncStorage)
- [x] Protected routes basadas en `isAuthenticated`

### ✅ Fase 3: Bitácoras
- [x] Listar mis bitácoras
- [x] Crear bitácora
- [x] Editar bitácora
- [x] Eliminar bitácora
- [x] Vista detallada

### ✅ Fase 4: Solicitudes
- [x] Listar mis solicitudes
- [x] Crear solicitud de permiso
- [x] Visualizar estado (pendiente, aprobada, rechazada)

### ✅ Fase 5: Asistencia
- [x] Ver historial de asistencia
- [x] Marcar llegada
- [x] Visualizar estado (a tiempo, atrasado, justificado)

### ✅ Fase 6: Perfil
- [x] Ver información personal
- [x] Cerrar sesión

### 🚧 Fase 7: Panel Admin (En desarrollo)
- [ ] Gestión de usuarios
- [ ] Gestión de áreas
- [ ] Revisión de solicitudes
- [ ] Panel global de asistencia
- [ ] Generación de reportes

## 📡 API Endpoints

### Autenticación
```
POST   /auth/login              - Login
POST   /auth/register           - Registro
POST   /auth/logout             - Logout
GET    /user                    - Perfil actual
PUT    /user                    - Actualizar perfil
```

### Bitácoras
```
GET    /mis-bitacoras           - Listar mis bitácoras
POST   /mis-bitacoras           - Crear bitácora
GET    /mis-bitacoras/{id}      - Obtener bitácora
PUT    /mis-bitacoras/{id}      - Actualizar bitácora
DELETE /mis-bitacoras/{id}      - Eliminar bitácora
```

### Solicitudes
```
GET    /mis-solicitudes         - Mis solicitudes
POST   /mis-solicitudes/crear   - Crear solicitud
GET    /mi-asistencia           - Mi asistencia (listado)
POST   /marcar-asistencia       - Marcar entrada
```

### Admin (próximamente)
```
GET    /admin/usuarios          - Listar usuarios
GET    /admin/bitacoras         - Bitácoras globales
GET    /admin/solicitudes       - Solicitudes pendientes
GET    /admin/asistencia        - Asistencia global
```

## 🎨 Diseño y Colores

```javascript
const COLORS = {
  primary: '#2563eb',      // Azul
  secondary: '#64748b',    // Gris
  success: '#10b981',      // Verde
  warning: '#f59e0b',      // Amarillo
  danger: '#ef4444',       // Rojo
  background: '#f8fafc',   // Gris claro
  border: '#e2e8f0',       // Borde gris
  text: '#1e293b',         // Texto oscuro
  textLight: '#64748b',    // Texto claro
};
```

## 🔐 Roles y Permisos

| Rol | Acceso |
|-----|--------|
| **user** | Bitácoras, Solicitudes, Asistencia, Perfil |
| **supervisor** | Lectura global de bitácoras y usuarios |
| **admin** | Todo (usuarios, áreas, solicitudes, asistencia) |

## 🐛 Solución de Problemas

### Problema: "Cannot connect to backend"
**Solución:** Verifica que la URL en `.env` sea correcta y que el servidor Laravel esté corriendo.

### Problema: "EXPO_PUBLIC_API_URL is not defined"
**Solución:** Asegúrate de usar las variables con prefijo `EXPO_PUBLIC_` en `.env`.

### Problema: "Cannot find module"
**Solución:** Ejecuta `npm install` nuevamente.

## 📚 Referencias

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)

## 📝 Próximos Pasos

1. Implementar panel admin completo
2. Agregar iconos reales (FontAwesome/Material Icons)
3. Implementar offline-first con React Query
4. Agregar notificaciones push (Expo Notifications)
5. Implementar mapas para registro de asistencia
6. Agregar cámara para captura de evidencias
7. Testing completo (Jest, Detox)
8. Publicación en App Store y Play Store

---

**Versión:** 0.1.0  
**Último update:** Mayo 2026
