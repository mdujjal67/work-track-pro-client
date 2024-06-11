import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Details = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: employeeArray, isLoading, error } = useQuery({
        queryKey: ['employee', email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/payments/${email}`);
                return res.data; // Assuming the data is an array of employee objects
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error("Error fetching data");
            }
        }
    });

    if (isLoading) {
        return <span className="loading loading-ring loading-lg mt-[300px] ml-[600px] pb-10"></span>
    }

    if (error || !employeeArray) {
        return <div>Error fetching data</div>;
    }

    // Assuming employeeArray contains all employees
    const employee = employeeArray.find(emp => emp.email === email);

    if (!employee) {
        return <div className=" mt-20 lg:mt-60  h-screen ">
            <h2 className="text-2xl font-semibold text-center">No salary has been processed for this employee.</h2>
            <p className="text-center">Please initiate <Link to='/dashboard/employee-list' className="text-blue-500 hover:underline">payment</Link> to view salary details.</p>
        </div>
    }

    // Default salary data for demonstration purposes
    const defaultSalaryData = [
        { monthYear: 'Jan 2023', salary: 5000 },
        { monthYear: 'Feb 2023', salary: 5200 },
        { monthYear: 'Mar 2023', salary: 4800 },
        { monthYear: 'Apr 2023', salary: 5000 },
        { monthYear: 'May 2023', salary: 5300 },
        { monthYear: 'Jun 2023', salary: 5500 },
    ];

    const renderBarChart = (data = []) => (
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salary" fill="#8884d8" barSize={50}/>
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div>
            <div className="flex gap-5 mt-8">
                <h1>{employee.name}</h1>
                <p>Email: {employee.email}</p>
                <p>Designation: {employee.designation}</p>
                <p>Salary: {employee.salary}</p> 
                <img src={employee.photoURL} alt={`${employee.name}'s photo`} />

                <h2 className="mb-10">Salary vs. Month and Year</h2>
            </div>
            {renderBarChart(defaultSalaryData)}
        </div>
    );
};

export default Details;
