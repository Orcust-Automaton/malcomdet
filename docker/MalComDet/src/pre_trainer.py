# -*- coding: utf-8 -*-
import nltk , jieba
import os , time ,logging
import pandas as pd
import numpy as np
import jieba.analyse as analyse
from gensim import corpora, models, similarities
from sklearn.metrics import f1_score , precision_score , recall_score ,accuracy_score
from sklearn.feature_extraction.text import CountVectorizer , TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.decomposition import PCA,NMF

from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB

TFIDF_DIC_PATH =                  "./mod/tf-idf.dic"
TFIDF_MODEL_PATH =                "./mod/tf-idf.model"
TFIDF_CORPUSE_PATH =              "./mod/corpuse.mm"
WORD2VEC_MODEL_PATH =             "./mod/w2v.model"
TRAIN_PATH =                      "./corpus/COLDataset-main/COLDataset/train.csv"
CORPUS_PATH =                     "./corpus/COLDataset-main/COLDataset/train.csv"
STOP_WORD_PATH =                  "./res/stopwords/scu_stopwords.txt"

def get_stopwords(path = STOP_WORD_PATH):
    # stop_words = nltk.corpus.stopwords.words('chinese')
    with open(path ,'r',encoding= 'utf8') as f:
        res = f.read().splitlines()
        f.close()
    return res

# 输入为句子列表，输出为由空格和词语连接的纯中文句子列表
def data_preprocess(txts:list , stop_words:list , cut = True):
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
        if cut:
            res.append(seg_list)
        else:
            res.append( ' '.join(seg_list) )
    return res


if __name__ == '__main__':
    jieba.setLogLevel(logging.INFO)

    df_train = pd.read_csv(CORPUS_PATH,encoding='utf-8',usecols=["label", "TEXT"])
    
    data_train = df_train["TEXT"].to_list()
    label_train = df_train["label"].to_list()

    print("语料库读取完毕")

    data_train = data_preprocess(data_train , get_stopwords())

    print("文本清洗格式化完毕")

    dic = corpora.Dictionary(data_train)
    corpus = [dic.doc2bow(doc) for doc in data_train]
    tfidf_model = models.TfidfModel(corpus)
    
    tfidf_model.save(TFIDF_MODEL_PATH)
    corpora.MmCorpus.serialize(TFIDF_CORPUSE_PATH , corpus)
    dic.save(TFIDF_DIC_PATH)

    # tfidf_model = models.TfidfModel.load(TFIDF_MODEL_PATH)
    # tfidf_matrix_gensim = tfidf_model[corpus]

    print("TF-IDF模型保存成功")

    w2v_model = models.Word2Vec(data_train ,vector_size=200 , window=10 )
    w2v_model.save(WORD2VEC_MODEL_PATH)
    
    print("WORD2VEC模型保存成功")


