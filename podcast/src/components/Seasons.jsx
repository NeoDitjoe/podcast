
import { useEffect, useState } from 'react'

function Seasons(props) {
  
  const [seasonsStore, setSeasonStore] = useState(null)
  const [EpisodesStore, setEpisodesStore] = useState(null)
  useEffect(() => {
    if(props.id){
      fetch(`https://podcast-api.netlify.app/id/${props.id}`)
        .then(res => res.json())
        .then(data => {
          
          const seasonApi = data.seasons;
          

          const mapSeasons = seasonApi.map((item) => {
            
            return(
              <>
                <div onClick={() => {m(item.episodes), console.log(item.episodes)}}>
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

  function m(epi) {
    // if (epi){
      const Episodes = epi.map((items) => {
        return (
          <> 
            <p>{items.title}</p>
            <p>{items.description}</p>
            <audio controls className='audioControl'>
              <source src={items.file} className='itemFile'></source>
            </audio>
          </>
        )
      }) 
      setEpisodesStore(Episodes)
    // }

   
  }

  return (
    <>

      <div className='episodeStore'>
        {EpisodesStore}
      </div>

      <div>
        {seasonsStore}
      </div>

    </>
  )

}

export default Seasons