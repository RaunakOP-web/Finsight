from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import report, extract

app = FastAPI(title="FinSight AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extract.router)
app.include_router(report.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "FinSight AI"}
