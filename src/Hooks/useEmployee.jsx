import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useEmployee = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: isEmployee, isPending: isEmployeeLoading} = useQuery({
        queryKey: [user?.email, "isEmployee"],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/employee/${user.email}`);
            console.log(res.data)
            return res.data?.employee;
        }
    });
    return [isEmployee, isEmployeeLoading]
};

export default useEmployee;