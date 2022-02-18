import requests
import os


def download(arr):
    for key in arr:
        student_id = key
        url = arr[key]
        r = requests.get(url) 
        temp = str(student_id) + ".txt"
        path = os.path.join("assigment",temp)
        with open(path,'wb') as f:
            f.write(r.content)

