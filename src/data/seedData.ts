import { Product, Category, Brand, NotificationItem, SiteContent, Order, Banner } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-cement', name: 'Cement', image: '/cement_banner_new.png', description: 'Premium Portland & Composite Cements' },
  { id: 'cat-steel', name: 'TMT Steel Bars', image: '/tmt_steel_rebar_new.png', description: 'High-yield TMT rebar for structural reinforcement' },
  { id: 'cat-blades', name: 'Cutting Blades & Discs', image: '/img-blades.png', description: 'Diamond, Marble, TMT Steel & Concrete Cutting Blades' },
  { id: 'cat-wire', name: 'Binding Wire', image: '/binding_wire_category_hd.png', description: 'High ductility wire for rebar tying' },
  { id: 'cat-nails', name: 'Nails & Fasteners', image: '/img-nails.png', description: 'Concrete, GI, and MS wire construction nails' },
  { id: 'cat-pipes', name: 'Pipes & Fittings', image: '/pvc_pipes_hd.svg', description: 'PVC, CPVC pipes & water storage tanks' },
  { id: 'cat-chemicals', name: 'Chemicals & Adhesives', image: '/cement_banner_new.png', description: 'Waterproofing, Tile Adhesives, Putty & Primers' },
  { id: 'cat-tools', name: 'Hardware & Tools', image: '/img-blades.png', description: 'Shovels, Wheelbarrows, Measuring Tapes & Safety Gear' },
  { id: 'cat-roofing', name: 'Roofing Sheets', image: '/roofing-category.png', description: 'Galvalume, Color Coated & GI Corrugated Roofing Sheets' }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: 'brand-jsw', name: 'JSW Cement', logo: '/jsw_cement.png', categories: ['cat-cement'] },
  { id: 'brand-acc', name: 'ACC Cement', logo: '/acc_cement.png', categories: ['cat-cement'] },
  { id: 'brand-dalmia', name: 'Dalmia Cement', logo: '/dalmia_cement.png', categories: ['cat-cement'] },
  { id: 'brand-bharathi', name: 'Bharathi Cement', logo: '/cement_banner_new.png', categories: ['cat-cement'] },
  { id: 'brand-rajaram', name: 'Rajaram Steel', logo: '/img-steel.png', categories: ['cat-steel'] },
  { id: 'brand-tata', name: 'Tata Tiscon', logo: '/img-steel.png', categories: ['cat-steel'] },
  { id: 'brand-vizag', name: 'Vizag Steel', logo: '/img-steel.png', categories: ['cat-steel'] },
  { id: 'brand-bosch', name: 'Bosch Professional', logo: '/img-blades.png', categories: ['cat-blades'] },
  { id: 'brand-dongcheng', name: 'Dongcheng Tools', logo: '/img-blades.png', categories: ['cat-blades'] },
  { id: 'brand-drfixit', name: 'Dr. Fixit', logo: '/cement_banner_new.png', categories: ['cat-chemicals'] },
  { id: 'brand-supreme', name: 'Supreme Pipes', logo: '/img-steel.png', categories: ['cat-pipes'] },
  { id: 'brand-jsw-roofing', name: 'JSW Everglow', logo: '/roofing-jsw.png', categories: ['cat-roofing'] },
  { id: 'brand-tata-roofing', name: 'Tata BlueScope', logo: '/roofing-tata.png', categories: ['cat-roofing'] }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. CUTTING BLADES & DISCS
  {
    id: 'prod-bosch-4inch-blade',
    name: 'Bosch Professional 4-Inch Diamond Saw Blade for Marble & Concrete',
    category: 'Cutting Blades & Discs',
    brand: 'Bosch Professional',
    description: 'High performance continuous rim diamond cutting wheel designed for smooth, chip-free cutting of marble, granite, ceramic tiles, and reinforced concrete walls.',
    image: '/img-blades.png',
    price: 320,
    stock: 150,
    type: 'general',
    grade: '4 Inch (110 mm) Diamond Rim',
    sizes: [
      { size: '4 inch (110mm)', price: 320, stock: 80 },
      { size: '5 inch (125mm)', price: 420, stock: 45 },
      { size: '7 inch (180mm)', price: 680, stock: 25 }
    ],
    featured: true,
    enabled: true
  },
  {
    id: 'prod-dongcheng-14inch-blade',
    name: 'Dongcheng 14-Inch Heavy Duty Chop Saw Metal & Steel Cutting Blade',
    category: 'Cutting Blades & Discs',
    brand: 'Dongcheng Tools',
    description: '355mm reinforced abrasive chop saw wheel engineered for heavy TMT rebar cutting, iron pipes, angle channels, and structural beams.',
    image: '/img-blades.png',
    price: 240,
    stock: 90,
    type: 'general',
    grade: '14 Inch (355 mm x 3 mm x 25.4 mm)',
    featured: true,
    enabled: true
  },
  {
    id: 'prod-windows-h-tmt-blade-pack',
    name: 'HSN Ultra-Thin TMT Steel Rebar & Metal Cutting Discs (Pack of 10)',
    category: 'Cutting Blades & Discs',
    brand: 'Bosch Professional',
    description: '100mm x 1mm super-thin double mesh reinforced cutting wheels. Provides fast, cool cutting of TMT bars with zero burrs and low spark generation.',
    image: '/img-blades.png',
    price: 280,
    stock: 200,
    type: 'general',
    grade: 'Pack of 10 Pcs (4 Inch)',
    featured: true,
    enabled: true
  },

  // 2. CEMENT
  {
    id: 'prod-jsw-opc',
    name: 'JSW Cement (OPC 53 Grade)',
    category: 'Cement',
    brand: 'JSW Cement',
    description: 'High performance Ordinary Portland Cement, ideal for columns, beams, slabs and structural foundation work. Superior setting strength.',
    image: '/jsw_cement.png',
    price: 375,
    stock: 500,
    type: 'cement',
    grade: 'OPC 53 Grade (50 KG Bag)',
    featured: true,
    enabled: true
  },
  {
    id: 'prod-jsw-ppc',
    name: 'JSW Concreel HD Cement (PPC)',
    category: 'Cement',
    brand: 'JSW Cement',
    description: 'Portland Pozzolana Cement engineered with micro-particles for chemical resistance, anti-crack properties, and heavy load structures.',
    image: '/jsw_cement.png',
    price: 360,
    stock: 350,
    type: 'cement',
    grade: 'PPC (50 KG Bag)',
    featured: true,
    enabled: true
  },
  {
    id: 'prod-acc-gold',
    name: 'ACC Gold Water Shield Cement',
    category: 'Cement',
    brand: 'ACC Cement',
    description: 'Specially engineered water-repellent cement that safeguards roofs, exterior walls, and basements from dampness and water seepage.',
    image: '/acc_cement.png',
    price: 390,
    stock: 400,
    type: 'cement',
    grade: 'PPC Water Shield (50 KG Bag)',
    featured: true,
    enabled: true
  },
  {
    id: 'prod-dalmia-dsp',
    name: 'Dalmia DSP Cement',
    category: 'Cement',
    brand: 'Dalmia Cement',
    description: 'Premium specialized heavy construction cement packed in BOPP tear-resistant bags. High early strength and low heat generation.',
    image: '/dalmia_cement.png',
    price: 385,
    stock: 300,
    type: 'cement',
    grade: 'OPC / PPC Premium (50 KG Bag)',
    featured: true,
    enabled: true
  },
  // 3. TMT STEEL BARS
  {
    id: 'prod-rajaram-tmt-steel',
    name: 'Rajaram 550D TMT Steel Rebar',
    category: 'TMT Steel Bars',
    brand: 'Rajaram Steel',
    description: 'High tensile strength Rajaram 550D TMT steel rebar engineered for heavy load RCC slabs, columns, beams, and structural foundations.',
    image: '/tmt_steel_rebar_new.png',
    price: 60,
    stock: 1100,
    type: 'steel',
    grade: 'Fe 550D Grade',
    sizes: [
      { size: '6 mm', price: 63, stock: 250 },
      { size: '8 mm', price: 61, stock: 350 },
      { size: '10 mm', price: 60, stock: 400 },
      { size: '12 mm', price: 59, stock: 300 },
      { size: '16 mm', price: 60, stock: 200 }
    ],
    featured: true,
    enabled: true
  },
  {
    id: 'prod-tata-tiscon',
    name: 'Tata Tiscon 550SD TMT Steel Bars',
    category: 'TMT Steel Bars',
    brand: 'Tata Tiscon',
    description: 'Super-ductile primary TMT steel bars engineered with advanced Rib Pattern for superior concrete bonding and earthquake resistance.',
    image: '/tmt_steel_rebar_new.png',
    price: 64,
    stock: 1200,
    type: 'steel',
    grade: 'Fe 550SD Grade',
    sizes: [
      { size: '6 mm', price: 68, stock: 200 },
      { size: '8 mm', price: 65, stock: 350 },
      { size: '10 mm', price: 64, stock: 400 },
      { size: '12 mm', price: 63, stock: 500 },
      { size: '16 mm', price: 63, stock: 300 },
      { size: '20 mm', price: 64, stock: 250 },
      { size: '25 mm', price: 65, stock: 150 },
      { size: '32 mm', price: 66, stock: 100 }
    ],
    featured: true,
    enabled: true
  },
  {
    id: 'prod-vizag-steel',
    name: 'Vizag Steel (RINL) TMT Rebar',
    category: 'TMT Steel Bars',
    brand: 'Vizag Steel',
    description: 'Government plant steel bars manufactured with Thermex quenching process. High tensile strength, thermal resistance & weldability.',
    image: '/tmt_steel_rebar_new.png',
    price: 61,
    stock: 1500,
    type: 'steel',
    grade: 'Fe 500D Grade',
    sizes: [
      { size: '6 mm', price: 64, stock: 300 },
      { size: '8 mm', price: 62, stock: 400 },
      { size: '10 mm', price: 61, stock: 500 },
      { size: '12 mm', price: 61, stock: 300 }
    ],
    featured: true,
    enabled: true
  },

  // 4. BINDING WIRE
  {
    id: 'prod-binding-wire-18g',
    name: '18G Soft Annealed GI Rebar Binding Wire (25 KG Bundle)',
    category: 'Binding Wire',
    brand: 'Tata Tiscon',
    description: 'High ductility soft annealed steel binding wire. Easy to twist and cut on site for tying TMT rebar stirrups, columns, and beam cages.',
    image: '/binding_wire_hd.png',
    price: 85,
    stock: 250,
    type: 'wire',
    grade: '18 Gauge Annealed (Per KG)',
    sizes: [
      { size: '18 Gauge (Soft)', price: 85, stock: 150 },
      { size: '20 Gauge (Fine)', price: 90, stock: 100 }
    ],
    featured: true,
    enabled: true
  },

  // 5. NAILS & FASTENERS
  {
    id: 'prod-concrete-nails-heavy',
    name: 'Hardened Carbon Steel Concrete & Wall Nails (1 KG Box)',
    category: 'Nails & Fasteners',
    brand: 'Bosch Professional',
    description: 'High tensile galvanized carbon steel fluted concrete nails designed to penetrate hard concrete walls, brickwork, and shuttering plywood.',
    image: '/img-nails.png',
    price: 135,
    stock: 300,
    type: 'general',
    grade: '2 Inch - 4 Inch Fluted Steel',
    sizes: [
      { size: '2 Inch', price: 135, stock: 100 },
      { size: '3 Inch', price: 140, stock: 100 },
      { size: '4 Inch', price: 145, stock: 100 }
    ],
    featured: true,
    enabled: true
  },

  // 6. PIPES & FITTINGS
  {
    id: 'prod-supreme-cpvc-pipe',
    name: 'Supreme CPVC Heavy Duty Hot & Cold Water Plumbing Pipe',
    category: 'Pipes & Fittings',
    brand: 'Supreme Pipes',
    description: 'SDR 11 CPVC lead-free hot and cold water pressure pipes for residential, commercial, and industrial plumbing systems.',
    image: '/img-steel.png',
    price: 240,
    stock: 200,
    type: 'general',
    grade: 'Class SDR 11 (10 Feet Length)',
    sizes: [
      { size: '3/4 inch (10ft)', price: 240, stock: 80 },
      { size: '1 inch (10ft)', price: 340, stock: 70 },
      { size: '1.25 inch (10ft)', price: 480, stock: 50 }
    ],
    featured: true,
    enabled: true
  },

  // 7. CHEMICALS & ADHESIVES
  {
    id: 'prod-drfixit-501-lw',
    name: 'Dr. Fixit 501 LW+ Waterproofing Liquid Additive for Concrete',
    category: 'Chemicals & Adhesives',
    brand: 'Dr. Fixit',
    description: 'Integral liquid waterproofing compound for RCC slabs, columns, plastering mortar, and brick masonry. Prevents dampness.',
    image: '/cement_banner_new.png',
    price: 680,
    stock: 120,
    type: 'general',
    grade: '5 Litre Pack',
    sizes: [
      { size: '1 Litre', price: 155, stock: 50 },
      { size: '5 Litres', price: 680, stock: 45 },
      { size: '20 Litres', price: 2450, stock: 25 }
    ],
    featured: true,
    enabled: true
  },

  // 8. HARDWARE & TOOLS
  {
    id: 'prod-heavy-steel-shovel',
    name: 'Heavy Duty Forged Steel Construction Shovel / Spade (Fawda)',
    category: 'Hardware & Tools',
    brand: 'Bosch Professional',
    description: 'Heavy gauge hardened steel spade for mixing concrete, sand, gravel, and earth digging work. Includes sturdy wooden handle.',
    image: '/img-blades.png',
    price: 340,
    stock: 90,
    type: 'general',
    grade: 'Heavy Duty Forged Steel',
    featured: true,
    enabled: true
  },

  // 9. ROOFING SHEETS
  {
    id: 'prod-jsw-roofing-color',
    name: 'JSW Everglow Color Coated Roofing Sheet (0.45mm)',
    category: 'Roofing Sheets',
    brand: 'JSW Everglow',
    description: 'Pre-painted color coated PPGI steel roofing sheets available in Brick Red, Terracotta, Dark Blue, and Green.',
    image: '/roofing-jsw.png',
    price: 480,
    stock: 150,
    type: 'general',
    grade: 'PPGI Color Coated (Per Running Foot)',
    sizes: [
      { size: '8 ft', price: 480, stock: 40 },
      { size: '10 ft', price: 600, stock: 35 },
      { size: '12 ft', price: 720, stock: 30 },
      { size: '14 ft', price: 840, stock: 25 },
      { size: '16 ft', price: 960, stock: 20 }
    ],
    featured: true,
    enabled: true
  },
  {
    id: 'prod-tata-roofing-durashine',
    name: 'Tata BlueScope Durashine Roofing Sheet (0.50mm)',
    category: 'Roofing Sheets',
    brand: 'Tata BlueScope',
    description: 'Premium anti-corrosion steel roofing sheet with patented Activate technology for 4X longer life.',
    image: '/roofing-tata.png',
    price: 550,
    stock: 120,
    type: 'general',
    grade: 'Durashine Plus (Per Running Foot)',
    sizes: [
      { size: '8 ft', price: 550, stock: 30 },
      { size: '10 ft', price: 690, stock: 25 },
      { size: '12 ft', price: 825, stock: 25 },
      { size: '14 ft', price: 965, stock: 20 },
      { size: '16 ft', price: 1100, stock: 20 }
    ],
    featured: true,
    enabled: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Today\'s Cement, Steel & Cutting Blade Prices Updated!',
    content: 'JSW, ACC & Rajaram Cement @ ₹355-390/bag. Tata Tiscon @ ₹64/kg. Bosch 4" Diamond Cutting Blades in stock @ ₹320! Call for site delivery.',
    type: 'scrolling',
    active: true,
    createdAt: new Date().toISOString(),
    dateBadge: 'Daily Update'
  },
  {
    id: 'notif-2',
    title: 'Same Day Express Site Delivery in Kalikiri',
    content: 'Orders placed before 2:00 PM are dispatched same day via our fleet of heavy vehicles.',
    type: 'banner',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  businessName: 'HSN CEMENT AND STEEL',
  tagline: 'Premium Cement, Steel, Cutting Blades & Construction Supplies in Kalikiri',
  heroHeading: 'Premium Cement, Steel & Cutting Blades in Kalikiri',
  heroSubheading: 'Trusted supplier of genuine construction materials, TMT rebar, Bosch cutting blades, binding wires, and waterproofing for home builders & engineering contractors.',
  splashImage: '/splash_bg_clear.png',
  heroImage: '/hero_bg_ultra_8k.png',
  address: 'Kalikiri, Annamayya District, Andhra Pradesh – 517234',
  locationDetails: 'Near Main Highway, Kalikiri Landmark Hub',
  pincode: '517234',
  phone: '07989494779',
  whatsapp: '+91 9179173040',
  businessHours: 'Open 12 Hours (7:00 AM - 7:00 PM Daily)',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15523.518174413158!2d78.78345215000001!3d13.68962045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb36146c879d749%3A0xb35fa32490807b5a!2sKalikiri%2C%20Andhra%20Pradesh%20517234!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  aboutStory: 'Established as Kalikiri\'s premier construction materials distributor, HSN CEMENT AND STEEL has provided high-grade cement, TMT steel bars, cutting blades, binding wire, hardware tools, and chemicals to thousands of home builders, engineering contractors, and government project leads.',
  aboutExperience: 'Over 15+ years of unblemished service delivering top-tier raw materials to site locations with fast fleet dispatch.',
  services: [
    { id: 'serv-1', title: 'Bulk Supply for Projects', desc: 'Direct supply for multi-story residential, commercial complexes, and road projects at wholesale pricing.', icon: 'Building2' },
    { id: 'serv-2', title: 'Express Site Delivery', desc: 'Own tractor & truck fleet ensuring on-time delivery right to your construction site in Kalikiri & nearby mandals.', icon: 'Truck' },
    { id: 'serv-3', title: 'Steel Cutting & Bending Support', desc: 'Custom size cutting and bundle bundling to save time and reduce labor overhead on site.', icon: 'Scissors' },
    { id: 'serv-4', title: 'Quality Assurance Testing', desc: 'Factory test certificates provided for all Tata Tiscon, Vizag Steel, JSW, and ACC batches.', icon: 'ShieldCheck' }
  ],
  galleryImages: [
    { id: 'g-1', url: '/cement_banner_new.png', title: 'Cement Warehouse Stock', category: 'Cement' },
    { id: 'g-2', url: '/steel_banner_new.png', title: 'Tata Tiscon & Vizag Steel Bundles', category: 'Steel' },
    { id: 'g-3', url: '/img-blades.png', title: 'Diamond & Marble Cutting Blades', category: 'Blades' },
    { id: 'g-4', url: '/hsn_hero_new.png', title: 'Delivery Vehicles Fleet', category: 'Logistics' }
  ],
  maintenanceMode: false
};

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-2',
    title: 'Premium TMT Steel',
    imageUrl: '/steel_banner_new.png',
    active: true
  },
  {
    id: 'banner-3',
    title: 'Cutting Blades & Tools',
    imageUrl: '/img-blades.png',
    active: true
  }
];
