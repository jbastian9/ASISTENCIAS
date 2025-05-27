from celery import Celery
from core.config import settings

celery_app = Celery(
    settings.APP_NAME,
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0",
    backend=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0"
)

celery_app.conf.task_routes = {
    # rutas para tareas
}

@celery_app.task
def test_task():
    return "Task executed"