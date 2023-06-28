# -*- coding: utf-8 -*-
import nltk , jieba
import os , time ,logging
import pandas as pd
import numpy as np
import jieba.analyse as analyse
from sklearn import preprocessing
from gensim import corpora, models, similarities
from sklearn.metrics import f1_score , precision_score , recall_score ,accuracy_score
from sklearn.feature_extraction.text import CountVectorizer , TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.decomposition import PCA,NMF

from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB

TEST_PATH =                       "./corpus/COLDataset-main/COLDataset/test.csv"
TRAIN_PATH =                      "./corpus/COLDataset-main/COLDataset/train.csv"
CORPUS_PATH =                     "./corpus/COLDataset-main/COLDataset/train.csv"
STOP_WORD_PATH =                  "./res/stopwords/scu_stopwords.txt"

WORD2VEC_MODEL_PATH =             "./mod/tencent.model"
TFIDF_MODEL_PATH =                "./mod/tf-idf.model"

def min_max_normalization(np_array):
    min_max_scaler = preprocessing.MinMaxScaler()
    ret = min_max_scaler.fit_transform(np_array)
    return ret

def create_model (X_train, X_test, Y_train, Y_test):
    clf = RandomForestClassifier()
    # clf = LogisticRegression(max_iter=3000)
    clf.fit(X_train, Y_train)
    Y_pred = clf.predict(X_test)

    print( "准确率 (Acc): {}\n精确率 (Pre): {}\n召回率 (Rec): {}\nF1值   (F1) : {}".format(
        round(accuracy_score(Y_test, Y_pred),4),
        round(precision_score(Y_test, Y_pred),4),
        round(recall_score(Y_test, Y_pred),4),
        round(f1_score(Y_test, Y_pred),4),
        ))
    return clf

def get_stopwords():
    # stop_words = nltk.corpus.stopwords.words('chinese')
    with open(STOP_WORD_PATH ,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

# 输入为句子列表，输出为由空格和词语连接的纯中文句子列表
def data_preprocess(txts:list , stop_words:list):
    res = []
    m1 = map(lambda s: s.replace(' ', ''), txts)
    for i in m1:
        sentence = ''
        for uchar in i:
            if (uchar >= u'\u4e00' and uchar <= u'\u9fa5'):
                sentence += uchar
        buf = jieba.lcut(sentence)
        seg_list = []
        for word in buf:
            if word not in stop_words:
                seg_list.append(word)
        # res.append( ' '.join(seg_list) )
        res.append(seg_list)
    return res

def sentence_word2vec(txts:list):
    '''
    获取句子的word2vec特征向量集
    '''
    model =  models.KeyedVectors.load(WORD2VEC_MODEL_PATH)
    print("加载word2vec模型成功")
    buf = []
    zero_vec = np.zeros(200)
    for sentence in txts:
        sentence_vec = []
        for word in sentence:
            try:
                # sentence_vec.append(model.wv[word])
                sentence_vec.append(model[word])
            except:
                sentence_vec.append(zero_vec)
                pass
        buf.append(sentence_vec)

    print("句子填充完毕")
    return buf



if __name__ == '__main__':

    jieba.setLogLevel(logging.INFO)

    df_corpus = pd.read_csv(CORPUS_PATH,encoding='utf-8',usecols=["label", "TEXT"])

    data = df_corpus["TEXT"].to_list()
    label = df_corpus["label"].to_list()

    print("语料库读取完毕")

    data = data_preprocess(data , get_stopwords())

    print("文本清洗格式化完毕")

    dic = corpora.Dictionary(data)
    corpus = [dic.doc2bow(doc) for doc in data]
    tfidf_model = models.TfidfModel(corpus)
    tfidf_matrix_gensim = tfidf_model[corpus]
    
    vec = sentence_word2vec(data)
    dtm = []

    for sentence_tfidf , sentence_vec in zip(tfidf_matrix_gensim , vec):
        res = np.zeros(200)
        for word_tfidf , word_vec in zip(sentence_tfidf , sentence_vec):
            res += word_tfidf[1] * word_vec
        dtm.append(res)

    # for sentence in vec:
    #     # 累加词向量
    #     sentence_vec = sum(sentence)/len(sentence)
    #     dtm.append(sentence_vec)

    dtm = np.asarray(dtm)
    # dtm = min_max_normalization(dtm)

    x_train,x_text,y_train,y_test = train_test_split(
        dtm, label , 
        test_size=0.3, random_state=7
        )


    print("开始训练模型--")
    create_model(x_train,x_text,y_train,y_test)

