import pandas as pd
from apyori import apriori
from collections import Counter

def get_data_db(cnx):
    db_cursor = cnx.cursor()
    df = pd.read_sql('SELECT * FROM shadowfax.order_history INNER JOIN shadowfax.products ON shadowfax.products.inc_id=shadowfax.order_history.item_id;', con=cnx)
    df = df[['inc_id', 'order_date','product_name','user_id']]
    df_products = pd.read_sql('SELECT * FROM shadowfax.products', cnx)
    return df, df_products

def product_aa_list(df):
    transactions = [item[1]['product_name'].tolist() for item in list(df.groupby(['order_date']))]
    return transactions


def apriori_rules(transactions):
    rules = apriori(transactions, min_support=0.05, min_confidence=0.5, min_lift=2, min_length=2)
    rules_list = list(rules)
    return rules_list

def others_also_bought(rules_list, orders):
    others_also = []
    for rule_list in rules_list:
        for i in range(len(rule_list.ordered_statistics)):
            fs = rule_list.ordered_statistics[i].items_base
            x = [prod for prod in fs]
            if Counter(x) == Counter(orders):
                reco_fs = rule_list.ordered_statistics[i].items_add
                reco_x = [prod for prod in reco_fs]
                others_also.extend(reco_x)
    return others_also

def get_final_products(df_products, final_pred):
    final_dict = {}
    if final_pred == []:
        resp = 404
    else:
        resp = 200

    df_final = []
    for prod in final_pred:
        df_one = df_products.loc[df_products['product_name'] == prod].to_dict(orient='records')
        df_final.append(df_one[0])
        
    final_dict['status'] = resp
    final_dict['data'] = df_final
    return final_dict