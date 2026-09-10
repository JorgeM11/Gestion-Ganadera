# Historial de Cambios - App Ganadera V2

Este documento registra de forma cronológica todas las modificaciones, mejoras, nuevas funcionalidades y correcciones aplicadas sobre la base del sistema PWA.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.2.0-ui-inventario] - 2026-09-10

### Agregado
- **Menú Lateral Hamburguesa (Navigation Drawer)**:
  - Componente [`NavigationDrawer.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/NavigationDrawer.jsx) con animaciones fluidas (`framer-motion`), fondo difuminado y diseño responsive.
  - Opciones integradas:
    1. **Inventario**: Navegación y estado activo.
    2. **Fincas**: Abre el gestor modal de fincas con contador dinámico.
    3. **Ordeño**: Acceso rápido al registro de ordeño lechero con selector de vacas hembras.
    4. **Respaldo Forzado**: Disparador de sincronización en la nube con indicador de progreso animado.
    5. **Cerrar Sesión**: Cierre seguro con verificación previa de cambios pendientes en cola offline (`sync_queue`).
- **Estados de Carga con Skeletons**:
  - Componente [`AnimalCardSkeleton.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalCardSkeleton.jsx) con tarjetas animadas en pulso que eliminan parpadeos y saltos de layout (*layout shift*) durante la carga de Dexie.
- **Filtro por Raza en Inventario**:
  - Extracción dinámica de todas las razas registradas en los animales (`availableBreeds`).
  - Checkboxes con conteo individual de ejemplares por raza.
- **Gestor Integral de Fincas**:
  - En [`FarmModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/FarmModal.jsx), se agregaron pestañas para visualizar el listado de fincas existentes con su conteo de animales asociados, la opción de registrar nuevos predios y la **edición completa de fincas** con botón de lápiz (`Pencil`), permitiendo actualizar nombre, ubicación y notas.
- **Botón de Limpieza de Filtros**:
  - Reemplazado el enlace de texto subrayado por un botón interactivo estructurado con icono `X`, fondo blanco, borde y sombreado.
- **Estilo de Encabezado Inventario**:
  - Configuración explícita de color de texto para "Inventario" y el botón de hamburguesa: verde bosque (`#1B4820`) en dispositivos móviles y blanco nítido (`#FFFFFF`) en pantallas de escritorio.
  - Corrección de conflicto CSS global en [`src/index.css`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/index.css) donde una regla sin capa sobreescribía el color del elemento `h1` forzándolo a oscuro/negro (`var(--color-on-surface)`). Se encapsuló en `@layer base` para permitir la aplicación correcta de las clases de utilidad de Tailwind.

### Modificado
- **Reglas de Diseño Globales**:
  - **Cero Emojis**: Reemplazo total de emojis (🏡, 🟢, 🔴, 🌅, 🌇, 🥛, 🔄, 🟡, ⚠️) en todo el código fuente por iconos vectoriales consistentes de `lucide-react`.
  - **Punteros Interactivos**: Implementación de `cursor-pointer` en todos los elementos clickeables (tarjetas, botones, selectores, filtros y drawer).
  - **Diseño Responsive & Proporciones**: Rejilla adaptativa optimizada (`grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`) para que las tarjetas tengan mayor amplitud sin desbordarse.
- **Header Principal**:
  - Título actualizado a **"Inventario"** e incorporación del botón hamburguesa interactivo a su izquierda.
- **Tarjetas de Animales (Card Layout Limpio)**:
  - Estructuración vertical sin solapamiento de información:
    1. Imagen con aspecto 4:3, zoom suave en hover, badge de status (`Activo`/`Inactivo`) y badge de sexo (`Hembra`/`Macho`).
    2. Título principal (`animal.name` o `#{animal.number}`).
    3. Fila de **Raza** con icono genético `Dna` y composición de pureza.
    4. Fila de **Finca** con icono `Building2` del predio asignado.
    5. Fila de **Edad** con icono `Calendar` y formato legible.
    6. Fila inferior con **Peso** (`Scale`) y botón de **Ordeño** directo para hembras.
- **Limpieza de Filtro de Búsqueda**:
  - Removido el botón redundante `+ Nueva Finca` del panel de búsqueda de fincas.
- **Botón Flotante (FAB) Simplificado**:
  - Se eliminaron del FAB las acciones migradas al menú hamburguesa (Cerrar Sesión, Respaldo Forzado, Nueva Finca), manteniendo acceso rápido a "Nuevo Registro" y "Vacunación por Lotes".

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
