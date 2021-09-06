from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import ml_api

app = FastAPI(title="ShadowFax | Team Nodemon",
                description="API endpoints for Leap Hackathon",
                version="1.0")

origins = ['*']
app.add_middleware(CORSMiddleware, 
                allow_origins=origins, 
                allow_credentials=True, 
                allow_methods=["*"],
                allow_headers=["*"]
                )


app.include_router(ml_api.app, prefix = "/api/products", tags=["Routes for Product Recommendation"])

@app.get('/', include_in_schema=False)
async def home(request: Request):
    return {"message": "Server up and running", "status": 200}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)