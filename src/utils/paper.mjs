// export const sdkClientSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250cmFjdElkIjoiNTYzYjYxMWMtMGFmYy00MDNmLWE0YmItMDY5NTlkNDgzMjU0IiwicXVhbnRpdHkiOjEsInVzZVBhcGVyS2V5IjpmYWxzZSwibWV0YWRhdGEiOnt9LCJleHBpcmVzSW5NaW51dGVzIjoxNSwiaGlkZUFwcGxlUGF5R29vZ2xlUGF5IjpmYWxzZSwidGl0bGUiOiIiLCJjYXB0dXJlUGF5bWVudExhdGVyIjpmYWxzZSwibWludE1ldGhvZCI6eyJuYW1lIjoibWludCIsImFyZ3MiOnt9LCJjYWxsT3B0aW9ucyI6eyJnYXNQcmlvcml0eSI6Im1lZGl1bSJ9LCJwYXltZW50Ijp7ImN1cnJlbmN5IjoiRVRIIiwidmFsdWUiOiIwLjAwMiJ9fSwicHJpY2luZ0RldGFpbHMiOnsiY2hhaW5OYW1lIjoiR29lcmxpIiwiY3VycmVuY3lBZGRyZXNzIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiY3VycmVuY3lTeW1ib2wiOiJFVEgiLCJyZWFkYWJsZVByaWNlIjoiMC4wMDIiLCJwcmljZUluV2VpIjp7InR5cGUiOiJCaWdOdW1iZXIiLCJoZXgiOiIweDA3MWFmZDQ5OGQwMDAwIn0sImxvY2tlZFByaWNlVXNkQ2VudHMiOjI3M30sInRyYW5zYWN0aW9uSWQiOiI1NjVjNzcyNS1kZGRjLTQ1NGYtODQ2YS05MjdkODVhZDZiNTIiLCJpYXQiOjE2NjUxMTEyMDQsImV4cCI6MTY2NTExMjEwNCwiaXNzIjoicGFwZXIueHl6In0.qg5Pc9KZ2BV0v6ywYl3CWfoFS70EdlrZ2eVjFcyWYg4'
// const CONTRACT_ID = 'dcf4d482-93f7-4f1c-8112-58e7c6065d1b'
// const CONTRACT_ID = '0171bb5c-82cc-4217-b9f2-f194bf7f45db'
const CONTRACT_ID = 'e8c20f33-7d4f-4705-802c-f7e16bb063b0'
const PAPER_API_KEY = process.env.REACT_APP_PAPER_API_KEY || 'e40d8c06-85ad-41f9-b64e-0b0b62289937'
const EXPIRES_IN_MINS = 15

// export const CHECKOUT_SHAREABLE_LINK = 'https://paper.xyz/checkout/955fb98d-436b-4e0a-8702-b113cfed6ca2'; //old mainnet link
export const CHECKOUT_SHAREABLE_LINK = 'https://paper.xyz/checkout/18af05ff-20e9-4a13-8979-1ea3e5b36c9f'; //testnet link
// export const CHECKOUT_SHAREABLE_LINK = 'https://paper.xyz/checkout/721932e9-f8ef-46d2-8258-a0dda13e7244';
export const getPaperSdkClientSecret = async ({
  walletAddress,
  email,
  quantity,
  priceInEth
}) => {
  const paperCheckoutResp = await fetch(
    `https://paper.xyz/api/2022-08-12/checkout-sdk-intent`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAPER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: CONTRACT_ID,
        walletAddress,
        email,
        quantity,
        metadata: {},
        expiresInMinutes: EXPIRES_IN_MINS,
        mintMethod: {
          name: "mint",
          args: {
            "_address": "$WALLET"
          },
          payment: {
            value: priceInEth,
            currency: "ETH"
          }
        },
        usePaperKey: false,
        hideApplePayGooglePay: false
      }),
    },
  );
  const { sdkClientSecret } = await paperCheckoutResp.json();
  
  return sdkClientSecret
}
