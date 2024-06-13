<script lang="ts">
	//import '../app.postcss';
	import "../app.css";
	import { Header, Footer } from "@mijoco/stx_components";
	import { initApplication, isLegal } from "$lib/stacks_helper";
	import { isLoggedIn, logUserOut, loginStacks, loginStacksFromHeader } from '@mijoco/stx_helpers/dist/account'
	import { configStore } from '$stores/stores_config';
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '../stores/stores'
	import { COMMS_ERROR, tsToTime } from '$lib/utils.js'
	import { getRouterInfo } from "$lib/dao_helper";

	let loggedIn = isLoggedIn();
	let heights: {stacksHeight:number; bitcoinHeight:number} = {stacksHeight:0, bitcoinHeight:0};
	let account = {stxAddress:'string', cardinal:'string',ordinal:'string',bnsNameInfo: {names: ['mikey']}};
	let balances = {sbtcBalance:102,cardinalBalance:10,ordinalBalance:7,stacksBalance:5}
	
	let headerLinks =[]
	const local = $page.url.hostname === 'localhost'

	headerLinks.push(getRouterInfo('voting', local))
	headerLinks.push(getRouterInfo('insights', local))
	headerLinks.push(getRouterInfo('launcher', local))
	//headerLinks.push(getRouterInfo('shop', local))

	const unsubscribe = configStore.subscribe(() => {});
	const unsubscribe1 = sessionStore.subscribe(() => {});
	onDestroy(async () => {
		unsubscribe()
		unsubscribe1()
	})

	let componentKey = 0;
	let componentKey1 = 0;
	if (!$page.url.searchParams.has('chain')) $page.url.searchParams.set('chain', 'mainnet')


  	if (!isLegal(location.href)) {
		goto('/' + '?chain=mainnet')
	}
	beforeNavigate(async (nav) => {
		if (!isLegal(nav.to?.route.id || '')) {
			nav.cancel();
			await loginEvent()
			return;
		}
		if (!nav.to?.url.searchParams?.has('chain') && $page.url.hostname === 'localhost') {
			nav.to?.url.searchParams.set('chain', $configStore.VITE_NETWORK)
		}
		console.debug('beforeNavigate: ' + nav.to?.route.id + ' : ' + tsToTime(new Date().getTime()))
	})
	afterNavigate((nav) => {
		//componentKey++;
		console.debug('afterNavigate: ' + nav.to?.route.id + ' : ' + tsToTime(new Date().getTime()))
	})
	let inited = false;
	let errorReason:string|undefined;

	const loginEvent = async (e?:any) => {
		console.log('update for login', e.target)
		await loginStacks(function() {
			console.log('update for login')
			loggedIn = isLoggedIn();
		})
	}

	const logoutEvent = () => {
		logUserOut();
		loggedIn = isLoggedIn();
	}

	const networkSwitchEvent = async () => {
		await initApp()
		componentKey++;
		componentKey1++;
	}

	const copyEvent = async () => {
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
	<Header {headerLinks} {loggedIn} {heights} {account} {balances} on:do_login={loginEvent} on:do_logout={logoutEvent} on:do_copy={copyEvent} on:switch_network={networkSwitchEvent}/>
	<div class="mx-auto px-6 relative">
			<slot></slot>
	</div>
	<Footer />
	{/if}
</div>
