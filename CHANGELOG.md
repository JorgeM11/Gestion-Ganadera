# Historial de Cambios - App Ganadera V2

Este documento registra de forma cronológica todas las modificaciones, mejoras, nuevas funcionalidades y correcciones aplicadas sobre la base del sistema PWA.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.1.0-features] - 2026-09-10

### Agregado
- **Nueva Base de Datos Supabase**:
  - Conexión configurada en [`.env.local`](file:///C:/Users/joses/appganadera/App-ganadera-v2/.env.local) con verificación de conectividad y bucket de almacenamiento `animal-photos`.
  - Esquema completo con 8 tablas: `usuarios`, `farms`, `animals`, `services`, `pregnancy_checks`, `health_records`, `growth_events`, `milking_records`.
- **Módulo de Usuarios y Autenticación Offline-First**:
  - Creación de [`src/lib/authService.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/authService.js) con hashing seguro (Web Crypto SHA-256) y validación de estado (`status === 'Activo'`).
  - Eliminación de la dependencia de tokens JWT de Supabase Auth en el motor de sincronización (`syncUtils.js`), evitando la expulsión o bloqueo de usuarios sin internet.
- **Gestión Multi-Finca**:
  - Utilidad [`src/lib/farmUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/farmUtils.js) y componente modal [`FarmModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/FarmModal.jsx).
  - Filtro interactivo de fincas en [`Inventario.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Inventario.jsx) y visualización de la finca en las fichas de animales.
- **Lógica Genética y Mestizaje**:
  - Módulo [`src/lib/geneticsUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/geneticsUtils.js) con cálculo biológico de herencia (50% padre, 50% madre), ponderación de purezas parentales y detección automática de cruces F1 y mestizajes.
  - Auto-cálculo y banner interactivo en [`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx) al seleccionar padre y madre.
- **Módulo de Control de Ordeño y Producción Lechera**:
  - Utilidad [`src/lib/milkingUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/milkingUtils.js) para registro por turnos (Mañana, Tarde, Único), cálculos acumulados y promedios diarios.
  - Componente modal de registro rápido [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx).
  - Nueva pestaña [`MilkingTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/MilkingTab.jsx) en el perfil de las hembras con estadísticas y tabla histórica de pesajes.

### Modificado
- Esquema local Dexie ([`src/lib/db.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/db.js)) actualizado a versión 6 integrando las nuevas tablas e índices.
- Motor de sincronización ([`src/lib/syncUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/syncUtils.js)) optimizado para sincronizar las 8 tablas sin depender de sesiones JWT caducadas.

---

## [1.0.0-base] - 2026-09-10

### Agregado
- **Réplica Base Exacta**: Duplicación completa del sistema PWA desde `App-ganadera`.
- **Estructura y Módulos**:
  - Módulo de Inventario bovino (`AnimalForm`, `AnimalImage`, `GenealogySelector`, listados y perfiles).
  - Módulo de Salud y Tratamientos (`HealthTab`, `HealthForm`, `TratamientoLote`).
  - Módulo de Reproducción (`ReproductionTab`, `ServicioForm`, `TactoForm`, `PartosTab`, etc.).
  - Módulo de Genealogía y Evolución física y productiva.
  - Soporte Offline y PWA completo mediante `vite-plugin-pwa`, `Dexie` (IndexedDB local) y sincronización con `Supabase`.
  - Componentes de UI reactivos (Tailwind CSS v4, Framer Motion, Lucide Icons).
- **Control de Versiones**:
  - Inicialización limpia de repositorio Git en rama `main`.
  - Configuración de exclusiones en `.gitignore` (node_modules, dist, variables locales).
