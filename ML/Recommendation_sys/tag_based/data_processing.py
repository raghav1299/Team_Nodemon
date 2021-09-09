import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score

# def get_data_db(cnx):
#     db_cursor = cnx.cursor()
#     # db_cursor.execute('SELECT * FROM products')
#     df = pd.read_sql('SELECT * FROM products', con=cnx)
#     df.set_index('inc_id', inplace=True)
#     df.to_csv('./products.csv')
#     return df

def get_data_db(cnx):
    db_cursor = cnx.cursor()
    # db_cursor.execute('SELECT * FROM products')
    df = pd.read_sql('SELECT * FROM products', con=cnx)
    df['id'] = df['inc_id']
    df = df[df['ratings'].notna()]
    df.set_index('id', inplace=True)
    return df

def table_processing(df):
    df_rec = df.drop(labels=['tags','mrp', 'image_address', 'shop_id','ratings','quantity'], axis=1)
    return df_rec;

def get_final_products(df, final_pred):
    final_dict = {}
    if final_pred == []:
        resp = 404
    else:
        resp = 200
    # print(final_pred)
    df_final = []
    for prod in final_pred:
        df_one = df.loc[df['product_name'] == prod].to_dict(orient='records')
        df_final.append(df_one[0])
    # print(df_final) 
    final_dict['status'] = resp
    final_dict['data'] = df_final
    # print(final_dict)
    return final_dict
    
