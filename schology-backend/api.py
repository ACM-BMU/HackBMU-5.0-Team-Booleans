from fastapi import FastAPI, Request,UploadFile, File
import shutil
import app as plag
from fastapi.middleware.cors import CORSMiddleware
import download as download
import os
import app as score
import shutil

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/score')
def get_form(request: Request):
    result = "download your file"
    return  result
    

@app.post('/score')
async def post_form(request: Request,thres_hold: int = None):
    os.mkdir("assignment")
    arr = await request.json()
    download.download(arr,thres_hold)
    result = score.check_plagiarism("assignment")
    shutil.rmtree("assignment")
    return {"result" : result}

