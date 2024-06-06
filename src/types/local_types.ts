
export type SessionStore = {
  name: string;
  loggedIn: boolean,
  keySets: { [key: string]: AddressObject; };
  userSettings:SbtcUserSettingI;
  poxInfo:PoxInfo,
  exchangeRates: Array<ExchangeRate>
  stacksInfo: StacksInfo;

};
export type StacksInfo = {
  burn_block_height: number;
  server_version: string;
  network_id: number;
  stacks_tip_height: number;
}
export type SbtcUserSettingI = {
  debugMode: boolean;
  testAddresses: boolean;
  currency: {
    cryptoFirst: boolean;
    myFiatCurrency: ExchangeRate;
    denomination: string;
  }
}
export type GovernanceData = {
  totalSupply:number;
  userLocked:number;
  userBalance:number;
}
export type ExchangeRate = {
  _id: string;
  currency: string;
  fifteen: number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
  name: string;
}

export type DaoTemplate = {
  addresses: Array<string>;
  tokenName?: string;
  tokenSymbol?: string;
  tokenUrl?: string;
}
export type AddressObject = {
  stxAddress: string;
  cardinal: string;
  ordinal: string;
  sBTCBalance: number;
  stxBalance: number;
  stacksTokenInfo?: AddressHiroObject;
  bnsNameInfo?: {names:Array<string>};
  cardinalInfo?: AddressMempoolObject;
  ordinalInfo?: AddressMempoolObject;
  btcPubkeySegwit0?: string;
  btcPubkeySegwit1?: string;
};

export type AddressMempoolObject = {
  address: string;
  chain_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  },
  mempool_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  }
}

export type AddressHiroObject = {
    stx: {
      balance: number;
      total_sent: number;
      total_received: number;
      lock_tx_id: string;
      locked:number;
      lock_height: number;
      burnchain_lock_height: number;
      burnchain_unlock_height: number;
    },
    fungible_tokens: unknown,
    non_fungible_tokens: unknown
}
export type PoxInfo = {
  contract_id: string;
  pox_activation_threshold_ustx: number;
  first_burnchain_block_height: number;
  current_burnchain_block_height: number;
  prepare_phase_block_length: number;
  reward_phase_block_length: number;
  reward_slots: number;
  rejection_fraction: number;
  total_liquid_supply_ustx: number;
  current_cycle: {
      id: number;
      min_threshold_ustx:number;
      stacked_ustx: number;
      is_pox_active: boolean;
  },
  next_cycle: {
      id: number;
      min_threshold_ustx: number;
      min_increment_ustx: number;
      stacked_ustx: number;
      prepare_phase_start_block_height: number;
      blocks_until_prepare_phase: number;
      reward_phase_start_block_height: number;
      blocks_until_reward_phase: number;
      ustx_until_pox_rejection: number;
  },
  min_amount_ustx:number;
  prepare_cycle_length: number;
  reward_cycle_id:number;
  reward_cycle_length: number;
  rejection_votes_left_required: number;
  next_reward_cycle_in: number;
  contract_versions: [
      {
          contract_id: string;
          activation_burnchain_block_height: number;
          first_reward_cycle_id: number;
      },
      {
          contract_id: string;
          activation_burnchain_block_height: number;
          first_reward_cycle_id: number;
      },
      {
          contract_id: string;
          activation_burnchain_block_height: number;
          first_reward_cycle_id: number;
      }
  ]

}
export type SbtcContractDataType = {
  coordinator?: { addr: { value: string }, key:string };
  contractId: string;
  contractOwner: string;
  sbtcWalletAddress: string;
  sbtcWalletPublicKey: string;
  numKeys?: number;
  numParties?: number;
  tradingHalted?: boolean;
  tokenUri?: string;
  threshold?: number;
  totalSupply?: number;
  decimals?: number;
  name?: string;
  burnHeight?: number;
}
