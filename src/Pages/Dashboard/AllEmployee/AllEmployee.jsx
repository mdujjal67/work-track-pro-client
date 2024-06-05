import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDangerous } from "react-icons/md";

const AllEmployee = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    });

    const employees = users.filter(employee => employee.role !== 'Admin');


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h3 className="text-3xl font-bold my-8">Employees:</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Make HR</th>
                            <th>Fire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => <tr key={employee._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>{employee.name}</td>
                                <td>{employee.designation}</td>
                                <td>
                                    {employee?.role === 'HR' ? 'HR' : <button  className="btn btn-ghost btn-sm  bg-orange-500">
                                        <FaUsers className="text-white text-lg"></FaUsers>
                                    </button>}
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-sm bg-red-500" >
                                        <MdDangerous className="text-white text-lg"></MdDangerous>
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmployee;