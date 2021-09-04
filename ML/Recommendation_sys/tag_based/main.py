'''
Call connectdataabse from connect-db
pass param to get data(cnx)
tableprocessing(df)
tfifd processing(df_rec)
call kmeansmodel

'''
from .connect_db import *
from .data_processing import *
from .clustering import *
from .model_train import *

# Pipeline :
# cnx = db.connect_database()
# df = get_data_csv()
# df_rec= table_processing(df)

# final_pred = predict_recommendations(df_rec, product)

def predict_products(products):
    cnx = connect_database()
    df = get_data_db(cnx)
    try:
        df_rec= table_processing(df)
        vectorizer, X1 = tfidf_processing(df_rec)
        model, order_centroids, terms = kmeans_model(X1, vectorizer)
        vectorizer, X1 = tfidf_processing(df_rec)
        final_pred = predict_recommendations(df_rec, products, model, vectorizer, order_centroids, terms)
        for prod in products:
            if prod in final_pred:
                final_pred.remove(prod)
        df_final = get_final_products(df, final_pred)
        return df_final
    except Exception:
        return {'status': 404, 'data' : []}
        

def train_model():
    cnx = connect_database()
    df = get_data_db(cnx)
    df_rec= table_processing(df)
    vectorizer, X1 = tfidf_processing(df_rec)
    model, order_centroids, terms = kmeans_model(X1, vectorizer)
    



