<script>
  import Icon from '../components/Icon.svelte';
</script>

<div class="bg-white pt-24">
  <section class="mx-auto mb-24 max-w-7xl px-6">
    <div class="relative mb-16 flex h-[55vh] min-h-[420px] items-center justify-center overflow-hidden rounded-[3rem] bg-[#0f2740] shadow-sm">
      <img
        src="https://images.pexels.com/photos/15391694/pexels-photo-15391694.jpeg?auto=compress&cs=tinysrgb&w=2000"
        alt="Hane Mimari"
        class="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f2740]/40 to-[#0f2740]/85"></div>
      <div class="relative z-10 px-6 text-center text-white">
        <span class="text-xs font-black uppercase tracking-[0.4em] text-[#c8a04a]">Hakkımızda</span>
        <h1 class="logo-font mt-4 text-5xl font-bold tracking-tight drop-shadow md:text-7xl">
          Doğru evi<br />sezgiyle bulan emlak
        </h1>
        <p class="mx-auto mt-6 max-w-xl text-base font-medium text-white/85 drop-shadow md:text-lg">
          15 yıllık alan deneyimi, 5 şehirde 5 lisanslı danışman, dürüst portföy yönetimi.
        </p>
      </div>
    </div>

    <div class="mb-24 grid items-center gap-20 md:grid-cols-2">
      <div>
        <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Vizyonumuz</span>
        <h2 class="logo-font mt-4 mb-8 text-4xl leading-tight font-bold tracking-tight text-[#0f2740]">
          Eve dönmek bir fiyat değil, bir histir.
        </h2>
        <p class="mb-6 text-lg leading-relaxed text-[#0f2740]/75">
          Hane'yi 2011'de kurarken bir söz verdik: müşteriyi sat-aramaya değil, doğru kapıyı açmaya odaklayalım.
          Bugün portföyümüzdeki her ilan tapudan ve sahibinden doğrulanır.
        </p>
        <p class="text-lg leading-relaxed text-[#0f2740]/75">
          Şeffaf süreç, dürüst değerleme ve sahaya inen danışmanlar — Türkiye'nin 5 büyük şehrinde 12.000+ aileyi yeni evine taşıdık.
        </p>
      </div>

      <div class="relative">
        <img
          src="https://images.pexels.com/photos/13041123/pexels-photo-13041123.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Modern villa"
          class="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl"
        />
        <div class="absolute -right-6 -bottom-6 hidden rounded-2xl border border-[#0f2740]/10 bg-white p-6 shadow-xl lg:block">
          <div class="logo-font text-3xl leading-none font-bold text-[#0f2740]">12.4k+</div>
          <div class="mt-2 text-xs font-black uppercase tracking-widest text-[#c8a04a]">Kapanan Süreç</div>
        </div>
      </div>
    </div>
  </section>

  <section class="border-t border-[#0f2740]/10 bg-[#fbf8f1] py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16 text-center">
        <span class="text-xs font-black uppercase tracking-[0.3em] text-[#c8a04a]">Değerlerimiz</span>
        <h2 class="logo-font mt-3 text-4xl font-bold tracking-tight text-[#0f2740] md:text-5xl">
          Üzerinde durduğumuz dört şey
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-4">
        {#each [
          { icon: 'shield', t: 'Tapu Doğrulama', d: 'Listemize giren her ilan tapu kayıtlarından kontrol edilir.' },
          { icon: 'eye', t: 'Şeffaf Fiyat', d: 'Komisyon, eksik bedel, gizli yük hiçbiri yok. Her şey ön planda.' },
          { icon: 'key', t: 'Saha Danışmanlığı', d: 'İnternet üzerinden değil, sahada gezdirilen randevular.' },
          { icon: 'headset', t: 'Süreç Takibi', d: 'Sözleşmeden taşınmaya kadar tek hat üzerinden iletişim.' },
        ] as v}
          <div class="rounded-3xl border border-[#0f2740]/10 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-lg">
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f2740] text-[#c8a04a]">
              <Icon name={v.icon} size={20} />
            </div>
            <h3 class="logo-font text-xl font-bold tracking-tight text-[#0f2740]">{v.t}</h3>
            <p class="mt-3 text-sm leading-relaxed text-[#0f2740]/70">{v.d}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
