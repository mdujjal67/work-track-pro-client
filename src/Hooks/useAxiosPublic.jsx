import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://work-track-pro-server.vercel.app/'
})

const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;