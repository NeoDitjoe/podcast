import React from "react";
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

export default function Cards(props) {

    const [showAllDescription, setShowFullDescription] = React.useState(false);

    const toggleReadMore = () => {
        setShowFullDescription(!showAllDescription);
    };
//NEW CODE ADDED FOR EPISODES
    return (
        <Grid item xs={12} sm={4} md={4} lg={3} className="card-items" onClick={props.click}>
            <img src={props.images} className='img' alt={props.titles} />
            <h3>{props.id}</h3>
            <h2 className="title-control">{props.titles}</h2>
            <h4 className="season-control">Season {props.seasons}</h4>
            <h4 className="date-control">Updated on: {new Date(props.updated).toLocaleDateString()}</h4>
           

  {/* Display the episodes
  <h5>Episodes:</h5>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <strong>{episode.title}</strong>
            <p>{episode.description}</p>
          </li>
        ))}
      </ul> */}

            {showAllDescription ? (
                <h5 className='text-color'>{props.descriptions}</h5>
            ) : (
                <h5 className='text-color'>{props.descriptions.substring(0, 150)}</h5>
            )}

            <Button variant="outlined" onClick={toggleReadMore}>
                {showAllDescription ? 'Read Less' : 'Read More'}
            </Button>
        </Grid>
    );

}


Cards.propTypes = {
    id: PropTypes.number.isRequired,
    titles: PropTypes.string.isRequired,
    seasons: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired, 
    genres: PropTypes.number.isRequired,
    updated: PropTypes.instanceOf(Date).isRequired,
    descriptions: PropTypes.string.isRequired,
};
