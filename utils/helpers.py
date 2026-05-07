def format_inr(amount: float) -> str:
    """Formats a number to Indian Rupee representation"""
    try:
        s = str(int(amount))
        if len(s) > 3:
            s = s[:-3] + ',' + s[-3:]
            while len(s) > 6 and ',' not in s[:-6]:
                s = s[:-6] + ',' + s[-6:]
            return f"₹{s}"
        return f"₹{s}"
    except Exception:
        return f"₹{amount}"

def truncate_text(text: str, max_length: int = 4000) -> str:
    if len(text) > max_length:
        return text[:max_length] + "\n...[Content truncated due to length limits]..."
    return text
