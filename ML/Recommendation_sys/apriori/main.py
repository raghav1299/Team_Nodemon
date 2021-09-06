from .connect_db import *
from .data_processing import *

def other_user_orders_apriori(orders):
    cnx = connect_database()
    try:
        df, df_products = get_data_db(cnx)
        transactions = product_aa_list(df)
        rules_list = apriori_rules(transactions)
        others_also = others_also_bought(rules_list, orders)
        final_pred = list(dict.fromkeys(others_also))
        final_dict = get_final_products(df_products, final_pred)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}