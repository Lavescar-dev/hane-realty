<script>
  import ListingCard from '../components/ListingCard.svelte';
  import Icon from '../components/Icon.svelte';

  export let featuredListings = [];
  export let advisors = [];
  export let cities = {};
  export let wishlist = [];
  export let onNavigate = () => {};
  export let onOpenListing = () => {};
  export let onAddToAppointment = () => {};
  export let onToggleWishlist = () => {};
  export let onSearch = () => {};

  let searchType = 'Satılık';
  let searchCategory = 'Daire';
  let searchCity = '';

  $: cityList = Object.keys(cities);

  function submitSearch() {
    onSearch({ type: searchType, category: searchCategory, city: searchCity });
  }

  const trustBadges = [
    { icon: 'shield', title: 'Güvenli İlanlar', desc: 'Her ilan tapudan doğrulanır' },
    { icon: 'key', title: 'Anında Randevu', desc: '24 saat içinde danışman çağrısı' },
    { icon: 'truck', title: 'Taşınma Desteği', desc: 'Anlaşmalı nakliye partnerleri' },
    { icon: 'headset', title: '7/24 Destek', desc: 'Süreç boyunca yanınızdayız' },
  ];

  const cityMetrics = [
    { city: 'İstanbul', count: 1842, image: 'https://images.pexels.com/photos/13041123/pexels-photo-13041123.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { city: 'Ankara', count: 624, image: 'https://images.pexels.com/photos/13041129/pexels-photo-13041129.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { city: 'İzmir', count: 538, image: 'https://images.pexels.com/photos/15391694/pexels-photo-15391694.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { city: 'Antalya', count: 412, image: 'https://images.pexels.com/photos/12814940/pexels-photo-12814940.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  const testimonials = [
    {
      name: 'Cansu Tekin',
      role: 'Etiler / Villa alıcısı',
      content: 'Ayşegül Hanım sürecin her adımında yanımdaydı. 3 hafta içinde hayalimdeki villaya taşındık.',
      rating: 5,
    },
    {
      name: 'Onur Aksoy',
      role: 'Çankaya / Yatırım danışmanlığı',
      content: 'Yatırım için en doğru bölgeyi Mehmet Bey önerdi. 6 ayda %22 değer artışı yakaladık.',
      rating: 5,
    },
    {
      name: 'Beste Yılmaz',
      role: 'Karşıyaka / Kiracı',
      content: 'Sahil hattındaki dairemi Selin Hanım sayesinde aynı hafta buldum. Süper hızlı süreç.',
      rating: 5,
    },
  ];
</script>

<div>
  <section class="hero-bg relative flex min-h-[88vh] items-center justify-center pt-20 pb-16">
    <div class="mx-auto max-w-5xl px-6 text-center text-white">
      <div class="text-xs font-black uppercase tracking-[0.4em] text-[#c8a04a]">
        Doğru ev, doğru hisle
      </div>
      <h1 class="logo-font mt-6 text-5xl leading-[0.95] font-bold tracking-tight drop-shadow-lg md:text-7xl">
        Şehrin nabzında<br />
        sizin için <span class="text-[#c8a04a]">elenmiş</span> ilanlar
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-base font-medium text-white/85 drop-shadow md:text-lg">
        İstanbul'dan Antalya'ya, satılık ve kiralık portföylerimizi tek panel üzerinden keşfedin.
        Hane danışmanlığıyla doğru evi doğru zamanda bulun.
      </p>

      <div class="mx-auto mt-12 flex max-w-4xl flex-col gap-3 rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur md:flex-row md:items-stretch">
        <div class="flex gap-1 rounded-2xl bg-[#f5efe2] p-1 md:w-auto">
          <button
            type="button"
            class={`rounded-xl px-5 py-2 text-xs font-black uppercase tracking-widest transition ${searchType === 'Satılık' ? 'bg-[#0f2740] text-white shadow' : 'text-[#0f2740]/60'}`}
            onclick={() => (searchType = 'Satılık')}
          >
            Satılık
          </button>
          <button
            type="button"
            class={`rounded-xl px-5 py-2 text-xs font-black uppercase tracking-widest transition ${searchType === 'Kiralık' ? 'bg-[#0f2740] text-white shadow' : 'text-[#0f2740]/60'}`}
            onclick={() => (searchType = 'Kiralık')}
          >
            Kiralık
          </button>
        </div>

        <select
          bind:value={searchCategory}
          class="flex-1 cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
        >
          <option>Daire</option>
          <option>Villa</option>
          <option>İş Yeri</option>
          <option>Stüdyo</option>
          <option>Arsa</option>
        </select>

        <select
          bind:value={searchCity}
          class="flex-1 cursor-pointer appearance-none rounded-2xl border border-[#0f2740]/10 bg-white px-5 py-3 text-sm font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
        >
          <option value="">Tüm Şehirler</option>
          {#each cityList as c}
            <option value={c}>{c}</option>
          {/each}
        </select>

        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-2xl bg-[#0f2740] px-8 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
          onclick={submitSearch}
        >
          <Icon name="search" size={16} />
          İlan Bul
        </button>
      </div>
    </div>
  </section>

  <div class="relative -mt-12 rounded-t-[3rem] bg-[#fbf8f1] pt-16 pb-24 shadow-[0_-10px_40px_rgba(15,39,64,0.1)]">
    <section class="mx-auto max-w-7xl px-6">
      <div class="mb-16 grid gap-4 md:grid-cols-4">
        {#each trustBadges as badge}
          <div class="flex items-start gap-4 rounded-2xl border border-[#0f2740]/10 bg-white p-5 shadow-sm">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0f2740] text-[#c8a04a]">
              <Icon name={badge.icon} size={20} />
            </div>
            <div>
              <h4 class="text-sm font-bold text-[#0f2740]">{badge.title}</h4>
              <p class="mt-1 text-xs font-medium text-[#0f2740]/60">{badge.desc}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="mb-12 flex flex-col items-center justify-between gap-y-4 text-center md:flex-row md:items-end md:text-left">
        <div>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Şehirleri Keşfet</span>
          <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
            Bölgeleri inceleyin
          </h2>
        </div>
        <button
          type="button"
          class="border-b-2 border-[#0f2740] pb-1 font-bold text-[#0f2740] transition hover:border-[#c8a04a] hover:text-[#c8a04a]"
          onclick={() => onNavigate('listings')}
        >
          Tüm bölgeler
        </button>
      </div>

      <div class="grid gap-5 md:grid-cols-4">
        {#each cityMetrics as cm}
          <button
            type="button"
            class="group relative aspect-[4/5] overflow-hidden rounded-3xl"
            onclick={() => onSearch({ city: cm.city })}
          >
            <img src={cm.image} alt={cm.city} class="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f2740] via-[#0f2740]/40 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-6 text-left text-white">
              <div class="logo-font text-3xl font-bold">{cm.city}</div>
              <div class="mt-1 text-xs font-black uppercase tracking-widest text-[#c8a04a]">
                {cm.count.toLocaleString('tr-TR')} ilan
              </div>
            </div>
          </button>
        {/each}
      </div>
    </section>

    <section class="mx-auto mt-24 max-w-7xl px-6">
      <div class="mb-12 flex flex-col items-center justify-between gap-y-4 text-center md:flex-row md:items-end md:text-left">
        <div>
          <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Öne Çıkan İlanlar</span>
          <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
            Bu hafta seçilenler
          </h2>
        </div>
        <button
          type="button"
          class="border-b-2 border-[#0f2740] pb-1 font-bold text-[#0f2740] transition hover:border-[#c8a04a] hover:text-[#c8a04a]"
          onclick={() => onNavigate('listings')}
        >
          Tüm ilanlar
        </button>
      </div>

      <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {#each featuredListings as listing (listing.id)}
          <ListingCard
            listing={listing}
            isWishlisted={wishlist.includes(listing.id)}
            onOpen={onOpenListing}
            onAddToAppointment={onAddToAppointment}
            onToggleWishlist={onToggleWishlist}
          />
        {/each}
      </div>
    </section>

    <section class="mx-auto mt-24 max-w-7xl px-6">
      <div class="mb-12 text-center">
        <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Danışmanlar</span>
        <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
          Bölgenizin uzmanı yanınızda
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        {#each advisors as a}
          <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-6 text-center shadow-sm">
            <img src={a.portrait} alt={a.name} class="mx-auto h-20 w-20 rounded-full border-2 border-[#c8a04a] object-cover" loading="lazy" />
            <div class="mt-4 text-sm font-bold text-[#0f2740]">{a.name}</div>
            <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">{a.city}</div>
            <p class="mt-3 text-xs leading-relaxed text-[#0f2740]/60">{a.tagline}</p>
          </div>
        {/each}
      </div>

      <div class="mt-10 text-center">
        <button
          type="button"
          class="rounded-full border-2 border-[#0f2740] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#0f2740] transition hover:border-[#c8a04a] hover:bg-[#0f2740] hover:text-white"
          onclick={() => onNavigate('advisors')}
        >
          Tüm danışmanları gör
        </button>
      </div>
    </section>

    <section class="mx-auto mt-24 max-w-7xl px-6">
      <div class="mb-12 text-center">
        <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Müşteri Hikayeleri</span>
        <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
          Hane'yle taşınanlar
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        {#each testimonials as t}
          <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-8 shadow-sm">
            <div class="mb-4 flex gap-1 text-amber-500">
              {#each Array(t.rating) as _}
                <Icon name="starFill" size={16} />
              {/each}
            </div>
            <p class="mb-6 text-sm leading-relaxed text-[#0f2740]/80">"{t.content}"</p>
            <div class="border-t border-[#0f2740]/10 pt-4">
              <div class="text-sm font-bold text-[#0f2740]">{t.name}</div>
              <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">{t.role}</div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
