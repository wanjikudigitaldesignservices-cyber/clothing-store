import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const intasendWebhookSecret = Deno.env.get('INTASEND_WEBHOOK_SECRET') || ''

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // 1. Verify the signature/secret (IntaSend usually posts data we can verify, or we check against a secret passed in the webhook URL)
  // Real implementation will depend on IntaSend's specific webhook signature verification. 
  // Let's assume we check a header or a body parameter.
  const signature = req.headers.get('X-IntaSend-Signature')
  // TODO: Add strict signature verification if provided by IntaSend

  try {
    const payload = await req.json()
    const { challenge, invoice_id, state, amount, reference, failed_reason } = payload
    
    // IntaSend setup verification
    if (challenge) {
      return new Response(challenge, { status: 200 })
    }

    // Connect to Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 2. Fetch the corresponding order by the reference or invoice_id
    // Assuming 'reference' is our order_number or payments.intasend_ref
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*, orders(*)')
      .eq('intasend_ref', invoice_id)
      .single()

    if (paymentError || !payment) {
      console.error('Payment not found:', invoice_id)
      return new Response('Payment not found', { status: 404 })
    }

    // 3. Idempotency Check: if payment is already completed/failed, ignore
    if (payment.status === 'completed' || payment.status === 'failed') {
      return new Response('Already processed', { status: 200 })
    }

    // 4. Update status based on IntaSend 'state'
    // IntaSend states: PENDING, COMPLETED, FAILED
    let newPaymentStatus = 'pending'
    let newOrderStatus = payment.orders.status

    if (state === 'COMPLETED' || state === 'COMPLETE') {
      newPaymentStatus = 'completed'
      newOrderStatus = 'paid'
    } else if (state === 'FAILED') {
      newPaymentStatus = 'failed'
    }

    // 5. Apply the updates in a transaction-like way
    await supabase
      .from('payments')
      .update({ status: newPaymentStatus })
      .eq('id', payment.id)

    if (newOrderStatus !== payment.orders.status) {
      await supabase
        .from('orders')
        .update({ status: newOrderStatus, payment_status: newPaymentStatus })
        .eq('id', payment.orders.id)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})
