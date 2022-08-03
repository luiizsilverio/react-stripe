require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Rotas

app.post("/payment", async (req, res) => {
  let { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "BRL",
      description: "My-Shopee",
      payment_method: id,
      confirm: true
    });

    console.log("Payment", payment);
    res.json({
      message: "Pagamento bem sucedido",
      success: true,
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
