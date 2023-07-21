import { useState } from 'react'
import './App.css'
import Cards from '../components/Cards'

function App() {
  const [preview, setPreview] = useState(null)

  fetch("https://podcast-api.netlify.app/shows")
  .then(Response => Response.json())
  .then(data => {

    const items = data.map((item) => {

      return (
      
      <Cards
        key={item.id}
        titles={item.title}
        images={item.image}
        seasons={item.seasons}
        updated={item.updated}
        descriptions={item.description} 
        />
      )
    })
  
    setPreview(items)
    
  })
   
  return(
    

    <div> 
      {preview}
    </div>
   
  

  )
  }
  export default App
