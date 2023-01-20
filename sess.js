const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const sessionId = async function () {
    const product = await stripe.products.create({
        name: "Reservation",
        description: "Your Stay"
    })

const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 12000,
    currency: "usd"
})

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
        {
            price: price.id,
            quantity:  1, 
        }
    ],
    mode:'payment',
    success_url: "localhost:3000/myprofile",
    cancel_url:"localhost:3000/error"
})
}