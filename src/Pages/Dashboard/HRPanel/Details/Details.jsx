import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Details = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: payments, isLoading, error } = useQuery({
        queryKey: ['employee', email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/payments/${email}`);
                return res.data; // Assuming the data is an array of payment objects
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error("Error fetching data");
            }
        }
    });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      
    }

    if (error || !payments) {
        return <div>Error fetching data</div>;
    }

    // Assuming each payment object has the employee details and payment details
    const employee = payments[0];
    // console.log(employee)

    if (!employee) {
        return <div className="mt-20 lg:mt-60 h-screen">
            <h2 className="text-2xl font-semibold text-center">No salary has been processed for this employee.</h2>
            <p className="text-center">Please initiate <Link to='/dashboard/employee-list' className="text-blue-500 hover:underline">payment</Link> to view salary details.</p>
        </div>
    }

    const salaryData = payments.map(payment => ({
        monthYear: `${payment.month} ${payment.year}`,
        salary: payment.salary
    }));

    const renderBarChart = (data = []) => (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, "Salary"]} />
                <Legend />
                <Bar dataKey="salary" fill="#8884d8" barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl my-7 text-center font-bold">Employee Details:</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-base-300">
                        <th className="px-2 text-[12px]"></th>
                        <th className="px-2 text-[12px]">Employee Name</th>
                        <th className="px-2 text-[12px]">Employee Designation</th>
                        <th className="px-2 text-[12px]">Employee Salary</th>

                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-base-100">
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={employee.photo} alt="photo" />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-2 text-[12px]">{employee.name}</td>
                        <td className="px-2 text-[12px]">{employee.designation}</td>
                        <td className="px-2 text-[12px]">$ {employee.salary}</td>
                    </tr>
                </tbody>
            </table>
            <div className=" mt-14">
            </div>
            <div className="flex gap-1 items-center mb-8">
                <div className="w-3 h-3 bg-[#8884d8]"></div>
                <p className="text-center text-gray-500 "><span className="text-[#8884d8]">Bar Chart:</span> Salary vs Month-Year plot</p>
            </div>
            <div className="mx-auto w-[80%] lg:w-full ml-16">
                {renderBarChart(salaryData)}
            </div>
        </div>
    );
};

export default Details;
