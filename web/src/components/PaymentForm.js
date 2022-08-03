import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment`, {
          amount: 1.11,
          id
        })

        if (response.data.success) {
          console.log("Pagamento efetuado com sucesso");
          setSuccess(true);
        }

      } catch (error) {
        console.warn("Erro:", error);
        setSuccess(false);
      }
    } else {
      console.warn("Erro:", error.message);
      setSuccess(false);
    }
  }

  return (
    <>
      {!success ?
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pagar</button>
        </form>
        :
        <div>
          <h2>Compra realizada com sucesso.</h2>
        </div>
      }
    </>
  )
}

// Fake Card: 4242 4242 4242 4242 - 04/24 - 29872
