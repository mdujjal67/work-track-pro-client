import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMemo, useState } from "react";
import dayjs from "dayjs";


const Progress = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedName, setSelectedName] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const { data: works = [] } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const res = await axiosSecure.get('/workSheet')
            return res.data
        }
    });


    // Get unique employee names
    const employeeNames = useMemo(() => {
        const names = works.map(work => work.name);
        return [...new Set(names)];
    }, [works]);

    // Get unique months
    const months = useMemo(() => {
        const monthNames = works.map(work => dayjs(work.date).format("MMMM"));
        return [...new Set(monthNames)];
    }, [works]);

    // Filter works based on selected name and month
    const filteredWorks = useMemo(() => {
        return works.filter(work => {
            const isNameMatch = selectedName ? work.name === selectedName : true;
            const isMonthMatch = selectedMonth ? dayjs(work.date).format("MMMM") === selectedMonth : true;
            return isNameMatch && isMonthMatch;
        });
    }, [works, selectedName, selectedMonth]);
    console.log(filteredWorks);

    const totalWorkHours = useMemo(() => {
        return filteredWorks.reduce((total, work) => total + parseFloat(work.hoursWorked), 0);
    }, [filteredWorks]);


    return (
        <div className="mx-auto container">
            <h1 className="text-3xl font-bold text-center my-10"> Work Records:</h1>

            <div className="input-bordered md:flex gap-4 cursor-pointer required text-black w-[200px] lg:w-[600px] mx-auto outline-none focus:outline-none focus:ring focus:ring-opacity-50 focus:dark:ring-violet-600 rounded-full lg:mt-10 lg:mb-14">
                {/* select by name */}
                <select
                    name="name"
                    className="select rounded-lg join-item text-black w-full outline-none focus:outline-none focus:ring focus:ring-opacity-50 py-3 focus:dark:ring-violet-600 bg-gray-100"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    required
                >
                    <option value="">Filter by Employee Name</option>
                    {
                        employeeNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))
                    }
                </select>

                {/* seelct by months */}
                <select
                    name="month"
                    className="select rounded-lg join-item text-black w-full outline-none focus:outline-none focus:ring focus:ring-opacity-50 py-3 focus:dark:ring-violet-600 bg-gray-100"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    required
                >
                    <option value="">Filter by Month</option>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            <div className="text-center my-4">
            <p className="text-lg font-semibold">Total Work Hours: {totalWorkHours.toLocaleString()}</p>


            </div>

            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-base-300">
                        <th></th>
                        <th>Employee Name</th>
                        <th>Task Name</th>
                        <th>Hours Worked</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredWorks.map((work, index) => <tr key={work._id} className="bg-base-100">
                            <th>{index + 1}</th>
                            <td>{work.name}</td>
                            <td>{work.taskName}</td>
                            <td>{work.hoursWorked}</td>
                            <td>{work.date}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Progress;