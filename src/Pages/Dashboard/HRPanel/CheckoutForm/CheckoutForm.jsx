import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import PropTypes from "prop-types"

const CheckoutForm = ({ selectedEmployee, month, year, setMonth, setYear, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } 
        else {
            console.log('[PaymentMethod]', paymentMethod);

            // Assume payment processing is successful
            onSuccess();
            setError('')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value.toUpperCase())}
                className="input input-bordered w-full my-4 focus:ring focus:ring-[#00a1ea] focus:border-[#00a1ea] active:border-[#00a1ea] "
                placeholder="Enter month"
                required
            />
            <input
                type="text"
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

            <button type="submit" disabled={!stripe} className="btn btn-ghost btn-sm text-white bg-[#00a1ea] mt-3">
                Pay
            </button>
            <p className="text-[12px] text-red-500">{error}</p>
        </form>
    );
};

CheckoutForm.propTypes = {
    selectedEmployee: PropTypes.object,
    onSuccess: PropTypes.object,
    month:PropTypes.object, 
    year:PropTypes.object, 
    setMonth:PropTypes.object, 
    setYear:PropTypes.object
};
export default CheckoutForm;
