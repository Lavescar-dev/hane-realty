<script>
  import Icon from './Icon.svelte';

  export let currentUser = '';
  export let appointmentCount = 0;
  export let wishlistCount = 0;
  export let currentPage = 'home';
  export let mobileMenuOpen = false;
  export let onNavigate = () => {};
  export let onToggleAuth = () => {};
  export let onToggleAppointments = () => {};
  export let onToggleMobileMenu = () => {};

  const links = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'listings', label: 'İlanlar' },
    { id: 'advisors', label: 'Danışmanlar' },
    { id: 'about', label: 'Hakkımızda' },
  ];
</script>

<nav class="glass fixed inset-x-0 top-0 z-50 border-b border-[#0f2740]/10">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
    <button
      type="button"
      class="flex items-center gap-x-3"
      onclick={() => onNavigate('home')}
    >
      <img src="/hane-logo.svg" alt="Hane" class="h-10 w-10" />
      <span class="logo-font text-3xl font-bold tracking-tight text-[#0f2740]">Hane</span>
    </button>

    <div class="hidden items-center gap-x-10 text-sm font-semibold tracking-wide md:flex">
      {#each links as link}
        <button
          type="button"
          class={`nav-link cursor-pointer uppercase ${currentPage === link.id ? 'is-active text-[#c8a04a]' : 'text-[#0f2740]'}`}
          onclick={() => onNavigate(link.id)}
        >
          {link.label}
        </button>
      {/each}
    </div>

    <div class="flex items-center gap-x-5 md:gap-x-6">
      <button
        type="button"
        class="relative hidden items-center transition hover:text-[#c8a04a] md:flex"
        class:text-rose-500={currentPage === 'wishlist'}
        aria-label="Favorilerim"
        onclick={() => onNavigate('wishlist')}
      >
        <Icon name={wishlistCount > 0 ? 'heartFill' : 'heart'} size={26} />
        {#if wishlistCount > 0}
          <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {wishlistCount}
          </span>
        {/if}
      </button>

      <button
        type="button"
        class="flex items-center gap-x-2 transition hover:text-[#c8a04a]"
        onclick={onToggleAuth}
      >
        <Icon name="user" size={26} />
        <span class="hidden text-xs font-bold uppercase tracking-widest md:inline">
          {currentUser || 'Giriş'}
        </span>
      </button>

      <button
        type="button"
        class="relative flex items-center gap-x-2 transition hover:text-[#c8a04a]"
        aria-label="Randevu Sepetim"
        onclick={onToggleAppointments}
      >
        <Icon name="bag" size={26} />
        <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8a04a] text-[10px] font-bold text-[#0f2740]">
          {appointmentCount}
        </span>
      </button>

      <button type="button" class="text-2xl md:hidden" onclick={onToggleMobileMenu}>
        <Icon name="menu" size={26} />
      </button>
    </div>
  </div>

  <div class:hidden={!mobileMenuOpen} class="border-t bg-white py-8 md:hidden">
    <div class="flex flex-col gap-y-6 px-6 text-center text-lg font-bold uppercase tracking-widest text-[#0f2740]">
      {#each links as link}
        <button type="button" class="cursor-pointer" onclick={() => onNavigate(link.id)}>
          {link.label}
        </button>
      {/each}
      <button type="button" class="flex items-center justify-center gap-2 text-rose-500" onclick={() => onNavigate('wishlist')}>
        <Icon name={wishlistCount > 0 ? 'heartFill' : 'heart'} size={20} />
        Favoriler {wishlistCount > 0 ? `(${wishlistCount})` : ''}
      </button>
    </div>
  </div>
</nav>
