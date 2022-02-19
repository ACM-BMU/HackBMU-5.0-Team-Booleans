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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/score')
def get_form(request: Request):
    result = "check your score"
    return  result


@app.post('/score')
async def post_form(request: Request, thres_hold: int = None, format: str = None, assignmentID: str = None):
    os.mkdir(assignmentID)
    arr = await request.json()
    download.download(arr ,assignmentID)
    result = score.check_plagiarism(assignmentID, thres_hold,format)
    shutil.rmtree(assignmentID)
    return {"result" : result}
