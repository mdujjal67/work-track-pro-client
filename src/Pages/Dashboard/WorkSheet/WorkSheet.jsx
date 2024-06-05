import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkSheet = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = (data) => {
        console.log(data)
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
            <form onSubmit={handleSubmit(onSubmit)} className="lg:flex lg:gap-3 ">
                {/* This is for Tasks field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Tasks</span>
                    </label>
                    <select  {...register("role", { required: true })} name="role" className="select select-bordered" >
                        <option disabled selected>Tasks</option>
                        <option value="Sales">Sales</option>
                        <option value="Content">Content</option>
                        <option value="Support">Support</option>
                        <option value="Paper-Work">Paper-Work</option>
                    </select>
                    {errors.role && <span className="text-red-500">Role is required</span>}
                </div>

                {/* This is for hour worked field*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hours Worked</span>
                    </label>
                    <input {...register("bankAccountNumber", { required: true })} type="number" name="bankAccountNumber" placeholder="Hours Worked" className="input input-bordered" />
                    {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>}
                </div>

                {/* This is for date field*/}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Salary</span>
                    </label>
                    <DatePicker name="date" className="border border-gray-300 py-3 rounded-lg pl-5" selected={startDate} onChange={(date) => setStartDate(date)} required />
                    {errors.salary && <span className="text-red-500">Salary is required</span>}
                </div>

                <div className="form-control mt-[35px]">
                    <input type="submit" className="btn bg-[#00a1ea] text-white w-full" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default WorkSheet;