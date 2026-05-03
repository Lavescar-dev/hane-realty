export const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 1000%22%3E%3Crect width=%22800%22 height=%221000%22 fill=%22%230f2740%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23c8a04a%22 font-family=%22serif%22 font-size=%2234%22 font-weight=%22600%22%3EHane%3C/text%3E%3C/svg%3E";

export const validImages = [
  '10117706','10117721','10448578','10758468','10935460','11042876','11262208','11296223','11349791','11480454',
  '11626586','11701122','11777649','11871257','12282973','12359215','12477583','12713153','12814940','13041123',
  '13041129','13203184','13203193','13203194','13722872','13722888','13722891','13977663','14002095','14193468',
  '14499728','14686150','14851956','14883345','15391694','15599232','15599236','15683265','15743361','15743369',
  '15859214','16451529','16648302','16961779','17174766','17174767','17301027','17313544','17606618','17707574'
];

export const heroImage = `https://images.pexels.com/photos/13041123/pexels-photo-13041123.jpeg?auto=compress&cs=tinysrgb&w=2000`;

export const cities = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Etiler', 'Maslak', 'Sarıyer', 'Üsküdar', 'Bakırköy', 'Ataşehir', 'Maltepe', 'Beyoğlu'],
  'Ankara': ['Çankaya', 'Yenimahalle', 'Etimesgut', 'Keçiören', 'Mamak'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Alsancak', 'Bayraklı'],
  'Antalya': ['Muratpaşa', 'Konyaaltı', 'Kepez'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım'],
};

export const categoryOptions = ['Daire', 'Villa', 'İş Yeri', 'Stüdyo', 'Arsa'];
export const typeOptions = ['Satılık', 'Kiralık'];
export const roomOptions = ['1+0', '1+1', '2+1', '3+1', '4+1', '5+1'];

export const allFeatures = [
  'Asansör', 'Otopark', 'Balkon', 'Eşyalı', 'Site İçinde', 'Doğalgaz',
  'Klima', 'Deniz Manzarası', 'Yüzme Havuzu', 'Akıllı Ev', 'Güvenlik 24/7', 'Spor Salonu',
  'Bahçe', 'Teras', 'Kombi'
];

const adjectives = [
  'Lüks', 'Yenilenmiş', 'Geniş', 'Manzaralı', 'Bahçeli', 'Modern',
  'Yatırımlık', 'Şık', 'Hazır', 'Site İçinde'
];

export const advisors = [
  { id: 1, name: 'Ayşegül Demir', title: 'Kıdemli Emlak Danışmanı', city: 'İstanbul', phone: '+90 532 555 12 34', email: 'aysegul@hane.lavescar.com.tr', portrait: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=400', tagline: '12 yıllık deneyim, Avrupa Yakası uzmanı.' },
  { id: 2, name: 'Mehmet Kaya', title: 'Bölge Uzmanı', city: 'Ankara', phone: '+90 532 555 56 78', email: 'mehmet@hane.lavescar.com.tr', portrait: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', tagline: 'Çankaya & Yenimahalle özel listelemeler.' },
  { id: 3, name: 'Selin Yıldız', title: 'Yatırım Danışmanı', city: 'İzmir', phone: '+90 532 555 90 12', email: 'selin@hane.lavescar.com.tr', portrait: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=400', tagline: 'Karşıyaka & sahil hattı yatırımı.' },
  { id: 4, name: 'Burak Şahin', title: 'Villa & Lüks Konut Uzmanı', city: 'Antalya', phone: '+90 532 555 34 56', email: 'burak@hane.lavescar.com.tr', portrait: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', tagline: 'Konyaaltı & Lara villaları, denize sıfır portföy.' },
  { id: 5, name: 'Zeynep Erdoğan', title: 'Kiralama Uzmanı', city: 'Bursa', phone: '+90 532 555 78 90', email: 'zeynep@hane.lavescar.com.tr', portrait: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=400', tagline: 'Nilüfer & Osmangazi kiralık portföyü.' },
];

function pseudoRand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const cityWeights = ['İstanbul','İstanbul','İstanbul','İstanbul','İstanbul','Ankara','Ankara','İzmir','İzmir','Antalya','Bursa'];
const categoryWeights = ['Daire','Daire','Daire','Daire','Villa','Villa','İş Yeri','Stüdyo','Stüdyo','Arsa'];
const typeWeights = ['Satılık','Satılık','Satılık','Kiralık','Kiralık'];

function formatPrice(value) {
  return new Intl.NumberFormat('tr-TR').format(value);
}

export const listings = Array.from({ length: 50 }, (_, idx) => {
  const i = idx + 1;
  const city = cityWeights[Math.floor(pseudoRand(i) * cityWeights.length)];
  const neighborhood = cities[city][Math.floor(pseudoRand(i + 13) * cities[city].length)];
  let category = categoryWeights[Math.floor(pseudoRand(i + 7) * categoryWeights.length)];
  const type = typeWeights[Math.floor(pseudoRand(i + 3) * typeWeights.length)];

  let room;
  if (category === 'Stüdyo') room = '1+0';
  else if (category === 'İş Yeri' || category === 'Arsa') room = null;
  else if (category === 'Villa') room = roomOptions[3 + Math.floor(pseudoRand(i + 11) * 3)];
  else room = roomOptions[Math.floor(pseudoRand(i + 11) * roomOptions.length)];

  const m2Base = category === 'Villa' ? 230 : category === 'İş Yeri' ? 95 : category === 'Arsa' ? 350 : category === 'Stüdyo' ? 28 : 65;
  const m2 = m2Base + Math.floor(pseudoRand(i + 17) * (category === 'Arsa' ? 1500 : 180));
  const yearOld = Math.floor(pseudoRand(i + 19) * 22);
  const buildYear = category === 'Arsa' ? null : 2026 - yearOld;

  let price;
  if (type === 'Satılık') {
    if (category === 'Villa') price = 8_500_000 + Math.floor(pseudoRand(i + 23) * 70_000_000);
    else if (category === 'Daire') price = 1_400_000 + Math.floor(pseudoRand(i + 29) * 22_000_000);
    else if (category === 'İş Yeri') price = 950_000 + Math.floor(pseudoRand(i + 31) * 14_000_000);
    else if (category === 'Stüdyo') price = 850_000 + Math.floor(pseudoRand(i + 37) * 3_200_000);
    else price = 1_500_000 + Math.floor(pseudoRand(i + 39) * 18_000_000);
  } else {
    if (category === 'Villa') price = 35_000 + Math.floor(pseudoRand(i + 41) * 100_000);
    else if (category === 'Daire') price = 12_000 + Math.floor(pseudoRand(i + 43) * 65_000);
    else if (category === 'İş Yeri') price = 18_000 + Math.floor(pseudoRand(i + 45) * 80_000);
    else price = 7_000 + Math.floor(pseudoRand(i + 47) * 22_000);
  }
  price = Math.round(price / 1000) * 1000;

  const featureCount = 3 + Math.floor(pseudoRand(i + 53) * 3);
  const featureSet = new Set();
  for (let j = 0; j < featureCount * 2 && featureSet.size < featureCount; j++) {
    featureSet.add(allFeatures[Math.floor(pseudoRand(i * 100 + j) * allFeatures.length)]);
  }
  const features = [...featureSet];
  if (category === 'Villa' && !features.includes('Bahçe')) features.push('Bahçe');

  const adjective = adjectives[Math.floor(pseudoRand(i + 71) * adjectives.length)];
  const subjectLabel = room ? `${room} ${category}` : category;
  const title = `${neighborhood}'de ${adjective} ${subjectLabel}`;

  const advisor = advisors[Math.floor(pseudoRand(i + 59) * advisors.length)];
  const imageId = validImages[idx % validImages.length];
  const galleryStart = (idx * 3) % validImages.length;
  const gallery = [
    `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
    `https://images.pexels.com/photos/${validImages[(galleryStart + 7) % validImages.length]}/pexels-photo-${validImages[(galleryStart + 7) % validImages.length]}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
    `https://images.pexels.com/photos/${validImages[(galleryStart + 13) % validImages.length]}/pexels-photo-${validImages[(galleryStart + 13) % validImages.length]}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
    `https://images.pexels.com/photos/${validImages[(galleryStart + 19) % validImages.length]}/pexels-photo-${validImages[(galleryStart + 19) % validImages.length]}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
  ];

  const rating = Math.round((4.0 + pseudoRand(i + 61) * 1.0) * 10) / 10;
  const viewCount = 220 + Math.floor(pseudoRand(i + 67) * 4500);

  return {
    id: i,
    title,
    type,
    category,
    city,
    neighborhood,
    room,
    m2,
    price,
    priceLabel: type === 'Kiralık' ? `${formatPrice(price)} ₺/ay` : `${formatPrice(price)} ₺`,
    buildYear,
    image: gallery[0],
    gallery,
    features,
    advisor,
    description:
      category === 'Arsa'
        ? `${city} / ${neighborhood} bölgesinde ${m2}m² imarlı arsa. Yatırım için ideal konum.`
        : `${city} / ${neighborhood} bölgesinde ${m2}m², ${room || category}, ${buildYear} yapımı. ${features.slice(0, 3).join(', ')}. Aydınlık, geniş yaşam alanı.`,
    isNew: idx >= 44,
    rating,
    viewCount,
  };
}).map((listing, index) => {
  if (index === 0) return { ...listing, title: "Etiler'de Bahçeli Lüks Villa", category: 'Villa', city: 'İstanbul', neighborhood: 'Etiler' };
  if (index === 1) return { ...listing, title: "Çankaya'da Modern 3+1 Daire", category: 'Daire', city: 'Ankara', neighborhood: 'Çankaya' };
  if (index === 2) return { ...listing, title: "Konyaaltı Deniz Manzaralı 4+1", category: 'Daire', city: 'Antalya', neighborhood: 'Konyaaltı' };
  if (index === 3) return { ...listing, title: "Karşıyaka Sahil Manzaralı Stüdyo", category: 'Stüdyo', city: 'İzmir', neighborhood: 'Karşıyaka' };
  return listing;
});
