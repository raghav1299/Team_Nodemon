from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from tag_based_search import main
from tag_based import main as main2
from pydantic import BaseModel


app = APIRouter()

class Product_List(BaseModel):
    product_names: list

@app.get('/tags/{tag_input}')
async def get_tag_products(tag_input: str):
    '''
    Pass a tag in the url and get back the products only with that specific tag 
    '''
    response = main.get_products(tag_input)
    return response

@app.post('/recommend')
async def get_product_recommendations(products: Product_List):
    '''
    post an array of product names and get back the most similar recommended products
    '''
    product_list = products.product_names
    final_products = main2.predict_products(product_list)
    return final_products


    
