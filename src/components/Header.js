import React from 'react';
import './css/header.css'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTimeOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStateValue } from '../StateProvider';

function Header() {
    const [{user}] = useStateValue();

    return (
        <div className='header'>
            <div className='header__left'>
                <Avatar
                    className='header__avatar'
                    alt={user?.displayName}
                    src={user?.photoURL}


                />
                <AccessTimeIcon />
                {/* {Avatar for logged in users} */}
                {/* {Time icon} */}
            </div>
            <div className='header__search'>
                {/* {Search icon} */}
                
                {/* {Input} */}
                <input placeholder='Search Chat'>
                
                </input>

                <SearchIcon />
            </div>
            <div className='header__right'>
                <HelpOutlineIcon /> 
                {/* {Help icon} */}
            </div>
        </div>
    )
}

export default Header;