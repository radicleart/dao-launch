<script lang="ts">
	import { onMount } from 'svelte';
	import LaunchTemplate from '$lib/components/dao-launcher/LaunchTemplate.svelte';
	import { loggedIn } from '$lib/stacks_helper';
	import ConnectWallet from '$lib/components/utils/ConnectWallet.svelte';

	onMount(async () => {
	})

</script>

<svelte:head>
  <title>Ecosystem DAO</title>
  <meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

{#if loggedIn()}
<LaunchTemplate />
{:else}
<ConnectWallet />
{/if}