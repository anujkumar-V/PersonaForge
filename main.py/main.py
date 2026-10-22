from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="PersonaForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PersonaRequest(BaseModel):
    niche: str
    tone: str
    topic: str


@app.post("/generate")
def generate_persona(request: PersonaRequest):
    personas = [
        f"Master Scriptwriter & {request.niche} Specialist",
        f"Lead AI Content Strategist ({request.niche})",
        f"Senior Tech Journalist in {request.niche}",
    ]

    visuals = [
        f"Cinematic 3D avatar of a professional {request.niche} expert standing in a futuristic neon-lit studio, high detail, 8k resolution.",
        f"A sharp, charismatic expert in {request.niche} wearing smart casuals, sitting in front of multiple monitors displaying data streams.",
        f"Dramatic close-up shot of a {request.niche} specialist under moody cinematic lighting, cinematic depth of field.",
    ]

    scripts = [
        f"Welcome back creators! Today we are diving deep into {request.topic}. In this {request.tone} breakdown, we will uncover secrets that most people ignore. Let's decode everything step-by-step...",
        f"Have you ever wondered how {request.topic} actually works behind the scenes? In today's {request.tone} video, we shatter the myths and look at the raw engineering truth...",
        f"Stop scrolling! What you are about to witness regarding {request.topic} will completely change your perspective. Buckle up for a {request.tone} journey into the future...",
    ]

    return {
        "status": "success",
        "data": {
            "persona": random.choice(personas),
            "visual_prompt": random.choice(visuals),
            "generated_script": random.choice(scripts),
        },
    }
