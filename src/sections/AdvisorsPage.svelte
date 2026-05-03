<script>
  import Icon from '../components/Icon.svelte';

  export let advisors = [];
  export let onNavigate = () => {};
</script>

<div class="bg-[#fbf8f1] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-16 text-center">
      <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Danışmanlar</span>
      <h2 class="logo-font mt-3 text-5xl font-bold tracking-tight text-[#0f2740] md:text-6xl">
        Bölgenizin uzmanı
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-base font-medium text-[#0f2740]/60">
        5 şehirde 5 lisanslı danışman, 18+ yıllık birikim. Sizinle önce niyetinizi konuşur, ardından doğru kapıyı açar.
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {#each advisors as a (a.id)}
        <div class="overflow-hidden rounded-3xl border border-[#0f2740]/10 bg-white shadow-sm">
          <div class="relative aspect-[4/3] overflow-hidden bg-[#0f2740]">
            <img src={a.portrait} alt={a.name} class="h-full w-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f2740] via-[#0f2740]/30 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-6 text-white">
              <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">{a.title}</div>
              <div class="logo-font mt-1 text-3xl font-bold">{a.name}</div>
            </div>
          </div>

          <div class="p-7">
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">
              <Icon name="mapPin" size={12} />
              {a.city}
            </div>
            <p class="mt-3 text-sm leading-relaxed text-[#0f2740]/75">
              {a.tagline}
            </p>

            <div class="mt-5 flex flex-col gap-3">
              <a
                href={`tel:${a.phone.replace(/\s/g, '')}`}
                class="flex items-center gap-3 rounded-xl border border-[#0f2740]/10 bg-[#fbf8f1] px-4 py-3 text-sm font-bold text-[#0f2740] transition hover:border-[#c8a04a] hover:text-[#c8a04a]"
              >
                <Icon name="phone" size={16} className="text-[#c8a04a]" />
                {a.phone}
              </a>
              <a
                href={`mailto:${a.email}`}
                class="flex items-center gap-3 rounded-xl border border-[#0f2740]/10 bg-[#fbf8f1] px-4 py-3 text-sm font-bold text-[#0f2740] transition hover:border-[#c8a04a] hover:text-[#c8a04a]"
              >
                <Icon name="mail" size={16} className="text-[#c8a04a]" />
                {a.email}
              </a>
            </div>

            <button
              type="button"
              class="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2740] py-3.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
              onclick={() => onNavigate('listings')}
            >
              <Icon name="key" size={14} />
              {a.city} ilanlarına git
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
