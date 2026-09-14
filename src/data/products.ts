export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  status: 'new' | 'stock' | 'refurbished' | 'preorder';
  colors?: string[];
  specs: Record<string, string>;
  description: string;
  badge?: string;
  seller: string;
  warranty: string;
  deliveryDays: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
}

export const categories: Category[] = [
  { id: 'mobile', name: 'موبایل و تبلت', icon: 'smartphone', count: 124, subcategories: ['گوشی هوشمند', 'تبلت', 'لوازم جانبی موبایل'] },
  { id: 'laptop', name: 'لپ‌تاپ و کامپیوتر', icon: 'laptop', count: 89, subcategories: ['لپ‌تاپ', 'کامپیوتر رومیزی', 'آل‌این‌وان'] },
  { id: 'components', name: 'قطعات سخت‌افزاری', icon: 'cpu', count: 256, subcategories: ['پردازنده', 'کارت گرافیک', 'رم', 'مادربرد', 'پاور', 'کیس'] },
  { id: 'wearable', name: 'ساعت و پوشیدنی', icon: 'watch', count: 67, subcategories: ['ساعت هوشمند', 'بند ساعت', 'دستبند سلامتی'] },
  { id: 'gaming', name: 'گیمینگ', icon: 'gamepad', count: 143, subcategories: ['کنسول', 'دسته بازی', 'بازی', 'لوازم جانبی'] },
  { id: 'audio', name: 'صوتی', icon: 'headphones', count: 98, subcategories: ['هدفون', 'ایرباد', 'اسپیکر', 'میکروفون'] },
  { id: 'monitor', name: 'مانیتور و نمایشگر', icon: 'monitor', count: 54, subcategories: ['مانیتور گیمینگ', 'مانیتور اداری', 'پروژکتور'] },
  { id: 'peripherals', name: 'لوازم جانبی', icon: 'keyboard', count: 187, subcategories: ['کیبورد', 'ماوس', 'وبکم', 'هاب'] },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'آیفون ۱۵ پرو مکس ۲۵۶ گیگابایت',
    brand: 'اپل',
    category: 'mobile',
    subcategory: 'گوشی هوشمند',
    price: 89500000,
    originalPrice: 95000000,
    image: 'https://image.qwenlm.ai/generated-images/ba731b34-b2e7-4296-8ea1-78508b76ff59/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/ba731b34-b2e7-4296-8ea1-78508b76ff59/_result.png'],
    rating: 4.8,
    reviewCount: 342,
    stock: 15,
    status: 'new',
    colors: ['تیتانیوم طبیعی', 'تیتانیوم آبی', 'تیتانیوم سفید', 'تیتانیوم مشکی'],
    specs: { 'پردازنده': 'A17 Pro', 'حافظه': '۲۵۶ گیگابایت', 'رم': '۸ گیگابایت', 'صفحه‌نمایش': '۶.۷ اینچ OLED', 'دوربین': '۴۸ مگاپیکسل', 'باتری': '۴۴۲۲ میلی‌آمپر' },
    description: 'آیفون ۱۵ پرو مکس با طراحی تیتانیومی، تراشه A17 Pro و دوربین حرفه‌ای، قدرتمندترین آیفون تاریخ.',
    badge: 'پرفروش',
    seller: 'دیجی‌مارکت',
    warranty: '۱۸ ماه گارانتی رسمی',
    deliveryDays: 2
  },
  {
    id: '2',
    name: 'مک‌بوک پرو ۱۶ اینچ M3 Pro',
    brand: 'اپل',
    category: 'laptop',
    subcategory: 'لپ‌تاپ',
    price: 145000000,
    originalPrice: 155000000,
    image: 'https://image.qwenlm.ai/generated-images/57b0e643-e057-4c78-8f8d-438a115763fa/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/57b0e643-e057-4c78-8f8d-438a115763fa/_result.png'],
    rating: 4.9,
    reviewCount: 128,
    stock: 8,
    status: 'new',
    colors: ['نقره‌ای', 'خاکستری فضایی'],
    specs: { 'پردازنده': 'Apple M3 Pro', 'حافظه': '۵۱۲ گیگابایت SSD', 'رم': '۱۸ گیگابایت', 'صفحه‌نمایش': '۱۶.۲ اینچ Liquid Retina XDR', 'باتری': 'تا ۲۲ ساعت', 'وزن': '۲.۱۴ کیلوگرم' },
    description: 'مک‌بوک پرو با تراشه M3 Pro، عملکرد خارق‌العاده برای حرفه‌ای‌ها.',
    badge: 'جدید',
    seller: 'دیجی‌مارکت',
    warranty: '۱۲ ماه گارانتی رسمی',
    deliveryDays: 3
  },
  {
    id: '3',
    name: 'اپل واچ اولترا ۲',
    brand: 'اپل',
    category: 'wearable',
    subcategory: 'ساعت هوشمند',
    price: 48500000,
    originalPrice: 52000000,
    image: 'https://image.qwenlm.ai/generated-images/40bf1c98-b0b0-4959-b6c1-024c2438909b/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/40bf1c98-b0b0-4959-b6c1-024c2438909b/_result.png'],
    rating: 4.7,
    reviewCount: 89,
    stock: 22,
    status: 'new',
    colors: ['نارنجی آلپاین', 'سبز جنگلی', 'آبی اقیانوس'],
    specs: { 'پردازنده': 'S9 SiP', 'صفحه‌نمایش': '۴۹ میلی‌متر OLED', 'مقاومت': 'تا ۱۰۰ متر زیر آب', 'باتری': 'تا ۳۶ ساعت', 'سنسورها': 'GPS دو فرکانسه، قطب‌نما' },
    description: 'اپل واچ اولترا ۲، ساعت هوشمند حرفه‌ای برای ماجراجویان و ورزشکاران.',
    badge: 'محبوب',
    seller: 'دیجی‌مارکت',
    warranty: '۱۲ ماه گارانتی',
    deliveryDays: 2
  },
  {
    id: '4',
    name: 'پلی‌استیشن ۵ اسلیم',
    brand: 'سونی',
    category: 'gaming',
    subcategory: 'کنسول',
    price: 32500000,
    originalPrice: 35000000,
    image: 'https://image.qwenlm.ai/generated-images/d2c7a999-9aef-40bb-968f-efd875c7789d/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/d2c7a999-9aef-40bb-968f-efd875c7789d/_result.png'],
    rating: 4.9,
    reviewCount: 567,
    stock: 30,
    status: 'new',
    colors: ['سفید', 'مشکی'],
    specs: { 'پردازنده': 'AMD Zen 2', 'گرافیک': 'RDNA 2 - 10.28 TFLOPS', 'حافظه': '۱ ترابایت SSD', 'رم': '۱۶ گیگابایت GDDR6', 'خروجی': '4K 120Hz', 'صدا': 'Tempest 3D AudioTech' },
    description: 'کنسول نسل نهم سونی با طراحی اسلیم و عملکرد فوق‌العاده.',
    badge: 'پرفروش',
    seller: 'دیجی‌مارکت',
    warranty: '۱۸ ماه گارانتی',
    deliveryDays: 1
  },
  {
    id: '5',
    name: 'آیپد پرو ۱۲.۹ اینچ M2',
    brand: 'اپل',
    category: 'mobile',
    subcategory: 'تبلت',
    price: 72000000,
    originalPrice: 78000000,
    image: 'https://image.qwenlm.ai/generated-images/1df6481a-dd50-49ac-b915-070a2fead69e/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/1df6481a-dd50-49ac-b915-070a2fead69e/_result.png'],
    rating: 4.8,
    reviewCount: 201,
    stock: 12,
    status: 'new',
    colors: ['نقره‌ای', 'خاکستری فضایی'],
    specs: { 'پردازنده': 'Apple M2', 'حافظه': '۲۵۶ گیگابایت', 'صفحه‌نمایش': '۱۲.۹ اینچ Liquid Retina XDR', 'دوربین': '۱۲ مگاپیکسل', 'اتصال': 'WiFi 6E + 5G' },
    description: 'آیپد پرو با نمایشگر mini-LED و تراشه M2، تبلت حرفه‌ای اپل.',
    seller: 'دیجی‌مارکت',
    warranty: '۱۲ ماه گارانتی',
    deliveryDays: 2
  },
  {
    id: '6',
    name: 'هدفون سونی WH-1000XM5',
    brand: 'سونی',
    category: 'audio',
    subcategory: 'هدفون',
    price: 18500000,
    originalPrice: 21000000,
    image: 'https://image.qwenlm.ai/generated-images/b786c8ca-f714-49d3-a3e4-9ee001818ec5/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/b786c8ca-f714-49d3-a3e4-9ee001818ec5/_result.png'],
    rating: 4.7,
    reviewCount: 445,
    stock: 45,
    status: 'new',
    colors: ['مشکی', 'نقره‌ای', 'آبی'],
    specs: { 'نوع': 'بالاتر گوشی بی‌سیم', 'نویزکنسلینگ': 'فعال پیشرفته', 'باتری': '۳۰ ساعت', 'درایور': '۳۰ میلی‌متر', 'بلوتوث': '۵.۲', 'وزن': '۲۵۰ گرم' },
    description: 'بهترین هدفون نویزکنسلینگ جهان با کیفیت صدای استودیویی.',
    badge: 'پیشنهاد ویژه',
    seller: 'دیجی‌مارکت',
    warranty: '۱۲ ماه گارانتی',
    deliveryDays: 1
  },
  {
    id: '7',
    name: 'کارت گرافیک RTX 4090',
    brand: 'ان‌ویدیا',
    category: 'components',
    subcategory: 'کارت گرافیک',
    price: 98000000,
    originalPrice: 105000000,
    image: 'https://image.qwenlm.ai/generated-images/d5de5302-ae1e-42a7-a7d3-f95afe2b8956/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/d5de5302-ae1e-42a7-a7d3-f95afe2b8956/_result.png'],
    rating: 4.9,
    reviewCount: 156,
    stock: 5,
    status: 'new',
    specs: { 'معماری': 'Ada Lovelace', 'حافظه': '۲۴ گیگابایت GDDR6X', 'هسته‌ها': '۱۶۳۸۴ CUDA', 'فرکانس': '۲۵۲۰ مگاهرتز', 'توان': '۴۵۰ وات', 'خروجی': '3x DP 1.4a + 1x HDMI 2.1' },
    description: 'قدرتمندترین کارت گرافیک جهان برای گیمینگ 4K و رندرینگ حرفه‌ای.',
    badge: 'حرفه‌ای',
    seller: 'دیجی‌مارکت',
    warranty: '۳۶ ماه گارانتی',
    deliveryDays: 3
  },
  {
    id: '8',
    name: 'ایرپاد پرو نسل دوم USB-C',
    brand: 'اپل',
    category: 'audio',
    subcategory: 'ایرباد',
    price: 12500000,
    originalPrice: 14000000,
    image: 'https://image.qwenlm.ai/generated-images/b5a37886-4437-452b-b124-5c8447a04b12/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/b5a37886-4437-452b-b124-5c8447a04b12/_result.png'],
    rating: 4.6,
    reviewCount: 890,
    stock: 60,
    status: 'new',
    specs: { 'نوع': 'اینباد بی‌سیم', 'نویزکنسلینگ': 'فعال نسل ۲', 'باتری': '۶ ساعت (۳۰ ساعت با کیس)', 'بلوتوث': '۵.۳', 'مقاومت': 'IP54', 'شارژ': 'USB-C + MagSafe + Qi' },
    description: 'ایرپاد پرو با نویزکنسلینگ پیشرفته و صدای فضایی شخصی‌سازی‌شده.',
    badge: 'پرفروش',
    seller: 'دیجی‌مارکت',
    warranty: '۱۲ ماه گارانتی',
    deliveryDays: 1
  },
  {
    id: '9',
    name: 'مانیتور گیمینگ ۲۷ اینچ 4K 144Hz',
    brand: 'ایسوس',
    category: 'monitor',
    subcategory: 'مانیتور گیمینگ',
    price: 28500000,
    originalPrice: 32000000,
    image: 'https://image.qwenlm.ai/generated-images/24b666d6-0a61-43b4-9645-2fa259c2eeed/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/24b666d6-0a61-43b4-9645-2fa259c2eeed/_result.png'],
    rating: 4.5,
    reviewCount: 78,
    stock: 18,
    status: 'new',
    specs: { 'اندازه': '۲۷ اینچ', 'رزولوشن': '3840x2160 (4K)', 'نرخ نوسازی': '۱۴۴ هرتز', 'پنل': 'IPS', 'زمان پاسخ': '۱ میلی‌ثانیه', 'HDR': 'HDR600' },
    description: 'مانیتور گیمینگ 4K با نرخ نوسازی ۱۴۴ هرتز برای تجربه بازی بی‌نظیر.',
    seller: 'دیجی‌مارکت',
    warranty: '۲۴ ماه گارانتی',
    deliveryDays: 3
  },
  {
    id: '10',
    name: 'کیبورد مکانیکی گیمینگ RGB',
    brand: 'ریزر',
    category: 'peripherals',
    subcategory: 'کیبورد',
    price: 8500000,
    originalPrice: 9800000,
    image: 'https://image.qwenlm.ai/generated-images/f9ec212e-091b-4cfa-a9d2-34b93b5935c7/_result.png',
    images: ['https://image.qwenlm.ai/generated-images/f9ec212e-091b-4cfa-a9d2-34b93b5935c7/_result.png'],
    rating: 4.4,
    reviewCount: 234,
    stock: 35,
    status: 'new',
    specs: { 'نوع سوییچ': 'مکانیکی سبز', 'نورپردازی': 'RGB Chroma', 'اتصال': 'USB-C بافته', 'آنتی‌گوستینگ': 'NKRO', 'فریم': 'آلومینیوم', 'پالم‌رست': 'مغناطیسی' },
    description: 'کیبورد مکانیکی حرفه‌ای با سوییچ‌های لمسی و نورپردازی RGB.',
    badge: 'تخفیف ویژه',
    seller: 'دیجی‌مارکت',
    warranty: '۲۴ ماه گارانتی',
    deliveryDays: 2
  }
];

export const brands = ['اپل', 'سونی', 'سامسونگ', 'شیائومی', 'ان‌ویدیا', 'ایسوس', 'ریزر', 'لنوو', 'اچ‌پی', 'دل'];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

export const getDiscountPercent = (price: number, originalPrice?: number): number => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
