from fastapi import APIRouter
from routes import login

api_router = APIRouter()
api_router.include_router(login.router, prefix="/auth", tags=["auth"])
# Puedes agregar aquí otros routers, por ejemplo usuarios, items, etc.