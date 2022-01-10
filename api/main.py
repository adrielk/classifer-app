#Tutorial: https://fastapi.tiangolo.com/tutorial/first-steps/
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bear_classifier import classify_bear
import aiofiles
import os
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/")
async def root():
    # res = bear_classifier.classify_bear('5184.jpg')
    return {"message":"Welcome to the Image Classifier API!"}

@app.post("/classifybear/")
async def classify_bear_request(file:UploadFile=File(...)):
    async with aiofiles.open('predict-image.jpg', 'wb') as out_file:
        while content:=await file.read(1024):
            await out_file.write(content)
    
    res = classify_bear('predict-image.jpg')
    print(res)
    os.remove('predict-image.jpg')
    return {"class":res[0]}