from main import *
import time

start_time = time.time()
print(predict_products(["Red lays"]))
print("--- %s seconds ---" % (time.time() - start_time))