export default class peliculaProxy {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    getMovies(page, titulo, anio) {
        if(anio){
            return this.axios.get(this.url + `&s=${titulo}&y=${anio}&page=${page}`);
        }else{
             return this.axios.get(this.url + `&s=${titulo}&page=${page}`);  
        }
    }
}