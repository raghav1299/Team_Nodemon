from .connect_db import *
from .data_processing import *
from .recurr import *

def check_weekly_triggers(user_id):
    cnx = connect_database()
    try:
        df, df_products = get_data_db(user_id, cnx)
        df = table_processing(df)
        weekly_recurring, _ = get_time_arrays(df)
        final_dict = get_weekly_recurring_products(df_products, weekly_recurring)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}
    
def check_monthly_triggers(user_id):
    cnx = connect_database()
    try:
        df, df_products = get_data_db(user_id, cnx)
        df = table_processing(df)
        _,monthly_recurring = get_time_arrays(df)
        final_dict = get_monthly_recurring_products(df_products, monthly_recurring)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}
        