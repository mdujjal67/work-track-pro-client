import { FaRegSquareCheck } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { ImCross } from "react-icons/im";

const EmployeeList = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    });

    const employees = users.filter(employee => employee.role !== 'Admin' && employee.role !== 'HR');

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
                    axiosSecure.put(`/users/${employee._id}`)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-center",
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
                            <th>Email</th>
                            <th>Status</th>
                            <th>Bank Account</th>
                            <th>Salary</th>
                            <th>Pay</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => <tr key={employee._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {employee?.isVerified === 'Verified' ? <FaRegSquareCheck className="text-white text-lg"/> : <button onClick={() => handleMakeHR(employee)} className="btn btn-ghost btn-sm ">
                                        <ImCross className="text-red-500 text-lg"></ImCross>
                                    </button>}
                                </td>
                                <td>{employee.bankAccountNumber}</td>
                                <td>$ {employee.salary}</td>
                                <td><button className="btn btn-xs lg:btn-sm bg-green-500 text-white">Pay</button></td>
                                <td><button className="btn btn-xs lg:btn-sm bg-blue-500 text-white">Details</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;