import requests
import json
from time import sleep
import pandas as pd
import pymysql
from sqlalchemy import create_engine
from sshtunnel import SSHTunnelForwarder
from dotenv import load_dotenv
import os

load_dotenv()

def push_to_rds(db_payload):
    df = pd.DataFrame.from_records(db_payload)
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")
    db_host = os.getenv("DB_URL")
    db_port = int(os.getenv("DB_PORT"))
    jump_server_ip = os.getenv("JUMP_SERVER_IP")
    jump_server_user = os.getenv("JUMP_SERVER_USER")
    with SSHTunnelForwarder(
        (jump_server_ip , 22),
        ssh_private_key = "jump-server-key-1.pem",
        ssh_username = jump_server_user,
        remote_bind_address = (db_host , db_port)) as server:
        server.start()
        db_connection = create_engine("mysql+pymysql://" + user + ":" + password + "@" + "127.0.0.1" + ":" + str(server.local_bind_port) + "/" + db_name , echo=False)
        #print(df)
        df.to_sql('medicine_raw_data' , con = db_connection , index = False , if_exists = 'append')
        server.stop()

def create_db_payload(raw_payload):
    final_records = []
    for medicine in raw_payload:
        new_medicine_dict = {}
        new_medicine_dict['ID_1MG'] = medicine['id']
        new_medicine_dict['name'] = str(medicine['name']).upper()
        new_medicine_dict['manufacturer_name'] = str(medicine['manufacturer_name']).upper()
        new_medicine_dict['pack_size_label'] = str(medicine['pack_size_label']).upper()
        new_medicine_dict['quantity'] = int(medicine['quantity'])
        new_medicine_dict['type'] = str(medicine['type']).upper()
        new_medicine_dict['is_discontinued'] = medicine['is_discontinued']
        if medicine['rx_required'] != None and medicine['rx_required']['header'] == "Prescription Required":
            new_medicine_dict['prescription_required'] = True
        else:
            new_medicine_dict['prescription_required'] = False
        new_medicine_dict['composition'] = medicine['short_composition']
        new_medicine_dict['mrp_india'] = medicine['price']
        final_records.append(new_medicine_dict)
    return final_records

def get_medicine_data(url , page):
    response = requests.get(url , params = {
        "prefix_term": "A",
        "page": page,
        "per_page": 50
    })
    return response

def start_heist():
    url = "https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix"
    response = requests.get(url , params = {
        "prefix_term": "A",
        "page": 1,
        "per_page": 50
    })

    total_count = response.json()['meta']['total_count']
    last_page_count = int(total_count%50)
    numpages = int(total_count - last_page_count)/50 + 2
    numpages = int(numpages)
    raw_payload = response.json()['data']['skus']
    db_payload = create_db_payload(raw_payload)
    push_to_rds(db_payload)
    for page in range(2 , numpages):
        response = get_medicine_data(url , page)
        if response.status_code == 200:
            raw_payload = response.json()['data']['skus']
            db_payload = create_db_payload(raw_payload)
            push_to_rds(db_payload)
        elif response.status_code == 429:
            sleep(int(response.headers['Retry-After']))
            response = get_medicine_data(url , page)
            raw_payload = response.json()['data']['skus']
            db_payload = create_db_payload(raw_payload)
            push_to_rds(db_payload)
        print("Page " + str(page) + " done!")

start_heist()
