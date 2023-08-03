import React from 'react'
import { useEffect, useState } from 'react'

function Seasons(props) {
  
  const [seasonsStore, setSeasonStore] = useState(null)
  useEffect(() => {
    if(props.id){
      fetch(`https://podcast-api.netlify.app/id/${props.id}`)
        .then(res => res.json())
        .then(data => {
          
          const seasonApi = data.seasons;

          const mapSeasons = seasonApi.map((item) => {
            return(
              <>
                <p>{item.title}</p>
                <img className='happySeasons'  src={item.image}></img>
              </>
            )
          })
          setSeasonStore(mapSeasons)

        })
    }
  }, [props.id])

  return (
    <>
      {seasonsStore}
    </>
  )

}

export default Seasons