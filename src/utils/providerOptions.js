import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            infuraId: process.env.REACT_APP_INFURAKEY // Required unless you provide a JSON RPC url; see `rpc` below
        }
    },
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: process.env.REACT_APP_INFURAKEY // required
        }
    }
};
