import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { ShazamApi } from '../utils/ShazamApi';
import { useSong } from '../utils/Context';
import { IoPlayCircle } from 'react-icons/io5';

const ArtistsPage = () => {
  const { handleSong } = useSong();
  const { ArtistName } = useParams();
  document.title = `${ArtistName} | Spotify`;
  const [ArtistDetails, SetArtistDetails] = useState([]);
  const [Bg, setBg] = useState();
  const artistdata = async () => {
    const res = await ShazamApi(`v1/search/multi?search_type=SONGS_ARTISTS&query=${ArtistName}`)
    if (res) {
      SetArtistDetails(res?.tracks?.hits?.map(item => item?.track))
      setBg(res?.artists?.hits[0].artist?.avatar)
    }
  }
  useEffect(() => {
    artistdata();
  }, [ArtistName])
  return (
    <div className='ArtistsPage'>
      <div className="Art_Sec" >
        <div className="title_bar">
  <img src={Bg} alt="" className='img'/>
          <h3><VscVerifiedFilled size={"30px"} color='#3d91f4' />Verified Artist</h3>
          <h1>{ArtistName || "Billie Ellish"}</h1>
          <br />
          {/* #423f3b */}
          {/* #121212 */}
          <h4> 121121212 Monthly Listener</h4>
        </div>
        <div className="songlist">
          <table>
            <tr>
              <th style={{fontSize:'1.3rem',color:'#fff'}}>Popular</th>
            </tr>
            {ArtistDetails.map((val, i) => {
                return (<>
                  <tr key={i}>
                    <td style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{i+1} <img src={val?.images.coverart}/></td>
                    <td >{val?.title}</td>
                    <td>{Math.floor(Math.random() * 500000)}</td>
                    <td onClick={()=>handleSong(val)}><button className='lmp'><IoPlayCircle color='springgreen' size={'25px'}/></button></td>
                  </tr>
                </>)
              })}
          </table>
          
        </div>
      </div>
    </div>
  )
}

export default ArtistsPage
