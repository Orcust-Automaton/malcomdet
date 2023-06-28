# -*- coding: utf-8 -*-
import joblib
import jieba,logging
import rich.progress
import base64
import codecs

SKLEARN_MODEL_PATH    =            "./utils/mod/LOGI-Ngram.model"
FEATURE_DICT_PATH     =            "./utils/mod/feature.txt"

STOP_WORD_PATH        =            "./utils/res/stopwords/scu_stopwords.txt"
BAN_DICT_PATH         =            "./utils/res/badwords/pub_sms_banned_words.txt"

def get_feature():
    with rich.progress.open(FEATURE_DICT_PATH,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

def get_badwords():
    with rich.progress.open(BAN_DICT_PATH,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()

    result = list(map(
        lambda x:codecs.decode(base64.b64decode(x ) , 'utf-8').replace("\n" , '') , res ))
    return result

class Check:
    feature = []
    model = None

    def __init__(self):

        self.feature = get_feature()
        self.model = joblib.load(SKLEARN_MODEL_PATH)
        jieba.setLogLevel(logging.INFO)
        [jieba.add_word(i) for i in get_badwords()]

    def check ( self, text:str):
        # 文本预处理
        sentence = ''
        s = text.replace(' ', '')

        for uchar in s:
            if (uchar >= u'\u4e00' and uchar <= u'\u9fa5'):
                sentence += uchar
        res = jieba.lcut(sentence)

        test = {}

        for i in res:
            if i in self.feature:
                test[i] = 'True'

        x = self.model.classify(test)
        return x , ' '.join(test)
    
    def checks(self , texts:list):
        sentences = []
        for i in texts:
            sentence = ""
            s = i.replace(' ', '')
            for uchar in s:
                if (uchar >= u'\u4e00' and uchar <= u'\u9fa5'):
                    sentence += uchar
            res = jieba.lcut(sentence)
            test = {}
            for i in res:
                if i in self.feature:
                    test[i] = 'True'
            sentences.append(test)
        
        x = self.model.classify_many(sentences)
        x = map(lambda x:int(x), x)
        res = map( lambda x:' '.join(x) , sentences )
        res = list(zip(x , res))
        key = ["attack" , "feature"]
        result = list(map( lambda x : zip(key , x) , res ))

        return result



