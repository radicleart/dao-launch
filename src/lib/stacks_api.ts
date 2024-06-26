import { getConfig } from "$stores/store_helpers";

export async function fetchDataVar(contractAddress:string, contractName:string, dataVarName:string) {
  try {
    //checkAddressForNetwork(getConfig().network, contractAddress)
    const url = `${getConfig().VITE_API_STACKS}/v2/data_var/${contractAddress}/${contractName}/${dataVarName}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch(err) {
    console.log('fetchDataVar: ' + (err as {message:string}).message + ' contractAddress: ' + contractAddress);
  }
}

export async function lookupContract(contract_id:string) {
  const path = `${getConfig().VITE_API_STACKS}/extended/v1/contract/${contract_id}`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}
export async function isConstructed(contract_id:string) {
  const path = `${getConfig().VITE_API_STACKS}/extended/v1/contract/${contract_id}`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}
export async function fetchStacksInfo() {
  const path = `${getConfig().VITE_API_STACKS}/v2/info`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}
export async function getTokenBalances(principal:string) {
  const path = `${getConfig().VITE_API_STACKS}/extended/v1/address/${principal}/balances`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}

export async function getPoxInfo() {
  const path = `${getConfig().VITE_API_STACKS}/v2/pox`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}

export async function fetchExchangeRates() {
  const path = `${getConfig().VITE_API_STACKS}/bridge-api/v1/btc/tx/rates`;
  try {
    const response = await fetch(path);
    const res = await response.json();
    return res;
  } catch(err) {
    return undefined;
  }
}
