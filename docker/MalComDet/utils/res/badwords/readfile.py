# -*- coding: utf-8 -*-
import joblib
import jieba
import rich.progress
import base64
import codecs

res = []

def get_badwords():
    with rich.progress.open('pub_sms_banned_words.txt','r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()

    result = list(map(
        lambda x:codecs.decode(base64.b64decode(x ) , 'utf-8').replace("\n" , '') , res ))

    return result
