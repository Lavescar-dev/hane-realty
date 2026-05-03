<script>
  import Icon from './Icon.svelte';

  export let onNavigate = () => {};
  export let onSubscribe = () => {};

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
</script>

<footer class="mt-auto bg-[#0f2740] py-20 text-white">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mb-16 flex flex-col items-stretch justify-between gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#173255]/60 to-[#0f2740] p-10 md:flex-row md:items-center md:p-14">
      <div class="md:max-w-md">
        <div class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Bültenimize katıl</div>
        <h3 class="logo-font mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Yeni ilanlar e-postanıza gelsin
        </h3>
        <p class="mt-3 text-sm font-medium text-white/65">
          Bölgenize özel haftalık seçki, danışman tüyoları ve fırsat ilanları.
        </p>
      </div>

      <div class="flex w-full flex-col gap-3 md:max-w-md">
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
              class="rounded-2xl bg-[#c8a04a] px-6 py-4 text-xs font-black uppercase tracking-widest text-[#0f2740] transition hover:bg-[#e6c878]"
              onclick={handleSubscribe}
            >
              Abone Ol
            </button>
          </div>
          {#if error}
            <p class="ml-2 text-xs font-bold text-rose-300">{error}</p>
          {/if}
        {/if}
      </div>
    </div>

    <div class="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
      <div class="md:col-span-5">
        <div class="flex items-center gap-x-3">
          <img src="/hane-logo.svg" alt="Hane" class="h-9 w-9" />
          <span class="logo-font text-3xl font-bold">Hane</span>
        </div>
        <p class="mt-5 max-w-md text-sm leading-relaxed text-white/65">
          Şehrin nabzında doğru ev. Türkiye'nin 5 büyük şehrinde lisanslı emlak danışmanlığı.
        </p>
      </div>

      <div class="md:col-span-3">
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
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('wishlist')}>
            Favorilerim
          </button>
        </div>
      </div>

      <div class="md:col-span-4">
        <div class="text-xs font-black uppercase tracking-widest text-white/40">Hane</div>
        <div class="mt-5 flex flex-col gap-3 text-sm font-medium text-white/80">
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('about')}>
            Hakkımızda
          </button>
          <button type="button" class="text-left transition hover:text-[#c8a04a]" onclick={() => onNavigate('advisors')}>
            Danışmanlar
          </button>
          <a href="mailto:hello@hane.lavescar.com.tr" class="text-[#c8a04a] transition hover:text-[#e6c878]">
            hello@hane.lavescar.com.tr
          </a>
          <a href="tel:+908502221234" class="text-white/80 transition hover:text-[#c8a04a]">
            +90 850 222 12 34
          </a>
        </div>
      </div>
    </div>

    <p class="mt-10 text-center text-xs font-bold italic uppercase tracking-widest text-white/40">
      © 2026 Hane Realty • Doğru ev, doğru hisle.
    </p>
  </div>
</footer>
