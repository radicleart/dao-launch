import type { DaoTemplate } from '@mijoco/stx_helpers/dist/dao';
import { deployer_roles } from './dao_helper';
import { getConfig } from '$stores/store_helpers';

export async function launchDao(template:DaoTemplate) {
  const path = `${getConfig().VITE_API_BACKEND}/dao/v1/launch`;
  const response = await fetch(path, {
    method: 'POST',
    headers:  { 'Content-Type': 'application/json', 'Authorization': '' },
    body: JSON.stringify(template)
  });

  if (response.status !== 200) {
    return {
      error: 'Error broadcasting',
      status: response.status
    }
  }
  return await response.json();
}

export async function constructDao(address:string) {
  console.log(JSON.stringify(deployer_roles))
  const path = `${getConfig().VITE_API_BACKEND}/dao/v1/construct/${address}`;
  const response = await fetch(path);
  const res = await response.json();
  return res;
}

