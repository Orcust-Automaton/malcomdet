from pydantic import BaseModel

class Comment(BaseModel):
    text: str
    length: int

class Comments(BaseModel):
    texts: list

class Data(BaseModel):
    attack: int
    feature: str

class SingleRes(BaseModel):
    code: int
    data: Data

class BarTop(BaseModel):
    name:str
    num:int

class BarComments(BaseModel):
    tid:int
    num:int

class updateComment(BaseModel):
    type:int
    text:str
    attack:int

class addComments(BaseModel):
    data:list
    type:int

class delComment(BaseModel):
    idx:int

class listComment(BaseModel):
    current:int
    pageSize:int
    text:str
    attack:int
    

class user(BaseModel):
    username: str
    password: str