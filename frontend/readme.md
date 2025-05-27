# 📦 Frontend - Base Vue.js 3 + Vuetify 3

Este directorio contiene el código fuente del frontend del proyecto, construido con **Vue.js 3**, **Composition API** y **Vuetify 3**. La estructura está pensada para escalar, mantener una arquitectura limpia y cumplir con los siguientes requisitos técnicos:

## 🚀 Tecnologías principales

- **Vue.js 3 + Composition API**: Framework principal de la SPA.
- **Vuetify 3**: Componentes UI basados en Material Design.
- **Vue Router**: Manejo de rutas.
- **Pinia**: Manejo de estado global.
- **Axios**: Cliente HTTP para llamadas a APIs.
- **Socket.IO**: Comunicación en tiempo real mediante WebSockets.
- **Vitest + Cypress**: Pruebas unitarias y end-to-end.
- **ESLint + Prettier**: Estilo de código y formateo automático.

---

## 📁 Estructura de carpetas

```bash
frontend/
├── public/            # Archivos públicos (index.html, favicon, etc.)
├── src/
│   ├── assets/        # Imágenes, fuentes, estilos globales
│   │   └── styles/    # Archivos SCSS/CSS globales (ej. variables, resets)
│
│   ├── components/    # Componentes UI reutilizables
│   │   ├── layout/    # Header, Footer, Sidebar, NavBar
│   │   └── ui/        # Botones, inputs, tarjetas, etc.
│
│   ├── composables/   # Hooks reutilizables (Composition API)
│
│   ├── layouts/       # Layouts de página (Dashboard, Auth, etc.)
│   │   └── DashboardLayout.vue
│
│   ├── views/         # Vistas que se usan en el router
│   │   ├── Dashboard.vue    # Página principal (visible por defecto)
│   │   └── [personalizar]/       # Subcarpetas para vistas organizadas por módulos
│   │           └── Colores.vue
│   │           └── Fuentes.vue
│   │           └── Estructura.vue
│
│   ├── router/        # Configuración de rutas (Vue Router)
│   │   └── index.js
│
│   ├── store/         # Manejo de estado (Pinia)
│   │   └── index.js
│
│   ├── services/      # Lógica de comunicación con APIs y sockets
│   │   └── api.js
│   │   └── socket.js
│
│   ├── tests/         # Pruebas automatizadas
│   │   ├── unit/      # Pruebas unitarias (Vitest)
│   │   └── e2e/       # Pruebas end-to-end (Cypress)
│
│   ├── App.vue        # Componente raíz de Vue
│   ├── main.js        # Punto de entrada de la aplicación
│   └── env.d.ts       # Tipado para variables de entorno
│
├── .eslintrc.js       # Reglas de estilo con ESLint
├── .prettierrc        # Configuración de formateo con Prettier
├── vite.config.js     # Configuración de Vite
├── package.json       # Dependencias, scripts y configuración del proyecto
└── readme.md          # Este archivo
```

### ✅ Buenas prácticas

- Sigue las convenciones de nombres:
  - `PascalCase` para componentes (`MyComponent.vue`)
  - `camelCase` para stores y composables (`useUserStore`, `useApi`)
- Utiliza **Composition API** con `<script setup>` en todos los componentes nuevos.
- Organiza las vistas por dominio o módulo dentro de `views/`.
- Usa `pre-commit` con **ESLint** y **Prettier** antes de cada push para mantener calidad de código y consistencia.

### 📦 Scripts disponibles

```bash
npm install         # Instalar dependencias
npm run dev         # Iniciar el servidor de desarrollo
npm run lint        # Ejecutar ESLint (análisis estático de código)
npm run format      # Formatear el código con Prettier
npm run test:unit   # Ejecutar pruebas unitarias (Vitest)
npm run test:e2e    # Ejecutar pruebas end-to-end (Cypress)
pre-commit run --all-files  # Ejecutar hooks pre-commit manualmente sobre todos los archivos
```
