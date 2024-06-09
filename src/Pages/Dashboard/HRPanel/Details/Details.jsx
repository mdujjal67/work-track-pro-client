import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Details = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: employee, isLoading, error } = useQuery({
        queryKey: ['employee', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !employee) {
        return <div>Error fetching data</div>;
    }

    // Log employee data for debugging
    console.log("Employee Data:", employee);

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
        <ResponsiveContainer width="70%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salary" fill="#8884d8" barSize={60}/>
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div>
            <div className="flex gap-5 mt-8">
                <h1>{employee.name}</h1>
                <p>Email: {employee.email}</p>
                <p>Designation: {employee.designation}</p>
                <img src={employee.photoURL} alt={`${employee.name}'s photo`} />

                <h2 className="mb-10">Salary vs. Month and Year</h2>
            </div>
            {renderBarChart(defaultSalaryData)}
        </div>
    );
};

export default Details;
