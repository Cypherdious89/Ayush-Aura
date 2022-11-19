const jsonResponse = {
    "took": 422,
    "timed_out": false,
    "_shards": {
        "total": 2,
        "successful": 2,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 9,
            "relation": "eq"
        },
        "max_score": 10.684423,
        "hits": [
            {
                "_index": "medicine_raw",
                "_type": "_doc",
                "_id": "5_Sk2X8BUylKiHTK5plM",
                "_score": 10.684423,
                "_source": {
                    "ID": 133890,
                    "ID_1MG": 48863,
                    "name": "MAZETOL 200 TABLET",
                    "manufacturer_name": "ABBOTT",
                    "pack_size_label": "STRIP OF 10 TABLETS",
                    "quantity": 10,
                    "type": "ALLOPATHY",
                    "is_discontinued": false,
                    "prescription_required": true,
                    "composition": "Carbamazepine (200mg)",
                    "mrp_india": 15.47
                }
            },
            {
                "_index": "medicine_raw",
                "_type": "_doc",
                "_id": "8tyk2X8BVzSrZ0_g72EX",
                "_score": 10.684423,
                "_source": {
                    "ID": 134020,
                    "ID_1MG": 48835,
                    "name": "MAZETOL 100 TABLET",
                    "manufacturer_name": "ABBOTT",
                    "pack_size_label": "STRIP OF 10 TABLETS",
                    "quantity": 10,
                    "type": "ALLOPATHY",
                    "is_discontinued": false,
                    "prescription_required": true,
                    "composition": "Carbamazepine (100mg)",
                    "mrp_india": 11.42
                }
            },
            {
                "_index": "medicine_raw",
                "_type": "_doc",
                "_id": "zfSl2X8BUylKiHTKP5ty",
                "_score": 10.684423,
                "_source": {
                    "ID": 135076,
                    "ID_1MG": 48947,
                    "name": "MAZETOL 400 TABLET",
                    "manufacturer_name": "ABBOTT",
                    "pack_size_label": "STRIP OF 10 TABLETS",
                    "quantity": 10,
                    "type": "ALLOPATHY",
                    "is_discontinued": false,
                    "prescription_required": true,
                    "composition": "Carbamazepine (400mg)",
                    "mrp_india": 32.98
                }
            },
            {
                "_index": "medicine_raw",
                "_type": "_doc",
                "_id": "c_Sl2X8BUylKiHTKNpvb",
                "_score": 10.12907,
                "_source": {
                    "ID": 134986,
                    "ID_1MG": 148850,
                    "name": "MAZETOL SR 300 TABLET",
                    "manufacturer_name": "ABBOTT",
                    "pack_size_label": "STRIP OF 10 TABLET ER",
                    "quantity": 10,
                    "type": "ALLOPATHY",
                    "is_discontinued": true,
                    "prescription_required": true,
                    "composition": "Carbamazepine (300mg)",
                    "mrp_india": 26.38
                }
            },
            {
                "_index": "medicine_raw",
                "_type": "_doc",
                "_id": "kPSl2X8BUylKiHTKz56h",
                "_score": 10.12907,
                "_source": {
                    "ID": 137183,
                    "ID_1MG": 497350,
                    "name": "MAZETOL SR 200 TABLET",
                    "manufacturer_name": "ABBOTT",
                    "pack_size_label": "STRIP OF 15 TABLET ER",
                    "quantity": 15,
                    "type": "ALLOPATHY",
                    "is_discontinued": false,
                    "prescription_required": true,
                    "composition": "Carbamazepine (200mg)",
                    "mrp_india": 39.31
                }
            }
        ]
    }
}

function core_remap(item) {
    return {
        "uid": item['_id'],
        "name": item['_source']['name'],
        "ayu_id": item['_source']['ID'],
        "manufacturer_name": item['_source']['manufacturer_name'],
        "pack_size_label": item['_source']["pack_size_label"],
        "quantity": item['_source']["quantity"],
        "prescription_required": item['_source']["prescription_required"],
        "mrp_india": item['_source']['mrp_india'],
    }
}

function reMapJSON(json_payload) {
    var hitlist = jsonResponse['hits']['hits']
    var required_array = hitlist.map(core_remap)
    console.log(required_array)
    console.log(required_array.length)
}

reMapJSON(jsonResponse)