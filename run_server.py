import os
import sys
import subprocess

target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "finSight-ai"))
os.chdir(target_dir)

print(f"Installing requirements in {target_dir}...")
subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)

print("Starting server...")
subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--port", "8000"])
