import uvicorn
from fastapi import FastAPI
from routes.api_router import api_router
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app = FastAPI(title=settings.APP_NAME)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.POSTGRES_PORT, reload=True)