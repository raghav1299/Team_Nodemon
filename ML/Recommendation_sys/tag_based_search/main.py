'''
Call connectdataabse from connect-db
pass param to get data(cnx)

'''
import connect_db as db
from data_processing import *

# Pipeline :
# cnx = db.connect_database()
# df = get_data_csv()
# df_rec= table_processing(df)

# final_pred = predict_recommendations(df_rec, product)

def get_products(tag_input):
    cnx = db.connect_database()
    try:
        df_tags = get_data_db(cnx, tag_input)
        df_json = data_to_dict(df_tags)
        if df_json == []:
            resp = 404
        else:
            resp = 200
        final_dict = final_dict_conversion(df_json, resp)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}

# def predict_products(products):
#     df = get_data_csv()
#     df_rec= table_processing(df)
#     vectorizer, X1 = tfidf_processing(df_rec)
#     model, order_centroids, terms = kmeans_model(X1, vectorizer)
#     vectorizer, X1 = tfidf_processing(df_rec)
#     final_pred = predict_recommendations(df_rec, products, model, vectorizer, order_centroids, terms)
#     return final_pred

# def train_model():
#     cnx = db.connect_database()
#     df = get_data_db(cnx)
#     df_rec= table_processing(df)
#     vectorizer, X1 = tfidf_processing(df_rec)
#     model, order_centroids, terms = kmeans_model(X1, vectorizer)
    



