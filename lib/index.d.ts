import { WalletProviderInterface } from '@whal3s/whal3s.js';
import { GetAccountResult } from '@wagmi/core';
import { Network } from '@whal3s/whal3s.js/build/types/types';

declare class WagmiProvider extends EventTarget implements WalletProviderInterface {
    account: GetAccountResult;
    _address: string | undefined;
    constructor(account: GetAccountResult);
    _handlePossibleAddressChanged(): void;
    _initializeAccount(): void;
    setAccount(account: GetAccountResult): void;
    get address(): string | undefined;
    getAddress(): Promise<string | undefined>;
    connect(network: Network): Promise<boolean>;
    onSameNetwork(network: Network): Promise<boolean>;
    signMessage(message: string): Promise<string>;
    switchNetwork(network: Network): Promise<boolean>;
}

export { WagmiProvider };
