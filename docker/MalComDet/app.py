from fastapi import FastAPI
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses   import FileResponse
from utils.checker import Check
from utils.classes import *
from utils.spider  import *
from utils.logger  import *
import uvicorn , asyncio , os

app = FastAPI()
tck = Check()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app.mount("/dist", StaticFiles(directory=os.path.join(BASE_DIR, 'MalComDet/dist')), name="dist")
app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, 'MalComDet/dist/assets')), name="assets")
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, 'MalComDet/dist/static')), name="static")


def successResList(arg:list , total:int ):
    return {
        "code":0 , 
        "data":{
            "total": total,
            "list":[ i for i in arg ],
            },
        "message": '请求成功',
        "success": True
    }

def successResCheck(attack , feature):
    return {
        "code":0 , 
        "data":{
                "attack":str(attack),
                "feature" :feature
            },
        "message": '请求成功',
        "success": True
    }

def successRes(data):
    return {
        "code":0 , 
        "data":{
                "res":str(data),
            },
        "message": '请求成功',
        "success": True
    }

def successLogin( ):
    return {
        "code":0 , 
        "data":{
                "token": 'TOKEN123456789',
                "userInfo": {
                    "name": 'Niyah',
                    "avatar": 'http://niyah.cn/images/nia.jpg'
                }
            },
        "message": '请求成功',
        "success": True
    }

def errorLogin( ):
    return {
        "code":-1 , 
        "data":"",
        "message": '请求成功',
        "success": True
    }


@app.get("/api/comment/count/")
def countcomments():
    res = count_comments()
    return successRes(res)

@app.post("/api/comment/list/")
def showcomments(item:listComment):
    res, count= list_comments( item.current , item.pageSize ,item.text,item.attack)
    return successResList(res , count)

@app.post("/api/comment/delete/")
def deletecomments(item:delComment):
    delete_comments(item.idx)
    return successRes(1)

@app.post("/api/comment/update/")
def updatecomments(item:updateComment):
    updata_comments(item.type,item.text,item.attack)
    return successRes(1)

@app.post("/api/comment/add/")
def addcomments(item:addComments):

    add_comments(item.data,item.type)
    return successRes(1)

@app.post("/user/login/")
def userlogin(item:user):
    if (item.username == "admin" and item.password == "admin"):
        return successLogin()
    return errorLogin()

@app.post("/user/logout/")
def userlogout():
    return successRes(1)

@app.post("/api/tieba/top/")
def tiebatop(item:BarTop):
    res:list = asyncio.run(get_top(item.name , item.num))
    return successResList(res , len(res))

@app.get("/api/tieba/bar/")
def tiebabar():
    res:list = asyncio.run(get_bar())
    return successResList(res , len(res))

@app.post("/api/tieba/comments/")
def tiebacomments(item:BarComments):
    res:list = asyncio.run(get_all_comments(item.tid,item.num))
    return successResList(res , len(res))

@app.post("/api/textcheck/")
def textcheck(item:Comment):
    code = 0; attack = 0; feature = ''
    if int(item.length) > 1000 or int(item.length) == 0:
        code = -1
    else:
        attack , feature = tck.check(item.text)
    return successResCheck(attack,feature )

@app.post("/api/textscheck/")
def textscheck(item:Comments):
    res = tck.checks(item.texts)
    return successResList(res , len(res))

@app.get("/")
def root() -> FileResponse:
    return FileResponse('./dist/index.html')

if __name__ == '__main__':
    uvicorn.run(app = "app:app" , host='0.0.0.0' , port=8080 , reload=True)
