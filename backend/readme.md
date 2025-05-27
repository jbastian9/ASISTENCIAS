# 🚀 Backend - Base FastAPI + SQLAlchemy + Celery

Este directorio contiene la lógica del backend de la aplicación, desarrollada con **FastAPI** y organizada para escalar de forma modular y mantenible. Incluye soporte para autenticación, tareas en segundo plano, WebSockets y validación de datos.

---

## ⚙️ Tecnologías principales

- **FastAPI**: Framework para construir APIs RESTful modernas y asincrónicas.
- **SQLAlchemy 2.0 + Alembic**: ORM para gestión de base de datos y migraciones.
- **Pydantic**: Validación de datos y tipado estricto.
- **Celery + Redis**: Tareas asíncronas en segundo plano.
- **WebSockets**: Comunicación en tiempo real.
- **JWT / OAuth2**: Seguridad y autenticación.
- **Pytest + HTTPX**: Pruebas automatizadas.
- **Pre-commit + Black + Isort + Flake8**: Estilo de código y análisis estático.

---

## 📁 Estructura de carpetas

```bash
backend/
├── core/            # Configuración general y utilidades
│   ├── config.py        # Carga de variables de entorno
│   ├── settings.py      # Configuración global (Pydantic)
│   ├── logging.py       # Configuración de logs
│   └── security.py      # Seguridad (JWT, OAuth2)
│
├── db/              # Configuración de base de datos
│   ├── base.py          # Declaración de modelos base SQLAlchemy
│   ├── session.py       # Sesión DB
│   └── init_db.py       # Inicialización opcional de datos
│
├── routes/          # Rutas principales del API
│   ├── __init__.py
│   └── api_router.py    # Router raíz
│
├── schemas/         # Validaciones con Pydantic
│   └── __init__.py
│
├── services/        # Lógica de negocio (correo, usuarios, etc.)
│   └── __init__.py
│
├── tasks/           # Tareas Celery
│   └── worker.py        # Worker base
│
├── sockets/         # WebSockets
│   └── websocket.py     # Ejemplo base
│
├── alembic/         # Migraciones de base de datos
│
├── static/          # Archivos estáticos servidos por FastAPI
├── uploads/         # Archivos subidos por usuarios
│
├── tests/           # Pruebas automatizadas
│   ├── unit/            # Pruebas unitarias
│   ├── integration/     # Pruebas de integración
│   └── conftest.py      # Fixtures de Pytest
│
├── main.py          # Punto de entrada FastAPI
├── requirements.txt # Dependencias del proyecto
└── readme.md        # Este archivo
```

### ✅ Buenas prácticas

- Mantén la lógica separada por responsabilidades:
  - `routes/` para controladores
  - `services/` para lógica de negocio
  - `schemas/` para validaciones
  - `tasks/` para procesos en segundo plano
- Utiliza **tipado estricto** con Pydantic y Python 3.11+.
- Usa `pre-commit` para asegurar calidad de código antes de cada commit.
- Cada nueva funcionalidad debe incluir:
  - Rutas (`routes/`)
  - Esquemas (`schemas/`)
  - Servicios (`services/`)
  - Pruebas (`tests/`)

---

### 📦 Scripts disponibles

```bash
# Instalación de dependencias
pip install -r requirements.txt

# Correr el servidor de desarrollo
uvicorn main:app --reload

# Ejecutar tests
pytest

# Linter y formato
black .                      # Formatear código
isort .                      # Ordenar imports
flake8 .                     # Revisión de estilo
pre-commit run --all-files   # Ejecutar todos los hooks

# Migraciones Alembic
alembic init alembic                         # (solo una vez)
alembic revision --autogenerate -m "mensaje"
alembic upgrade head
```
