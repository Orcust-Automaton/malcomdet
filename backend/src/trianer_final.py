# -*- coding: utf-8 -*-
import pandas as pd
import base64
import codecs
import joblib, jieba,logging,rich
import rich.progress
from random import shuffle
from rich.progress import track
from sklearn.metrics import f1_score , precision_score , recall_score ,accuracy_score
from sklearn.linear_model import LogisticRegression

from nltk.classify.scikitlearn import SklearnClassifier
from nltk.probability import FreqDist,ConditionalFreqDist
from nltk.metrics import BigramAssocMeasures

TRAIN_PATH            =           "../components/res/corpus/train.csv"
STOP_WORD_PATH        =           "../components/res/stopwords/scu_stopwords.txt"
BAN_DICT_PATH         =           "../components/res/badwords/pub_sms_banned_words.txt"

SKLEARN_MODEL_PATH    =           "../components/mod/LOGI-Ngram.model"
FEATURE_DICT_PATH     =           "../components/mod/feature.txt"

MAX_FEATURE = 20000
D_WORD_RATE = 0.2

ATTACK = 1
SAFE = 0

def create_nltk_model (classifier , train , data = None, tag = None ):
    '''
    训练 nltk 版本的机器学习模型
    '''
    print("模型训练中。。。")
    clf = SklearnClassifier(classifier)
    clf.train(train)

    if( data != None ):
        pred = clf.classify_many(data)

        print( "准确率 (Acc): {}\n精确率 (Pre): {}\n召回率 (Rec): {}\nF1值   (F1) : {}".format(
            round(accuracy_score(tag, pred),4),
            round(precision_score(tag, pred),4),
            round(recall_score(tag, pred),4),
            round(f1_score(tag, pred),4),
            ))
    return clf

def get_badwords():
    '''
    获取恶意词典
    '''
    with rich.progress.open(BAN_DICT_PATH,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()

    result = list(map(
        lambda x:codecs.decode(base64.b64decode(x ) , 'utf-8').replace("\n" , '') , res ))

    return result

def get_stopwords():
    '''
    获取停用词表
    '''
    with open(STOP_WORD_PATH ,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

def save_file(txts , file_name):
    '''
    将列表保存为文档文件
    '''
    with open(file_name , "w" ,encoding= 'utf8') as f:
        for i in track(txts, description="[red]文件写入..."):
            f.write(str(i) + '\n')
        f.close()

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


def doubel_words(txts:list):
    '''
    词语集合双词化
    '''
    total_word = FreqDist()
    res = []
    for txt in txts:
        buf = []
        for i in range(len(txt)-1):
            buf.append(txt[i] + txt[i+1])
            total_word[txt[i] + txt[i+1]] +=1
        res.append(buf)

    words = sorted(
        total_word.items(),
        key=lambda item: item[1],
        reverse=True
        )[:int(D_WORD_RATE*len(total_word.items()))]

    word_seg = list( map(lambda x:x[0] , words))

    result = []
    for items,txt in track(
        list(zip(res , txts)) , description="[red]双词提取..."):

        buf = []
        for item in items:
            if item in word_seg:
                buf.append(item)
        result.append(txt + buf)

    return result


def get_feature( txts:list, labels:list, number:int ):
    '''
    选出最优特征集
    '''
    personal = ['你','我','他','她','它','我们','你们','她们','他们','它们']
    # 选择特征集的时候由于卡方统计对人称代词的评价问题，需要手动加入人称代词

    total_word = FreqDist()
    con_total_word = ConditionalFreqDist()

    for txt,label in zip(txts , labels):
        if label == ATTACK:
            for word in txt:
                total_word[word] += 1
                con_total_word[ATTACK][word] += 1
        else:
            for word in txt:
                total_word[word] += 1
                con_total_word[SAFE][word] += 1

    atk_word_count = con_total_word[ATTACK].N()
    safe_word_count = con_total_word[SAFE].N()
    total_word_count = atk_word_count + safe_word_count

    word_scores = {}
    for word,freq in track(
        total_word.items() , description="[red]特征优化..."):

        atk_scores = BigramAssocMeasures.chi_sq(
            con_total_word[ATTACK][word] , (freq , atk_word_count) ,total_word_count)
        
        safe_scores = BigramAssocMeasures.chi_sq(
            con_total_word[SAFE][word] , (freq , safe_word_count) ,total_word_count)

        word_scores[word] = atk_scores + safe_scores
        best_vals=sorted(word_scores.items(),key=lambda item: item[1],
                         reverse=True)[:number]
        best_words=list(set([w for w,s in best_vals]))

    return best_words + personal

def pack_data(data:list , labels:list):
    '''
    模型输入格式化
    '''
    dtm  = []
    for items ,label in track(
        list(zip(data , labels)) , description="[red]输入处理..."):
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

    df_corpus = pd.read_csv(TRAIN_PATH,encoding='utf-8',usecols=["label", "TEXT"])

    data = df_corpus["TEXT"].to_list()
    label = df_corpus["label"].to_list()

    print("语料库读取完毕")

    data = data_preprocess(data , get_stopwords() ,cut=True)
    print("文本清洗格式化完毕，数据总量：{}条".format(len(data)))


    data = doubel_words(data)
    print("构造 2-gram 模型完毕")

    feature = get_feature(data , label , MAX_FEATURE)
    print("特征词构造完毕")

    save_file(feature ,FEATURE_DICT_PATH )
    print("特征词保存完毕")

    dtm  = pack_data(data , label)
    print("文本处理完毕")

    shuffle(dtm)
    train = dtm

    model = create_nltk_model(
        LogisticRegression ( max_iter= 5000 ) ,
        train
        )

    joblib.dump(model,SKLEARN_MODEL_PATH)