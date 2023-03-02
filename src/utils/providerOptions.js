import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import {isMobile} from 'react-device-detect';

const providerOptions = {
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: process.env.REACT_APP_INFURAKEY // required
        }
    }
};

const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions // required
});

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
    return web3Modal.connect();
    // console.log(isMobile);
    // if (isMobile) {
    //     return web3Modal.connect();
    // } else {
    //     return (
    //         window.ethereum?.providers?.find((p) => !!p.isMetaMask) ?? window.ethereum
    //     );
    // }
    // const metamaskWallet = new WalletConnect({
    //     appName: APP_NAME,
    //     appLogoUrl: APP_LOGO_URL,
    //     darkMode: false,
    //     overrideIsMetaMask: false
    // });
    // return metamaskWallet.makeWeb3Provider(INFURA_RPC_URL, "5");
};

// WalletConnect Provider
export const getWalletConnectProvider = () => {
    return new WalletConnect({infuraId: INFURA_ID});
};
