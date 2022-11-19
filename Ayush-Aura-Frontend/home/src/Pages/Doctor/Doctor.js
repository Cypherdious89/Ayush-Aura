import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {Link} from 'react-router-dom';
import './Doctor.css'

function Doctor() {
  return (
    <>
        <div className="navbar2">
            <div className="navbar2-logo">
                <Link to='/'>
                  <img className="navbar2-icon" src={require('../../img/icon.png')} alt='logo'></img>
              </Link>
            </div>
            <div className="navbar2-container">
                <Link to='/search'>
                    <Button className='nav2-btn' variant='contained' color='primary'>Search</Button>
                </Link>
                <Tooltip title='Dr. Mishra' arrow>
                    <Avatar sx={{ m:1, bgcolor: 'primary.main' }}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                </Tooltip>
            </div>
        </div>
        <div className="main-container">
            <div className="main-container-content">
                <Typography variant="h4" component="h2">
                    Welcome Dr. Aakash Mishra !
                </Typography>
                <Button variant='contained' color='primary' className='doctor-btn' style={{margin: '5px 10px'}}>
                    Add New Patient
                </Button>
                <Button variant='contained' color='secondary' className='doctor-btn' style={{margin: '5px 10px'}}>
                    Add from Registered Patients
                </Button>
            </div>
            <div className="main-container-avatar">
                <img src={require('../../img/doctor-avatar.jpg')} alt="avatar" style={{width: '150px', height: '150px'}}/>
            </div>
        </div>
        <div className="prescription-list">
            <Typography variant="h4" component="h2" sx={{pl:2}}>Prescription List</Typography>
            <div className="prescription-container">
                <Typography variant="h6" component="h3">No Prescriptions Added !</Typography>
            </div>
        </div>
    </>
  )
}

export default Doctor