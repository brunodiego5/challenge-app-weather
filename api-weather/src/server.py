import uvicorn

from main import app

if __name__ == "__main__":
    uvicorn.run("main:app", host="10.0.0.103", reload=True)