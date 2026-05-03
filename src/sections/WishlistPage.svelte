<script>
  import ListingCard from '../components/ListingCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let listings = [];
  export let onOpenListing = () => {};
  export let onAddToAppointment = () => {};
  export let onToggleWishlist = () => {};
  export let onNavigate = () => {};
</script>

<div class="bg-[#fbf8f1] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-12 flex items-end justify-between border-b border-[#0f2740]/10 pb-8">
      <div>
        <span class="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Favorilerim</span>
        <h2 class="logo-font mt-3 flex items-center gap-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
          <span class="text-rose-500"><Icon name="heartFill" size={32} /></span>
          Beğenilen İlanlar
        </h2>
        <p class="mt-4 font-medium text-[#0f2740]/60">
          {#if listings.length === 0}
            Henüz favori ilan yok
          {:else}
            <span class="font-bold text-[#0f2740]">{listings.length}</span> ilan listeleniyor
          {/if}
        </p>
      </div>
    </div>

    {#if listings.length === 0}
      <div class="py-24 text-center">
        <div class="mb-6 inline-flex rounded-full bg-rose-50 p-8 text-rose-300">
          <Icon name="heart" size={56} />
        </div>
        <h3 class="logo-font text-3xl font-bold tracking-tight text-[#0f2740]">Favori listeniz boş</h3>
        <p class="mx-auto mt-3 max-w-md text-sm text-[#0f2740]/60">
          Beğendiğiniz ilanların sağ üst köşesindeki kalp simgesine tıklayarak favorilerinize ekleyin.
        </p>
        <button
          type="button"
          class="mt-8 rounded-full bg-[#0f2740] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#0f2740]/20 transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
          onclick={() => onNavigate('listings')}
        >
          İlanları Keşfet
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each listings as listing (listing.id)}
          <ListingCard
            listing={listing}
            isWishlisted={true}
            onOpen={onOpenListing}
            onAddToAppointment={onAddToAppointment}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    {/if}
  </section>
</div>
