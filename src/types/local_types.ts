import type { AddressObject, ExchangeRate, PoxInfo, SbtcUserSettingI, StacksBalance, StacksInfo } from "@mijoco/stx_helpers/dist/index";

export type SessionStore = {
  name: string;
  loggedIn: boolean,
  balances?: StacksBalance,
  keySets: { [key: string]: AddressObject; };
  userSettings:SbtcUserSettingI;
  poxInfo:PoxInfo,
  exchangeRates: Array<ExchangeRate>
  stacksInfo: StacksInfo;
};


