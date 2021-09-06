import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score

def get_data_db(cnx, tag_input):
    db_cursor = cnx.cursor()
    tag_input = tag_input.strip()
    query = f"SELECT * FROM shadowfax.products WHERE( tags_string LIKE '%{tag_input}%' );"
    df_tags = pd.read_sql(query, con=cnx)
    df_tags['id'] = df_tags['inc_id']    
    df_tags.set_index('id', inplace=True)
    return df_tags

def data_to_dict(df_tags):
    df_json = df_tags.to_dict(orient='records')
    # print(df_json)
    return df_json

def final_dict_conversion(df_json, resp):
    final_dict = {}
    final_dict['status'] = resp
    final_dict['data'] = df_json
    # print(final_dict)
    return final_dict

    
