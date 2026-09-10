# Historial de Cambios - App Ganadera V2

Este documento registra de forma cronológica todas las modificaciones, mejoras, nuevas funcionalidades y correcciones aplicadas sobre la base del sistema PWA.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [Sin publicar / En desarrollo]

### Agregado
- *Espacio reservado para próximas funciones.*

### Modificado
- *Espacio reservado para mejoras y refactorizaciones.*

### Corregido
- *Espacio reservado para resolución de incidencias.*

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
