# Estructura General del Proyecto

## Estructura de carpetas

| Carpeta   | Propósito                                             |
| --------- | ----------------------------------------------------- |
| backend/  | Lógica y servicios de backend (FastAPI, Celery, etc.) |
| frontend/ | Aplicación cliente (Vue.js + Vuetify)                 |
| docker/   | Configuración de imágenes para backend y frontend     |
| docs/     | Documentación técnica (Sphinx, MkDocs)                |
| tests/    | Pruebas automatizadas                                 |

## Árbol general del proyecto

project-root/
├── docker/
│ ├── Dockerfile.backend # Dockerfile para construir el backend (FastAPI)
│ └── Dockerfile.frontend # Dockerfile para construir el frontend (Vue.js)
├── docker-compose.yml # Orquestación de servicios (backend, frontend, redis, etc.)
│
├── backend/ # Código backend (FastAPI)
├── frontend/ # Código frontend (Vue.js)
│
├── .env # Variables de entorno globales para backend y frontend
│
├── .gitignore # Archivos y carpetas que Git debe ignorar
├── .pre-commit-config.yaml # Hooks pre-commit (Black, Isort, Flake8)
│
├── docs/ # Documentación automática (Sphinx, MkDocs)
│ ├── mkdocs.yml # Configuración para MkDocs (si se usa)
│ └── source/
│ ├── conf.py # Configuración Sphinx
│ └── index.rst # Entrada principal
└── readme.md # Documentación principal del proyecto

--

Este repositorio contiene la estructura base para un sistema con backend en Python (FastAPI) y frontend en Vue.js, que puede ser replicada para nuevos proyectos, asegurando consistencia y buenas prácticas.

Se recomienda seguir los README específicos de cada carpeta (`backend/` y `frontend/`) para conocer detalles sobre la implementación, scripts disponibles y convenciones.

---

## Notas importantes

- La carpeta `docker/` contiene las configuraciones necesarias para crear las imágenes y levantar los servicios.
- Las variables sensibles y configuraciones específicas deben estar en el archivo `.env`.
- La carpeta `docs/` está preparada para alojar documentación técnica generada automáticamente.
- Los hooks de pre-commit aseguran el estilo y calidad del código antes de cada commit.

---
