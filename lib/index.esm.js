/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class WagmiProvider extends EventTarget {
    constructor(account) {
        super();
        this.account = account;
        this._initializeAccount();
    }
    _handlePossibleAddressChanged() {
        if (this.account.address !== this._address) {
            this.dispatchEvent(new Event("addressChanged"));
            this._address = this.account.address;
        }
    }
    _initializeAccount() {
        this._handlePossibleAddressChanged();
    }
    setAccount(account) {
        this.account = account;
        this._initializeAccount();
    }
    get address() {
        return this.account.address;
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.account.address);
        });
    }
    connect(network) {
        console.log(network);
        return Promise.resolve(false);
    }
    onSameNetwork(network) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = this.account) === null || _a === void 0 ? void 0 : _a.connector) === null || _b === void 0 ? void 0 : _b.getChainId)) {
                throw ("No connector available");
            }
            const currentChainId = yield ((_c = this.account.connector) === null || _c === void 0 ? void 0 : _c.getChainId());
            return Promise.resolve(currentChainId === network.id);
        });
    }
    signMessage(message) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.account) === null || _a === void 0 ? void 0 : _a.connector)) {
                console.log(this.account);
                console.log((_b = this.account) === null || _b === void 0 ? void 0 : _b.connector);
                throw ("No connector available");
            }
            // return signMessage({message})
            const walletClient = yield ((_c = this.account.connector) === null || _c === void 0 ? void 0 : _c.getWalletClient());
            if (!walletClient) {
                return Promise.reject("No wallet client available");
            }
            console.log(walletClient);
            return walletClient.signMessage({
                message: message,
            });
        });
    }
    switchNetwork(network) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = this.account) === null || _a === void 0 ? void 0 : _a.connector) === null || _b === void 0 ? void 0 : _b.switchChain))
                return Promise.resolve(false);
            const switchedChain = yield ((_d = (_c = this.account) === null || _c === void 0 ? void 0 : _c.connector) === null || _d === void 0 ? void 0 : _d.switchChain(network.id));
            return Promise.resolve((switchedChain === null || switchedChain === void 0 ? void 0 : switchedChain.id) === network.id);
        });
    }
}

export { WagmiProvider };
//# sourceMappingURL=index.esm.js.map
