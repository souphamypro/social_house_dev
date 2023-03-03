import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
    // walletlink: {
    //     package: CoinbaseWalletSDK, // Required
    //     options: {
    //         appName: "Web 3 Modal Demo", // Required
    //         infuraId: process.env.REACT_APP_INFURAKEY // Required unless you provide a JSON RPC url; see `rpc` below

    //     }
    // },
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: process.env.REACT_APP_INFURAKEY // required
        }
    }
};