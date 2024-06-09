import { FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDangerous } from "react-icons/md";
import Swal from "sweetalert2";
import deleteEmployeeAccount from "./DeleteEmployeeAccount";
import { useState } from "react";


const AllEmployee = () => {

    const axiosSecure = useAxiosSecure();
    const [isTableView, setIsTableView] = useState(true);

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
    };


    const handleFireEmployee = async (employee) => {
        Swal.fire({
            title: "Are you sure?",
            text: `This employee will be fired from your company!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const deleted = await deleteEmployeeAccount(employee);
                    if (deleted) {
                        Swal.fire(
                            'Deleted!',
                            'Employee account has been deleted.',
                            'success'
                        );
                        // You can also handle refetch or any other logic here
                    } else {
                        Swal.fire(
                            'Error!',
                            'Failed to delete employee account.',
                            'error'
                        );
                    }
                }
            });
    };



    return (
        <div className="container mx-auto">
            <div className="flex justify-evenly my-4 items-center">
                <h3 className="text-3xl font-bold lg:my-8 my-4">Employees:</h3>
                <button
                    onClick={() => setIsTableView(!isTableView)}
                    className="btn btn-xs lg:btn-sm bg-blue-500 text-white"
                >
                    {isTableView ? "Card View" : "Table View"}
                </button>
            </div>
            {isTableView ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="bg-base-200 text-[12px] lg:text-[16px]">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Adjust Salary</th>
                                <th>Make HR</th>
                                <th>Fire</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px] lg:text-[16px]">
                            {employees.map((employee, index) => (
                                <tr key={employee._id}>
                                    <th>{index + 1}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        {employee?.role === 'HR' ? 'Already HR' : (
                                            <button
                                                onClick={() => handleMakeHR(employee)}
                                                className="btn btn-ghost btn-sm bg-[#00a1ea]"
                                            >
                                                <FaUsers className="text-white text-lg" />
                                            </button>
                                        )}
                                    </td>
                                    <th>
                                        {employee.employeeStatus === 'Fired' ? (
                                            <span className="text-red-500 font-semibold">Fired</span>
                                        ) : (
                                            <button
                                                onClick={() => handleFireEmployee(employee)}
                                                className="btn btn-ghost btn-sm bg-red-500"
                                            >
                                                <MdDangerous className="text-white text-xl" />
                                            </button>
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {employees.map((employee) => (
                        <div key={employee._id} className="card bg-white shadow-lg rounded-lg">
                            <div className="card-body">
                                <h5 className="card-title text-lg font-semibold">{employee.name}</h5>
                                <p className="card-text">Designation: {employee.designation}</p>
                                <p className="card- my-3">Salary: {employee.salary}</p>
                                <div className="card-actions justify-between">
                                    {employee?.role === 'HR' ? (
                                        <span className="text-green-500">Already HR</span>
                                    ) : (
                                        <button
                                                onClick={() => handleMakeHR(employee)}
                                                className="btn btn-ghost btn-sm bg-[#00a1ea]"
                                            >
                                                <FaUsers className="text-white text-lg" />
                                            </button>
                                    )}
                                    {employee.employeeStatus === 'Fired' ? (
                                        <span className="text-red-500 font-semibold">Fired</span>
                                    ) : (
                                        <button
                                            onClick={() => handleFireEmployee(employee)}
                                            className="btn btn-sm bg-red-500 text-white"
                                        >
                                            Fire
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllEmployee;