from .connect_db import *
from .data_processing import *
from .recurr import *

def check_weekly_triggers(user_id):
    cnx = connect_database()
    try:
        fcm_token, df, df_products = get_data_db(user_id, cnx)
        df = table_processing(df)
        weekly_recurring, _ = get_time_arrays(df)
        text = arr2string(weekly_recurring, fcm_token)
        final_dict = get_weekly_recurring_products(text, df_products, weekly_recurring)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}
    
def check_monthly_triggers(user_id):
    cnx = connect_database()
    try:
        fcm_token, df, df_products = get_data_db(user_id, cnx)
        df = table_processing(df)
        _,monthly_recurring = get_time_arrays(df)
        text = arr2string(monthly_recurring, fcm_token)
        print(text)
        final_dict = get_monthly_recurring_products(text, df_products, monthly_recurring)
        return final_dict
    except Exception as e:
        return {'status': 500, 'data' : []}
        