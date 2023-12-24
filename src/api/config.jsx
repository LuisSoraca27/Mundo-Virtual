import axios from "axios";


const dksoluciones = axios.create({
    baseURL: "https://mundovirtual-server-production.up.railway.app/api/v1/",
});

export default dksoluciones;