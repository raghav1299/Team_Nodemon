import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score

def print_cluster(i, order_centroids,terms, final_pred):
    # print("Cluster %d:" % i),
    for ind in order_centroids[i, :5]:
        print(' %s' % terms[ind])

def get_cluster(i,order_centroids, terms, final_pred):
    # print("Cluster %d:" % i),
    for ind in order_centroids[i, :5]:
        # print(terms[ind])
        if terms[ind] not in final_pred:
            final_pred.append(terms[ind])
        # print(terms[ind],"\n")
    return final_pred
        
def show_recommendations(df_rec, vectorizer, model, products, order_centroids, terms):
    #print("Cluster ID:")
    final_pred = []
    pred_freq = []
    for product in products:
        df_rec1 = df_rec.loc[df_rec['product_name'] == product]
        a = list(df_rec1['tags_string'])
        p = list(df_rec1['product_name'])
        prod_tags = a[0].split(', ')

        for p_tag in prod_tags:
    #     Y = vectorizer.transform(list(df_rec1['tags_string']))
            Y = vectorizer.transform([p_tag])
            prediction = model.predict(Y)
    #         print(prediction[0])
            pred_freq.append(prediction[0])
        res = max(set(pred_freq), key = pred_freq.count)
        final_pred = get_cluster(res, order_centroids, terms, final_pred)
    return final_pred

def sort_recommendations(df_rec, final_pred):
    max_res = []
    max_prod = []
    max_idx = []
    for i in range(len(df_rec['product_name'])):
        df_rec1 = df_rec.loc[df_rec.index == i+1]
        a = list(df_rec1['tags_string'])
        p = list(df_rec1['product_name'])
        p_idx = list(df_rec1.index)
        # print(p_idx[0])
        a1 = a[0].split(', ')
        res = len([a1.index(idx) for idx in final_pred if idx in a1])/len(a1)
        max_res.append(res)
        max_idx.append(p_idx[0])
        max_prod.append(p[0])
        
    sorted_products = [x for _,x in sorted(zip(max_res, max_prod))][::-1]
    return sorted_products[:6]

def predict_recommendations(df_rec, products, model, vectorizer, order_centroids, terms):
    final_pred = []
    # try:
    # print(products)
    final_pred = show_recommendations(df_rec, vectorizer, model, products,  order_centroids, terms)
    return sort_recommendations(df_rec, final_pred)
    # except Exception:
    #     print("Check product Name")