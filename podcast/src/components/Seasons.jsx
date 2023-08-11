import { useEffect, useState } from 'react'
import { Supabase } from './SupabaseClient'

function Seasons(props) {
  
  const [seasonsStore, setSeasonStore] = useState(null)
  const [EpisodesStore, setEpisodesStore] = useState(null)
  const [episodesPhase, setEpisodesPhase] = useState('seasonPhase')
  const [historyStore, setHistoryStore] = useState(null)

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
  async function history(title, audio) {
    const { data, error } = await Supabase
        .from('history')
        .insert({title, audio});
    
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
            <audio controls className='audioControl' onPlay={() => history(items.title, items.file)}>
              <source src={items.file} className='itemFile'></source>
            </audio>
            <button onClick={()=> addShow(items.title, items.episode, items.file)}>Add To Favourites</button>
          </>
        )
      }) 
      setEpisodesStore(Episodes)
    // }

   
  }

  useEffect(() => {
    const fetcchSmoothies = async () => {
      const { data, error } = await Supabase
      .from('history')
      .select()
        if (error) {
          setHistoryStore(null)
          console.log(error)
        }
    if (data) {
      setHistoryStore(data)
    }
    }
    fetcchSmoothies()
    }, [])

  return (
    <>
        {/* {historyStore && (
          <div classname="history">
            {historyStore.map(history => (
            <>
              <p>{history.title}</p>
              <p>{history.description}</p>
              <p>{history.episode}</p>
              </>
            ))}
            </div>
        )} */}
     
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