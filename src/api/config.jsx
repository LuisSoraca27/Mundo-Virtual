import axios from "axios";
 
// const baseURL = "https://servidor-mundovirtual-production.up.railway.app/api/v1/"
const baseURL = 'http://localhost:4002/api/v1/';

const dksoluciones = axios.create({
    baseURL,
});

export default dksoluciones;