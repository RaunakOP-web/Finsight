from fastapi import APIRouter, UploadFile, File, HTTPException
from services.extractor_service import FactSheetExtractor

router = APIRouter()

@router.post("/extract-factsheet")
async def extract_factsheet(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large. Max 10MB.")
        
        filename = file.filename
        ext = filename.lower().rsplit('.', 1)[-1]
        if ext not in ['pdf', 'png', 'jpg', 'jpeg']:
            raise HTTPException(status_code=400, detail="Unsupported file extension.")
            
        extractor = FactSheetExtractor()
        text = extractor.extract(contents, filename)
        
        return {
            "extracted_text": text,
            "char_count": len(text),
            "method": "pdf_text" if ext == "pdf" else "ocr"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
