/*  eslint-disable  */

import axios from 'axios';
// import Stripe from 'stripe';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_NKxDE1s7myX98D4LcMiFTHCU');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from the API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
