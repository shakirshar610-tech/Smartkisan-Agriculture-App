import type { TranslatableString } from "./crops";

export interface FarmingTip {
  title: TranslatableString;
  description: TranslatableString;
  icon: string;
  cropIds?: string[];
}

export const farmingTips: FarmingTip[] = [
  {
    icon: "soil",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Test Your Soil",
      ur: "اپنی مٹی جانچیں",
      sd: "پنهنجي مٽي جانچو",
    },
    description: {
      en: "A simple soil test can tell you what nutrients your field needs, helping you avoid wasting money on unnecessary fertilizers.",
      ur: "مٹی جانچ سے پتہ چل جاتا ہے کہ کھیت کو کون سی کھاد چاہیے۔ اس سے بے پر پیسہ ضائع نہیں ہوتا۔",
      sd: "مٽي جانچ کان پتو پوي ٿو ته کيت کي ڪهڙي ڪاد گهرجي. ان سان بي پيسو ضائع ناهي ٿيندو.",
    },
  },
  {
    icon: "rotate",
    cropIds: ["cotton", "wheat"],
    title: {
      en: "Rotate Your Crops",
      ur: "فصلیں بدلیں",
      sd: "فصلون بدليو",
    },
    description: {
      en: "Planting different crops in succession helps maintain soil fertility and reduces the buildup of pests and diseases.",
      ur: "بار بار مختلف فصلیں لگائیں۔ اس سے مٹی اچھی رہتی ہے اور کیڑے اور بیماری کم ہوتی ہے۔",
      sd: "بار بار مختلف فصلون لڳايو. ان سان مٽي سٺي رهندي ۽ ڪيڙا ۽ بيماري گهٽ ٿيندي.",
    },
  },
  {
    icon: "seed",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Use Certified Seed",
      ur: "اچھا بیج استعمال کریں",
      sd: "سٺو ٻج استعمال ڪريو",
    },
    description: {
      en: "Certified seed gives better germination, healthier plants, and higher yields. Always buy from a reliable, approved source.",
      ur: "تصدیق شدہ بیج سے اچھی انگڑائی، صحت مند پودے اور زیادہ پیداوار ملتی ہے۔ اچھی جگہ سے خریدیں۔",
      sd: "تصدیق ٿيل ٻج کان بهتر انڌائي، صحتمند پوڌ ۽ وڌيڪ پيداوار ملندي. سٺي جاءِ کان خريد ڪريو.",
    },
  },
  {
    icon: "water",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Water Wisely",
      ur: "سمجھ کر پانی دیں",
      sd: "سمجھي پاڻي ڏيو",
    },
    description: {
      en: "Water at the right growth stage, not on a fixed schedule. Check soil moisture before irrigating to avoid overwatering.",
      ur: "فصل کے مرحلے کے مطابق پانی دیں، وقت پر نہیں۔ پانی دینے سے پہلے مٹی کی نمی دیکھیں۔",
      sd: "فصل جي مرحلي مطابق پاڻي ڏيو، وقت تي نه. پاڻي ڏيڻ کان اڳ مٽي جي نمي ڏسو.",
    },
  },
  {
    icon: "weed",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Control Weeds Early",
      ur: "جلد گھاس صاف کریں",
      sd: "جلدي گاهه صاف ڪريو",
    },
    description: {
      en: "Weeds compete with your crop for water, nutrients, and sunlight. Remove them early in the growing season for best results.",
      ur: "گھاس فصل کا پانی اور کھاد چوری کرتی ہے۔ شروع میں صاف کریں تاکہ فصل اچھی ہو۔",
      sd: "گاهه فصل جو پاڻي ۽ ڪاد چوري ڪري ٿو. شروعات ۾ صاف ڪريو ته فصل سٺي ٿئي.",
    },
  },
  {
    icon: "harvest",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Harvest at the Right Time",
      ur: "صحیح وقت پر کٹائی کریں",
      sd: "صحيح وقت تي پٽڪو ڪريو",
    },
    description: {
      en: "Harvesting too early or too late reduces both yield and quality. Learn the signs of maturity for your specific crop.",
      ur: "بہت جلد یا دیر سے کٹائی کرنے سے پیداوار اور معیار دونوں کم ہوتے ہیں۔ پختہ ہونے کی علامات سیکھیں۔",
      sd: "تمام جلدي يا دير سان پٽڪي ڪرڻ سان پيداوار ۽ معيار ٻنهي گهٽ ٿين. پختي ٿيڻ جون علامتون سکو.",
    },
  },
  {
    icon: "compost",
    cropIds: ["wheat", "rice"],
    title: {
      en: "Use Organic Matter",
      ur: "کھاد ڈالیں",
      sd: "ڪاد وجو",
    },
    description: {
      en: "Adding compost or farmyard manure improves soil structure, water retention, and long-term fertility.",
      ur: "کمپوسٹ یا گوبر کی کھاد ڈالنے سے مٹی اچھی ہوتی ہے، پانی رکتی ہے، اور زرخیزی بڑھتی ہے۔",
      sd: "ڪمپوسٽ يا گوبر جي ڪاد وجهڻ سان مٽي سٺي ٿيندي، پاڻي رهندو، ۽ زرخيزي وڌندي.",
    },
  },
  {
    icon: "scout",
    cropIds: ["cotton", "wheat", "rice"],
    title: {
      en: "Scout Your Field Regularly",
      ur: "کھیت کی نگرانی کریں",
      sd: "کيت جي نگراني ڪريو",
    },
    description: {
      en: "Walk through your field every few days to spot problems early. Early detection of pests or disease makes management much easier.",
      ur: "ہر چند دن بعد کھیت میں پھریں تاکہ مسئلہ جلڈ پتہ چلے۔ جلد پتہ چلنے سے آسان حل ہوتا ہے۔",
      sd: "هر چند ڏينهن پوءِ کيت ۾ گهمو ته مسئلو جلدي پتو پوي. جلدي پتو پوڻ سان آسان حل ٿيندو.",
    },
  },
];
