from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.prompt_builder import build_prompt
from services.gemini_service import generate_report

router = APIRouter()

class ReportRequest(BaseModel):
    profile: dict
    fact_sheet_text: str

@router.post("/generate-report")
async def create_report(request: ReportRequest):
    try:
        prompt = build_prompt(request.profile, request.fact_sheet_text)
        result = generate_report(prompt)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
