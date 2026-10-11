import type { TranslatableString } from "./crops";

export type GrowthStage =
  | "germination"
  | "vegetative"
  | "flowering"
  | "grainFilling"
  | "maturity";

export const growthStages: { id: GrowthStage; labelKey: string }[] = [
  { id: "germination", labelKey: "irrigation.germination" },
  { id: "vegetative", labelKey: "irrigation.vegetative" },
  { id: "flowering", labelKey: "irrigation.flowering" },
  { id: "grainFilling", labelKey: "irrigation.grainFilling" },
  { id: "maturity", labelKey: "irrigation.maturity" },
];

export interface IrrigationGuidance {
  cropId: "cotton" | "wheat" | "rice";
  stage: GrowthStage;
  guidance: TranslatableString;
}

export const irrigationData: IrrigationGuidance[] = [
  // Cotton
  {
    cropId: "cotton",
    stage: "germination",
    guidance: {
      en: "Light, frequent watering to support seed germination and seedling establishment. Avoid waterlogging, which can damage young roots.",
      ur: "ہلکا پانی بار بار دیں تاکہ بیج اگے اور پودہ جمے۔ پانی بھر جانے سے بچیں — نئی جڑوں کو نقصان ہوتا ہے۔",
      sd: "هلڪو پاڻي بار بار ڏيو ته جيئن ٻج اُگي ۽ پوڌ جمي. پاڻي بھرجڻ کان بچو — نئين پاڙن کي نقصان ٿيندو.",
    },
  },
  {
    cropId: "cotton",
    stage: "vegetative",
    guidance: {
      en: "Water at intervals of 10–15 days depending on soil moisture. Encourage deep root development by avoiding overly frequent shallow irrigation.",
      ur: "مٹی کی نمی دیکھ کر 10–15 دن کے بعد پانی دیں۔ بار بار ہلکا پانی دینے سے جڑیں گہری نہیں ہوتیں۔",
      sd: "مٽي جي نمي ڏسي 10–15 ڏينهن پوءِ پاڻي ڏيو. بار بار هلڪو پاڻي ڏڻ سان پاڙون گهريون نه ٿينديون.",
    },
  },
  {
    cropId: "cotton",
    stage: "flowering",
    guidance: {
      en: "Critical stage for irrigation. Water stress during flowering can cause flower and boll shedding. Maintain consistent soil moisture.",
      ur: "یہ پانی کا اہم مرحلہ ہے۔ پھول نکلنے میں پانی کم ہو تو پھول اور کپاس گر جاتی ہے۔ مٹی نم رکھیں۔",
      sd: "هي پاڻي جو اهم مرحلو آهي. ڦل نڪرڻ ۾ پاڻي گهٽ هجي ته ڦل ۽ ڪپهه گرندو. مٽي نم رکو.",
    },
  },
  {
    cropId: "cotton",
    stage: "grainFilling",
    guidance: {
      en: "Continue adequate irrigation during boll filling. Water stress at this stage reduces yield and fiber quality.",
      ur: "کپاس بھرنے میں پانی جاری رکھیں۔ پانی کم ہو تو پیداوار اور کپاس کا معیار کم ہوتا ہے۔",
      sd: "ڪپهه ڀرڻ ۾ پاڻي جاري رکو. پاڻي گهٽ هجي ته پيداوار ۽ ڪپهه جو معيار گهٽ ٿيندو.",
    },
  },
  {
    cropId: "cotton",
    stage: "maturity",
    guidance: {
      en: "Reduce irrigation as bolls open and mature. Stop watering 2–3 weeks before harvest to avoid delaying maturity and staining the fiber.",
      ur: "کپاس کھلنے پر پانی کم کریں۔ کٹائی سے 2–3 ہفتے پہلے پانی بند کر دیں۔",
      sd: "ڪپهه کُلڻ تي پاڻي گهٽ ڪريو. پٽڪي کان 2–3 هفتا اڳ پاڻي بند ڪريو.",
    },
  },
  // Wheat
  {
    cropId: "wheat",
    stage: "germination",
    guidance: {
      en: "Apply a light irrigation immediately after sowing if soil moisture is insufficient. Ensure uniform moisture for even germination.",
      ur: "اگر مٹی خشک ہو تو بونے کے فوراً بعد ہلکا پانی دیں۔ یکساں انگڑائی کے لیے مٹی نم رکھیں۔",
      sd: "جيڪڏهن مٽي خشڪ هجي ته پوکڻ کان فوراً پوءِ هلڪو پاڻي ڏيو. هڪجھي انڌائي لاءِ مٽي نم رکو.",
    },
  },
  {
    cropId: "wheat",
    stage: "vegetative",
    guidance: {
      en: "First critical irrigation is at crown root initiation (about 3–4 weeks after sowing). Follow with irrigation at tillering stage to support shoot development.",
      ur: "پہلا اہم پانی جڑ نکلنے پر (بونے کے 3–4 ہفتے بعد) دیں۔ شاخیں نکلنے پر بھی پانی دیں۔",
      sd: "پهريون اهم پاڻي پاڙ نڪرڻ تي (پوکڻ کان 3–4 هفتا پوءِ) ڏيو. شاخون نڪرڻ تي به پاڻي ڏيو.",
    },
  },
  {
    cropId: "wheat",
    stage: "flowering",
    guidance: {
      en: "Irrigate at booting and flowering stages. Water stress at this point can significantly reduce the number of grains per ear.",
      ur: "بالی بننے اور پھول نکلنے پر پانی دیں۔ پانی کم ہو تو دانے کم بنیں گے۔",
      sd: "بالي بنجڻ ۽ ڦل نڪرڻ تي پاڻي ڏيو. پاڻي گهٽ هجي ته دانا گهٽ بنندا.",
    },
  },
  {
    cropId: "wheat",
    stage: "grainFilling",
    guidance: {
      en: "Maintain adequate soil moisture during grain filling. This is the most critical stage for grain weight and quality.",
      ur: "دانہ بھرنے میں مٹی نم رکھیں۔ یہ دانے کے وزن اور معیار کے لیے سب سے اہم مرحلہ ہے۔",
      sd: "دانو ڀرڻ ۾ مٽي نم رکو. هي دانو جي وزن ۽ معيار لاءِ سڀ کان اهم مرحلو آهي.",
    },
  },
  {
    cropId: "wheat",
    stage: "maturity",
    guidance: {
      en: "Stop irrigation as the crop approaches maturity and grains harden. Excess water at this stage can cause lodging and grain quality loss.",
      ur: "فصل پختہ ہونے اور دانے سخت ہونے پر پانی بند کر دیں۔ زیادہ پانی سے فصل گر سکتی ہے۔",
      sd: "فصل پختي ٿيڻ ۽ دانو سخت ٿيڻ تي پاڻي بند ڪريو. وڌيڪ پاڻي سان فصل گرندي.",
    },
  },
  // Rice
  {
    cropId: "rice",
    stage: "germination",
    guidance: {
      en: "Keep the nursery bed moist but not flooded. After transplanting, maintain a thin layer of water to help seedlings establish.",
      ur: "نرسری نم رکھیں لیکن پانی نہ بھریں۔ کھیت میں لگانے کے بعد ہلکا پانی رکھیں۔",
      sd: "نرسري نم رکو پر پاڻي نه بھريو. کيت ۾ لڳائڻ پوءِ هلڪو پاڻي رکو.",
    },
  },
  {
    cropId: "rice",
    stage: "vegetative",
    guidance: {
      en: "Maintain 2–5 cm of standing water in the field. Re-irrigate after water has naturally percolated to maintain consistent moisture.",
      ur: "کھیت میں 2–5 سینٹی میٹر پانی کھڑا رکھیں۔ پانی خشک ہو جائے تو دوبارہ دیں۔",
      sd: "کيت ۾ 2–5 سينٽي ميٽر پاڻي بيٺو رکو. پاڻي سڪي وڃي ته ٻيهر ڏيو.",
    },
  },
  {
    cropId: "rice",
    stage: "flowering",
    guidance: {
      en: "Maintain standing water during booting and flowering. Water stress can cause spikelet sterility and reduce yield significantly.",
      ur: "بالی بننے اور پھول نکلنے میں پانی کھڑا رکھیں۔ پانی کم ہو تو دانے نہیں بنیں گے۔",
      sd: "بالي بنجڻ ۽ ڦل نڪرڻ ۾ پاڻي بيٺو رکو. پاڻي گهٽ هجي ته دانا نه بنندا.",
    },
  },
  {
    cropId: "rice",
    stage: "grainFilling",
    guidance: {
      en: "Continue maintaining water during grain filling. Gradually reduce water as grains begin to ripen and turn yellow.",
      ur: "دانہ بھرنے میں پانی رکھیں۔ دانہ پختہ ہو کر زرد ہو تو آہستہ آہستہ پانی کم کریں۔",
      sd: "دانو ڀرڻ ۾ پاڻي رکو. دانو پختو ٿي زرد ٿي ته آهستي آهستي پاڻي گهٽ ڪريو.",
    },
  },
  {
    cropId: "rice",
    stage: "maturity",
    guidance: {
      en: "Drain the field completely 1–2 weeks before harvest. This allows the soil to dry, makes harvesting easier, and improves grain quality.",
      ur: "کٹائی سے 1–2 ہفتے پہلے کھیت کا پانی مکمل خالی کریں۔ مٹی خشک ہو گی اور کٹائی آسان ہو گی۔",
      sd: "پٽڪي کان 1–2 هفتا اڳ کيت جو پاڻي مڪمل خالي ڪريو. مٽي سڪي ويندي ۽ پٽڪو آسان ٿيندو.",
    },
  },
];
