from fastapi import FastAPI
from .routes.joke_routes import router as joke_router
from .middleware.auth_middleware import check_auth

app = FastAPI()

app.middleware('http')(check_auth)
app.include_router(joke_router, prefix="/jokes", tags=["jokes"])

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
