import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";


const useHR = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: isHR, isPending: isHRLoading} = useQuery({
        queryKey: [user?.email, "isHR"],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            console.log(res.data)
            return res.data?.hr;
        }
    });
    return [isHR, isHRLoading]
};

export default useHR;