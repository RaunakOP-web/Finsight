import os
import json
import logging
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path, override=True)

MODEL = 'llama-3.3-70b-versatile'

def generate_report(prompt: str) -> dict:
    api_key = os.getenv('GROQ_API_KEY')
    logger.info(f"Using Groq key ending in: ...{api_key[-6:] if api_key else 'NONE'}")

    client = Groq(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are FinSight AI, an elite financial advisor. Always respond with valid JSON only. No markdown, no explanation, no preamble."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            max_tokens=4096,
        )
    except Exception as e:
        logger.error(f"Groq API error: {e}")
        raise

    text = response.choices[0].message.content.strip()

    # Strip any markdown code fences
    if text.startswith('```'):
        text = text.split('```')[1]
        if text.startswith('json'):
            text = text[4:]
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Retry with explicit fix instruction
        retry = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a JSON repair assistant. Return ONLY valid JSON, nothing else."
                },
                {
                    "role": "user",
                    "content": f"Fix this invalid JSON and return ONLY the corrected JSON:\n{text}"
                }
            ],
            temperature=0.1,
            max_tokens=4096,
        )
        retry_text = retry.choices[0].message.content.strip()
        if retry_text.startswith('```'):
            retry_text = retry_text.split('```')[1]
            if retry_text.startswith('json'):
                retry_text = retry_text[4:]
        return json.loads(retry_text.strip())
