import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { IoList } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ShazamApi } from '../utils/ShazamApi';
import { VscVerifiedFilled } from "react-icons/vsc";


const Sidebar = () => {
    const [Active, SetActive] = useState("Home");
    const [Artists, setArtists] = useState([]);
    const [SearchInput, SetSearchInput] = useState("bts")
    const ArtistsData = async () => {
        const res = await ShazamApi(`v1/search/multi?search_type=SONGS_ARTISTS&query=${SearchInput}`);
        if (res) {
            setArtists(res?.artists?.hits?.map(item => item?.artist))
        }
    }
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            ArtistsData();
        } else {
            SetSearchInput("popular")
        }
    };
    useEffect(() => {
        ArtistsData()
    }, [])

    return (
        <>
            <div className="sidebar" >
                <div className="first_bar">
                    <Link to={'/'}>
                        <div onClick={() => SetActive("Home")} style={Active === "Home" ? { color: 'white' } : { color: 'inherit' }}>
                            <span><GoHomeFill className='logo' /></span> <h2>Home</h2>
                        </div>
                    </Link>
                    <Link to={'/search'}>

                        <div onClick={() => SetActive("Search")} style={Active === "Search" ? { color: 'white' } : { color: 'inherit' }}>
                            <span><FiSearch className='logo' /></span><h2>Search</h2>
                        </div>
                    </Link>
                </div>
                <div className="main">
                    <div className="second_bar">
                        <div className="flex_left">
                            <svg className='logo' data-encore-id="icon" role="img"
                                aria-hidden="true" viewBox="0 0 24 24"
                                class="Svg-sc-ytk21e-0 iYxpxA">
                                <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1
                               0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 
                               1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
                            <h3>Your Library</h3>
                        </div>
                        <div className="flex_Right">
                            <IoMdAdd className='logo' />
                            <FaArrowRight className='logo' />
                        </div>
                    </div>
                    <div className="third_bar">
                        <span onClick={() => SetActive("X")}>{Active === "X" ? "" : "X"}</span>
                        <span onClick={() => SetActive("Artists")}>Artists</span>
                    </div>
                    <div className="fourth_bar">
                        <div className="searchbar" >
                            <span onClick={() => SetActive("Bar")}><FiSearch /></span>
                            {Active === "Bar" ? <input type="text" onKeyDown={handleSearch} onChange={(e) => SetSearchInput(e.target.value)} placeholder='Search in your Library' /> : ""}
                        </div>
                        <div className="recents">
                            <span>Recents</span>
                            <IoList className='logo' />
                        </div>
                    </div>
                    <div className="fifth_bar">
                        <ul>
                            {Artists.map((val, i) => {
                                return (
                                    <div className="artist_card" key={val?.adamid}>
                                        <img src={val?.avatar} alt={val?.name} />
                                            {val?.verified === false ?
                                                <VscVerifiedFilled className='verify_icon'
                                                    color='springgreen' /> : <VscVerifiedFilled className='verify_icon'
                                                        color='springgreen' />}
                                        <Link to={`/artist/${val?.name}`}>
                                        <div className="details">
                                            <h3>{val?.name.slice(0, 20)}</h3>
                                            <span > {Active === "Artists" ? null : "Artists"}</span>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
