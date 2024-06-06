<script lang="ts">
	//import '../app.postcss';
	import "../app.css";
	import Header from "$lib/header/Header.svelte";
	import Footer from "$lib/header/Footer.svelte";
	import { initApplication, isLegal, loginStacksFromHeader } from "$lib/stacks_connect";
	import { CONFIG, setConfigByUrl } from '$lib/config';
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '../stores/stores'
	import { COMMS_ERROR, tsToTime } from '$lib/utils.js'
	import { fetchStacksInfo, getPoxInfo } from "$lib/backend_api";

	const unsubscribe1 = sessionStore.subscribe(() => {});
	onDestroy(async () => {
		unsubscribe1()
	})

	let componentKey = 0;
	let componentKey1 = 0;
	if (!$page.url.searchParams.has('chain')) $page.url.searchParams.set('chain', 'mainnet')
	setConfigByUrl();
	if (!isLegal(location.href)) {
		goto('/' + '?chain=mainnet')
	}
	beforeNavigate((nav) => {
		if (!isLegal(nav.to?.route.id || '')) {
			nav.cancel();
			login()
			return;
		}
		if (!nav.to?.url.searchParams?.has('chain') && $page.url.hostname === 'localhost') {
			nav.to?.url.searchParams.set('chain', CONFIG.VITE_NETWORK)
		}
		console.debug('beforeNavigate: ' + nav.to?.route.id + ' : ' + tsToTime(new Date().getTime()))
	})
	afterNavigate((nav) => {
		//componentKey++;
		console.debug('afterNavigate: ' + nav.to?.route.id + ' : ' + tsToTime(new Date().getTime()))
	})
	let inited = false;
	let errorReason:string|undefined;

	const login = async () => {
		const res = await loginStacksFromHeader(document)
	}

	const loginEvent = () => {
		componentKey++;
		componentKey1++;
	}

	const networkSwitchEvent = async () => {
		await initApp()
		componentKey++;
		componentKey1++;
	}

	const initApp = async () => {
		await initApplication($sessionStore.userSettings);
	}

	let timer:any;

	onDestroy(() => {
		clearInterval(timer)
	})

	onMount(async () => {
		try {
			await initApp();
			inited = true;
		} catch (err) {
			errorReason = COMMS_ERROR
			console.log(err)
		}
	})
</script>

<div class="bg-white min-h-screen relative">
	{#if inited}
	<Header on:login_event={loginEvent} on:network_switch_event={networkSwitchEvent}/>
	<div class="mx-auto px-6 relative">
			{#key componentKey1}
				<slot></slot>
			{/key}
		</div>
	<Footer />
	{/if}
</div>
