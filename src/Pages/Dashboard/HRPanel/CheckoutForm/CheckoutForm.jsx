import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ selectedEmployee, month, year, setMonth, setYear, onSuccess, paidMonths }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { salary: selectedEmployee.salary })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
    }, [selectedEmployee.salary, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Check if payment already exists for the month and year
        const monthYear = `${month}-${year}`;
        if (paidMonths.includes(monthYear)) {
            Swal.fire({
                icon: "error",
                title: `Payment Error`,
                text: `Employee ${selectedEmployee.name} has already been paid for the month of ${monthYear}`,
            });
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);

            // Confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: selectedEmployee?.email || 'anonymous',
                        name: selectedEmployee.name || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                console.log('confirm error', confirmError);
            } else {
                console.log('payment intent', paymentIntent);

                // Save payment info in the database
                const payment = {
                    email: selectedEmployee?.email,
                    name: selectedEmployee?.name,
                    month: month,
                    year: year,
                    transactionId: paymentIntent.id,
                    salary: selectedEmployee?.salary,
                    designation: selectedEmployee?.designation,
                    photo: selectedEmployee?.photoURL
                };
                const res = await axiosSecure.post('/payments', payment);
                console.log(res);

                // Handle payment success
                onSuccess(monthYear);
                setError('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name='month'
                value={month}
                onChange={(e) => setMonth(e.target.value.toUpperCase())}
                className="input input-bordered w-full my-4 focus:ring focus:ring-[#00a1ea] focus:border-[#00a1ea] active:border-[#00a1ea] "
                placeholder="Enter month"
                required
            />
            <input
                type="text"
                name='year'
                value={year}
                onChange={(e) => setYear(e.target.value.slice(0, 4))}
                className="input input-bordered w-full mb-4 focus:ring focus:ring-[#00a1ea] focus:border-[#00a1ea] active:border-[#00a1ea]"
                placeholder="Enter year"
                required
            />
            <h2 className="text-lg font-bold my-4">Company Account:</h2>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            backgroundColor: '#F9FAFB',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-ghost btn-sm text-white bg-[#00a1ea] mt-3">
                Pay
            </button>
            <p className="text-[12px] text-red-500">{error}</p>
        </form>
    );
};

CheckoutForm.propTypes = {
    selectedEmployee: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired,
    month: PropTypes.string.isRequired, 
    year: PropTypes.string.isRequired, 
    setMonth: PropTypes.func.isRequired, 
    setYear: PropTypes.func.isRequired,
    paidMonths: PropTypes.array.isRequired
};

export default CheckoutForm;
