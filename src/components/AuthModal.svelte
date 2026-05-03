<script>
  import Icon from './Icon.svelte';

  export let open = false;
  export let currentUser = '';
  export let onClose = () => {};
  export let onLogin = () => {};
  export let onLogout = () => {};

  let name = '';

  $: if (!open) {
    name = '';
  }

  function submitLogin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    role="button"
    tabindex="0"
    aria-label="Modalı kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="modal-pop w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-12 text-center shadow-2xl">
      {#if !currentUser}
        <div>
          <img src="/hane-logo.svg" alt="Hane" class="mx-auto mb-6 h-12 w-12" />
          <h2 class="logo-font mb-2 text-3xl font-bold tracking-tight text-[#0f2740]">Hane'ye Hoş Geldiniz</h2>
          <p class="mb-10 text-sm font-medium text-[#0f2740]/60">
            İsminizle giriş yapın; favorilerinizi ve randevu sepetinizi koruyalım.
          </p>
          <input
            bind:value={name}
            type="text"
            placeholder="Adınız"
            class="mb-6 w-full rounded-2xl border border-[#0f2740]/15 bg-[#fbf8f1] px-6 py-4 font-bold text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/30"
            onkeydown={(event) => event.key === 'Enter' && submitLogin()}
          />
          <button
            type="button"
            class="w-full rounded-full bg-[#0f2740] py-5 font-bold text-white shadow-lg shadow-[#0f2740]/15 transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
            onclick={submitLogin}
          >
            Devam Et
          </button>
        </div>
      {:else}
        <div>
          <div class="logo-font mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#c8a04a] bg-[#fbf8f1] text-4xl font-bold text-[#0f2740]">
            {currentUser[0]?.toUpperCase()}
          </div>
          <h2 class="logo-font mb-2 text-3xl font-bold tracking-tight text-[#0f2740]">{currentUser}</h2>
          <p class="mb-10 text-xs font-black uppercase tracking-widest text-[#c8a04a]">
            Hane Üyesi
          </p>

          <div class="space-y-3 text-left">
            <div class="flex items-center gap-x-4 rounded-2xl border border-[#0f2740]/10 p-5 shadow-sm">
              <Icon name="key" size={20} className="text-[#c8a04a]" />
              <span class="text-sm font-bold text-[#0f2740]">Randevularım</span>
            </div>
            <div class="flex items-center gap-x-4 rounded-2xl border border-[#0f2740]/10 p-5 shadow-sm">
              <Icon name="heart" size={20} className="text-[#c8a04a]" />
              <span class="text-sm font-bold text-[#0f2740]">Favori İlanlar</span>
            </div>
          </div>

          <button
            type="button"
            class="mt-10 w-full rounded-full border border-rose-100 py-4 text-xs font-black uppercase tracking-widest text-rose-500 transition hover:bg-rose-50"
            onclick={onLogout}
          >
            Çıkış Yap
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
