import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score

def get_data_db(cnx, tag_input):
    db_cursor = cnx.cursor()
    query = f"SELECT * FROM shadowfax.products WHERE( tags_string LIKE '%{tag_input}%' );"
    df_tags = pd.read_sql(query, con=cnx)
    df_tags.set_index('inc_id', inplace=True)
    return df_tags

def data_to_dict(df_tags):
    df_json = df_tags.to_dict(orient='records')
    return df_json

def final_dict_conversion(df_json, resp):
    final_dict = {}
    final_dict['status'] = resp
    final_dict['data'] = df_json
    return final_dict

    
