'''
Call connectdataabse from connect-db
pass param to get data(cnx)
tableprocessing(df)
tfifd processing(df_rec)
call kmeansmodel

'''
import connect_db as db
from data_processing import *
from clustering import *
from model_train import *

# Pipeline :
# cnx = db.connect_database()
# df = get_data_csv()
# df_rec= table_processing(df)

# final_pred = predict_recommendations(df_rec, product)

def predict_products(products):
    df = get_data_csv()
    df_rec= table_processing(df)
    vectorizer, X1 = tfidf_processing(df_rec)
    model, order_centroids, terms = kmeans_model(X1, vectorizer)
    vectorizer, X1 = tfidf_processing(df_rec)
    final_pred = predict_recommendations(df_rec, products, model, vectorizer, order_centroids, terms)
    return final_pred

def train_model():
    cnx = db.connect_database()
    df = get_data_db(cnx)
    df_rec= table_processing(df)
    vectorizer, X1 = tfidf_processing(df_rec)
    model, order_centroids, terms = kmeans_model(X1, vectorizer)
    



