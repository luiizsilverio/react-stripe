require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Rotas

app.post("/payment", async (req, res) => {
  const { amount, id, email, name } = req.body;

  const paymentOptions = {
    amount,
    currency: "BRL",
    description: "My-Shopee",
    payment_method: id,
    confirm: true,
  }

  // opcionalmente, podemos passar os dados do cliente (nome, email)
  if (email && name) {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    paymentOptions.customer = customer.id;
  }

  try {
    const payment = await stripe.paymentIntents.create(paymentOptions);

    const data = {
      id: payment.id,
      customer: payment.customer,
      message: payment.charges.data[0].outcome.seller_message,
      status: payment.charges.data[0].outcome.type,
      url: payment.charges.data[0].receipt_url,
    }

    // console.log(JSON.stringify(data));

    res.json({
      message: "Pagamento bem sucedido",
      success: true,
      data
    });

  } catch (error) {
    console.warn("Erro:", error);
    res.json({
      message: "Pagamento falhou",
      success: false
    })
  }
});


app.listen(process.env.PORT || 4000, () => {
  console.log("Servidor rodando na porta 4000");
});
