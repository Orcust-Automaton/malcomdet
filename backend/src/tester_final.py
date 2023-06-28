import joblib
import jieba
import rich.progress
from rich.progress import track
import pandas as pd
import base64
import codecs
import logging
from random import shuffle
from sklearn.metrics import f1_score , precision_score , recall_score ,accuracy_score

TEST_PATH =                       "../components/res/corpus/test1.csv"
STOP_WORD_PATH        =           "../components/res/stopwords/scu_stopwords.txt"
BAN_DICT_PATH         =           "../components/res/badwords/pub_sms_banned_words.txt"

SKLEARN_MODEL_PATH    =           "../components/mod/LOGI-Ngram.model"
FEATURE_DICT_PATH     =           "../components/mod/feature.txt"

ATTACK = 1
SAFE = 0

def get_badwords():
    with rich.progress.open(BAN_DICT_PATH,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()

    result = list(map(
        lambda x:codecs.decode(base64.b64decode(x ) , 'utf-8').replace("\n" , '') , res ))
    return result

def get_feature():
    with rich.progress.open(FEATURE_DICT_PATH,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

def get_stopwords():
    with rich.progress.open(STOP_WORD_PATH ,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

def data_preprocess(txts:list , stop_words:list , cut = True):
    '''
    将句子集合切分成词语集合
    '''
    res = []
    m1 = map(lambda s: s.replace(' ', ''), txts)
    for i in track( list(m1) , description="[red]文本清洗..."):
        sentence = ''
        for uchar in i:
            if (uchar >= u'\u4e00' and uchar <= u'\u9fa5'):
                sentence += uchar
        buf = jieba.lcut(sentence)
        seg_list = []
        for word in buf:
            if word not in stop_words:
                seg_list.append(word)
        if cut:
            res.append(seg_list)
        else:
            res.append( ' '.join(seg_list) )
    return res

def pack_data(data:list , label:list):
    dtm  = []
    for items ,label in track(
        list(zip(data , label)) , description="[red]输入处理..."):
        a = {}
        for item in items:
            if item in feature:
                a[item] = 'True'
        if label == ATTACK:
            buf = [a , ATTACK]
        else:
            buf = [a , SAFE]
        dtm.append(buf)
    return dtm


if __name__ == '__main__':

    jieba.setLogLevel(logging.INFO)
    [jieba.add_word(i) for i in get_badwords()]

    df_corpus = pd.read_csv(TEST_PATH,encoding='utf-8',usecols=["label", "TEXT"])

    data = df_corpus["TEXT"].to_list()
    label = df_corpus["label"].to_list()

    print("语料库读取完毕")

    data = data_preprocess(data , get_stopwords() )
    print("文本清洗格式化完毕，数据总量：{}条".format(len(data)))

    
    feature = get_feature()
    print("特征词读取完毕")

    dtm  = pack_data(data , label)
    print("文本处理完毕")

    shuffle(dtm)
    data,tag=zip(*dtm)

    model = joblib.load(SKLEARN_MODEL_PATH)
    pred = model.classify_many(data)

    print( "准确率 (Acc): {}\n精确率 (Pre): {}\n召回率 (Rec): {}\nF1值   (F1) : {}".format(
        round(accuracy_score(tag, pred),4),
        round(precision_score(tag, pred),4),
        round(recall_score(tag, pred),4),
        round(f1_score(tag, pred),4),
        ))