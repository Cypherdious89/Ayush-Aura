import React, {useState, useEffect} from "react";
import {Button, TextField} from '@material-ui/core';
import { Autocomplete } from "@mui/material";
import { Box, Modal, Typography } from "@mui/material";
import './search.css';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CircularProgress from "@material-ui/core/CircularProgress";
const base64 = require('base-64');
// import { encode } from "base-64";


// const axios = require('axios')

function reMapJSON(item) {
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


const Search = () => {
    const [fieldValue,setfieldvalue] = useState('');
    const [jsonResults, setJsonResults] = useState([{
                ayu_id: 36730,
                manufacturer_name: "ABBOTT",
                mrp_india: 55.99,
                name: "CLOZAM 5 TABLET",
                pack_size_label: "STRIP OF 10 TABLETS",
                prescription_required: true,
                quantity: 10,
                uid: "J_Rz2X8BUylKiHTK9RnN"
            }]);
    var [open , setOpen] = useState(false);
    var [firstopen, setfirstopen] = useState(false);
    const loading = open && jsonResults.length === 0;
    const URL = 'https://search-aush-search-q44kzbalui5jyq7otqnkirkdby.us-east-1.es.amazonaws.com/medicine_raw/_search';
    const username = 'ayush_aura';
    const password = 'db-TPT@030809';  
    async function callAPI(drug) {
        //console.log(drug);
        var payload_body = {
            "size": 5,
            "query": {
                "multi_match": {
                "query": `${drug}`,
                    "type": "phrase_prefix",
                        "fields": [
                            "name",
                            "name._2gram",
                            "name._3gram"
                        ]
                }
            }
        }
        //var response = await axios.post(URL , {} , {auth: {username: username , password: password}} , JSON.stringify(payload_body))
        // console.log(JSON.stringify(payload_body))
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        var response = await fetch(URL, {method:'POST',
                headers: headers,
                body: JSON.stringify(payload_body)
                //credentials: 'user:passwd'
            })
        var json = await response.json()
        setJsonResults(json['hits']['hits'].map(reMapJSON))
        // console.log(jsonResults)
    }
    useEffect(() => {
        // console.log(fieldValue);
        if (!firstopen) {
            setJsonResults([{
                ayu_id: 36730,
                manufacturer_name: "ABBOTT",
                mrp_india: 55.99,
                name: "CLOZAM 5 TABLET",
                pack_size_label: "STRIP OF 10 TABLETS",
                prescription_required: true,
                quantity: 10,
                uid: "J_Rz2X8BUylKiHTK9RnN"
            },{ayu_id: 36851,
                manufacturer_name: "ABBOTT",
                mrp_india: 101.31,
                name: "CLOZAM 10 TABLET",
                pack_size_label: "STRIP OF 10 TABLETS",
                prescription_required: true,
                quantity: 10,
                uid: "rdt02X8BVzSrZ0_gA-Tk"}]);
        }
    } , [firstopen,fieldValue])

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () =>{
        // console.log(jsonResults);
        setOpenModal(true);
    } 
        
    const handleCloseModal = () => setOpenModal(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    // var result = axios({url: URL , method: 'get', headers: headers , body: JSON.stringify(body)})
    // console.log(jsonResults);
    return (
        <div className="search-api-container">
            <div className='heading-container'>
                <h1>Search Medicines in DB</h1>
                <p>You can use our universal search API to get the details of over 250K+ medicinces available in market.</p>
            </div>
            <div sx={{width: 500, margin: 'auto'}} className="box-container">
                <span>
                <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 325 }}
                    open={open}
                    onOpen={() => {
                        setfirstopen(true);
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={jsonResults => jsonResults.name}
                    options={jsonResults}
                    loading={loading}
                    className='search_box'
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        event.defaultMuiPrevented = true;
                        callAPI(event.target.value);
                        setfieldvalue(event.target.value);
                        handleOpenModal();
                        // your handler code
                        }
                    }}
                    renderInput={params => (
                        <TextField
                        {...params}
                        label="Type Drug"
                        variant="outlined"
                        onChange={ev => {
                            // dont fire API if the user delete or not entered anything
                            if (ev.target.value !== "" || ev.target.value !== null) {
                            callAPI(ev.target.value);
                            setfieldvalue(ev.target.value);
                            }
                            
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                            )
                        }}
                        />
                    )}
                    />
                </span>
                <span className='search_btn'>
                    <Button variant='contained' color='secondary' onClick={handleOpenModal}>
                        <SearchRoundedIcon />
                    </Button>
                </span>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {jsonResults === [] ? 'No medicine selected' : jsonResults[0].name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Manufacturer - {jsonResults === [] ? 'No medicine selected' : jsonResults[0].manufacturer_name}
                    </Typography>
                    <Typography id="modal-modal-description">
                        Price - ₹ {jsonResults === [] ? 'No medicine selected' : jsonResults[0].mrp_india}
                    </Typography>
                    <Typography id="modal-modal-description">
                        Size - {jsonResults === [] ? 'No medicine selected' : jsonResults[0].pack_size_label}
                    </Typography>
                    <Typography id="modal-modal-description">
                        Quantity - {jsonResults === [] ? 'No medicine selected' : jsonResults[0].quantity}
                    </Typography>
                    <Typography id="modal-modal-description">
                        Prescription Needed - {jsonResults === [] ? 'No medicine selected' : jsonResults[0].prescription_required === true ? "YES" : "NO"}
                    </Typography>
                    </Box>
                </Modal>
            </div> 
        </div>
      );
}

export default Search;