import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// export const providerOptions = {
//     walletlink: {
//         package: CoinbaseWalletSDK, // Required
//         options: {
//             appName: "Web 3 Modal Demo", // Required
//             infuraId: process.env.REACT_APP_INFURAKEY // Required unless you provide a JSON RPC url; see `rpc` below
//         }
//     },
//     walletconnect: {
//         package: WalletConnect, // required
//         options: {
//             infuraId: process.env.REACT_APP_INFURAKEY // required
//         }
//     }
// };

const APP_NAME = "My Demo App";
const APP_LOGO_URL = "https://example.com/logo.png";
const INFURA_ID = process.env.REACT_APP_INFURAKEY;
const INFURA_RPC_URL = `https://goerli.infura.io/v3/${INFURA_ID}`;

// Coinbase Wallet Provider
export const getCoinbaseWalletProvider = () => {
    const coinbaseWallet = new CoinbaseWalletSDK({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        darkMode: false,
        overrideIsMetaMask: false
    });
    return coinbaseWallet.makeWeb3Provider(INFURA_RPC_URL, "5");
};

// MetaMask Provider
export const getMetaMaskProvider = () => {
    // We will prefer a provider where the property `isMetaMask` is set to true
    return (
        window.ethereum?.providers?.find((p) => !!p.isMetaMask) ?? window.ethereum
    );
};

// WalletConnect Provider
export const getWalletConnectProvider = () => {
    return new WalletConnect({
        infuraId: INFURA_ID
    });
};
