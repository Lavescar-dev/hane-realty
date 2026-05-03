<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg, listings } from '../data/listings.js';

  export let listing = null;
  export let wishlist = [];
  export let onClose = () => {};
  export let onAddToAppointment = () => {};
  export let onToggleWishlist = () => {};
  export let onOpenListing = () => {};

  let activeImage = 0;
  let imageLoaded = false;

  $: if (listing) {
    activeImage = 0;
    imageLoaded = false;
  }

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
    imageLoaded = true;
  }

  $: gallery = listing?.gallery ?? [listing?.image];
  $: relatedListings = listing
    ? listings
        .filter((l) => l.city === listing.city && l.id !== listing.id)
        .slice(0, 4)
    : [];
  $: isWishlisted = listing ? wishlist.includes(listing.id) : false;

  function setImage(idx) {
    activeImage = idx;
    imageLoaded = false;
  }

  function step(direction) {
    if (!gallery.length) return;
    activeImage = (activeImage + direction + gallery.length) % gallery.length;
    imageLoaded = false;
  }

  function formatPhone(phone) {
    return phone.replace(/^\+90 /, '0');
  }
</script>

{#if listing}
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    role="button"
    tabindex="0"
    aria-label="Detayı kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="modal-pop flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl md:flex-row">
      <div class="relative flex flex-col bg-[#0f2740] md:w-3/5">
        <div class="relative flex-1 overflow-hidden">
          {#if !imageLoaded}
            <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-[#1a3960] via-[#0f2740] to-[#1a3960]"></div>
          {/if}
          <img
            src={gallery[activeImage]}
            alt={listing.title}
            class="relative h-full w-full object-cover transition-opacity duration-300"
            class:opacity-0={!imageLoaded}
            class:opacity-100={imageLoaded}
            onload={() => (imageLoaded = true)}
            onerror={handleImageError}
          />

          <div class="absolute top-4 left-4 flex flex-col gap-2">
            <span class={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md ${listing.type === 'Satılık' ? 'bg-[#0f2740]/85 backdrop-blur' : 'bg-[#c8a04a]'}`}>
              {listing.type}
            </span>
            {#if listing.isNew}
              <span class="rounded-full bg-emerald-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                Yeni
              </span>
            {/if}
          </div>

          {#if gallery.length > 1}
            <button
              type="button"
              class="absolute top-1/2 left-4 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0f2740] shadow-lg transition hover:bg-white"
              aria-label="Önceki fotoğraf"
              onclick={() => step(-1)}
            >
              <Icon name="chevronLeft" size={22} />
            </button>
            <button
              type="button"
              class="absolute top-1/2 right-4 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0f2740] shadow-lg transition hover:bg-white"
              aria-label="Sonraki fotoğraf"
              onclick={() => step(1)}
            >
              <Icon name="chevronRight" size={22} />
            </button>

            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {#each gallery as _, i}
                <button
                  type="button"
                  class={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Fotoğraf ${i + 1}`}
                  onclick={() => setImage(i)}
                ></button>
              {/each}
            </div>
          {/if}
        </div>

        {#if gallery.length > 1}
          <div class="flex gap-2 border-t border-white/10 p-3">
            {#each gallery as src, i}
              <button
                type="button"
                class={`h-16 flex-1 overflow-hidden rounded-xl transition ${i === activeImage ? 'ring-2 ring-[#c8a04a]' : 'opacity-60 hover:opacity-100'}`}
                onclick={() => setImage(i)}
              >
                <img src={src} alt="" class="h-full w-full object-cover" loading="lazy" onerror={handleImageError} />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="flex flex-col overflow-auto md:w-2/5">
        <div class="sticky top-0 z-10 flex items-start justify-between border-b border-[#0f2740]/10 bg-white/95 p-8 backdrop-blur">
          <div class="flex-1">
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">
              <Icon name="mapPin" size={12} />
              {listing.city} / {listing.neighborhood}
            </div>
            <h2 class="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#0f2740] md:text-3xl">
              {listing.title}
            </h2>
            <div class="mt-3 text-3xl font-black text-[#0f2740] md:text-4xl">
              {listing.priceLabel}
            </div>
          </div>
          <button type="button" class="text-[#0f2740]/40 transition hover:text-[#0f2740]" onclick={onClose} aria-label="Kapat">
            <Icon name="close" size={32} />
          </button>
        </div>

        <div class="flex flex-col gap-8 p-8">
          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-2xl border border-[#0f2740]/10 bg-[#fbf8f1] p-4 text-center">
              <Icon name="bed" size={20} className="mx-auto text-[#c8a04a]" />
              <div class="mt-1 text-xs font-black uppercase tracking-widest text-[#0f2740]/50">Oda</div>
              <div class="mt-1 text-lg font-bold text-[#0f2740]">{listing.room || listing.category}</div>
            </div>
            <div class="rounded-2xl border border-[#0f2740]/10 bg-[#fbf8f1] p-4 text-center">
              <Icon name="ruler" size={20} className="mx-auto text-[#c8a04a]" />
              <div class="mt-1 text-xs font-black uppercase tracking-widest text-[#0f2740]/50">Alan</div>
              <div class="mt-1 text-lg font-bold text-[#0f2740]">{listing.m2} m²</div>
            </div>
            <div class="rounded-2xl border border-[#0f2740]/10 bg-[#fbf8f1] p-4 text-center">
              <Icon name="calendar" size={20} className="mx-auto text-[#c8a04a]" />
              <div class="mt-1 text-xs font-black uppercase tracking-widest text-[#0f2740]/50">Yıl</div>
              <div class="mt-1 text-lg font-bold text-[#0f2740]">{listing.buildYear || '—'}</div>
            </div>
          </div>

          <div>
            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Açıklama</div>
            <p class="mt-2 text-sm leading-relaxed text-[#0f2740]/80">
              {listing.description}
            </p>
          </div>

          <div>
            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Özellikler</div>
            <div class="mt-3 flex flex-wrap gap-2">
              {#each listing.features as feature}
                <span class="flex items-center gap-1.5 rounded-full bg-[#f5efe2] px-3 py-1.5 text-xs font-bold text-[#0f2740]/80">
                  <Icon name="check" size={12} className="text-[#c8a04a]" />
                  {feature}
                </span>
              {/each}
            </div>
          </div>

          <div class="rounded-3xl border border-[#0f2740]/10 bg-[#fbf8f1] p-5">
            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Danışman</div>
            <div class="mt-3 flex items-center gap-4">
              <img
                src={listing.advisor.portrait}
                alt={listing.advisor.name}
                class="h-14 w-14 rounded-full border-2 border-[#c8a04a] object-cover"
                onerror={handleImageError}
              />
              <div class="flex-1">
                <div class="font-bold text-[#0f2740]">{listing.advisor.name}</div>
                <div class="text-xs font-medium text-[#0f2740]/60">{listing.advisor.title}</div>
              </div>
            </div>
            <a
              href={`tel:${listing.advisor.phone.replace(/\s/g, '')}`}
              class="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#0f2740]/20 py-2.5 text-xs font-black uppercase tracking-widest text-[#0f2740] transition hover:border-[#c8a04a] hover:text-[#c8a04a]"
            >
              <Icon name="phone" size={12} />
              {formatPhone(listing.advisor.phone)}
            </a>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0f2740] py-4 text-sm font-bold text-white shadow-xl shadow-[#0f2740]/20 transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
              onclick={() => onAddToAppointment(listing)}
            >
              <Icon name="key" size={16} />
              Randevu Talep Et
            </button>
            <button
              type="button"
              class="wishlist-btn flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#0f2740]/20 transition hover:border-rose-300"
              class:is-on={isWishlisted}
              aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              aria-pressed={isWishlisted}
              onclick={() => onToggleWishlist(listing.id)}
            >
              <Icon name={isWishlisted ? 'heartFill' : 'heart'} size={20} />
            </button>
          </div>

          {#if relatedListings.length > 0}
            <div class="border-t border-[#0f2740]/10 pt-6">
              <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">{listing.city} İlanları</div>
              <div class="mt-3 grid grid-cols-2 gap-3">
                {#each relatedListings as rl (rl.id)}
                  <button
                    type="button"
                    class="group flex flex-col gap-2 overflow-hidden rounded-2xl border border-[#0f2740]/10 bg-white text-left transition hover:border-[#c8a04a] hover:shadow-md"
                    onclick={() => onOpenListing(rl)}
                  >
                    <div class="aspect-[5/4] overflow-hidden bg-[#f5efe2]">
                      <img src={rl.image} alt={rl.title} class="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" onerror={handleImageError} />
                    </div>
                    <div class="px-3 pb-3">
                      <div class="line-clamp-1 text-[11px] font-bold text-[#0f2740]">{rl.title}</div>
                      <div class="mt-0.5 text-xs font-black text-[#c8a04a]">{rl.priceLabel}</div>
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .wishlist-btn {
    color: rgb(15 39 64 / 0.7);
  }
  .wishlist-btn.is-on {
    color: rgb(244 63 94);
    border-color: rgb(254 205 211);
    background-color: rgb(255 241 242);
  }
</style>
