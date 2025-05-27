<template>
  <div>
    <h1>Bienvenido al Dashboard</h1>
    <p>
      Esta es la estructura base recomendada para aplicar en todo nuevo aplicativo.
      Organiza tu proyecto separando backend, frontend, configuración, documentación y despliegue.
    </p>

    <div class="pre-container">
      <pre class="estructura">{{ estructura }}</pre>
    </div>
  </div>
</template>

<script setup>
const estructura = `
project-root/
├── docker/
│   ├── Dockerfile.backend  # Dockerfile para construir el backend (FastAPI)
│   └── Dockerfile.frontend # Dockerfile para construir el frontend (Vue.js)
├── docker-compose.yml     # Orquestación de servicios (backend, frontend, redis, etc.)
│
├── backend/               # Código backend (FastAPI)
├── frontend/              # Código frontend (Vue.js)
│
├── .env                   # Variables de entorno globales para backend y frontend
│
├── .gitignore             # Archivos y carpetas que Git debe ignorar
├── .pre-commit-config.yaml# Hooks pre-commit (Black, Isort, Flake8)
│
├── docs/                  # Documentación automática (Sphinx, MkDocs)
│   ├── mkdocs.yml         # Configuración para MkDocs (si se usa)
│   └── source/
│       ├── conf.py        # Configuración Sphinx
│       └── index.rst      # Entrada principal
└── readme.md              # Documentación principal del proyecto
`
</script>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
}
p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}
.pre-container {
  display: flex;
  justify-content: center;
}
.estructura {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  white-space: pre-wrap;
  line-height: 1.3;
  color: #333;
  max-width: 700px;
  overflow-x: auto;
  text-align: left;
}
</style>