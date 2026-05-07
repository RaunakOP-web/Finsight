from pydantic import BaseModel, Field
from typing import List, Literal

class UserProfile(BaseModel):
    name: str
    age: int = Field(ge=18, le=75, description="Age must be between 18 and 75")
    monthly_income: float
    current_savings: float
    occupation: str
    goals: List[str]
    time_horizon_years: int
    risk_appetite: Literal["Conservative", "Moderate", "Aggressive"]
    drop_reaction: str
    target_corpus: float
