from main import *
import time

start_time = time.time()
print(predict_products(["Dairy Milk"]))
print("--- %s seconds ---" % (time.time() - start_time))