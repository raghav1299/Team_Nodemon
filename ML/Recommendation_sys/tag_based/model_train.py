import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
import pickle

def tfidf_processing(df_rec):
    vectorizer = TfidfVectorizer(stop_words='english')
    X1 = vectorizer.fit_transform(df_rec["tags_string"])
    # print(vectorizer)
    return vectorizer, X1

def kmeans_model(X1, vectorizer):
    true_k = 6
    kmeans = KMeans(n_clusters = true_k, init = 'k-means++')
    y_kmeans = kmeans.fit_predict(X1)
    model = KMeans(n_clusters=true_k, init='k-means++', max_iter=10, n_init=1)
    model.fit(X1)
    filename = 'finalized_model.sav'
    pickle.dump(model, open(filename, 'wb'))
    # print("Top terms per cluster:")
    order_centroids = model.cluster_centers_.argsort()[:, ::-1]
    terms = vectorizer.get_feature_names()
    # for i in range(true_k):
    #     print_cluster(i, [])
    return model, order_centroids, terms