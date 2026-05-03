<script>
  import Icon from '../components/Icon.svelte';
  import { fallbackSvg } from '../data/listings.js';

  export let appointment;
  export let onNavigate = () => {};

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }

  function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  $: slotLabel =
    appointment.schedule.preferredSlot === 'morning'
      ? '09:00 — 12:00'
      : appointment.schedule.preferredSlot === 'afternoon'
        ? '13:00 — 17:00'
        : '17:00 — 20:00';
</script>

<div class="bg-[#fbf8f1] pt-32 pb-20">
  <section class="mx-auto max-w-3xl px-6">
    <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-10 text-center shadow-sm md:p-14">
      <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#c8a04a]/15 text-[#c8a04a]">
        <Icon name="check" size={50} />
      </div>
      <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Onaylandı</span>
      <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
        Randevunuz alındı
      </h2>
      <p class="mt-4 text-base font-medium text-[#0f2740]/60">
        {appointment.buyer.firstName} bey/hanım, danışmanınız sizi <strong class="text-[#0f2740]">{formatDate(appointment.schedule.preferredDate)}</strong> önce arayacak ve buluşmayı kesinleştirecek.
      </p>

      <div class="mt-10 grid gap-6 rounded-2xl border border-[#0f2740]/10 bg-[#fbf8f1] p-6 text-left md:grid-cols-3 md:p-8">
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">Randevu No</div>
          <div class="mt-2 text-lg font-black text-[#0f2740]">{appointment.id}</div>
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">Tarih</div>
          <div class="mt-2 text-sm font-bold text-[#0f2740]">{formatDate(appointment.schedule.preferredDate)}</div>
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">Saat Aralığı</div>
          <div class="mt-2 text-sm font-bold text-[#0f2740]">{slotLabel}</div>
        </div>
      </div>
    </div>

    <div class="mt-8 rounded-3xl border border-[#0f2740]/10 bg-white p-10 shadow-sm md:p-12">
      <h3 class="border-b border-[#0f2740]/10 pb-6 text-2xl font-bold tracking-tight text-[#0f2740]">
        Gezilecek İlanlar ({appointment.items.length})
      </h3>

      <div class="space-y-5 pt-8">
        {#each appointment.items as item (item.id)}
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                class="h-16 w-16 rounded-xl border border-[#0f2740]/10 object-cover"
                onerror={handleImageError}
              />
              <div>
                <div class="text-sm font-bold text-[#0f2740]">{item.title}</div>
                <div class="mt-0.5 text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">
                  {item.city} / {item.neighborhood}
                </div>
              </div>
            </div>
            <div class="text-sm font-black text-[#0f2740]">{item.priceLabel}</div>
          </div>
        {/each}
      </div>

      <div class="mt-8 rounded-2xl border border-[#0f2740]/10 bg-[#fbf8f1] p-5">
        <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">Atanmış Danışmanlar</div>
        <div class="mt-3 flex flex-wrap gap-3">
          {#each appointment.advisors as a}
            <div class="flex items-center gap-3 rounded-xl bg-white px-4 py-2">
              <img src={a.portrait} alt={a.name} class="h-9 w-9 rounded-full object-cover" onerror={handleImageError} />
              <div>
                <div class="text-sm font-bold text-[#0f2740]">{a.name}</div>
                <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">{a.phone}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        type="button"
        class="rounded-full bg-[#0f2740] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#0f2740]/20 transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
        onclick={() => onNavigate('listings')}
      >
        Yeni İlan Keşfet
      </button>
      <button
        type="button"
        class="rounded-full border border-[#0f2740]/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-[#0f2740]/70 transition hover:border-[#0f2740] hover:text-[#0f2740]"
        onclick={() => onNavigate('home')}
      >
        Ana Sayfa
      </button>
    </div>
  </section>
</div>
