// Reemplaza por tu pasarela (Wompi, Stripe, MercadoPago). Tokeniza la tarjeta en tu backend; nunca guardes el número completo.
export async function processPayment({amount,card}){
  await new Promise(r=>setTimeout(r,2200))
  return {ok:true,code:'ANI-'+Math.random().toString(36).slice(2,8).toUpperCase()}
}
