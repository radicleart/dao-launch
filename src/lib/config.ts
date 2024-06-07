const REGTEST_CONFIG = {
    VITE_PUBLIC_APP_NAME: 'Runes AI',
    VITE_PUBLIC_APP_VERSION: '1.0.0',
    VITE_API_BACKEND: 'http://localhost:6060',
    VITE_API_STACKS: 'http://localhost:3999',
    VITE_API_STXECO: 'https://mainnet.bridge.sbtc.tech/bridge-api/v1/btc/tx/rates',
    VITE_NETWORK: 'regtest',
}

export let CONFIG = REGTEST_CONFIG;

export function setConfigByUrl() {
    CONFIG = REGTEST_CONFIG;
}
