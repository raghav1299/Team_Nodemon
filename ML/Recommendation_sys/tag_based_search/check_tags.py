
import time

start_time = time.time()
import main
print(main.get_products("s"))
print("--- %s seconds ---" % (time.time() - start_time))