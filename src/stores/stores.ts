import { persisted } from 'svelte-local-storage-store'
import type { ExchangeRate, PoxInfo, SbtcUserSettingI, SessionStore, StacksInfo } from '$types/local_types';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const sessionStore = persisted('sessionStore', {
    name: 'webapp',
    loggedIn: false,
    model: undefined,
    keySets: undefined,
    userSettings: {} as SbtcUserSettingI, 
    poxInfo: {} as PoxInfo, 
    exchangeRates: {} as Array<ExchangeRate>, 
    stacksInfo: {} as StacksInfo
} as SessionStore);
