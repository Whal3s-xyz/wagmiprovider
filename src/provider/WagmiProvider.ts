import {WalletProviderInterface} from "@whal3s/whal3s.js";

import {GetAccountResult} from "@wagmi/core";
import {Network} from "@whal3s/whal3s.js/build/types/types";

class WagmiProvider extends EventTarget implements WalletProviderInterface {
    public account: GetAccountResult;
    public _address: string | undefined;

    constructor(account: GetAccountResult) {
        super()
        this.account = account;
        this._initializeAccount()

    }

    _handlePossibleAddressChanged() {
        if (this.account.address !== this._address) {
            this.dispatchEvent(new Event("addressChanged"))
            this._address = this.account.address
        }
    }
    _initializeAccount() {
        this._handlePossibleAddressChanged()
    }

    setAccount(account: GetAccountResult) {
        this.account = account;
        this._initializeAccount()

    }

    get address(): string | undefined {
        return this.account.address;
    }


    async getAddress(): Promise<string | undefined> {
        return Promise.resolve(this.account.address)
    }

    connect(network: Network): Promise<boolean> {
        console.log(network)
        return Promise.resolve(false);
    }

    async onSameNetwork(network: Network): Promise<boolean> {
        if (!this.account?.connector?.getChainId) {
            throw("No connector available")
        }
        const currentChainId = await this.account.connector?.getChainId()
        return Promise.resolve(currentChainId === network.id)
    }

    async signMessage(message: string): Promise<string> {

        if (!this.account?.connector) {
            console.log(this.account)
            console.log(this.account?.connector)
            throw("No connector available")
        }

        // return signMessage({message})
        const walletClient = await this.account.connector?.getWalletClient()
        if (!walletClient) {
            return Promise.reject("No wallet client available")
        }
        console.log(walletClient)
        return walletClient.signMessage({
            message: message,
        })



    }


    async switchNetwork(network: Network): Promise<boolean> {
        if (!this.account?.connector?.switchChain)
            return Promise.resolve(false)
        const switchedChain = await this.account?.connector?.switchChain(network.id)
        return Promise.resolve(switchedChain?.id === network.id)
    }


}

export default WagmiProvider
