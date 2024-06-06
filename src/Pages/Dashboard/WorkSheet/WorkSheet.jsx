import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const WorkSheet = () => {

    const [startDate, setStartDate] = useState(new Date());

    const {user} = useContext(AuthContext);
    const {email, designation} = user

    const handleContactedUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const hoursWorked = form.hoursWorked.value;
        const date = form.date.value;

        const workSheet = { taskName, hoursWorked, date, email, designation};
        console.log(workSheet);

        // send works data to the server 
        fetch('http://localhost:9000/workSheet', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(workSheet)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Added to WorkSheet!',
                        // text: 'Added!',
                        icon: 'success',
                        confirmButtonText: 'Success',
                        timer: 1500
                    });
                    form.reset()
                }
            })

    }

    return (
        <div className="">
            <div className="overflow-x-auto my-20">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr className="bg-base-200">
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* This part is for Form section */}
            <form onSubmit={handleContactedUser} className="lg:flex lg:gap-3 ">
                {/* This is for Tasks field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Tasks</span>
                    </label>
                    <select name="taskName" required className="select select-bordered focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" >
                        <option disabled selected>Tasks</option>
                        <option value="Sales">Sales</option>
                        <option value="Content">Content</option>
                        <option value="Support">Support</option>
                        <option value="Paper-Work">Paper-Work</option>
                    </select>
                    {/* {errors.role && <span className="text-red-500">Role is required</span>} */}
                </div>

                {/* This is for hour worked field*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hours Worked</span>
                    </label>
                    <input  type="number" name="hoursWorked" required placeholder="Hours Worked" className="input input-bordered focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" />
                    {/* {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>} */}
                </div>

                {/* This is for date field*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <DatePicker name="date" className="border border-gray-300 py-3 rounded-lg pl-5 focus:ring focus:ring-blue-500 focus:border-blue-500 active:border-blue-500" selected={startDate} onChange={(date) => setStartDate(date)} required />
                    {/* {errors.salary && <span className="text-red-500">Salary is required</span>} */}
                </div>

                <div className="form-control mt-[35px]">
                    <input type="submit" className="btn bg-[#00a1ea] text-white w-full " value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default WorkSheet;