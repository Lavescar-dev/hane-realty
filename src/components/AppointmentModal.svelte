<script>
  import Icon from './Icon.svelte';
  import { fallbackSvg } from '../data/listings.js';

  export let open = false;
  export let items = [];
  export let onClose = () => {};
  export let onRemove = () => {};
  export let onSchedule = () => {};
  export let onContinue = () => {};

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-[1000] flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm md:items-center md:p-0"
    role="button"
    tabindex="0"
    aria-label="Kapat"
    onclick={(event) => event.currentTarget === event.target && onClose()}
    onkeydown={(event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClose();
      }
    }}
  >
    <div class="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:rounded-[2.5rem]">
      <div class="flex items-center justify-between border-b border-[#0f2740]/10 p-8">
        <div>
          <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Randevu Sepetim</div>
          <h3 class="mt-1 text-2xl font-bold tracking-tight text-[#0f2740]">
            {items.length === 0 ? 'Henüz seçim yok' : `${items.length} ilan seçildi`}
          </h3>
        </div>
        <button type="button" class="text-[#0f2740]/40 transition hover:text-[#0f2740]" onclick={onClose} aria-label="Kapat">
          <Icon name="close" size={28} />
        </button>
      </div>

      <div class="min-h-[320px] flex-1 overflow-y-auto p-8">
        {#if items.length === 0}
          <div class="flex h-full flex-col items-center justify-center py-12 text-center">
            <div class="mb-6 inline-flex rounded-full bg-[#f5efe2] p-6 text-[#c8a04a]">
              <Icon name="key" size={42} />
            </div>
            <p class="mb-2 text-lg font-bold tracking-tight text-[#0f2740]">
              Sepetiniz boş
            </p>
            <p class="mb-8 max-w-xs text-sm font-medium text-[#0f2740]/60">
              Beğendiğiniz ilanları sepete ekleyin, danışmanınızla tek seferde randevu oluşturun.
            </p>
            <button
              type="button"
              class="rounded-full bg-[#0f2740] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
              onclick={onContinue}
            >
              İlanları Keşfet
            </button>
          </div>
        {:else}
          {#each items as item, index (item.id)}
            <div class="mb-5 flex items-center gap-4 border-b border-[#0f2740]/10 pb-5">
              <img
                src={item.image}
                alt={item.title}
                class="h-20 w-20 rounded-2xl object-cover"
                onerror={handleImageError}
              />
              <div class="flex flex-1 flex-col">
                <h4 class="line-clamp-1 text-sm font-bold text-[#0f2740]">{item.title}</h4>
                <div class="mt-0.5 text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">
                  {item.city} / {item.neighborhood}
                </div>
                <div class="mt-1 text-sm font-black text-[#0f2740]">{item.priceLabel}</div>
              </div>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-500 hover:text-white"
                aria-label={`${item.title} ilanını sepetten çıkar`}
                onclick={() => onRemove(index)}
              >
                <Icon name="trash" size={14} />
              </button>
            </div>
          {/each}
        {/if}
      </div>

      {#if items.length > 0}
        <div class="border-t border-[#0f2740]/10 bg-[#fbf8f1] p-8">
          <p class="mb-6 flex items-start gap-2 text-xs font-medium text-[#0f2740]/70">
            <Icon name="info" size={14} className="mt-0.5 shrink-0 text-[#c8a04a]" />
            Tek randevu ile <strong class="text-[#0f2740]">{items.length} ilanı</strong> aynı gün gezebilirsiniz. Danışmanınız sizi arar.
          </p>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2740] py-5 font-bold text-white shadow-lg shadow-[#0f2740]/20 transition hover:bg-[#c8a04a] hover:text-[#0f2740]"
            onclick={onSchedule}
          >
            <Icon name="calendar" size={16} />
            Randevu Oluştur
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
