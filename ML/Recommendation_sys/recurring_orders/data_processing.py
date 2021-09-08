import pandas as pd
import datetime

def get_data_db(user, cnx):
    db_cursor = cnx.cursor()
    df = pd.read_sql('SELECT * FROM shadowfax.order_history INNER JOIN shadowfax.products ON shadowfax.products.inc_id=shadowfax.order_history.item_id;', con=cnx)
    df_products = pd.read_sql('SELECT * FROM shadowfax.products', cnx)
    df = df.loc[df['user_id'] == user]
    df = df[['order_date','product_name','user_id']]
    return df, df_products

def change2month(timestamp):
    ts = datetime.datetime.fromtimestamp(int(timestamp))
    m = int(ts.strftime('%m'))
    return m

def change2wk(timestamp):
    ts = datetime.datetime.fromtimestamp(int(timestamp))
    w = int(ts.strftime('%V'))
    return w

def table_processing(df):
    df['month'] = df.apply(lambda row: change2month(row.order_date), axis=1)
    df['week'] = df.apply(lambda row: change2wk(row.order_date), axis=1)
    return df
