# FinSight AI Full-Stack App

A full-stack personalized AI-powered financial report generator using FastAPI, Google Gemini, pdfplumber, and Tesseract OCR.

## Prerequisites

1. **Python 3.10+**
2. **Tesseract OCR System Dependency**:
   - macOS: `brew install tesseract`
   - Linux: `sudo apt-get install tesseract-ocr`
   - Windows: Download installer from [UB-Mannheim/tesseract](https://github.com/UB-Mannheim/tesseract/wiki) and ensure it's in your system PATH.

## Setup Instructions

1. Clone or download this directory.
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.template` to `.env` and insert your API keys:
   ```bash
   cp .env.template .env
   ```
   *Edit `.env` and set your `GEMINI_API_KEY`.*
4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```
5. Open your browser and navigate to:
   [http://localhost:8000](http://localhost:8000)

## Features
- **Intelligent Prompt Building**: Fuses user profile inputs and fact sheet text to provide contextual advice.
- **Robust Factsheet Parsing**: Uses `pdfplumber` with fallback to `pytesseract` for scanned PDFs and images.
- **Glassmorphism UI**: Uses vanilla HTML/CSS/JS with a beautiful dark theme tailored for institutional data.
- **Graceful Error Handling**: Retries API failures and displays intuitive error messages on the frontend.
