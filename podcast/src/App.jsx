//Imports for components used for the app.
import Supaclient from './components/SupabaseClient';
import { Supabase } from './components/SupabaseClient'
import React, { useState, useEffect } from 'react';
import Cards from './components/Cards';
import Grid from '@mui/material/Grid';
import { Navbar } from './components/Navbar';
// import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
// import AboutUs from './components/Pages/AboutUs';
// import Blog from './components/Pages/Blog'
import SortBy from './components/SortBy';
import SearchBar from './components/SearchBar';
import Seasons from './components/Seasons';
import Footer from './components/Footer';
// import Slider from 'react-slick';
import ShowCarousel from './components/ShowCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../src/App.css';

const genreMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};
function App() {
  const [preview, setPreview] = useState([]); //Used the useState to control the app's behavior
  const [sortedPreview, setSortedPreview] = useState([...preview]);
  const [filteredPreview, setFilteredPreview] = useState([...preview]);
  const [, setLoading] = useState(true)
  // const [searching, setSearching] = useState(false);
  const [idStore, setIdStore] = useState(null);
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  const [selectedGenre, setSelectedGenre] = useState('');
  const [playableAudio, setPlayableAudio] = useState({
    AudioTitle: null,
    AudioFile: null
  })

  function seasonIdFunction(id) {
    setIdStore(id)
    setThrowSignUp(`seasonPhase`)
  }
  // SUPABASE 
  //Sets up event listeners using the Supabase client's onAuthStateChange to track user authentication status.
  //When a user successfully signs in, the code logs their email to the console, updates the app's phase
  React.useEffect(() => {
    const authListener = Supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        // setThrowSignUp('PreviewPhase')
        setThrowSignUp('loading')
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  //Fetches podcast data from the provided URL using the fetch API within the useEffect hook.
  useEffect(() => {
    setLoading(true); //It starts by setting the loading state to true to indicate that data is being fetched
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then(data => {
        if (throwSignUp === 'loading') {
          const items = data.map((item) => { //the code within the map function creates a JSX component and passses in various props
            return (
              <Cards
                key={item.id}
                titles={item.title}
                images={item.image}
                genres={item.genres.map(genreID => genreMapping[genreID]).join(" , ")}
                seasons={item.seasons}
                updated={item.updated}
                descriptions={item.description}
                click={() => seasonIdFunction(item.id)}
              />
            )
          })
          setPreview(items); // After the mapping is done, the array of JSX components (items) is set as the state for the preview using the setPreview function.
          console.log('preview data:', items);
          setThrowSignUp('PreviewPhase')
          setLoading(false); //The loading state is then set to false to indicate that data fetching is completed.
        }
      })

  }, [throwSignUp]);

  const genreFilteredFeature = selectedGenre
    ? preview.filter((item) =>
      item.props.genres.includes(genreMapping[selectedGenre])
    )
    : preview;

  /*This code defines the SortBy component, which provides a dropdown for sorting the show previews based on different criteria (title, date).
  Used the useState hook to manage the sorting order state and Calls the provided onSort function when the user selects a sorting option. */
  const handleSort = (sortOrder) => {
    const sorted = [...preview].sort((a, b) => {
      if (sortOrder === 'asc') {
        console.log(a.props.titles)
        return a.props.titles.localeCompare(b.props.titles);
      } else if (sortOrder === 'desc') {
        return b.props.titles.localeCompare(a.props.titles);
      } else if (sortOrder === 'date-asc') {
        const dateA = new Date(a.props.updated);
        const dateB = new Date(b.props.updated);
        return dateA - dateB;
      } else if (sortOrder === 'date-desc') {
        const dateA = new Date(a.props.updated);
        const dateB = new Date(b.props.updated);
        return dateB - dateA;
      } else {
        return [...preview];
      }
    });
    setSortedPreview(sorted);
    setFilteredPreview(sorted);
    setPreview(sorted)
  };
  // const handleFilter = (filterValue) => {
  //   const filtered = preview.filter((item) =>
  //     item.props.titles.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  //   setFilteredPreview(filtered);
  //   setSortedPreview(filtered);
  // };

 // Search-bar
  const handleSearch = (searchTerm) => {
    const filteredData = preview.filter(datamapping =>
      datamapping.props.titles.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPreview(filteredData);
    setSearching(true);
  };

  function HandleBackButton() {
    if (throwSignUp === 'seasonPhase') {
      setThrowSignUp('PreviewPhase')
    }
  }

  const [historyStore, setHistoryStore] = useState(null)
  useEffect(() => {
    const fetchHistoty = async () => {
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
    fetchHistoty()
  }, [])

  const [favs, setfavs] = useState(null)
  useEffect(() => {
    const fetchFavs = async () => {
      const { data, error } = await Supabase
        .from('favourites')
        .select()
      if (error) {
        setfavs(null)
        console.log(error)
      }
      if (data) {
        setfavs(data)
      }
    }
    fetchFavs()
  }, [])

  async function history(event) {
    const title = event.target.id
    const audio = event.target.value
    const { data, error } = await Supabase
      .from('history')
      .insert({ title, audio });

    if (error) {
      console.error('Error adding shows', error);
      return null;
    }
    if (data) {
      console.log(data)
    }
    setPlayableAudio(prev => ({
      ...prev,
      AudioTitle: title
    }))
    setPlayableAudio(prev => ({
      ...prev,
      AudioFile: audio
    }))
    console.log("playinng")
  }

  console.log(playableAudio.AudioTitle)

  //Select genre on (Filter by:)
  function handleChange(id) {
    setSelectedGenre(id)
  }
  const handleGoBackToHomePage = () => {
    const homepageURL = 'http://localhost:5174/';
    // Navigate to the homepage
    window.location.href = homepageURL;
  };

  return ( /*If throwSignUp is 'signUpPhase', the Supaclient component is rendered.
  If throwSignUp is 'PreviewPhase', the main app content is rendered */
    <>
      {throwSignUp === 'signUpPhase' && <Supaclient />}
      {throwSignUp !== 'signUpPhase' && <Navbar />}
      {throwSignUp === 'loading' && <h1 className="loading">Loading...</h1>}
      {throwSignUp === 'seasonPhase' && <>
        <button onClick={HandleBackButton}>BackToPreview</button>
        <Seasons
          id={idStore}
          history={history}
        />
      </>
      }
      {throwSignUp === 'PreviewPhase' &&

        <>
          <div className='App'>
            <div className='filter-sort'>
              <SortBy items={preview} onSort={handleSort} />
              {/* <FilterBy items={preview} onFilter={handleFilter} /> */}
               <SearchBar onSearch={handleSearch} /> 
              <div className="Card-Box">
                <h3>Filter by Genre:</h3>
                {Object.entries(genreMapping).map(([genreId, genreTitle]) => (
                  // console.log(genreId),
                  <button className='filter-button'
                    key={genreId}
                    onClick={() => handleChange(parseInt(genreId))}
                   
                  >
                    {genreTitle}
                  </button>
                ))}
              </div>
              <br />
              <button className='historybutton' onClick={() => setThrowSignUp('HistoryPhase')}>History</button>
              <button className='Favs' onClick={() => setThrowSignUp('FavouritesPahse')}>Favourites</button>
              <Home />  {/*This part of the code closes the conditional rendering block started earlier.*/}
            </div>
          </div>
            <ShowCarousel preview={preview} />
            
          <Grid container spacing={5}>
            {genreFilteredFeature.map((item) => (item))}
          </Grid>
          {/* {searching && <button className='back-button' onClick={handleGoBackToHomePage}>Go Back</button>} */}
          <Footer />

        </>
        
      }
      {(historyStore && throwSignUp === 'HistoryPhase') && (

        <div className="history">
          <button onClick={() => setThrowSignUp('PreviewPhase')}>BackToPreview</button>
          <h3>History</h3>
          {historyStore.map(history => (
            <>
              <p>{history.title}</p>
              <audio controls>
                <source src={history.audio} />
              </audio>
            </>
          ))}
        </div>
      )}
      {(favs && throwSignUp === 'FavouritesPahse') && (
        <div className="favs">
          <button onClick={() => setThrowSignUp('PreviewPhase')}>BackToPreview</button>
          <h3>favourites</h3>
          {favs.map(favs => (
            <>
              <p>{favs.EpiTitle}</p>

              <audio controls>
                <source src={favs.EpiFile} />
              </audio>
            </>
          ))}
        </div>
      )}

      {(playableAudio.AudioTitle && throwSignUp !== 'signUpPhase') &&
        <div className='audioControl'>
          <p>{playableAudio.AudioTitle}</p>
          <audio src={playableAudio.AudioFile} controls autoPlay />
          <button onClick={() => setPlayableAudio(prev => ({ ...prev, AudioTitle: null, AudioFile: null }))} >Close</button>
        </div>
      }
    </>
  );
}
export default App;

