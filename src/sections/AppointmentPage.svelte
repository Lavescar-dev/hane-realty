<script>
  import Icon from '../components/Icon.svelte';
  import { fallbackSvg } from '../data/listings.js';

  export let items = [];
  export let onSubmit = () => {};

  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let preferredDate = '';
  let preferredSlot = 'morning';
  let note = '';

  let touched = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    preferredDate: false,
  };
  let attemptedSubmit = false;

  function isEmpty(v) {
    return !v || !v.trim();
  }

  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  $: phoneValid = /^[0-9 +()-]{10,}$/.test(phone.trim());
  $: dateValid = !isEmpty(preferredDate) && new Date(preferredDate) >= new Date(new Date().toDateString());

  $: errors = {
    firstName: isEmpty(firstName) ? 'Ad zorunludur' : null,
    lastName: isEmpty(lastName) ? 'Soyad zorunludur' : null,
    email: isEmpty(email) ? 'E-posta zorunludur' : !emailValid ? 'Geçerli bir e-posta girin' : null,
    phone: isEmpty(phone) ? 'Telefon zorunludur' : !phoneValid ? 'Geçerli bir telefon girin' : null,
    preferredDate: isEmpty(preferredDate) ? 'Tarih seçin' : !dateValid ? 'Geçmiş bir tarih seçilemez' : null,
  };

  $: formValid = !Object.values(errors).some((e) => e !== null);

  function showError(key) {
    return (touched[key] || attemptedSubmit) && errors[key];
  }

  function inputClass(key) {
    return `w-full rounded-2xl border bg-white px-6 py-4 text-sm font-medium text-[#0f2740] outline-none transition focus:ring-2 ${
      showError(key)
        ? 'border-rose-300 ring-rose-100 focus:border-rose-400 focus:ring-rose-100'
        : 'border-[#0f2740]/10 focus:border-[#c8a04a] focus:ring-[#c8a04a]/20'
    }`;
  }

  function markAll() {
    touched = Object.fromEntries(Object.keys(touched).map((k) => [k, true]));
  }

  function handleSubmit() {
    attemptedSubmit = true;
    markAll();
    if (!formValid) {
      window.setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    onSubmit({
      buyer: { firstName, lastName, email, phone },
      schedule: { preferredDate, preferredSlot },
      note,
    });
  }

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSvg;
  }

  $: today = new Date();
  $: minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().slice(0, 10);
  $: uniqueAdvisors = [...new Set(items.map((i) => i.advisor.id))].map((id) => items.find((i) => i.advisor.id === id).advisor);
</script>

<div class="bg-[#fbf8f1] pt-32 pb-20">
  <section class="mx-auto max-w-7xl px-6">
    <div class="mb-12">
      <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Randevu Talebi</span>
      <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">Sizi yerinde gezdirelim</h2>
    </div>

    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div class="space-y-8 lg:col-span-7">
        <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-8 shadow-sm md:p-10">
          <h3 class="text-xl font-bold tracking-tight text-[#0f2740]">İletişim Bilgileri</h3>
          <p class="mt-1 text-xs font-medium text-[#0f2740]/50">
            Danışmanınız 24 saat içinde size geri döner.
          </p>
          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div data-error={!!showError('firstName')}>
              <input bind:value={firstName} onblur={() => (touched.firstName = true)} type="text" placeholder="Adınız" class={inputClass('firstName')} />
              {#if showError('firstName')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.firstName}</p>{/if}
            </div>
            <div data-error={!!showError('lastName')}>
              <input bind:value={lastName} onblur={() => (touched.lastName = true)} type="text" placeholder="Soyadınız" class={inputClass('lastName')} />
              {#if showError('lastName')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.lastName}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('email')}>
              <input bind:value={email} onblur={() => (touched.email = true)} type="email" placeholder="E-posta" class={inputClass('email')} />
              {#if showError('email')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.email}</p>{/if}
            </div>
            <div class="md:col-span-2" data-error={!!showError('phone')}>
              <input bind:value={phone} onblur={() => (touched.phone = true)} type="tel" placeholder="Telefon (örn. 0532 123 45 67)" class={inputClass('phone')} />
              {#if showError('phone')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.phone}</p>{/if}
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-8 shadow-sm md:p-10">
          <h3 class="text-xl font-bold tracking-tight text-[#0f2740]">Tarih & Saat Tercihiniz</h3>
          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div data-error={!!showError('preferredDate')}>
              <label class="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#0f2740]/50">
                Tercih edilen tarih
              </label>
              <input
                bind:value={preferredDate}
                onblur={() => (touched.preferredDate = true)}
                type="date"
                min={minDate}
                class={inputClass('preferredDate')}
              />
              {#if showError('preferredDate')}<p class="mt-2 ml-2 text-xs font-bold text-rose-600">{errors.preferredDate}</p>{/if}
            </div>
            <div>
              <label class="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#0f2740]/50">
                Saat tercihi
              </label>
              <div class="flex gap-2">
                {#each [{ v: 'morning', l: 'Sabah' }, { v: 'afternoon', l: 'Öğleden Sonra' }, { v: 'evening', l: 'Akşam' }] as opt}
                  <button
                    type="button"
                    class={`flex-1 rounded-2xl border py-3 text-xs font-black uppercase tracking-widest transition ${preferredSlot === opt.v ? 'border-[#c8a04a] bg-[#c8a04a]/10 text-[#c8a04a]' : 'border-[#0f2740]/10 text-[#0f2740]/60 hover:border-[#c8a04a]'}`}
                    onclick={() => (preferredSlot = opt.v)}
                  >
                    {opt.l}
                  </button>
                {/each}
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#0f2740]/50">
              Notunuz (opsiyonel)
            </label>
            <textarea
              bind:value={note}
              rows="3"
              placeholder="Aradığınız özellikler, bütçe esnekliği, taşınma takvimi..."
              class="w-full resize-none rounded-2xl border border-[#0f2740]/10 bg-white px-6 py-4 text-sm font-medium text-[#0f2740] outline-none transition focus:border-[#c8a04a] focus:ring-2 focus:ring-[#c8a04a]/20"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-5">
        <div class="sticky top-32 overflow-hidden rounded-3xl border border-[#0f2740]/10 bg-white shadow-sm">
          <div class="border-b border-[#0f2740]/10 bg-[#0f2740] p-7 text-white">
            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Randevu Özeti</div>
            <h3 class="mt-1 text-2xl font-bold tracking-tight">{items.length} ilan</h3>
          </div>

          <div class="max-h-[40vh] space-y-4 overflow-y-auto p-7">
            {#each items as item (item.id)}
              <div class="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  class="h-16 w-16 rounded-xl border border-[#0f2740]/10 object-cover"
                  onerror={handleImageError}
                />
                <div class="flex-1">
                  <div class="line-clamp-1 text-sm font-bold text-[#0f2740]">{item.title}</div>
                  <div class="mt-0.5 text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">
                    {item.city} / {item.neighborhood}
                  </div>
                  <div class="mt-1 text-xs font-bold text-[#0f2740]/60">{item.priceLabel}</div>
                </div>
              </div>
            {/each}
          </div>

          {#if uniqueAdvisors.length > 0}
            <div class="border-t border-[#0f2740]/10 bg-[#fbf8f1] p-7">
              <div class="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a04a]">Atanmış Danışmanlar</div>
              <div class="mt-3 space-y-3">
                {#each uniqueAdvisors as a}
                  <div class="flex items-center gap-3">
                    <img src={a.portrait} alt={a.name} class="h-10 w-10 rounded-full object-cover" onerror={handleImageError} />
                    <div class="flex-1">
                      <div class="text-sm font-bold text-[#0f2740]">{a.name}</div>
                      <div class="text-[10px] font-black uppercase tracking-widest text-[#c8a04a]">{a.city}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <div class="p-7">
            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2740] py-5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#0f2740]/20 transition hover:bg-[#c8a04a] hover:text-[#0f2740] disabled:cursor-not-allowed disabled:bg-[#0f2740]/30 disabled:shadow-none"
              onclick={handleSubmit}
              disabled={items.length === 0}
            >
              <Icon name="calendar" size={16} />
              Randevuyu Onayla
            </button>
            {#if attemptedSubmit && !formValid}
              <p class="mt-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-rose-600">
                <Icon name="alert" size={14} />
                Lütfen gerekli alanları doldurun
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
