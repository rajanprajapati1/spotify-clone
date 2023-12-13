import React, { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import SongCard from '../components/SongCard'
import { ShazamApi } from '../utils/ShazamApi'

const Searchpage = () => {
    const [SearchResult, SetSearchResult] = useState([]);
    const Inputref = useRef();
    
    const getSearchresult = async (query) => {
        const res = await ShazamApi(`v1/search/multi?search_type=SONGS_ARTISTS&query=${query || "dua-lipa"}`);
        if (res) {
            SetSearchResult(res?.tracks?.hits)
        }
    }
    const searchHandler = (e) => {
        const usersearch = Inputref?.current.value;
        if(e?.key === 'Enter'){
            getSearchresult(usersearch);
        }else{
            console.log("enter some song name")
        }
    }
    
    useEffect(() => {
        getSearchresult();
    }, [])
    return (
        <div className='searchpage'>
            <div className="main_searchpage">
                <Nav searchHandler={searchHandler} Inputref={Inputref} />
                <div className="main_sec">
                    {SearchResult?.map((value,i) => {
                        return <SongCard value={value?.track} key={i} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Searchpage
