/**
 * Mock real estate listings for Ma Estate (間 不動産).
 * Japanese Minimalist / Japandi aesthetic properties.
 */

export const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    code: 'TYO-101',
    title: 'Yanaka Machiya Residence',
    japaneseTitle: '谷中 町家',
    subtitle: 'Restored Taisho-era wooden townhouse with private tsuboniwa courtyard',
    type: 'Machiya',
    location: 'Tokyo, Taito-ku (Yanaka)',
    prefecture: 'Tokyo',
    price: 68500000,
    priceFormatted: '¥68,500,000',
    approxUsd: '$455,000',
    area: 112,
    tatami: '32 畳',
    rooms: '3LDK',
    yearBuilt: 1928,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description:
      'A serene sanctuary hidden behind cedar lattice shoji in historic Yanaka. Features original exposed Japanese cedar beams, an interior stone tsuboniwa courtyard garden with ancient moss, and a contemporary kitchen finished in burnished bronze.',
    features: [
      'Private Tsuboniwa Courtyard Garden',
      'Original Taisho Cedar Beams',
      'Sliding Washi Paper Shoji',
      'Underfloor Radiative Heating',
      'Custom Hinoki Cypress Powder Room'
    ],
    agent: 'Kenjiro Sato (佐藤 健次郎)'
  },
  {
    id: 'prop-2',
    code: 'NGN-204',
    title: 'Komorebi Forest Villa',
    japaneseTitle: '木漏れ日 ヴィラ',
    subtitle: 'Contemporary cedar and glass retreat nestled in Karuizawa pine woods',
    type: 'Villa',
    location: 'Nagano, Karuizawa',
    prefecture: 'Nagano',
    price: 124000000,
    priceFormatted: '¥124,000,000',
    approxUsd: '$825,000',
    area: 185,
    tatami: '48 畳',
    rooms: '4LDK',
    yearBuilt: 2022,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description:
      'Engineered specifically to celebrate komorebi — the sunlight filtering through trees. Expansive floor-to-ceiling double-glazed glass pavilions, a minimalist cast-iron hearth, wide wraparound engawa decking, and a private outdoor rotenburo onsen bath.',
    features: [
      'Private Outdoor Rotenburo (Hot Spring)',
      'Wraparound Engawa Veranda Deck',
      'Cast-Iron Wood Burning Hearth',
      'Triple Low-E Insulated Glass',
      'Heated Natural Slate Flooring'
    ],
    agent: 'Yuki Takahashi (高橋 由紀)'
  },
  {
    id: 'prop-3',
    code: 'TYO-309',
    title: 'Aoyama Architectural Studio',
    japaneseTitle: '青山 アトリエ',
    subtitle: 'Cast-concrete minimalist loft with elevated wabi-sabi tatami tea room',
    type: 'Loft / Apartment',
    location: 'Tokyo, Minato-ku (Minami-Aoyama)',
    prefecture: 'Tokyo',
    price: 92000000,
    priceFormatted: '¥92,000,000',
    approxUsd: '$610,000',
    area: 88,
    tatami: '24 畳',
    rooms: '2LDK',
    yearBuilt: 2020,
    status: 'Reserved',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description:
      'Board-formed architectural concrete balanced with warm white oak carpentry. A corner residence steps from Nezu Museum, featuring an elevated tatami tea alcove, concealed storage flush with walls, and indirect ambient paper lighting.',
    features: [
      'Board-Formed Architectural Concrete',
      'Elevated Minimalist Tatami Tea Nook',
      'Miele Concealed Kitchen Suite',
      'Automated Timber Shoji Louvers',
      'Acoustic Studio Isolation'
    ],
    agent: 'Ren Ishikawa (石川 蓮)'
  },
  {
    id: 'prop-4',
    code: 'KYO-412',
    title: 'Arashiyama Riverside Madori',
    japaneseTitle: '嵐山 翠楼',
    subtitle: 'Riverside sukiya residence overlooking Oi River and bamboo groves',
    type: 'Traditional House',
    location: 'Kyoto, Ukyo-ku (Saga-Arashiyama)',
    prefecture: 'Kyoto',
    price: 81000000,
    priceFormatted: '¥81,000,000',
    approxUsd: '$540,000',
    area: 140,
    tatami: '38 畳',
    rooms: '3LDK',
    yearBuilt: 2018,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Harmonious dialogue between traditional sukiya-style carpentry and modern minimalist comforts. Features an artisanal hinoki soaking tub overlooking a private moss and bamboo garden, sliding washi partitions, and river views.',
    features: [
      'Deep Hinoki Cypress Soaking Tub',
      'Panoramic Oi River Views',
      'Sukiya-style Handcrafted Joinery',
      'Private Moss & Bamboo Garden',
      'Natural Diatomaceous Earth Plaster'
    ],
    agent: 'Mayumi Ogawa (小川 まゆみ)'
  },
  {
    id: 'prop-5',
    code: 'KNG-505',
    title: 'Kamakura Engawa Cottage',
    japaneseTitle: '鎌倉 縁側の家',
    subtitle: 'Single-story coastal home oriented toward south-facing veranda and plum trees',
    type: 'Cottage',
    location: 'Kanagawa, Kamakura (Yuigahama)',
    prefecture: 'Kanagawa',
    price: 54500000,
    priceFormatted: '¥54,500,000',
    approxUsd: '$362,000',
    area: 96,
    tatami: '26 畳',
    rooms: '2LDK',
    yearBuilt: 2015,
    status: 'Under Offer',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description:
      'Situated 5 minutes stroll from Yuigahama beach. A serene single-level timber home oriented around a wide south-facing engawa veranda, shaded by mature Japanese black pines, with gravel karesansui zen garden and outdoor surf shower.',
    features: [
      'Deep Cedar Engawa Veranda',
      'Karesansui Dry Zen Landscape',
      'Outdoor Rinse Station for Beachgoers',
      'Natural Lime Plaster Walls',
      'High Ceilings with Skylights'
    ],
    agent: 'Kenjiro Sato (佐藤 健次郎)'
  },
  {
    id: 'prop-6',
    code: 'TYO-618',
    title: 'Daikanyama Terrace Penthouse',
    japaneseTitle: '代官山 テラス',
    subtitle: 'Skyline penthouse with limestone terrace and private rooftop dry garden',
    type: 'Penthouse',
    location: 'Tokyo, Shibuya-ku (Sarugakucho)',
    prefecture: 'Tokyo',
    price: 178000000,
    priceFormatted: '¥178,000,000',
    approxUsd: '$1,180,000',
    area: 210,
    tatami: '56 畳',
    rooms: '4LDK',
    yearBuilt: 2023,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    description:
      'The pinnacle of contemporary Tokyo residential architecture. Direct elevator access leads to expansive 360-degree city views, honed travertine surfaces, a bespoke minimalist kitchen, and a private rooftop zen rock terrace.',
    features: [
      'Direct Private Elevator Access',
      'Rooftop Karesansui Zen Garden',
      'Honed Travertine Marble Flooring',
      'Custom Gaggenau Minimalist Kitchen',
      'Private 2-Car Automated Garage'
    ],
    agent: 'Ren Ishikawa (石川 蓮)'
  }
];

const STORAGE_KEY = 'ma_estate_properties_v1';

export function loadProperties() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROPERTIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('Failed to parse properties from localStorage, using defaults.', e);
  }
  return INITIAL_PROPERTIES;
}

export function saveProperties(properties) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (e) {
    console.warn('Failed to save properties to localStorage.', e);
  }
}

export function resetPropertiesStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear properties in localStorage.', e);
  }
  return INITIAL_PROPERTIES;
}
