import sqlite3


INTERFACE = 1
SIPDER = 2
CHECKER = 3

DB_PATH = './utils/db/log.db'

def init() -> None:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    sql_text1 = "CREATE table  NOT EXISTS comments(id INTEGER PRIMARY KEY AUTOINCREMENT,type INTEGER ,text varchar(500),attack INTEGER DEFAULT 0,time timestamp not null default (datetime('now','localtime')));"
    sql_text2 = "CREATE table  NOT EXISTS types(id INTEGER PRIMARY KEY , var varchar(20));"
    sql_text3 = "INSERT INTO types (id,var) VALUES (?,?)"

    types = [ 
        (1 , "interface"),
        (2 , "spider"),
        (3 , "checker"),
    ]

    try:
        cur.execute(sql_text1)
        cur.execute(sql_text2)
        cur.executemany(sql_text3, types)
    except:
        print("Create table failed")

    conn.commit()
    cur.close()
    conn.close()


def add_comments(data , type) -> None:
    
    data = map(lambda x:(type , x[0] , x[1] ) , data)
    add_data = []
    for i in data:
        if(len(i[1]) > 2):
            add_data.append(i)

    if(add_data.__len__() < 1):
        return

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    sql_text = "INSERT INTO comments (type,text,attack) VALUES (?,?,?)"

    res = cur.executemany(sql_text, add_data)
    print(res.rowcount)
    conn.commit()
    cur.close()
    conn.close()

def updata_comments(type,text,attack):
    conn = sqlite3.connect(DB_PATH)

    sql_text1 = "SELECT * from comments WHERE text = ? "
    sql_text2 = "INSERT INTO comments (type,text,attack) VALUES (?,?,?)"
    sql_text3 = "UPDATE comments SET attack = ? WHERE text = ?"
    sql_text = ''
    arg = (text,)
    cur = conn.execute(sql_text1 ,arg )
    res = False if len(cur.fetchall()) == 0 else True
    cur.close()
    
    if res:
        arg = (attack,text)
        sql_text = sql_text3
    else:
        arg = (type,text , attack)
        sql_text = sql_text2
    
    cur = conn.cursor()
    cur.execute(sql_text,arg)
    conn.commit()
    cur.close()
    conn.close()

def listToJson(lst):
    keys = ["idx" , "type" , "text" , "attack" , "time"]
    list_json = dict(zip(keys, lst))
    return list_json

def show_comments() -> None:
    
    conn = sqlite3.connect(DB_PATH)
    sql_text = "SELECT * FROM comments"
    cur = conn.execute(sql_text)

    values = cur.fetchall()
    res = list(map( lambda x:listToJson(x) , values ))[::-1]

    cur.close()
    conn.close()
    return res

def list_comments(current , pageSize , text , attack) -> None:
    
    conn = sqlite3.connect(DB_PATH)
    sql_text = "SELECT * FROM comments WHERE text like ? ORDER BY ID DESC LIMIT ?,?"
    sql_text1 = "SELECT * FROM comments WHERE text like ? AND attack = ? ORDER BY ID DESC LIMIT ?,?"
    sql_text2 = "SELECT count(id) FROM comments WHERE text like ?"
    sql_text3 = "SELECT count(id) FROM comments WHERE text like ? AND attack = ?"

    arg = ("%"+text+"%",(current - 1)*pageSize,pageSize)
    arg1 = ("%"+text+"%", attack, (current - 1)*pageSize,pageSize)
    arg2 = ("%"+text+"%",)
    arg3 = ("%"+text+"%", attack)
    n = 0

    if(attack == 2):
        cur = conn.cursor()
        cur.execute(sql_text2 , arg2)
        n = cur.fetchone()[0]
        cur.close()
        cur = conn.execute(sql_text,arg)
        
    else:
        cur = conn.cursor()
        cur.execute(sql_text3 , arg3)
        n = cur.fetchone()[0]
        cur.close()
        cur = conn.execute(sql_text1,arg1)

    values = cur.fetchall()
    res = list(map( lambda x:listToJson(x) , values ))

    cur.close()
    conn.close()
    return res,n

def delete_comments(idx):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    arg = (idx,)
    sql_text = "DELETE FROM comments WHERE id = ?"
    cur.execute(sql_text,arg)
    
    conn.commit()
    cur.close()
    conn.close()

def count_comments(sql_text = "SELECT count(id) FROM comments"):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute(sql_text)
    n = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return n


# data = [
#     ( "我是傻逼" ,0),
#     ( "你是傻逼" ,1)
# ]

# data = [
#     ( "我一步一步一步一步慢慢走向流沙" ,0),
# ]


# add(data , 2)


