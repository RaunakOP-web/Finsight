import re

class FactSheetExtractor:

    def extract_from_pdf(self, file_bytes: bytes) -> str:
        import pdfplumber
        import io
        text_parts = []
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    text_parts.append(text)
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        if row:
                            text_parts.append('\t'.join([str(cell) if cell else '' for cell in row]))
        
        extracted = '\n'.join(text_parts)
        if len(extracted.strip()) < 100:
            return self._ocr_pdf(file_bytes)
        return self._clean(extracted)

    def _ocr_pdf(self, file_bytes: bytes) -> str:
        import pdfplumber
        import pytesseract
        import io
        from PIL import Image
        text_parts = []
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                img = page.to_image(resolution=200).original
                text = pytesseract.image_to_string(img, config='--psm 6')
                text_parts.append(text)
        return self._clean('\n'.join(text_parts))

    def extract_from_image(self, file_bytes: bytes) -> str:
        import pytesseract
        from PIL import Image, ImageFilter, ImageEnhance
        import io
        img = Image.open(io.BytesIO(file_bytes))
        img = img.convert('L')
        img = ImageEnhance.Contrast(img).enhance(2.0)
        img = img.filter(ImageFilter.SHARPEN)
        text = pytesseract.image_to_string(img, config='--psm 6')
        return self._clean(text)

    def extract(self, file_bytes: bytes, filename: str) -> str:
        ext = filename.lower().rsplit('.', 1)[-1]
        if ext == 'pdf':
            return self.extract_from_pdf(file_bytes)
        elif ext in ('png', 'jpg', 'jpeg'):
            return self.extract_from_image(file_bytes)
        else:
            raise ValueError(f'Unsupported file type: {ext}')

    def _clean(self, text: str) -> str:
        text = re.sub(r'\n{3,}', '\n\n', text)
        text = re.sub(r' {2,}', ' ', text)
        text = text.strip()
        if len(text) > 4000:
            text = text[:4000] + '\n...[truncated for length]'
        return text
