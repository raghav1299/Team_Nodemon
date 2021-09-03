import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os
load_dotenv()

def connect_database():
    try:
        cnx = mysql.connector.connect(user=os.environ.get('user'),
                                      password=os.environ.get('password'),
                                host=os.environ.get('host'),
                                database=os.environ.get('database'))
        print("Database Connected Successful")
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
