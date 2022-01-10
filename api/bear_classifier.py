from fastai.vision.widgets import *
from fastai.learner import load_learner
from pathlib import Path
import pathlib
import sys
# https://stackoverflow.com/questions/57286486/i-cant-load-my-model-because-i-cant-put-a-posixpath

def classify_bear(pathStr):
    temp = pathlib.PosixPath
    pathlib.PosixPath = pathlib.WindowsPath
    path = Path()
    path.ls(file_exts='.pkl')
    learn_inf = load_learner(path/'bear_classifier.pkl')
    pathlib.PosixPath = temp
    return learn_inf.predict(pathStr)

if __name__ == "__main__":
    print(classify_bear(sys.argv[1]))




