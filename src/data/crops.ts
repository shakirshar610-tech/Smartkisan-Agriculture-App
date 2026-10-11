export interface TranslatableString {
  en: string;
  ur: string;
  sd: string;
}

export interface CropInfo {
  id: "cotton" | "wheat" | "rice";
  nameKey: string;
  icon: string;
  image: string;
  growingConditions: {
    season: TranslatableString;
    soil: TranslatableString;
    temperature: TranslatableString;
    waterNeeds: TranslatableString;
  };
  generalInfo: TranslatableString;
  cropCare: TranslatableString[];
}

export const crops: CropInfo[] = [
  {
    id: "cotton",
    nameKey: "crops.cotton",
    icon: "cotton",
    image: "https://images.pexels.com/photos/13924870/pexels-photo-13924870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    growingConditions: {
      season: {
        en: "Sown in April–May (Kharif season). Harvested October–December.",
        ur: "اپریل–مئی میں بویا جاتا ہے۔ اکتوبر–دسمبر میں کٹائی ہوتی ہے۔",
        sd: "اپريل–مئي ۾ پوکيو ويندو. آڪٽوبر–ڊسمبر ۾ پٽڪو ٿيندو.",
      },
      soil: {
        en: "Well-drained loamy or clay-loam soils. Prefers slightly alkaline soils (pH 6–8).",
        ur: "بہترین مٹی جس میں پانی نہ رکے۔ مٹی کا pH 6–8 ہو۔",
        sd: "بهترين مٽي جنهن ۾ پاڻي نه رهي. مٽي جو pH 6–8 هجي.",
      },
      temperature: {
        en: "Optimal growth at 25–35°C. Requires warm climate with plenty of sunshine.",
        ur: "بہترین نمو 25–35°C پر ہوتی ہے۔ گرم موسم اور زیادہ دھوپ چاہیے۔",
        sd: "بهترين واڌ 25–35°C تي ٿيندي. گرم موسم ۽ گهڻي ڌوپ گهرجي.",
      },
      waterNeeds: {
        en: "Moderate water requirement. Sensitive to waterlogging — ensure proper drainage.",
        ur: "درمیانی پانی چاہیے۔ پانی بھر جانے سے نقصان ہوتا ہے — نکاسی اچھی رکھیں۔",
        sd: "وچٿري پاڻي گهرجي. پاڻي بھرجڻ سان نقصان ٿيندو — نڪاسي سٺي رکو.",
      },
    },
    generalInfo: {
      en: "Cotton is a major cash crop in Sindh. It provides raw material for the textile industry and is an important source of income for farmers. Proper pest management and timely irrigation are key to a good yield.",
      ur: "کپاس سندھ کی اہم نقدی فصل ہے۔ یہ کپڑے کی صنعت کے لیے مال دیتی ہے اور کسانوں کی آمدنی کا ذریعہ ہے۔ اچھی پیداوار کے لیے کیڑوں کا انتظام اور بروقت پانی ضروری ہے۔",
      sd: "ڪپهه سنڌ جي اهم نقد فصل آهي. اها ڪپڙي صنعت لاءِ مال ڏي ٿي ۽ هارين جي آمدني جو ذريعو آهي. بهتر پيداوار لاءِ ڪيڙن جو انتظام ۽ بروقت پاڻي ضروري آهي.",
    },
    cropCare: [
      {
        en: "Monitor for common pests like whitefly, jassid, and mealybug. Consult extension experts for pest identification.",
        ur: "سفید مکھی اور دیگر کیڑوں کی نگرانی کریں۔ شناخت کے لیے زرعی ماہر سے مشورہ کریں۔",
        sd: "اڇي مکھي ۽ ٻين ڪيڙن جي نگراني ڪريو. سڃاڻپ لاءِ زرعي ماهر سان مشورو ڪريو.",
      },
      {
        en: "Practice crop rotation to maintain soil health and reduce pest pressure.",
        ur: "مٹی کو صحت مند رکھنے اور کیڑوں کو کم کرنے کے لیے فصل بدلیں۔",
        sd: "مٽي کي صحتمند رکڻ ۽ ڪيڙن کي گهٽائڻ لاءِ فصل بدليو.",
      },
      {
        en: "Apply balanced fertilizer based on soil testing recommendations.",
        ur: "مٹی جانچ کے بعد مناسب کھاد استعمال کریں۔",
        sd: "مٽي جانچ کان پوءِ مناسب ڪاد استعمال ڪريو.",
      },
      {
        en: "Keep fields weed-free, especially during early growth stages.",
        ur: "کھیت کو گھاس سے صاف رکھیں، خاص طور پر شروع میں۔",
        sd: "کيت کي گاهه کان صاف رکو، خاص طور تي شروعات ۾.",
      },
    ],
  },
  {
    id: "wheat",
    nameKey: "crops.wheat",
    icon: "wheat",
    image: "https://images.pexels.com/photos/7891849/pexels-photo-7891849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    growingConditions: {
      season: {
        en: "Sown in November (Rabi season). Harvested March–April.",
        ur: "نومبر میں بویا جاتا ہے۔ مارچ–اپریل میں کٹائی ہوتی ہے۔",
        sd: "نومبر ۾ پوکيو ويندو. مارچ–اپريل ۾ پٽڪو ٿيندو.",
      },
      soil: {
        en: "Adaptable to various soils but grows best in well-drained loamy soils (pH 6–7.5).",
        ur: "ہر مٹی میں اگ سکتا ہے لیکن بہترین مٹی جس میں پانی نہ رکے (pH 6–7.5)۔",
        sd: "هر مٽي ۾ اگي سگهي ٿو پر بهترين مٽي جنهن ۾ پاڻي نه رهي (pH 6–7.5).",
      },
      temperature: {
        en: "Optimal growth at 15–25°C. Cool weather during grain filling improves quality.",
        ur: "بہترین نمو 15–25°C پر ہوتی ہے۔ دانہ بھرنے میں ٹھنڈا موسم اچھا ہے۔",
        sd: "بهترين واڌ 15–25°C تي ٿيندي. دانو ڀرڻ ۾ ٿڌو موسم سٺو آهي.",
      },
      waterNeeds: {
        en: "Moderate water requirement. Critical irrigation stages: crown root initiation, tillering, and grain filling.",
        ur: "درمیانی پانی چاہیے۔ اہم مراحل: جڑ نکلنا، شاخیں نکلنا، اور دانہ بھرنا۔",
        sd: "وچٿري پاڻي گهرجي. اهم مرحلا: پاڙ نڪرڻ، شاخون نڪرڻ، ۽ دانو ڀرڻ.",
      },
    },
    generalInfo: {
      en: "Wheat is the staple food crop of Pakistan and a primary Rabi crop in Sindh. It provides flour for daily bread (roti). Timely sowing and proper irrigation at critical growth stages are essential for good yields.",
      ur: "گندم پاکستان کی بنیادی خوراک فصل ہے اور سندھ کی اہم ربی فصل ہے۔ روزانہ روٹی کے لیے آٹا ملتی ہے۔ بروقت بونا اور اہم مراحل میں پانی اچھی پیداوار کے لیے ضروری ہے۔",
      sd: "ڪڻڪ پاڪستان جي بنيادي خوراڪ فصل آهي ۽ سنڌ جي اهم ربي فصل آهي. روزانو روٽي لاءِ اٽو ملندو آهي. بروقت پوکڻ ۽ اهم مرحلن ۾ پاڻي بهتر پيداوار لاءِ ضروري آهي.",
    },
    cropCare: [
      {
        en: "Sow at the recommended time (November) to avoid yield loss from late planting.",
        ur: "نومبر میں بوئیں تاکہ دیر سے بونے سے نقصان نہ ہو۔",
        sd: "نومبر ۾ پوکيو ته جيئن دير سان پوکڻ جي ڪري نقصان نه ٿئي.",
      },
      {
        en: "Apply irrigation at crown root initiation, tillering, booting, and grain filling stages.",
        ur: "جڑ نکلنا، شاخیں نکلنا، بالی بننا، اور دانہ بھرنے میں پانی دیں۔",
        sd: "پاڙ نڪرڻ، شاخون نڪرڻ، بالي بنجڻ، ۽ دانو ڀرڻ ۾ پاڻي ڏيو.",
      },
      {
        en: "Control weeds with timely manual weeding or recommended herbicides.",
        ur: "گھاس کو ہاتھ سے کاٹیں یا سفارش شدہ دوا استعمال کریں۔",
        sd: "گاهه کي هٿ سان ڪٽيو يا سفارش ٿيل دوا استعمال ڪريو.",
      },
      {
        en: "Use certified, disease-free seed for better germination and yield.",
        ur: "اچھی انگڑائی اور پیداوار کے لیے تصدیق شدہ صاف بیج استعمال کریں۔",
        sd: "بهتر انڌائي ۽ پيداوار لاءِ تصديق ٿيل صاف ٻج استعمال ڪريو.",
      },
    ],
  },
  {
    id: "rice",
    nameKey: "crops.rice",
    icon: "rice",
    image: "https://images.pexels.com/photos/37012643/pexels-photo-37012643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    growingConditions: {
      season: {
        en: "Sown May–July, transplanted June–August (Kharif). Harvested October–November.",
        ur: "مئی–جولائی میں بویا، جون–اگست میں منتقل کیا جاتا ہے۔ اکتوبر–نومبر میں کٹائی۔",
        sd: "مئي–جولاءِ ۾ پوکيو، جون–آگسٽ ۾ منتقل ڪيو ويندو. آڪٽوبر–نومبر ۾ پٽڪو.",
      },
      soil: {
        en: "Clay and clay-loam soils that retain water well. pH 5.5–7.0.",
        ur: "ایسی مٹی جو پانی اچھی طرح رکھے۔ pH 5.5–7.0۔",
        sd: "اها مٽي جيڪا پاڻي چڱي طرح رکي. pH 5.5–7.0.",
      },
      temperature: {
        en: "Optimal growth at 25–35°C. Requires warm and humid conditions.",
        ur: "بہترین نمو 25–35°C پر ہوتی ہے۔ گرم اور نم موسم چاہیے۔",
        sd: "بهترين واڌ 25–35°C تي ٿيندي. گرم ۽ نم موسم گهرجي.",
      },
      waterNeeds: {
        en: "High water requirement. Typically grown under flooded (puddled) conditions.",
        ur: "زیادہ پانی چاہیے۔ کھیت میں پانی کھڑا رکھ کر اگایا جاتا ہے۔",
        sd: "وڌيڪ پاڻي گهرجي. کيت ۾ پاڻي بيٺو رکي پوکيو ويندو.",
      },
    },
    generalInfo: {
      en: "Rice is an important Kharif crop in Sindh, grown mainly in the Larkana and Dadu regions. It is a key food grain and export commodity. Proper water management and nursery preparation are critical for successful rice cultivation.",
      ur: "چاول سندھ کی اہم فصل ہے، بنیادی طور پر لاڑکانہ اور دادو میں اگایا جاتا ہے۔ یہ خوراک اور برآمد کے لیے اہم ہے۔ پانی کا انتظام اور نرسری تیار کرنا اچھی پیداوار کے لیے ضروری ہے۔",
      sd: "چانور سنڌ جي اهم فصل آهي، خاص طور تي لاڙڪاڻي ۽ دادو ۾ پوکجن ٿا. هي خوراڪ ۽ برآمد لاءِ اهم آهي. پاڻي جو انتظام ۽ نرسري تيار ڪرڻ بهتر پيداوار لاءِ ضروري آهي.",
    },
    cropCare: [
      {
        en: "Prepare a healthy nursery bed before transplanting seedlings to the main field.",
        ur: "کھیت میں لگانے سے پہلے اچھی نرسری تیار کریں۔",
        sd: "کيت ۾ لڳائڻ کان اڳ بهتر نرسري تيار ڪريو.",
      },
      {
        en: "Maintain standing water in the field during vegetative and reproductive stages.",
        ur: "نمو اور پیداوار کے دوران کھیت میں پانی کھڑا رکھیں۔",
        sd: "واڌ ۽ پيداوار دوران کيت ۾ پاڻي بيٺو رکو.",
      },
      {
        en: "Drain water gradually before harvest to allow proper grain ripening.",
        ur: "کٹائی سے پہلے پانی آہستہ آہستہ خالی کریں۔",
        sd: "پٽڪي کان اڳ پاڻي آهستي آهستي خالي ڪريو.",
      },
      {
        en: "Watch for rice blast and bacterial leaf blight — contact extension services if suspected.",
        ur: "چاول کی بیماری کی نگرانی کریں — شک ہو تو زرعی ماہر سے رابطہ کریں۔",
        sd: "چانورن جي بيماري جي نگراني ڪريو — شڪ هجي ته زرعي ماهر سان رابطو ڪريو.",
      },
    ],
  },
];
