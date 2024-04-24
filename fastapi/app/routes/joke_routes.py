from fastapi import APIRouter, Depends
from ..db.database import database
from ..models.joke import JokeModel  # Assume JokeModel is defined to match your database structure

router = APIRouter()

@router.get("/", response_model=list[JokeModel])
async def get_all_jokes():
    query = "SELECT * FROM jokes"
    jokes = await database.fetch_all(query)
    return jokes
