<script>
  import Icon from './Icon.svelte';

  export let onNavigate = () => {};
  export let onSubscribe = () => {};
  export let cities = {};

  let email = '';
  let submitted = false;
  let error = '';

  function handleSubscribe() {
    const value = email.trim();
    if (!value) {
      error = 'E-posta yazın';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Geçerli bir e-posta girin';
      return;
    }
    onSubscribe(value);
    submitted = true;
    error = '';
    email = '';
    window.setTimeout(() => (submitted = false), 4500);
  }

  $: cityList = Object.keys(cities).slice(0, 5);

  const social = [
    { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
    { icon: 'twitter', href: 'https://twitter.com', label: 'X / Twitter' },
    { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
    { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const trustItems = [
    { icon: 'shield', label: 'KVKK Uyumlu', sub: 'Veriniz şifreli saklanır' },
    { icon: 'check', label: 'Tapu Doğrulaması', sub: 'Her ilan için zorunlu' },
    { icon: 'key', label: 'Lisanslı Danışmanlar', sub: 'Resmi belgeli' },
    { icon: 'headset', label: '7/24 İletişim', sub: 'WhatsApp + telefon hattı' },
  ];
</script>

<footer class="mt-auto bg-[#0a1d33] text-white">
  <!-- Newsletter -->
  <div class="border-b border-white/10 bg-[#0f2740]">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-12 md:items-center">
      <div class="md:col-span-5">
        <div class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Bültenimize katıl</div>
        <h3 class="logo-font mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Yeni ilanlar e-postanıza gelsin
        </h3>
        <p class="mt-3 max-w-md text-sm font-medium text-white/65">
          Bölgenize özel haftalık seçki, danışman tüyoları ve fırsat ilanları.
        </p>
      </div>

      <div class="md:col-span-7">
        {#if submitted}
          <div class="flex items-center gap-3 rounded-2xl bg-[#c8a04a]/15 px-5 py-4 text-[#c8a04a]">
            <Icon name="check" size={22} />
            <span class="text-xs font-black uppercase tracking-widest">Aboneliğin başarıyla alındı!</span>
          </div>
        {:else}
          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="relative flex-1">
              <div class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-white/40">
                <Icon name="mail" size={16} />
              </div>
              <input
                bind:value={email}
                type="email"
                placeholder="E-posta adresin"
                class="w-full rounded-2xl border border-white/15 bg-white/5 py-4 pr-5 pl-12 text-sm font-medium text-white placeholder-white/45 outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/30"
                onkeydown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
            </div>
            <button
              type="button"
              class="rounded-2xl bg-[#c8a04a] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#0f2740] transition hover:bg-[#e6c878]"
              onclick={handleSubscribe}
            >
              Abone Ol
            </button>
          </div>
          {#if error}
            <p class="ml-2 mt-2 text-xs font-bold text-rose-300">{error}</p>
          {/if}
          <p class="ml-2 mt-3 text-[10px] font-medium uppercase tracking-widest text-white/40">
            Abone olarak <button type="button" class="underline-offset-2 hover:text-[#c8a04a] hover:underline">KVKK metnini</button> kabul edersiniz.
          </p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Trust badges row -->
  <div class="border-b border-white/10 bg-[#0a1d33]">
    <div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-6 px-6 py-10 md:grid-cols-4">
      {#each trustItems as t}
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8a04a]/15 text-[#c8a04a]">
            <Icon name={t.icon} size={18} />
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-white">{t.label}</div>
            <div class="mt-0.5 text-[11px] font-medium text-white/55">{t.sub}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Main link grid -->
  <div class="mx-auto max-w-7xl px-6 py-16">
    <div class="grid gap-12 md:grid-cols-12">
      <!-- Brand -->
      <div class="md:col-span-4">
        <button type="button" class="flex items-center gap-x-3" onclick={() => onNavigate('home')}>
          <img src="/hane-logo.svg" alt="Hane" class="h-10 w-10" />
          <span class="logo-font text-3xl font-bold">Hane</span>
        </button>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
          Türkiye'nin 5 büyük şehrinde lisanslı emlak danışmanlığı. Ev aramanızdan tapu devrine kadar tek hat üzerinde sizinle.
        </p>

        <div class="mt-8 flex items-center gap-3">
          {#each social as s}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/65 transition hover:border-[#c8a04a] hover:bg-[#c8a04a]/10 hover:text-[#c8a04a]"
            >
              <Icon name={s.icon} size={16} />
            </a>
          {/each}
        </div>

        <div class="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/65">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          5 şehirde aktif
        </div>
      </div>

      <!-- Cities -->
      <div class="md:col-span-2">
        <div class="text-xs font-black uppercase tracking-widest text-white/40">Şehirler</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-white/80">
          {#each cityList as city}
            <button
              type="button"
              class="flex items-center gap-2 text-left transition hover:text-[#c8a04a]"
              onclick={() => onNavigate('listings')}
            >
              <Icon name="mapPin" size={12} className="text-[#c8a04a]" />
              {city}
            </button>
          {/each}
        </div>
      </div>

      <!-- Portföy -->
      <div class="md:col-span-2">
        <div class="text-xs font-black uppercase tracking-widest text-white/40">Portföy</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-white/80">
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('listings')}>
            Tüm İlanlar
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('listings')}>
            Satılık
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('listings')}>
            Kiralık
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('listings')}>
            Yeni İlanlar
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('wishlist')}>
            Favorilerim
          </button>
        </div>
      </div>

      <!-- Şirket -->
      <div class="md:col-span-2">
        <div class="text-xs font-black uppercase tracking-widest text-white/40">Şirket</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-white/80">
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('about')}>
            Hakkımızda
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('advisors')}>
            Danışmanlar
          </button>
          <span class="cursor-default text-white/45">Kariyer</span>
          <span class="cursor-default text-white/45">Basın Kiti</span>
          <span class="cursor-default text-white/45">Blog</span>
        </div>
      </div>

      <!-- İletişim -->
      <div class="md:col-span-2">
        <div class="text-xs font-black uppercase tracking-widest text-white/40">İletişim</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-white/80">
          <a href="tel:+908502221234" class="flex items-center gap-2 transition hover:text-[#c8a04a]">
            <Icon name="phone" size={12} className="text-[#c8a04a]" />
            +90 850 222 12 34
          </a>
          <a href="mailto:hello@hane.lavescar.com.tr" class="flex items-center gap-2 transition hover:text-[#c8a04a]">
            <Icon name="mail" size={12} className="text-[#c8a04a]" />
            hello@hane.lavescar.com.tr
          </a>
          <a href="#" class="flex items-center gap-2 transition hover:text-[#c8a04a]">
            <Icon name="chat" size={12} className="text-[#c8a04a]" />
            WhatsApp Hattı
          </a>
          <div class="mt-2 flex items-start gap-2 text-xs leading-relaxed text-white/60">
            <Icon name="mapPin" size={12} className="mt-0.5 shrink-0 text-[#c8a04a]" />
            <span>Maslak Mah. Atatürk Cad. No:14, Sarıyer / İstanbul</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="border-t border-white/10">
    <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-7 md:flex-row md:items-center">
      <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
        © 2026 Hane Realty • Doğru ev, doğru hisle.
      </p>
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-white/45">
        <a href="#" class="transition hover:text-[#c8a04a]">KVKK</a>
        <a href="#" class="transition hover:text-[#c8a04a]">Çerez Politikası</a>
        <a href="#" class="transition hover:text-[#c8a04a]">Üyelik Sözleşmesi</a>
        <span class="hidden text-white/20 md:inline">·</span>
        <a href="https://lavescar.com.tr" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-white/55 transition hover:text-[#c8a04a]">
          Lavescar Network
          <Icon name="arrowRight" size={10} />
        </a>
      </div>
    </div>
  </div>
</footer>
