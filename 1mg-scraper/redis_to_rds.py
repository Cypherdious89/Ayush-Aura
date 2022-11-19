import redis
import json
import pandas as pd
from sshtunnel import SSHTunnelForwarder
from dotenv import load_dotenv
import pymysql

load_dotenv()

cache = redis.Redis(charset="utf-8", decode_responses=True)

def redis_to_rds():
    final_records = []
    while cache.exists('scraped_data') and cache.llen('scraped_data') > 0:
        record = cache.rpop('scraped_data')
        final_records.append(json.loads(record))
    df = pd.DataFrame.from_records(final_records)
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