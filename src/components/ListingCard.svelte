<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg } from '../data/listings.js';

  export let listing;
  export let isWishlisted = false;
  export let onOpen = () => {};
  export let onAddToAppointment = () => {};
  export let onToggleWishlist = () => {};

  let imageLoaded = false;

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
    imageLoaded = true;
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(listing);
    }
  }
</script>

<div
  class="listing-card relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#0f2740]/10 bg-white text-left shadow-sm"
  role="button"
  tabindex="0"
  onclick={() => onOpen(listing)}
  onkeydown={handleKeydown}
>
  <div class="relative aspect-[4/5] overflow-hidden bg-[#f5efe2]">
    {#if !imageLoaded}
      <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-[#f5efe2] via-[#ece4d2] to-[#f5efe2]"></div>
    {/if}
    <img
      src={listing.image}
      alt={listing.title}
      class="relative h-full w-full object-cover transition-opacity duration-300"
      class:opacity-0={!imageLoaded}
      class:opacity-100={imageLoaded}
      loading="lazy"
      onload={() => (imageLoaded = true)}
      onerror={handleImageError}
    />

    <div class="absolute inset-x-0 top-0 flex items-start justify-between p-4">
      <div class="flex flex-col gap-2">
        <span class={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md ${listing.type === 'Satılık' ? 'bg-[#0f2740]' : 'bg-[#c8a04a]'}`}>
          {listing.type}
        </span>
        {#if listing.isNew}
          <span class="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
            Yeni
          </span>
        {/if}
      </div>

      <button
        type="button"
        class="wishlist-btn flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-110"
        class:is-on={isWishlisted}
        aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        aria-pressed={isWishlisted}
        onclick={(event) => {
          event.stopPropagation();
          onToggleWishlist(listing.id);
        }}
      >
        <Icon name={isWishlisted ? 'heartFill' : 'heart'} size={18} />
      </button>
    </div>

    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f2740] via-[#0f2740]/70 to-transparent p-5 pt-12 text-white">
      <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">
        <Icon name="mapPin" size={12} />
        {listing.city} / {listing.neighborhood}
      </div>
      <div class="mt-1 text-2xl font-black tracking-tight">{listing.priceLabel}</div>
    </div>
  </div>

  <div class="flex flex-1 flex-col p-6">
    <h3 class="line-clamp-1 text-lg font-bold text-[#0f2740]" title={listing.title}>
      {listing.title}
    </h3>

    <div class="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold text-[#0f2740]/70">
      {#if listing.room}
        <span class="flex items-center gap-1">
          <Icon name="bed" size={14} className="text-[#c8a04a]" />
          {listing.room}
        </span>
      {/if}
      <span class="flex items-center gap-1">
        <Icon name="ruler" size={14} className="text-[#c8a04a]" />
        {listing.m2} m²
      </span>
      {#if listing.buildYear}
        <span class="flex items-center gap-1">
          <Icon name="calendar" size={14} className="text-[#c8a04a]" />
          {listing.buildYear}
        </span>
      {/if}
    </div>

    <div class="mt-4 flex flex-wrap gap-1.5">
      {#each listing.features.slice(0, 3) as feature}
        <span class="rounded-full bg-[#f5efe2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0f2740]/70">
          {feature}
        </span>
      {/each}
    </div>

    <div class="mt-auto flex items-center justify-between border-t border-[#0f2740]/10 pt-4">
      <div class="flex items-center gap-2 text-xs">
        <span class="flex items-center gap-1 text-amber-500">
          <Icon name="starFill" size={12} />
          <span class="font-bold text-[#0f2740]">{listing.rating.toFixed(1)}</span>
        </span>
        <span class="flex items-center gap-1 text-[#0f2740]/40">
          <Icon name="eye" size={12} />
          <span class="font-medium">{listing.viewCount}</span>
        </span>
      </div>

      <button
        type="button"
        class="flex h-9 items-center gap-2 rounded-full bg-[#0f2740] px-4 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
        aria-label={`${listing.title} için randevu sepetine ekle`}
        onclick={(event) => {
          event.stopPropagation();
          onAddToAppointment(listing);
        }}
      >
        <Icon name="key" size={12} />
        Randevu
      </button>
    </div>
  </div>
</div>

<style>
  .wishlist-btn {
    color: rgb(15 39 64 / 0.7);
  }
  .wishlist-btn.is-on {
    color: rgb(244 63 94);
  }
</style>
