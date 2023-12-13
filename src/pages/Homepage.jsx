import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import SongCard from '../components/SongCard'
import { ShazamApi } from '../utils/ShazamApi'
const Homepage = () => {
    const [TrendingSong, SetTrendingSong] = useState([])
    const [PopularSong, SetPopularSong] = useState([])
    const [LatestSong, SetLatestSong] = useState([])
    const fetchData = async (url, setter) => {
        try {
            const res = await ShazamApi(url);
            if (res) {
                setter(res);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        const fetchAllData = async () => {
            await fetchData(`v1/charts/country?country_code=IN&page=1`, SetTrendingSong);
            await fetchData(`v1/charts/world`, SetPopularSong);
            await fetchData(`v1/charts/genre-world?genre_code=POP`, SetLatestSong);
        };

        fetchAllData();

    },[])
    return (
        <div className='homepage'>
            <div className="main_page">
                <Nav />
                <div className="song_Section">
                <section className='Popular_Radio'>
                        <h2>Popular Indian</h2>
                        <div className="card_section">
                            {Array.isArray(TrendingSong) && TrendingSong?.map((value, i) => {
                                return <div className="cl">
                                    <SongCard value={value} key={i} />
                                </div>
                            } )}
                        </div>
                    </section> <section className='Popular_Radio'>
                        <h2>World Chart</h2>
                        <div className="card_section">
                            {Array.isArray(PopularSong) && PopularSong?.map((value, i) => {
                                return <div className="cl">
                                    <SongCard value={value} key={i} />
                                </div>
                            })}
                        </div>
                    </section> <section className='Popular_Radio'>
                        <h2>Top Genre</h2>
                        <div className="card_section">
                            {Array.isArray(LatestSong) && LatestSong?.map((value, i) => {
                                return <div className="cl">
                                    <SongCard value={value} key={i} />
                                </div>
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Homepage
