import axios from "axios";


const axiosPublic = axios.create({
    // baseURL: 'https://work-track-pro-server.vercel.app'
    baseURL: 'http://localhost:9000'
})

const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;