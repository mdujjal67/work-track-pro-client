import { FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDangerous } from "react-icons/md";
import Swal from "sweetalert2";

const AllEmployee = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    });

    const employees = users.filter(employee => employee.role !== 'Admin' && employee.isVerified === 'Verified');

    const handleMakeHR = employee => {
        console.log("User:", employee);
        Swal.fire({
            title: "Are you sure?",
            text: `${employee.name} will be an HR!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make HR!"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${employee._id}`)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    // position: "top-center",
                                    icon: "success",
                                    title: `${employee.name} is an HR Now!`,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                }
            })

    }

    return (
        <div className="container mx-auto">
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
                                    {employee?.role === 'HR' ? 'Already HR' : <button onClick={() => handleMakeHR(employee)} className="btn btn-ghost btn-sm  bg-[#00a1ea]">
                                        <FaUsers className="text-white text-lg"></FaUsers>
                                    </button>}
                                </td>
                                <th>
                                    {
                                        employee.employeeStatus === 'Fired' ? <span className="text-red-500 font-semibold">Fired</span>
                                            :
                                            <button className="btn btn-ghost btn-sm bg-red-500" >
                                                <MdDangerous className="text-white text-xl"></MdDangerous>
                                            </button>
                                    }
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