<script lang="ts">
	import Banner from '$lib/ui/Banner.svelte';
	import NakamotoBackground from '$lib/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/ui/NakamotoShield.svelte';

</script>

<div class="max-w-7xl md:px-6 py-6 relative mx-auto">
  <div class="flex flex-col w-full my-8 bg-[#F4F3F0] rounded-2xl">
    <div class="py-10 px-10 md:grid md:gap-12 md:grid-flow-col md:auto-cols-auto overflow-hidden relative">
      <div class="flex flex-col gap-y-2 bg-warning-01">
        <div class="mb-4">
          <h2 class="text-[#131416] text-2xl mb-3">DAO Launcher</h2>
        </div>
        <div class="mb-4 rounded-lg relative bg-[#E6E4E2] px-6 py-6 space-y-3 max-w-xl">
          <div>
            <div class="flex flex-col gap-y-4">
                <div class="text-xl">
                  <p class="mb-5">Please connect your wallet to continue</p>
                </div>
                <div class="text-sm">
                  <Banner bannerType={'danger'} message={'Your DAO will automatically include this address in the core team.'} />
                </div>
              </div>
          </div>
        </div>

      </div>
      <NakamotoBackground />
      <NakamotoShield />
    </div>
  </div>
</div>
