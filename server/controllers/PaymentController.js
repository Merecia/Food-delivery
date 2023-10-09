import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(secretKey);

export const payment = () => {
    stripe.charges.create(
        {
            source: request.body.params.tokenId,
            amount: request.body.params.amount,
            currency: 'usd'
        }, (stripeError, stripeResponse) => {
            if (stripeError) {
                console.log(stripeError);
                return response.status(500).json(stripeError);
            } else {
                response.status(200).json(stripeResponse);
            }
        }
    );
}