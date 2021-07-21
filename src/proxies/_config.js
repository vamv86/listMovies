import Axios from 'axios';
import PeliculaProxy from './PeliculaProxy';


// Agregamos la URL base de nuestra API
//Axios.defaults.baseURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=631ff213';

// Axios default behavior
Axios.defaults.headers.common.Accept = 'application/json';

let url = 'http://www.omdbapi.com/?apikey=631ff213';


export default {
    peliculaProxy: new PeliculaProxy(Axios, url)   
}