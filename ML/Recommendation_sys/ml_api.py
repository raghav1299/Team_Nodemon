from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from tag_based_search import main
from tag_based import main as main2
from apriori import main as main3
from pydantic import BaseModel


app = APIRouter()

class Product_List(BaseModel):
    product_names: list

@app.get('/tags/{tag_input}')
async def get_tag_products(tag_input: str):
    '''
    Tag based search:
    Pass a tag in the url and get back the products only with that specific tag 
    '''
    response = main.get_products(tag_input)
    return response

@app.post('/recommend')
async def get_product_recommendations(products: Product_List):
    '''
    Recommended Items:
    post an array of product names and get back the most similar recommended products
    '''
    product_list = products.product_names
    final_products = main2.predict_products(product_list)
    return final_products

@app.post('/alsobought')
async def users_also_bought(products: Product_List):
    '''
    Users also Bought:
    To be shown in the final cart during checkout:
    post an array of product names and get back the most similar recommended products
    '''
    product_list = products.product_names
    final_products = main3.other_user_orders_apriori(product_list)
    return final_products
    

    
