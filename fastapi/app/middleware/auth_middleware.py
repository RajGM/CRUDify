from fastapi import Request, HTTPException
from firebase_admin import auth

async def check_auth(request: Request, call_next):
    token = request.headers.get('Authorization')
    try:
        decoded_token = auth.verify_id_token(token)
        request.state.user = decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return await call_next(request)
