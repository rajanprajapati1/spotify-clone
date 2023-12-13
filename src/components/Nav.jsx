import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineDownloadForOffline } from 'react-icons/md';
import { FaBell } from 'react-icons/fa6';
import { FaCircleUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Nav = ({searchHandler,Inputref}) => {
    const location = useLocation();
    const [isSearchVisible, setSearchVisible] = useState(true);

    const toggleSearchBar = () => {
        setSearchVisible((prev) => !prev);
    };

    useEffect(() => {
        setSearchVisible(location.pathname !== '/');
    }, [location]);

    return (
        <div className="nav">
            <div className="flex_nav">
                <div className="link_button">
                    <Link to="/">
                        <button onClick={toggleSearchBar}>
                            <FaChevronLeft />
                        </button>
                    </Link>
                    <Link to="/search">
                        <button onClick={toggleSearchBar}>
                            <FaChevronRight />
                        </button>
                    </Link>
                    {isSearchVisible && (
                        <div className="searchbar_box">
                            <FiSearch className="logo" />
                            <input type="text" ref={Inputref} placeholder="What do you want to listen to?" onKeyDown={searchHandler}  />
                        </div>
                    )}
                </div>
                <div className="right_button">
                   {!isSearchVisible &&( <button className="btn_x">Explore Premium</button>)}
                    <button className="btn_M">
                        <div>
                            <MdOutlineDownloadForOffline />Install App
                        </div>
                    </button>
                    <button className="btn_F">
                        <FaBell />
                    </button>
                    <button className="btn_F">
                        <FaCircleUser />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Nav;
