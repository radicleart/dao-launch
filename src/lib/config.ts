
export interface Config {
    VITE_PUBLIC_APP_NAME: string;
    VITE_PUBLIC_APP_VERSION: string;
    VITE_API_BACKEND: string;
    VITE_API_STACKS: string;
    VITE_API_STXECO: string;
    VITE_NETWORK: string;
}
  
export const config: { [key: string]: Config } = {
    "local": {
        VITE_PUBLIC_APP_NAME: 'Runes AI',
        VITE_PUBLIC_APP_VERSION: '1.0.0',
        VITE_API_BACKEND: 'http://localhost:6060',
        VITE_API_STACKS: 'http://localhost:3999',
        VITE_API_STXECO: 'https://mainnet.bridge.sbtc.tech',
        VITE_NETWORK: 'regtest',
    },
    "production": {
        VITE_PUBLIC_APP_NAME: 'Runes AI',
        VITE_PUBLIC_APP_VERSION: '1.0.0',
        VITE_API_BACKEND: 'http://localhost:6060',
        VITE_API_STACKS: 'http://localhost:3999',
        VITE_API_STXECO: 'https://mainnet.bridge.sbtc.tech',
        VITE_NETWORK: 'regtest',
    }
};