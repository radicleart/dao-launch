<script lang="ts">
	import Placeholder from '$lib/Components/Placeholder.svelte';
	import { launchDao } from '$lib/backend_api';
	import { CONFIG } from '$lib/config';
  import Banner from '$lib/ui/Banner.svelte';
	import NakamotoBackground from '$lib/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/ui/NakamotoShield.svelte';
	import { sessionStore } from '$stores/stores';
	import type { DaoTemplate } from '$types/local_types';
	import { onMount } from 'svelte';

  let inited = false;
  let errorMessage:string = '';
  let result:string|undefined = undefined;
  const account = $sessionStore.keySets[CONFIG.VITE_NETWORK]
  $: explorerUrl = `${CONFIG.VITE_API_STACKS}/txid/${result}?chain=${CONFIG.VITE_NETWORK}`;
  const template:DaoTemplate = {
    addresses: [],
    tokenName: undefined,
    tokenSymbol: undefined,
    tokenUrl: undefined,
  }

  const useRegtest = () => {
    template.tokenName = 'Bitcoin DAO Governance Token'
    template.tokenSymbol = 'BDG'
    template.tokenUrl = 'http://localhost:8080/token/bdg'
    template.addresses.push('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')
    template.addresses.push('ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5')
    template.addresses.push('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG')
    template.addresses.push('ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC')
  }

  const launch = async () => {
    let key: keyof typeof template;
    for (key in template) {
      const value = template[key];
      if (!value || value.length === 0) errorMessage += '<br/>Value is required for ' + key
    }
    if (errorMessage) return
    const result = await launchDao(template)
  }

  onMount(async () => {
    inited = true
  })

</script>

<svelte:head>
  <title>Ecosystem DAO</title>
  <meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div class="max-w-7xl md:px-6 py-6 relative mx-auto">
  {#if inited}
    <div class="flex flex-col w-full my-8 bg-[#F4F3F0] rounded-2xl">
      <div class="py-10 px-10 md:grid md:gap-12 md:grid-flow-col md:auto-cols-auto overflow-hidden relative">
      <div class="flex flex-col gap-y-2 bg-warning-01">
      <div class="mb-4">
          <h2 class="text-[#131416] text-2xl mb-3">DAO Launcher</h2>
        </div>
        <div class="mb-4 rounded-lg relative bg-[#E6E4E2] px-6 py-6 space-y-3 max-w-xl">
          <div>
            <div class="flex flex-col gap-y-4">
              <div class="flex justify-between">
                <div class="text-xl">
                  Template values
                </div>
                <div class="text-sm">
                  <a href="/" on:click|preventDefault={() => useRegtest()}>use regtest values</a>
                </div>
              </div>
            {#if result}
              <div class="mb-3 max-w-xl">
                <Banner bannerType={'warning'} message={'Your contracts are being deployed. See <a href="'+explorerUrl+'" target="_blank">explorer!</a>' + result} />
              </div>
              {:else}
              <div class="mb-3 max-w-xl">
                <Banner bannerType={'info'} message={'Ensure the addresses are correct for network `' + CONFIG.VITE_NETWORK + '`'} />
              </div>
              {#each Array(4) as _, i}
              <div class="w-full flex flex-col justify-start">
                <label for={'ct-' + i}>Core team member {i + 1}</label>
                <input id={'ct-' + i} class="rounded-lg p-2 text-black border-gray-800" bind:value={template.addresses[i]} type="text" aria-describedby={template.addresses[i]}/>
              </div>
              {/each}

              <div class="w-full flex flex-col justify-start">
                <label for="token-name">Token name</label>
                <input id="token-name" class="rounded-lg p-2 text-black border-gray-800" bind:value={template.tokenName} type="text" aria-describedby="tokenName"/>
              </div>
              <div class="w-full flex flex-col justify-start">
                <label for="token-symbol">Token symbol</label>
                <input id="token-symbol" class="rounded-lg p-2 text-black border-gray-800" bind:value={template.tokenSymbol} type="text" aria-describedby="tokenSymbol"/>
              </div>
              <div class="w-full flex flex-col justify-start">
                <label for="token-url">Token url</label>
                <input id="token-url" class="rounded-lg p-2 text-black border-gray-800" bind:value={template.tokenUrl} type="text" aria-describedby="tokenUrl"/>
              </div>
              <div class="w-full flex justify-start gap-x-4">
                <button on:click={() => {errorMessage = ''; launch()}} class="justify-center w-[150px] md:inline-flex items-center gap-x-1.5 bg-success-01 px-4 py-2 rounded-xl border border-black bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50">
                  LAUNCH DAO
                </button>
              </div>
              {#if errorMessage}
              <div class="w-full flex justify-start gap-x-4">
                {@html errorMessage}
              </div>
              {/if}
              {/if}
            </div>
          </div>
                  </div>

      </div>
      <NakamotoBackground />
      <NakamotoShield />
  </div>
  </div>
  {:else}
    <Placeholder />
  {/if}
</div>