import pandas as pd
import datetime

def week_recurring(w, wk_list):
    if w - wk_list[len(wk_list)-1] in [1,2] and w - wk_list[len(wk_list)-2] in [2,3]:
        return True
def month_recurring(m, month_list):
    if m - month_list[len(month_list)-1] == 1 and m - month_list[len(month_list)-2] == 2:
        return True

def get_time_arrays(df):
    products = df['product_name'].unique().tolist()
    ts = datetime.datetime.today()
    w = int(ts.strftime('%V'))
    m = int(ts.strftime('%m'))
    weekly_recurring = []
    monthly_recurring = []
    for prod in products:
        df_week = df.loc[df['product_name'] == prod]['week'].tolist()
        df_month = df.loc[df['product_name'] == prod]['month'].tolist()
        if week_recurring(w, df_week):
            weekly_recurring.append(prod)
        if month_recurring(m, df_month):
            monthly_recurring.append(prod)
            
    return weekly_recurring, monthly_recurring

def get_weekly_recurring_products(df, weekly_recurring):
    final_dict = {}
    if weekly_recurring == []:
        resp = 404
    else:
        resp = 200

    df_final = []
    for prod in weekly_recurring:
        df_one = df.loc[df['product_name'] == prod].to_dict(orient='records')
        df_final.append(df_one[0])
        
    final_dict['status'] = resp
    final_dict['data'] = df_final
    return final_dict

def get_monthly_recurring_products(df, monthly_recurring):
    final_dict = {}
    if monthly_recurring == []:
        resp = 404
    else:
        resp = 200

    df_final = []
    for prod in monthly_recurring:
        df_one = df.loc[df['product_name'] == prod].to_dict(orient='records')
        df_final.append(df_one[0])
        
    final_dict['status'] = resp
    final_dict['data'] = df_final
    return final_dict
        