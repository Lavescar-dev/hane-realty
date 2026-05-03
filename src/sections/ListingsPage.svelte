<script>
  import ListingCard from '../components/ListingCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let listings = [];
  export let cities = {};
  export let wishlist = [];
  export let initialFilter = {};
  export let onOpenListing = () => {};
  export let onAddToAppointment = () => {};
  export let onToggleWishlist = () => {};

  let selectedType = '';
  let selectedCategory = '';
  let selectedCity = '';
  let selectedRoom = '';
  let priceRange = '';
  let sortBy = 'newest';
  let searchTerm = '';

  $: if (initialFilter && (initialFilter.type || initialFilter.category || initialFilter.city)) {
    selectedType = initialFilter.type ?? '';
    selectedCategory = initialFilter.category ?? '';
    selectedCity = initialFilter.city ?? '';
  }

  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'priceAsc', label: 'Fiyat (artan)' },
    { value: 'priceDesc', label: 'Fiyat (azalan)' },
    { value: 'm2', label: 'Alan (büyük → küçük)' },
    { value: 'rating', label: 'En Çok Beğenilen' },
  ];

  const priceBands = [
    { value: '', label: 'Tüm Fiyatlar' },
    { value: '0-2000000', label: '0 - 2.000.000 ₺' },
    { value: '2000000-5000000', label: '2 - 5 milyon ₺' },
    { value: '5000000-10000000', label: '5 - 10 milyon ₺' },
    { value: '10000000-25000000', label: '10 - 25 milyon ₺' },
    { value: '25000000-99999999999', label: '25 milyon ₺ üzeri' },
  ];

  $: filteredListings = listings
    .filter((l) => {
      if (selectedType && l.type !== selectedType) return false;
      if (selectedCategory && l.category !== selectedCategory) return false;
      if (selectedCity && l.city !== selectedCity) return false;
      if (selectedRoom && l.room !== selectedRoom) return false;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        if (l.price < min || l.price > max) return false;
      }
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const haystack = `${l.title} ${l.description} ${l.neighborhood} ${l.city}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'm2') return b.m2 - a.m2;
      if (sortBy === 'rating') return b.rating - a.rating;
      return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
    });

  function clearFilters() {
    selectedType = '';
    selectedCategory = '';
    selectedCity = '';
    selectedRoom = '';
    priceRange = '';
    sortBy = 'newest';
    searchTerm = '';
  }

  $: cityList = Object.keys(cities);
  $: hasFilters =
    selectedType || selectedCategory || selectedCity || selectedRoom || priceRange || searchTerm || sortBy !== 'newest';
</script>

<div class="bg-[#fbf8f1] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-10 border-b border-[#0f2740]/10 pb-10">
      <div class="mb-8 flex flex-col items-start justify-between gap-y-6 md:flex-row md:items-end">
        <div>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">İlanlar</span>
          <h2 class="logo-font mt-3 text-5xl font-bold tracking-tight text-[#0f2740]">Tüm Portföy</h2>
          <p class="mt-4 font-medium text-[#0f2740]/60">
            <span class="font-bold text-[#0f2740]">{filteredListings.length}</span>
            ilan listeleniyor
          </p>
        </div>

        <div class="grid w-full gap-3 md:w-auto md:grid-cols-2 md:auto-rows-min">
          <select
            bind:value={selectedType}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            <option value="">Satılık & Kiralık</option>
            <option value="Satılık">Satılık</option>
            <option value="Kiralık">Kiralık</option>
          </select>

          <select
            bind:value={selectedCategory}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            <option value="">Tüm Kategoriler</option>
            <option>Daire</option>
            <option>Villa</option>
            <option>İş Yeri</option>
            <option>Stüdyo</option>
            <option>Arsa</option>
          </select>

          <select
            bind:value={selectedCity}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            <option value="">Tüm Şehirler</option>
            {#each cityList as c}
              <option value={c}>{c}</option>
            {/each}
          </select>

          <select
            bind:value={selectedRoom}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            <option value="">Tüm Oda Sayıları</option>
            <option>1+0</option>
            <option>1+1</option>
            <option>2+1</option>
            <option>3+1</option>
            <option>4+1</option>
            <option>5+1</option>
          </select>

          <select
            bind:value={priceRange}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            {#each priceBands as p}
              <option value={p.value}>{p.label}</option>
            {/each}
          </select>

          <select
            bind:value={sortBy}
            class="cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          >
            {#each sortOptions as opt}
              <option value={opt.value}>{opt.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[260px] md:max-w-md">
          <div class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#0f2740]/40">
            <Icon name="search" size={16} />
          </div>
          <input
            bind:value={searchTerm}
            type="text"
            placeholder="Mahalle, şehir veya açıklama ara..."
            class="w-full rounded-2xl border border-[#0f2740]/10 bg-white py-3 pr-6 pl-12 text-sm font-medium text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
          />
        </div>

        {#if hasFilters}
          <button
            type="button"
            class="text-xs font-black uppercase tracking-widest text-[#0f2740]/60 underline-offset-4 transition hover:text-[#c8a04a] hover:underline"
            onclick={clearFilters}
          >
            Filtreleri temizle
          </button>
        {/if}
      </div>
    </div>

    {#if filteredListings.length > 0}
      <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each filteredListings as listing (listing.id)}
          <ListingCard
            listing={listing}
            isWishlisted={wishlist.includes(listing.id)}
            onOpen={onOpenListing}
            onAddToAppointment={onAddToAppointment}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    {:else}
      <div class="py-20 text-center">
        <div class="mb-6 inline-flex rounded-full bg-[#f5efe2] p-6 text-[#c8a04a]">
          <Icon name="home" size={42} />
        </div>
        <h3 class="logo-font text-3xl font-bold tracking-tight text-[#0f2740]">Eşleşen ilan bulamadık</h3>
        <p class="mt-2 text-sm text-[#0f2740]/60">Filtreleri yumuşatarak tekrar deneyebilirsiniz.</p>
        <button
          type="button"
          class="mt-6 rounded-full bg-[#0f2740] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
          onclick={clearFilters}
        >
          Filtreleri Temizle
        </button>
      </div>
    {/if}
  </section>
</div>
