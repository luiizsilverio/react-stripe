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

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment`, {
          amount: 110, /* multiplicar por 100. Assim, para valor 1.10, informe 110 */
          id,
          name: "Luiiz S.",
          email: "luiiz@gmail.com" /* name e email opcionais */
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
