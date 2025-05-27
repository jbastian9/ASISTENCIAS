from pydantic import BaseSettings, Field, AnyHttpUrl

class Settings(BaseSettings):
    # App
    APP_NAME: str = Field(..., env="APP_NAME")

    # Database
    POSTGRES_DB: str = Field(..., env="POSTGRES_DB")
    POSTGRES_USER: str = Field(..., env="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(..., env="POSTGRES_PASSWORD")

    # Redis
    REDIS_HOST: str = Field("redis", env="REDIS_HOST")
    REDIS_PORT: int = Field(6379, env="REDIS_PORT")

    # JWT
    JWT_SECRET_KEY: str = Field(..., env="JWT_SECRET_KEY")
    JWT_ALGORITHM: str = Field("HS256", env="JWT_ALGORITHM")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(30, env="JWT_ACCESS_TOKEN_EXPIRE_MINUTES")

    # Email SMTP
    SMTP_HOST: str | None = Field(None, env="SMTP_HOST")
    SMTP_PORT: int | None = Field(None, env="SMTP_PORT")
    SMTP_USER: str | None = Field(None, env="SMTP_USER")
    SMTP_PASSWORD: str | None = Field(None, env="SMTP_PASSWORD")
    SMTP_USE_TLS: bool = Field(False, env="SMTP_USE_TLS")

    # Frontend URL para CORS
    FRONTEND_ORIGIN: AnyHttpUrl = Field(..., env="FRONTEND_ORIGIN")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()