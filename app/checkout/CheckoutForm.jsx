import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { styles } from "../style";

export default function CheckoutForm({totalAmount}) {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Vérification en cours...");
          break;
        case "requires_payment_method":
          setMessage("Votre paiement a échoué, veuillez réessayer.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/clearCart`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 gap-5 my-[5rem] p-3">
        <div className="w-full flex flex-col items-start gap-5 p-[1rem] ">
            <div className="w-full flex justify-between">
                <h3 className="text-[1.7rem] font-black">Total</h3>
                <span className="text-[1.2rem] font-black">{totalAmount/100} €</span>
            </div>
            <div className="flex flex-col items-start w-full">
                <label htmlFor="address">Rue</label>
                <input 
                 required
                 type="text"
                 id="address"
                 className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                 placeholder="12 rue victore hugo" />
            </div>
            <div className="grid grid-cols-2 items-center gap-7">
                <div className="flex flex-col items-start">
                    <label htmlFor="postal">Code Postale</label>
                    <input 
                    required
                    type="number"
                    id="postal"
                    className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                    placeholder="52000" />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="city">Ville</label>
                    <input 
                    type="text"
                    required
                    id="city"
                    className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                    placeholder="Lille" />
                </div>
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="message">Instructions (facultatif)</label>
                <textarea
                 rows={5}
                 cols={50}
                 type="text"
                 id="address"
                 className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                 placeholder="Je souhaite..."></textarea>
            </div>
        </div>
        <div>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className={styles.btnPrimary}>
                {isLoading ? <div className="spinner" id="spinner"></div> : "PAYER"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </div>
    </form>
  );
}