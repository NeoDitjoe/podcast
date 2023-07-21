import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
// import PropTypes from 'prop-types';
import './stylesheet.css'

export default function Cards(props){
    return ( 
    <Grid item xs={6} className="grid-items">
    
        <h2>{props.id}</h2>
        <h3>{props.titles}</h3>
        <p>{props.seasons}</p>
        <img src={props.images} className='img'></img>
        <h4>{new Date(props.updated).toLocaleDateString()}</h4>
        <p>{props.descriptions}</p> 
        <Button variant="outlined"> Read More </Button>
    </Grid>
    );
} 