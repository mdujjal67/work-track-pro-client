import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { ImCross } from "react-icons/im";
import { FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [paidMonths, setPaidMonths] = useState({});

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const employees = users.filter(employee => employee.role !== 'Admin' && employee.role !== 'HR');

    const handleVerifyEmployee = employee => {
        Swal.fire({
            title: "Verify This Employee?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verify!"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.put(`/users/${employee._id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-center",
                                    icon: "success",
                                    title: `${employee.name} is verified Now!`,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        });
                }
            });
    };

    const openPayModal = employee => {
        setSelectedEmployee(employee);

        // Check if the employee has already been paid for the selected month and year
        const monthYear = `${month}-${year}`;
        if (paidMonths[employee._id] && paidMonths[employee._id].includes(monthYear)) {
            Swal.fire({
                icon: "error",
                title: `Payment Error`,
                text: `Employee ${employee.name} has already been paid for the month of ${monthYear}`,
            });
        } else {
            setIsModalOpen(true);
        }
    };

    const handlePaySuccess = (monthYear) => {
        // Update the list of paid months for the selected employee
        const employeeId = selectedEmployee._id;
        const paidMonthsForEmployee = paidMonths[employeeId] || [];

        setPaidMonths({
            ...paidMonths,
            [employeeId]: [...paidMonthsForEmployee, monthYear],
        });

        Swal.fire({
            icon: "success",
            title: `Salary Paid to ${selectedEmployee.name} for the ${monthYear}`,
            showConfirmButton: false,
            timer: 2000
        });

        // Clear month and year inputs
        setMonth('');
        setYear('');
        setSelectedEmployee(null);
        setIsModalOpen(false);
        refetch();
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-evenly my-4">
                <h3 className="text-3xl font-bold my-8">Employees: {employees.length}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
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
                        {employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <th>{index + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {employee?.isVerified === 'Verified' ? (
                                        <FaCheckSquare className="bg-white text-green-500 text-xl ml-3" />
                                    ) : (
                                        <button onClick={() => handleVerifyEmployee(employee)} className="btn btn-ghost btn-sm">
                                            <ImCross className="text-red-500 text-lg" />
                                        </button>
                                    )}
                                </td>
                                <td>{employee.bankAccountNumber}</td>
                                <td>$ {employee.salary}</td>
                                <td>
                                    <button
                                        onClick={() => openPayModal(employee)}
                                        className="btn btn-xs lg:btn-sm bg-green-500 text-white"
                                        disabled={employee?.isVerified !== 'Verified'}
                                    >
                                        Pay
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/dashboard/details/${employee.email}`}>
                                        <button className="btn btn-xs lg:btn-sm bg-[#00a1ea] text-white">Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-10 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Pay Salary for {selectedEmployee.name}</h3>
                        <p>Salary: $ {selectedEmployee.salary}</p>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                selectedEmployee={selectedEmployee}
                                month={month}
                                year={year}
                                setMonth={setMonth}
                                setYear={setYear}
                                onSuccess={handlePaySuccess}
                                paidMonths={paidMonths[selectedEmployee._id] || []}
                            />
                        </Elements>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setMonth('');
                                    setYear('');
                                    setSelectedEmployee(null);
                                    setIsModalOpen(false);
                                }}
                                className="btn btn-ghost btn-sm text-white bg-orange-700 mr-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
