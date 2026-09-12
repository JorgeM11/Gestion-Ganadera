# Historial de Cambios - App Ganadera V2

Este documento registra de forma cronológica todas las modificaciones, mejoras, nuevas funcionalidades y correcciones aplicadas sobre la base del sistema PWA.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [1.3.14-mobile-action-colors-and-fab-overlay] - 2026-09-12

### Corregido y Modificado
- **Superposición del Difuminado/Overlay en Botón Flotante ([`Inventario.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Inventario.jsx))**:
  - Resuelto el problema donde el overlay oscuro se posicionaba por encima del botón flotante (FAB) al desplegar las opciones rápidas.
  - Se configuró el overlay de fondo en `z-40` cuando el FAB está abierto y `z-[55]` cuando se abre el panel de filtros. El contenedor del botón flotante se fijó en `z-50`, asegurando que el botón permanezca por encima de su propio difuminado pero por debajo de la barra lateral desplegable (`z-[70]`).
- **Color Permanente en Botones de Acción para Dispositivos Móviles ([`MilkingTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/MilkingTab.jsx), [`HealthTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/HealthTab.jsx), [`ServiciosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/ServiciosTab.jsx), [`TactosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/TactosTab.jsx), [`PartosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/PartosTab.jsx), [`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx), [`FarmModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/FarmModal.jsx), [`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx))**:
  - En móviles (donde no existe la interacción por `hover`), los botones de acción como **Editar**, **Eliminar**, **Ver Ficha** y accesos directos ahora muestran su color y fondo distintivo de forma fija (`text-[#1B4820] bg-[#EEF7EE]` para edición y navegación, `text-red-600 bg-red-50` para eliminación).
  - En pantallas de escritorio (`md:`), se preserva el comportamiento interactivo original con tonos neutros en reposo y resaltado dinámico al pasar el cursor por encima (`md:text-neutral-400 md:bg-transparent md:hover:...`).
- **Optimización Responsiva de Diferencia de Peso en Tarjetas de Eventos ([`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx))**:
  - Se rediseñó la visualización del diferencial de peso (`weightDiff`) para prevenir roturas de maquetación en pantallas estrechas.
  - La insignia de variación de peso (`+X.X kg` / `-X.X kg`) ahora se destaca en la cabecera de la tarjeta junto a la etiqueta del tipo de evento.
  - En el componente `DataBox`, se desacopló el diferencial de la línea de encabezado, ubicándolo junto al valor numérico del peso con ajuste flexible de línea (`flex items-baseline gap-1.5 flex-wrap`), evitando truncamiento del título y desbordamientos horizontales.

---

## [1.3.13-visual-and-drawer-refinements] - 2026-09-12

### Corregido y Modificado
- **Simplificación de Textos en Botones de Formularios de Eventos ([`EventForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/EventForm.jsx), [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx))**:
  - En el formulario de eventos (`EventForm.jsx`), se acortó el texto del botón principal de acción a solo `"Guardar"` (al editar) o `"Registrar"` (al crear nuevo), eliminando palabras redundantes y evitando que el botón quede sobrecargado.
  - Se replicó la misma síntesis en el modal de ordeño (`MilkingModal.jsx`).
- **Jerarquía de Capas (Z-Index) entre Botón Flotante y Barra Lateral ([`Inventario.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Inventario.jsx), [`NavigationDrawer.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/NavigationDrawer.jsx))**:
  - Se redujo el `z-index` del contenedor del botón flotante de acción (FAB) de `z-50` a `z-30`.
  - Se elevó la barra lateral desplegable (`NavigationDrawer`) a `z-[70]`, garantizando que tanto el panel lateral como su backdrop queden estrictamente por encima del botón flotante y de la barra inferior de navegación.
- **Apertura Fluida de Modales desde la Barra Lateral sin Animación de Cierre Competitiva ([`NavigationDrawer.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/NavigationDrawer.jsx), [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx))**:
  - Al abrir los modales de "Fincas" o de "Ordeño" desde la barra lateral, ya no se invoca el cierre forzado de la barra lateral en el mismo frame.
  - Esto elimina el lag y la ralentización causados por la colisión de la animación de salida de Framer Motion de la barra con la animación elástica de entrada del modal.
  - Se trasladó `MilkingModal` a `createPortal(..., document.body)` con capa superior `z-[100]`, montándose limpia y fluidamente sobre la barra lateral sin interferencias visuales.
- **Simplificación de Encabezados en Registro de Animal ([`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - Se removió la palabra `"Evento: "` en los acordeones del formulario de alta/edición de animal, quedando identificados de manera concisa como `"Nacimiento"` y `"Destete"`.
- **Ajuste de Opacidad y Contraste de Siluetas Placeholders ([`AnimalImage.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalImage.jsx))**:
  - Se ajustó la presencia visual de las siluetas originales de placeholders (`vaca.png`, `toro.png`, `becerro.png`) pasando de `opacity-30` a `opacity-50 mix-blend-multiply drop-shadow-sm`, logrando un tono sutilmente más oscuro y definido sin perder la estética limpia.

---

## [1.3.12-farm-creation-fix-and-deploy-resolution] - 2026-09-12

### Corregido y Modificado
- **Resolución de Error de Despliegue en Vercel ([`package.json`](file:///C:/Users/joses/appganadera/App-ganadera-v2/package.json), [`.npmrc`](file:///C:/Users/joses/appganadera/App-ganadera-v2/.npmrc))**:
  - Resuelto el conflicto de dependencias peer en Vercel (`npm error Conflicting peer dependency: vite@7.3.6 from vite-plugin-pwa@1.2.0`).
  - **Causa**: `vite-plugin-pwa@1.2.0` solicita `peer vite@"^3.1.0 || ... || ^7.0.0"`, mientras que `@vitejs/plugin-react@6` requiere `vite@^8.0.0`. En entornos CI como Vercel, npm v7+ aplica resolución estricta de peer dependencies (`eresolve`) y falla durante `npm install`.
  - **Solución**: Se añadió archivo [`.npmrc`](file:///C:/Users/joses/appganadera/App-ganadera-v2/.npmrc) con `legacy-peer-deps=true` y se configuró `"overrides"` en [`package.json`](file:///C:/Users/joses/appganadera/App-ganadera-v2/package.json) para `vite-plugin-pwa`, asegurando una instalación y compilación limpia y sin conflictos en Vercel.
- **Corrección de Creación de Finca dentro del Modal de Edición de Animal ([`FarmModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/FarmModal.jsx), [`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - Resuelto el bug donde al presionar "+ Nueva Finca" dentro del modal de edición de animal, el modal se quedaba cargando indefinidamente (*"Guardando..."*) y la finca no se creaba.
  - Se extrajo `<FarmModal>` fuera del tag `<form>` en `AnimalForm.jsx`.
  - Se implementó `createPortal(..., document.body)` en `FarmModal.jsx` para proyectarlo en el body con `z-[100]`.
  - Se configuró el botón con `type="button" onClick={handleSubmit}` y detención de propagación de eventos (`e.preventDefault()`, `e.stopPropagation()`).
  - Se añadió la prop `initialView="create"` para abrir directo en la pantalla de nueva finca y actualización reactiva del selector.
- **Genealogía y Manejo de Familiares no Registrados ([`GenealogyTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/GenealogyTab.jsx))**:
  - Se implementó soporte de género y edad para todos los nodos del árbol genealógico (macho $\rightarrow$ silueta toro, hembra $\rightarrow$ silueta vaca, cría $\rightarrow$ becerro).
  - Para familiares no registrados o inexistentes, se muestra la silueta gris correspondiente a su género (ej. toro para padre/abuelo ausente, vaca para madre/abuela ausente), con borde discontinuo (`border-dashed border-neutral-300`), `#---` y distintivo *"Sin registrar"*.
- **Mantenimiento de Siluetas Placeholders Originales ([`AnimalImage.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalImage.jsx), [`public/placeholders/`](file:///C:/Users/joses/appganadera/App-ganadera-v2/public/placeholders/))**:
  - Se mantuvieron las siluetas originales en escala de grises con fondo circular (`vaca.png`, `toro.png`, `becerro.png`), conservando el renderizado clásico de la app (`bg-[#E5E7EB] opacity-30 mix-blend-multiply`), y se eliminaron los archivos temporales generados.

---

## [1.3.11-ui-modern-login-refinement] - 2026-09-12

### Agregado y Modificado
- **Modernización Integral de la Pantalla de Inicio de Sesión ([`Login.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Login.jsx))**:
  - **Identidad de Marca Pastoral y Emblema Moderno**: Se diseñó un isotipo vectorial con fondo degradado verde bosque esmeralda (`#143416` a `#2B6631`), micro-sombra profunda, anillo decorativo y el tractor institucional con hover dinámico.
  - **Insignia PWA Offline-First**: Badge flotante superior con indicador pulsante esmeralda que comunica la disponibilidad y resiliencia offline del sistema ganadero.
  - **Atmósfera y Fondo Responsivo**: Fondo pastoral marfil (`#F5F7F2`) con orbes ambientales de luz difuminada (`blur-3xl`) en tonos esmeralda y lima, eliminando el antiguo contenedor gris rígido y ofreciendo una experiencia adaptada tanto a pantallas móviles como a monitores de escritorio.
  - **Tarjeta de Inicio de Sesión Elevada**: Tarjeta blanca en cristal (`bg-white/95 backdrop-blur-xl`), esquinas suaves `rounded-[32px]`, borde fino y sombra dimensional suave.
  - **Campos de Texto Enriquecidos ([`InputField.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/InputField.jsx))**:
    - Incorporación de iconos vectoriales dedicados (`Mail` para correo y `Lock` para contraseña).
    - Estados visuales interactivos: borde neutro suave con elevación, anillo verde corporativo (`focus-within:ring-[#1B4820]/10 focus-within:border-[#1B4820]`) al enfocar, y transición ágil en el botón de alternar visibilidad de contraseña (`Eye` / `EyeOff`).
  - **Feedback y Alertas de Error Animadas**: La alerta de error de credenciales ahora cuenta con animación elástica de altura (`AnimatePresence` + `MotionDiv`), icono vectorial `AlertCircle` y paleta carmesí clara.
  - **Botón de Acción Principal Modernizado ([`PrimaryButton.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/PrimaryButton.jsx))**:
    - Esquinas ergonómicas `rounded-2xl`, relieve esmeralda, micro-interacción en hover con desplazamiento de flecha (`group-hover:translate-x-1`) e indicador spinner SVG estilizado durante la carga.
  - **Créditos y Logo de Desarrollador en Sidebar y Login ([`NavigationDrawer.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/NavigationDrawer.jsx), [`Login.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Login.jsx))**:
    - Se integró el bloque de firma *"Diseñado y desarrollado por NetGen"* con el logo oficial (`/image.png`) y enlace a su sitio web tanto en el footer de inicio de sesión como en la barra lateral desplegable debajo del indicador `PWA Offline-First v2.0`.
  - **100% Fidelidad Funcional**: Mantenida intacta la lógica de autenticación con `authService`, auto-redirección de sesión activa, validación con esquema Zod y compatibilidad offline.

---

## [1.3.10-genealogy-breed-and-subtle-modernization] - 2026-09-11

### Agregado y Modificado
- **Modernización Sutil del Árbol Genealógico ([`GenealogyTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/GenealogyTab.jsx))**:
  - **Visualización de Raza en Cada Animal**: En todos los niveles del árbol (Abuelos, Padres, Sujeto Actual, Hijos y Nietos) se incorporó un indicador estilizado y compacto con la raza del ejemplar (`animal.breed`), facilitando la trazabilidad genética de un vistazo.
  - **Encabezado Institucional Estandarizado**: Se añadió la cabecera temática con icono vectorial `Share2`, título *"Árbol Genealógico"*, subtítulo descriptivo e indicador del código del animal (`#numero`), en armonía con las demás secciones.
  - **Tarjeta Contenedora y Micro-interacciones**: Se enmarcó el árbol genealógico en una tarjeta blanca con esquinas redondeadas (`rounded-3xl`), micro-sombras e interactividad en los avatares (micro-zoom `hover:scale-105`), junto con insignias legibles en los conectores de nivel (`Padres`, `Hijos`, `Nietos`).
  - **Navegación Directa a Detalles**: Al pulsar sobre cualquier miembro del árbol genealógico, el enlace ahora redirige directamente a la pestaña de detalles (`/inventario/perfil?id=${animal.id}&tab=details`).

---

## [1.3.9-milking-tab-crud-and-tabs-text-size] - 2026-09-11

### Agregado y Modificado
- **Módulo de Ordeño - Edición y Eliminación ([`MilkingTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/MilkingTab.jsx), [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx), [`milkingUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/milkingUtils.js))**:
  - **Remoción del Botón Estático Anterior**: Se eliminó la tarjeta/banner redundante con el botón "Registrar Ordeño" en favor del nuevo encabezado estandarizado (`Control de Ordeño`, `#numero`) y los botones flotantes de acción.
  - **Edición y Eliminación de Registros**: En cada fila del historial de pesajes de leche se añadieron botones de acción directa (`Pencil` y `Trash2`).
  - **Edición en Modal**: [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx) ahora soporta tanto creación como edición de registros de ordeño, precargando fecha, turno, litros y observaciones, e invocando la nueva función `updateMilkingRecord`.
  - **Eliminación Segura con Modal de Confirmación**: Se integró [`ConfirmDialog.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/ConfirmDialog.jsx) con `isDanger={true}`, advirtiendo antes de eliminar y aplicando soft-delete atómico en Dexie y encolamiento offline (`PATCH`) con `deleteMilkingRecord`.
  - **Coherencia en Botones Flotantes (FABs)**:
    - **Móvil (`md:hidden`)**: Botón flotante píldora en `bottom-20 right-4 z-30` con texto *Ordeño*, icono `Plus` y micro-física elástica rápida (`stiffness: 450, damping: 30, mass: 0.6`).
    - **Escritorio (`hidden md:flex`)**: Botón circular `w-14 h-14` en `bottom-8 right-8 z-30` con animación de giro de cruz (`+`) al interactuar.
- **Micro-tipografía de Sub-pestañas en Reproducción ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - Se ajustó el tamaño del texto en vista móvil a `text-[9.5px]` con icono compacto `w-3 h-3` y badge `text-[9px]`, brindando aún mayor soltura visual y comodidad sin sobrecargar los botones.

---

## [1.3.8-sync-patch-and-reproduction-tabs-fit] - 2026-09-11

### Corregido y Modificado
- **Motor de Sincronización Supabase ([`syncUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/syncUtils.js))**:
  - Se corrigió el error HTTP 400 (*Bad Request*) en endpoints como `/rest/v1/health_records` y `/rest/v1/pregnancy_checks`.
  - La raíz del error se debía a que las operaciones de eliminación lógica (*soft delete*) o actualizaciones parciales sin `user_id` eran procesadas con `upsert(payload)`, lo que provocaba que Supabase ejecutara un `INSERT ... ON CONFLICT` e invalidara las restricciones `NOT NULL` de columnas omitidas (`user_id`, etc.).
  - Se implementó encolamiento y subida mediante `PATCH` / `.update(fields).eq('id', id)`, garantizando que cualquier actualización o soft-delete parcial se aplique directamente sobre las columnas indicadas sin requerir el payload completo ni provocar fallos 400.
  - Se actualizaron los disparadores de eliminación lógica en [`HealthTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/HealthTab.jsx), [`TactosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/TactosTab.jsx) y [`ServiciosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/ServiciosTab.jsx) para registrar explícitamente `'PATCH'`.
- **Adaptabilidad Móvil de Pestañas de Reproducción ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - Se rediseñó el contenedor de sub-pestañas (`Partos`, `Palpación`, `Servicios`) utilizando una cuadrícula responsiva `grid grid-cols-3` en pantallas móviles (`< 640px`) y `sm:flex sm:justify-center` en pantallas mayores.
  - Se eliminó la necesidad de desplazamiento horizontal (*scroll horizontal*), permitiendo que las tres opciones se distribuyan con ancho uniforme, tipografía adaptada (`text-[11px] sm:text-xs`), badges compactos y texto sin cortes en cualquier resolución móvil.

---

## [1.3.7-ui-reproduction-tab-refinements] - 2026-09-11

### Agregado y Modificado
- **Refinamiento de la Vista de Reproducción ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - Se removieron los 3 cuadros de métricas KPI a solicitud del usuario, manteniendo una interfaz más limpia, ágil y directa enfocada en las pestañas interactivas.
- **Ajustes en la Sección de Partos ([`PartosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/PartosTab.jsx))**:
  - **Redirección a Vista de Detalles**: Al pulsar "Ver Ficha" de cualquier cría nacida, ahora se redirige explícitamente a su pestaña de detalles (`/inventario/perfil?id=${calf.id}&tab=details`).
  - **Remoción de Acciones de Creación en Partos**: Se eliminaron los botones de acción flotante (FAB móvil y de escritorio) y el botón del estado vacío para que no sea posible registrar partos directamente desde esta vista (los partos se registran al ingresar una nueva cría al inventario).

---

## [1.3.6-ui-reproduction-tab-modernization] - 2026-09-11

### Agregado y Modificado
- **Modernización Integral del Módulo Reproductivo ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - **Encabezado Institucional y Métricas Reproductivas**:
    - Cabecera con insignia vectorial `FaVenusMars` y código del animal (`#numero`).
    - Panel de control con 3 métricas en tiempo real: total de crías/partos registrados, diagnóstico reproductivo actual (palpación más reciente con indicador verde/rojo) y último servicio (tipo y fecha).
  - **Sub-navegación Inteligente en Píldoras**:
    - Badges numéricos reactivos en cada sub-pestaña (`Partos`, `Palpación`, `Servicios`) con indicador animado y fluidos cambios de vista.
- **Rediseño Completo de Partos ([`PartosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/PartosTab.jsx))**:
  - Tarjetas de crías con avatar de sexo (`FaMars` / `FaVenus`), raza, fecha de parto, peso al nacer y botón de acción directa "Ver Ficha" con enlace al perfil individual de la cría.
  - Estado vacío con llamado a la acción para registrar partos.
  - Soporte en [`NuevoAnimal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/NuevoAnimal.jsx) para recibir `?mother_id=` y pre-vincular a la madre automáticamente al registrar una cría.
- **Modernización de Palpaciones ([`TactosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/TactosTab.jsx))**:
  - Tarjetas con estado clínico de preñez (`Preñada` / `Vacía`), fechas formateadas y observaciones.
  - Creación y edición directa en modal [`BottomSheet`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/BottomSheet.jsx) con [`TactoForm`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/TactoForm.jsx) sin recargar ni abandonar la página.
  - Eliminación segura con [`ConfirmDialog`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/ConfirmDialog.jsx) y sincronización offline.
- **Modernización de Servicios ([`ServiciosTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/reproduction/ServiciosTab.jsx))**:
  - Tarjetas con tipo de concepción (`Inseminación Artificial` / `Monta Natural`), fecha y enlace directo al toro/padre asignado.
  - Creación y edición directa en modal con [`ServicioForm`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/ServicioForm.jsx).
  - Eliminación con modal de confirmación y sincronización offline.
- **Coherencia de Botones Flotantes (FABs) en Móvil y Desktop**:
  - En cada una de las 3 sub-pestañas:
    - **Móvil (`md:hidden`)**: Botón flotante píldora en `bottom-20 right-4 z-30` con texto específico (`Parto`, `Palpación`, `Servicio`).
    - **Escritorio (`hidden md:flex`)**: Botón circular `w-14 h-14` en `bottom-8 right-8 z-30` con animación de giro de cruz (`+`) al interactuar.

---

## [1.3.5-ui-health-tab-modernization] - 2026-09-11

### Agregado y Modificado
- **Modernización Integral del Carnet de Salud ([`HealthTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/HealthTab.jsx))**:
  - **Encabezado y Métricas Sanitarias Ejecutivas**:
    - Reemplazada la tarjeta redundante de imagen y peso por un encabezado institucional alineado con el perfil de animal (`ShieldPlus`) y un panel de control con métricas en tiempo real: total de tratamientos aplicados, fecha y nombre de la última aplicación.
  - **Filtros Interactivos por Categoría Médica**:
    - Filtros dinámicos en píldoras con badges numéricos (`Todos`, `Vacunas`, `Desparasitantes`, `Vitaminas`, `Antibióticos`) e iconografía vectorial especializada (`Syringe`, `TbMedicineSyrup`, `Pill`, `Stethoscope`), permitiendo filtrar instantáneamente el historial clínico.
  - **Tarjetas de Tratamiento Modernas y Funcionales**:
    - Tarjetas interactivas con badges temáticos, fechas formateadas, visualización de dosis en ml, y acciones directas de edición rápida y eliminación segura.
    - Modal de confirmación de eliminación ([`ConfirmDialog`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/ConfirmDialog.jsx)) sincronizado con la base de datos local Dexie y la cola offline.
  - **Coherencia en Botones Flotantes (FABs) para Móvil y Computadora**:
    - **Móvil (`md:hidden`)**: Botón flotante píldora en `bottom-20 right-4 z-30` con micro-física elástica rápida (`stiffness: 450, damping: 30, mass: 0.6`), icono `Plus` y texto *Tratamiento*.
    - **Escritorio (`hidden md:flex`)**: Botón circular flotante `w-14 h-14` en `bottom-8 right-8 z-30` con animación de rotación en hover para registrar tratamientos de inmediato.
    - Ambos botones abren un [`BottomSheet`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/BottomSheet.jsx) modal integrado con [`HealthForm`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/HealthForm.jsx) sin necesidad de abandonar la vista ni recargar la ficha del animal.
  - **Estado Vacío Amigable y Elegante**:
    - Ilustración vectorial con icono `ShieldCheck` y llamado a la acción directo para registrar el primer tratamiento del animal.

---

## [1.3.4-form-female-weaning-scrotal-hide] - 2026-09-11

### Agregado y Modificado
- **Ocultamiento Condicional de Circunferencia Escrotal al Destete ([`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - En el acordeón de *Evento: Destete* del formulario de registro y edición de animal, el campo **Circ. Escrotal al Destete (CM)** ahora se oculta de forma automática si el sexo seleccionado es **Hembra**.
  - Se añadió limpieza reactiva (`useEffect`) que restablece a `null` el valor de `sc_at_weaning` si el usuario cambia el sexo a Hembra.
  - Se blindó la persistencia en `handleSave` para garantizar que nunca se almacene circunferencia escrotal en animales de sexo Hembra al registrar eventos de destete.

---

## [1.3.3-ui-fast-snappy-tab-animations] - 2026-09-11

### Agregado y Modificado
- **Optimización de Velocidad y Respuesta en Animaciones de Pestañas ([`PerfilAnimal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/PerfilAnimal.jsx))**:
  - Se redujo drásticamente el tiempo de transición entre pestañas de 180ms a 100ms con curva `easeOut` ultra-reactiva (`duration: 0.1`), eliminando cualquier sensación de lentitud o retraso al alternar entre Detalles, Evolución, Reproducción y Salud.
  - Micro-desvanecimiento del título del encabezado optimizado a 100ms sincronizado.
- **Micro-física Instantánea en Botones Flotantes (FABs) ([`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx), [`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx))**:
  - Eliminado el retraso artificial (`delay: 0`) para que los botones de acción flotante (editar en móvil y crear evento tanto en móvil como en escritorio circular) aparezcan instantáneamente.
  - Física tipo resorte ajustada a alta reactividad (`stiffness: 450, damping: 30, mass: 0.6`) con menor recorrido vertical (`y: 10 -> 0`, `scale: 0.88 -> 1`), logrando una aparición inmediata, firme y suave sin brincos ni parpadeos.
- **Aceleración de Sub-pestañas de Reproducción ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - Optimizado el cambio entre Partos, Tactos y Servicios a `duration: 0.1` puro sin salto de eje `y`, unificando la velocidad en toda la experiencia de usuario.

---

## [1.3.2-ui-fab-smooth-and-desktop-round] - 2026-09-11

### Agregado y Modificado
- **Botón Flotante Redondo con '+' para Escritorio ([`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx))**:
  - En resolución de computadora (`hidden md:flex`), el botón de registro de eventos ahora es un botón de acción flotante (FAB) perfectamente circular (`w-14 h-14 rounded-full`) ubicado en `bottom-8 right-8 z-30` con el icono de suma (`+`), sombra profunda, relieve verde corporativo y rotación sutil en hover (`group-hover:rotate-90`).
  - Se removió el botón estático rectangular de la cabecera en escritorio para mantener la interfaz despejada y coherente.
- **Suavizado de la Animación de Entrada del Botón Flotante (Móvil)**:
  - **Eliminación de saltos por CSS Transform en Contenedor ([`PerfilAnimal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/PerfilAnimal.jsx))**:
    - Se reemplazó el desplazamiento `y: 10` en el contenedor dinámico de pestañas por una transición pura de opacidad (`crossfade`), previniendo que los elementos `fixed` alteren su contexto de posicionamiento y se desplacen de forma brusca durante el cambio de pestaña.
  - **Micro-física Spring Suave en FABs ([`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx) y [`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx))**:
    - Los botones flotantes móviles ahora entran con una física elástica calibrada (`stiffness: 240, damping: 24, mass: 0.8`) y un ligero retraso armónico (`delay: 0.08`), asegurando una entrada orgánica y aterciopelada sin cortes ni parpadeos.

---

## [1.3.1-ui-evolution-tab-modernization] - 2026-09-11

### Agregado y Modificado
- **Modernización y Rediseño de la Vista de Evolución ([`EvolutionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/EvolutionTab.jsx))**:
  - **Línea de Tiempo Interactiva y Moderna**:
    - Nodos estilizados con pulso esmeralda en el evento más reciente (`animate-pulse`) y conector vertical pulido.
    - Badges temáticos para tipos de eventos con iconografía vectorial (Nacimiento, Destete, Pesajes, Otros).
    - Tarjetas interactivas con elevación al hover, borde reactivo y botón de acción de edición directo.
    - Soporte inteligente de fotografías: Se exhibe un marco panorámico si hay foto cargada, o una tarjeta compacta y limpia si no la hay, optimizando el espacio vertical.
    - **Cálculo Automático de Ganancia de Peso ($\Delta$)**: Al comparar cada pesaje con el evento anterior en la cronología, se muestra la ganancia (ej. `+14.5 kg` con icono `TrendingUp`) o pérdida de peso en tiempo real.
    - **Acción Rápida Flotante (FAB)**: Botón flotante `motion.button` en móvil (`bottom-20 right-4 z-30`) y botón integrado en la cabecera en escritorio para registrar eventos instantáneamente mediante modal sin abandonar la ficha.
    - Estado vacío (*Empty State*) moderno y elegante con botón de acción directa.
- **Formulario y Modal de Evento de Vida ([`EventForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/EventForm.jsx))**:
  - **Longitud del Ombligo como Campo de Texto 1-9**:
    - Reemplazado el antiguo selector desplegable por un campo de texto numérico restringido estrictamente a los dígitos del 1 al 9 (`onKeyDown`, `inputMode="numeric"`, `maxLength={1}` y sanitización en tiempo real).
  - **Ocultamiento Condicional de Circunferencia Escrotal**:
    - El campo de *Circ. Escrotal* se oculta de forma automática si el evento seleccionado es **Nacimiento** o si el animal es de sexo **Hembra**, adaptando la cuadrícula a una sola columna limpia sin huecos vacíos.
  - **Estilizado Moderno sin Emojis**:
    - Todos los controles adaptados a la paleta institucional (`#1B4820`), bordes pulidos `rounded-3xl`, feedback háptico y tipografía estructurada con iconografía Lucide exclusivamente.

---

## [1.3.0-ui-fluid-animal-tabs] - 2026-09-11

### Agregado y Modificado
- **Animaciones Suaves y Fluidas en Navegación de Ficha del Animal ([`PerfilAnimal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/PerfilAnimal.jsx))**:
  - **Indicadores Deslizantes con Físicas Spring (`layoutId`)**:
    - **Escritorio**: La barra de pestañas superior ahora cuenta con un indicador deslizante inferior animado con físicas de resorte (`type: "spring", stiffness: 480, damping: 36`), que viaja suavemente entre pestañas al hacer clic.
    - **Móvil**: La barra inferior fija cuenta con una pastilla indicadora en la parte superior (`layoutId="mobileTabIndicator"`) y una sutil elevación/escala elástica sobre el icono activo (`scale: 1.15`).
  - **Transición Fluida de Contenido Dinámico**:
    - Se implementó `AnimatePresence mode="wait"` con `<motion.div>` en el contenedor dinámico de pestañas, logrando un desvanecimiento cruzado y desplazamiento vertical suave (`opacity`, `y`, curva cúbica `[0.22, 1, 0.36, 1]`) al alternar entre *Detalles*, *Evolución*, *Salud*, *Reproducción*, *Ordeño* y *Genealogía*.
  - **Transición del Título de Cabecera**:
    - El título principal de la vista transiciona armónicamente con micro-desvanecimiento al cambiar de sección.
  - **Sincronización Silenciosa de URL**:
    - Se integró `handleTabChange` con `setSearchParams(..., { replace: true })` para mantener la URL sincronizada con la pestaña activa sin saturar el historial de navegación.
- **Sub-pestañas en Módulo de Reproducción ([`ReproductionTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ReproductionTab.jsx))**:
  - Implementada pastilla de fondo deslizante (`layoutId="reproductionSubTabActive"`) y transiciones de entrada/salida suaves entre *Partos*, *Palpación* y *Servicios*.

---

## [1.2.9-ui-mobile-fab-edit] - 2026-09-11

### Agregado y Modificado
- **Botón Flotante de Edición (FAB) en Resolución Móvil ([`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx))**:
  - Se transformó el botón de edición móvil estático del final del formulario en un botón de acción flotante (*Floating Action Button - FAB*).
  - Posicionado estratégicamente a `fixed bottom-20 right-4 z-30 md:hidden` para ubicarse directamente en la zona ergonómica del pulgar, flotando sobre la barra inferior de navegación sin obstruirla.
  - Diseñado en forma de píldora con fondo corporativo (`#1B4820`), borde con relieve sutil, sombra profunda (`shadow-[0_8px_25px_rgba(27,72,32,0.4)]`), micro-animación de entrada y respuesta háptica táctil (`whileTap={{ scale: 0.93 }}` vía `framer-motion`), permitiendo al ganadero editar la ficha en cualquier punto del desplazamiento sin tener que bajar hasta el fondo.
  - En resolución de escritorio (`md`), se mantiene intacto el botón en la columna izquierda fija.

---

## [1.2.8-ui-form-genetics-and-pill-cleanup] - 2026-09-11

### Corregido y Modificado
- **Optimización de Sugerencia Genética en Modal de Edición ([`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - Al abrir el modal de edición de un animal existente, el sistema ya no vuelve a mostrar el banner de recomendación genética si la genética calculada ya coincide con la que el animal tiene aplicada o si los progenitores no han sido modificados durante la sesión.
  - La sugerencia únicamente se activa cuando el usuario cambia activamente a otro padre o madre y el nuevo cruce difiere de la raza/composición actual.
- **Eliminación de la Pill de Selección en Encabezado de Raza**:
  - Se eliminó el badge flotante redundante (`formatGeneticsLabel`) en la cabecera de la sección *Raza y Genética* tanto en el formulario de creación como en el de edición, dejando un encabezado limpio y minimalista.

---

## [1.2.7-ui-clean-profile-hero] - 2026-09-11

### Modificado
- **Simplificación Visual del Hero en Ficha del Animal ([`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx))**:
  - Eliminado el badge de sexo flotante sobre la foto para mayor limpieza visual (la información de sexo permanece claramente visible en la ficha técnica detallada).
  - Eliminadas las tarjetas de "Finca" y "Genética" del bloque inferior inmediato a la foto, dejando un par de métricas clave enfocado exclusivamente en **Peso Actual** y **Edad Estimada**.

---

## [1.2.6-ui-animal-details-redesign] - 2026-09-11

### Agregado y Modificado
- **Rediseño Integral y Modernización de la Ficha de Detalles del Animal ([`DetailsTab.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/DetailsTab.jsx))**:
  - **Lógica de Pureza Genética Específica vs. Mestizo**:
    - Si el animal es de una raza pura (ej. *Brahman*, *Gyr*, *Holstein*), se muestra su porcentaje individual exacto (ej. `100%` con badge `Puro` si es ≥ 90%).
    - Si el animal es **Mestizo**, se eliminó completamente el porcentaje global arbitrario. En su lugar se despliega el **desglose individual de cada raza** en badges (`breed_composition`), por ejemplo `50% Brahman · 50% Holstein`. Si no cuenta con proporciones guardadas, indica `Cruce mestizo (sin desglose específico)`.
  - **Interfaz Moderna 100% Responsiva**:
    - **Foto del Animal con Badges Flotantes**: Incorporados badges semitransparentes en cristal (*glassmorphism*) para el estado del animal (`Activo` con indicador pulsante o `Inactivo`) y el sexo (`Macho` / `Hembra` con iconos de `FaMars` y `FaVenus`).
    - **Panel Rápido de Métricas**: Cuadrícula de 2x2 con tarjetas para *Peso Actual*, *Edad Estimada*, *Finca Asignada* y *Genética*.
    - **Ficha Técnica Estilizada**: Módulo de datos estructurado en tarjetas individuales con micro-etiquetas en mayúsculas, tipografía robusta e iconografía SVG (`IdCard`, `Building2`, `Calendar`, `Palette`, `Dna`, `HeartHandshake`).
    - **Mini-tarjetas Interactivas de Genealogía Directa**: Las tarjetas de Padre y Madre ahora muestran el número de arete, raza y enlace directo interactivo con icono `ArrowUpRight` para saltar al perfil del progenitor. Si no están registrados, muestra un estado limpio y discreto.
    - **Botón de Edición Profesional**: Estilizado con color verde corporativo (`#1B4820`), respuesta táctil con `active:scale-95` y disposición responsiva tanto en barra fija de escritorio como en botón de acción móvil.

---

## [1.2.5-ui-navel-length-input] - 2026-09-11

### Modificado
- **Longitud del Ombligo como Campo de Texto Restringido del 1 al 9 ([`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - Implementado como un campo de texto con `inputMode="numeric"` y `maxLength={1}`, que bloquea a nivel de teclado (`onKeyDown`) e inserción (`onChange`) cualquier caracter que no sea un número entre el **1 y el 9**.
  - Validación con esquema Zod que garantiza que el valor solo pueda ser un dígito entre 1 y 9 o quedar vacío si no se especifica.
  - Integrada la detección de datos del ombligo en el badge reactivo de estado del acordeón de nacimiento (`hasBirthData`), activando el indicador "Con datos" al ingresar un valor válido.
  - Actualizado [`EventForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/EventForm.jsx) para sincronizar las opciones de Largo Viril/Ombligo del 1 al 9 en los eventos de crecimiento y evolución.

---

## [1.2.4-fix-edit-modal-and-birth-icon] - 2026-09-11

### Corregido y Modificado
- **Corrección de Apilamiento (Z-Index) en Modales ([`BottomSheet.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/BottomSheet.jsx))**:
  - Resuelto el problema donde al abrir el modal de edición de animal ("Editar Animal" desde el perfil), la pantalla se difuminaba completamente y bloqueaba cualquier interacción.
  - La causa era que el contenedor del modal no contaba con un `z-index` base asignado (quedando en `auto` / 0), mientras que el backdrop con `backdrop-blur-xs` se renderizaba con `z-index: 49`, colocándose por encima del modal e interceptando todos los clics.
  - Se implementó la asignación dinámica obligatoria `baseZIndex` (50 por defecto) para el contenedor y `baseZIndex - 1` (49) para el backdrop, garantizando que el modal siempre se posicione física y visualmente por encima de su difuminado.
  - En [`PerfilAnimal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/PerfilAnimal.jsx), se ajustó el z-index de la pila recursiva `modalStack` a `60 + index * 10` para apilar correctamente los modales de creación de progenitores sobre el modal de edición base.
- **Icono de Evento Nacimiento ([`AnimalForm.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/AnimalForm.jsx))**:
  - Sustituido el icono genérico de bebé (`Baby`) por el icono de ganado vacuno [`GiCow`](https://react-icons.github.io/react-icons/icons/gi/) de `react-icons/gi`, alineándose con la temática ganadera y guardando total consistencia con el resto del módulo de reproducción y partos.

---

## [1.2.3-ui-animal-form] - 2026-09-11

### Agregado y Modificado
- **Rediseño Integral del Formulario de Registro y Edición de Animales**:
  - **Ubicación de Raza y Genética**: La sección de "Raza y Genética" ahora se sitúa **debajo** de la selección de progenitores (Genealogía: Padre y Madre), respetando la relación causa-efecto del linaje.
  - **Cálculo y Desaparición de Recomendación Genética**:
    - Al seleccionar padre y madre con datos raciales, el sistema calcula automáticamente la herencia genética sugerida.
    - Al hacer clic en **"Aplicar"** (o descartar mediante `X`), la sugerencia **desaparece inmediatamente** con una transición fluida soportada por `AnimatePresence`.
  - **Gestión Especial para Animales Mestizos**:
    - Si la raza es "Mestizo", se elimina el slider y selector numérico de pureza individual. En su lugar se despliega la composición proporcional exacta del cruce (`breed_composition`) heredada de los padres (ej. *50% Brahman · 50% Holstein*).
    - Para razas puras, se conserva el slider y selector de pureza genética interactivo.
  - **Selectores de Genealogía Fluidos (`GenealogySelector.jsx`)**:
    - Menús desplegables con animación elástica de entrada y salida (`AnimatePresence` + `motion.div`).
    - Búsqueda en tiempo real por número de arete/código, con chips de raza y color en cada opción del catálogo.
    - Botón de borrado rápido (`X`) y `cursor-pointer` en todos los disparadores.
  - **Animación del Modal de Progenitores (`BottomSheet.jsx`)**:
    - Reconfiguración de físicas de animación a resorte (`spring` con mayor amortiguación y elasticidad).
    - Despliegue optimizado tanto en versión Bottom Sheet móvil como en modal centrado de escritorio.
    - Fondo con desenfoque de cristal (`backdrop-blur-xs`) y soporte de z-index anidado.
  - **Acordeones Dinámicos para Secciones Extensas (Nacimiento, Destete y Servicio)**:
    - Secciones largas ahora son colapsables con animaciones suaves de altura y desvanecimiento.
    - Badges de estado dinámico ("Con datos" / "Opcional" / "Asignado") para inspección rápida sin saturar la pantalla.
    - Layout responsivo optimizado (`grid grid-cols-1 sm:grid-cols-2 gap-4`) para máxima comodidad en tablets y pantallas grandes.
  - **Interfaz Profesional 100% Vectorial (Cero Emojis)**:
    - Sustitución de emojis por iconografía SVG estructurada de `lucide-react` (`Dna`, `Baby`, `Milk`, `Scale`, `Building2`, `Sparkles`, `Plus`, `X`, `Save`).
    - Adición estricta de `cursor-pointer` en todos los botones, controles, headers y selectores.

---

## [1.2.2-ui-batch-mode] - 2026-09-11

### Modificado
- **Ajustes en Vacunación por Lotes**:
  - **Simplificación del Título**: Eliminada la palabra redundante "Modo", pasando de "Modo Vacunación por Lotes" a **"Vacunación por Lotes"** en el banner flotante superior.
  - **Alineación a la Izquierda en Móvil**: En la barra inferior de acción ([`Inventario.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/pages/Inventario.jsx)), el indicador y contador de animales seleccionados ahora se alinea a la izquierda (`items-start` y `text-left`) con padding optimizado (`px-4 sm:px-6`), eliminando el espacio en blanco vacío que quedaba en pantallas móviles y ofreciendo una lectura mucho más natural.

---

## [1.2.1-sync-reconciliation] - 2026-09-10

### Corregido
- **Sincronización Bidireccional de Eliminaciones (Supabase -> Dexie)**:
  - Resuelto el problema donde eliminar una finca (o cualquier registro) directamente en Supabase o panel administrativo no se reflejaba localmente hasta cerrar e iniciar sesión nuevamente.
  - En [`src/lib/syncUtils.js`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/lib/syncUtils.js):
    - **Reconciliación de IDs del Servidor**: Nueva función `fetchAllServerIds` que consulta de forma paginada todos los IDs y estados `deleted_at` activos en Supabase para el usuario.
    - **Detección de Eliminaciones Físicas (Hard Delete)**: Si un registro existía en Dexie pero fue borrado físicamente en Supabase (ej. desde el Table Editor), se elimina automáticamente de Dexie con `bulkDelete`, actualizando al instante los hooks reactivos `useLiveQuery` en la UI.
    - **Propagación de Borrado Lógico (Soft Delete)**: Si un registro en Supabase fue marcado con `deleted_at` sin actualizar su `updated_at`, la reconciliación detecta el estado y actualiza Dexie en bloque.
    - **Protección de Datos Offline**: Se mapean previamente todos los IDs presentes en `sync_queue` para asegurar que ningún registro creado o editado sin internet sea eliminado antes de haber sido subido a la nube.
    - **Respaldo Forzado Seguro**: En `forceFullResync()`, se procesa primero la cola de subida (`processSyncQueue`) antes de retroceder la marca temporal de sincronización, blindando las operaciones locales pendientes.

---

## [1.2.0-ui-inventario] - 2026-09-10

### Agregado
- **Animaciones Suaves de Apertura y Cierre en Modales**:
  - En [`FarmModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/FarmModal.jsx) y [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx), se encapsuló la renderización condicional con `<AnimatePresence>` y `motion.div`, garantizando transiciones elásticas suaves y desvanecimiento de fondo tanto al abrir como al cerrar los modales.
- **Mejoras en Selectores Flotantes y Modal de Ordeño**:
  - En [`CustomSelect.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/ui/CustomSelect.jsx):
    - El menú desplegable ahora es **flotante absoluto (`absolute`)**, evitando que al abrirse expanda o deforme la altura del modal.
    - Animaciones suaves de apertura y cierre con `AnimatePresence` y `motion.div`.
    - Soporte para buscador interno (`searchable={true}`) y cierre automático al hacer clic fuera del componente.
  - En [`MilkingModal.jsx`](file:///C:/Users/joses/appganadera/App-ganadera-v2/src/components/inventario/MilkingModal.jsx):
    - El selector de vaca ahora incluye buscador en tiempo real para encontrar rápidamente animales por código o raza.
    - El input de fecha de ordeño ahora tiene el **mismo diseño, bordes, padding y tipografía** que los demás inputs del formulario.
    - Cierre suave de selects con transiciones fluidas.
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
