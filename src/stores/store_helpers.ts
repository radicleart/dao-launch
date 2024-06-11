import { get } from 'svelte/store';
import { configStore } from '$stores/stores_config';
import { type Config } from '$lib/config';

export function getConfig(): Config {
  return get(configStore);
}