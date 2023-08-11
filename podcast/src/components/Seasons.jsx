import { useEffect, useState } from 'react'
import { Supabase } from './SupabaseClient'

function Seasons(props) {
  
  const [seasonsStore, setSeasonStore] = useState(null)
  const [EpisodesStore, setEpisodesStore] = useState(null)
  const [episodesPhase, setEpisodesPhase] = useState('seasonPhase')


  useEffect(() => {
    if(props.id){
      fetch(`https://podcast-api.netlify.app/id/${props.id}`)
        .then(res => res.json())
        .then(data => {
          
          const seasonApi = data.seasons;
           const mapSeasons = seasonApi.map((item) => {
            
            return(
              <>
                <div onClick={() => {m(item.episodes), console.log(item.episodes), setEpisodesPhase('episodePhase')}}>
                <p>{item.title}</p>
                <img className='happySeasons'  src={item.image}></img>
              </div>
              
              </>
            )
          })
          setSeasonStore(mapSeasons)

        })
    }
  }, [props.id])

  async function addShow(EpiTitle, EpiNum, EpiFile) {
    const { data, error } = await Supabase
        .from('favourites')
        .insert({EpiTitle, EpiNum, EpiFile});
    
    if (error) {
        console.error('Error adding shows', error);
        return null;
    }
    if (data) {
    console.log(data)
    }
}

  function m(epi) {
    // if (epi){
      const Episodes = epi.map((items) => {
        return (
          <> 
            <p>{items.title}</p>
            <p>{items.description}</p>
            {/* <audio controls className='audioControl' onPlay={() => history(items.title, items.file)}>
              <source src={items.file} className='itemFile'></source>
            </audio> */}
            <button id={items.title} value={items.file} onClick={props.history}>Play</button>
            <button onClick={()=> addShow(items.title, items.episode, items.file)}>Add To Favourites</button>
          </>
        )
      }) 
      setEpisodesStore(Episodes)
    // }

   
  }

  return (
    <>
        

    
     
      <div className='episodeStore'>
        {episodesPhase === 'episodePhase' && <>
        <button onClick={()=> setEpisodesPhase('seasonPhase')}>BackToSeason</button>
        {EpisodesStore}
        </>}
      </div>

      <div>
        {episodesPhase ==='seasonPhase' && seasonsStore}
      </div>

    </>
  )

}

export default Seasons