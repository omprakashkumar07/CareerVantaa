const url = 'http://localhost:3000';

async function runTests() {
  console.log('Testing GET /health');
  const res1 = await fetch(`${url}/health`);
  console.log(await res1.json());

  console.log('Testing Invalid Product ID');
  const res2 = await fetch(`${url}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'invalid_product' })
  });
  console.log(res2.status, await res2.json());

  console.log('Testing create-order (Amount Manipulation Protection: product dictates amount)');
  const res3 = await fetch(`${url}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'starter', amount: 100 }) // Should ignore amount
  });
  
  // This might fail if Razorpay keys are not set, which is expected.
  // We just want to see if it reaches the Razorpay error or returns 500 correctly.
  console.log(res3.status);
  try {
    console.log(await res3.json());
  } catch (e) {}
}

runTests();
