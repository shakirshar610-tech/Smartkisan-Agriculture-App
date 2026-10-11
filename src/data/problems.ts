import type { TranslatableString } from "./crops";

export interface SymptomGuide {
  id: string;
  labelKey: string;
  causes: TranslatableString[];
  nextSteps: TranslatableString[];
  cropIds?: string[];
}

export const symptomGuides: SymptomGuide[] = [
  {
    id: "yellowLeaves",
    labelKey: "problems.symptom1",
    cropIds: ["cotton", "wheat", "rice"],
    causes: [
      {
        en: "Nitrogen deficiency — common in exhausted or unfertilized soils.",
        ur: "کھاد کی کمی — تھک ہوئی یا بے کھاد مٹی میں ہوتی ہے۔",
        sd: "ڪاد جي کوٽ — تھڪيل يا بڪاد مٽي ۾ ٿيندي آهي.",
      },
      {
        en: "Overwatering or poor drainage causing root stress.",
        ur: "زیادہ پانی یا خراب نکاسی سے جڑوں کو نقصان۔",
        sd: "وڌيڪ پاڻي يا خراب نڪاسي سان پاڙن کي نقصان.",
      },
      {
        en: "Natural aging of lower leaves in mature plants.",
        ur: "پختہ پودوں میں نیچے کے پتے زرد ہونا عام بات ہے۔",
        sd: "پختن پوڌن ۾ هيٺاهين پن زرد ٿيڻ عام ڳالهه آهي.",
      },
    ],
    nextSteps: [
      {
        en: "Check soil drainage and reduce watering if water is pooling.",
        ur: "نکاسی دیکھیں اور پانی جمع ہو رہا ہو تو پانی کم کریں۔",
        sd: "نڪاسي ڏسو ۽ پاڻي گڏ ٿي رهيو هجي ته گهٽ ڪريو.",
      },
      {
        en: "Consider a soil test to check nutrient levels.",
        ur: "مٹی جانچ کرائیں تاکہ کھاد کی کمی پتہ چلے۔",
        sd: "مٽي جانچ ڪرايو ته جيئن ڪاد جي کوٽ پتو پوي.",
      },
      {
        en: "Consult a local extension expert before applying any fertilizer.",
        ur: "کھاد استعمال کرنے سے پہلے زرعی ماہر سے مشورہ کریں۔",
        sd: "ڪاد استعمال ڪرڻ کان اڳ زرعي ماهر سان مشورو ڪريو.",
      },
    ],
  },
  {
    id: "brownSpots",
    labelKey: "problems.symptom2",
    cropIds: ["cotton", "rice"],
    causes: [
      {
        en: "Fungal leaf spot diseases such as Alternaria or Cercospora.",
        ur: "پھپھوندی کی بیماری جس سے پتوں پر دھبے پڑتے ہیں۔",
        sd: "پڦونڊي جي بيماري جنهن سان پنن تي داغ پوندا آهن.",
      },
      {
        en: "Bacterial leaf blight, especially in rice.",
        ur: "بیکٹیریا کی بیماری، خاص طور پر چاول میں۔",
        sd: "بيڪٽيريا جي بيماري، خاص طور تي چانورن ۾.",
      },
      {
        en: "Heat stress or sunscald on young leaves.",
        ur: "گرمی سے نئے پتوں کو نقصان۔",
        sd: "گرمي سان نئين پنن کي نقصان.",
      },
    ],
    nextSteps: [
      {
        en: "Examine the spots closely — note their size, color, and pattern.",
        ur: "دھبوں کو قریب سے دیکھیں — سائز، رنگ، اور شکل نوٹ کریں۔",
        sd: "داغن کي ويجهو کان ڏسو — سائز، رنگ، ۽ شکل نوٽ ڪريو.",
      },
      {
        en: "Remove and destroy severely affected leaves to slow spread.",
        ur: "زیادہ متاثر پتے توڑ کر پھینک دیں تاکہ بیماری آگے نہ پھیلے۔",
        sd: "وڌيڪ متاثر پن ڦاڙي اُڇي ڇڏيو ته بيماري اڳتي نه پکڙجي.",
      },
      {
        en: "Contact your local agricultural extension expert for proper diagnosis.",
        ur: "صحیح تشخیص کے لیے زرعی ماہر سے رابطہ کریں۔",
        sd: "صحيح تشخيص لاءِ زرعي ماهر سان رابطو ڪريو.",
      },
    ],
  },
  {
    id: "wilting",
    labelKey: "problems.symptom3",
    cropIds: ["cotton", "wheat", "rice"],
    causes: [
      {
        en: "Insufficient water or drought stress.",
        ur: "پانی کم ہونا یا خشک سالی۔",
        sd: "پاڻي گهٽ هجڻ يا خشڪ سالي.",
      },
      {
        en: "Root damage from waterlogging or soil-borne diseases.",
        ur: "پانی بھر جانے یا مٹی کی بیماری سے جڑوں کو نقصان۔",
        sd: "پاڻي بھرجڻ يا مٽي جي بيماري سان پاڙن کي نقصان.",
      },
      {
        en: "Stem borer insect damage affecting water transport.",
        ur: "تنے میں کیڑا لگنے سے پانی کا راستہ بند ہو جانا۔",
        sd: "ٿڙ ۾ ڪيڙو لڳڻ سان پاڻي جو رستو بند ٿي وڃڻ.",
      },
    ],
    nextSteps: [
      {
        en: "Check soil moisture — if dry, irrigate; if waterlogged, improve drainage.",
        ur: "مٹی دیکھیں — خشک ہو تو پانی دیں، پانی بھرا ہو تو نکاسی کریں۔",
        sd: "مٽي ڏسو — خشڪ هجي ته پاڻي ڏيو، پاڻي بھرل هجي ته نڪاسي ڪريو.",
      },
      {
        en: "Inspect the stem base for signs of insect holes or damage.",
        ur: "تنے کی بنیاد دیکھیں کہ کیڑے کا سوراخ تو نہیں۔",
        sd: "ٿڙ جي بنياد ڏسو ته ڪيڙي جو سوراخ ته ناهي.",
      },
      {
        en: "If wilting persists despite adequate water, contact an extension expert.",
        ur: "پانی دینے کے باوجود مرجھانا نہ رکے تو زرعی ماہر سے رابطہ کریں۔",
        sd: "پاڻي ڏيڻ باوجود وڄڻ نه رڪي ته زرعي ماهر سان رابطو ڪريو.",
      },
    ],
  },
  {
    id: "stuntedGrowth",
    labelKey: "problems.symptom4",
    cropIds: ["cotton", "wheat", "rice"],
    causes: [
      {
        en: "Nutrient deficiency, particularly nitrogen, phosphorus, or potassium.",
        ur: "کھاد کی کمی — نائٹروجن، فاسفورس، یا پوٹاش۔",
        sd: "ڪاد جي کوٽ — نائٽروجن، فاسفورس، يا پوٽاش.",
      },
      {
        en: "Poor soil health or compaction limiting root growth.",
        ur: "خراب مٹی یا مٹی سخت ہونا جس سے جڑیں نہیں بڑھتیں۔",
        sd: "خراب مٽي يا مٽي سخت ٿيڻ جنهن سان پاڙون نه وڌن.",
      },
      {
        en: "Viral diseases or nematode infestation in roots.",
        ur: "وائرس کی بیماری یا جڑوں میں کیڑا۔",
        sd: "وائرس جي بيماري يا پاڙن ۾ ڪيڙو.",
      },
    ],
    nextSteps: [
      {
        en: "Conduct a soil test to identify nutrient deficiencies.",
        ur: "مٹی جانچ کرائیں تاکہ کھاد کی کمی پتہ چلے۔",
        sd: "مٽي جانچ ڪرايو ته جيئن ڪاد جي کوٽ پتو پوي.",
      },
      {
        en: "Check roots for signs of swelling, discoloration, or nematode damage.",
        ur: "جڑیں دیکھیں — سوجن، رنگ بدلنا، یا کیڑے کا نقصان۔",
        sd: "پاڙون ڏسو — سوجڻ، رنگ بدلڻ، يا ڪيڙي جو نقصان.",
      },
      {
        en: "Seek advice from a local extension expert for proper diagnosis.",
        ur: "صحیح تشخیص کے لیے زرعی ماہر سے مشورہ کریں۔",
        sd: "صحيح تشخيص لاءِ زرعي ماهر سان مشورو ڪريو.",
      },
    ],
  },
  {
    id: "pestDamage",
    labelKey: "problems.symptom5",
    cropIds: ["cotton", "wheat", "rice"],
    causes: [
      {
        en: "Chewing insects such as caterpillars, grasshoppers, or armyworms.",
        ur: "چبانے والے کیڑے جیسے کیٹے، ٹڈے۔",
        sd: "چونڊيندڙ ڪيڙا جهڙا ڪيٽا، ٽڏا.",
      },
      {
        en: "Sucking insects such as aphids, whitefly, or jassid.",
        ur: "چوسنے والے کیڑے جیسے سفید مکھی۔",
        sd: "چوسيندڙ ڪيڙا جهڙا اڇي مکھي.",
      },
      {
        en: "Stem borers tunneling into plant stems.",
        ur: "تنے میں سوراخ کرنے والے کیڑے۔",
        sd: "ٿڙ ۾ سوراخ ڪندڙ ڪيڙا.",
      },
    ],
    nextSteps: [
      {
        en: "Identify the insect type by observing it closely or using a photo.",
        ur: "کیڑے کو قریب سے دیکھیں یا تصویر لے کر شناخت کریں۔",
        sd: "ڪيڙي کي ويجهو کان ڏسو يا تصوير وٺي سڃاڻپ ڪريو.",
      },
      {
        en: "Encourage natural predators like ladybirds and spiders in the field.",
        ur: "کھیت میں فائدہ مند کیڑے جیسے لیڈی برڈ اور مکڑیوں کو رہنے دیں۔",
        sd: "کيت ۾ فائديمند ڪيڙا جهڙا ليڊي برڊ ۽ مڪڙين کي رهڻ ڏيو.",
      },
      {
        en: "Contact extension services for identification and safe management options.",
        ur: "شناخت اور علاج کے لیے زرعی ماہر سے رابطہ کریں۔",
        sd: "سڃاڻپ ۽ علاج لاءِ زرعي ماهر سان رابطو ڪريو.",
      },
    ],
  },
  {
    id: "whiteMold",
    labelKey: "problems.symptom6",
    cropIds: ["cotton"],
    causes: [
      {
        en: "Powdery mildew, a fungal disease that thrives in humid conditions.",
        ur: "پھپھوندی کی بیماری جو نم میں زیادہ ہوتی ہے۔",
        sd: "پڦونڊي جي بيماري جاڪا نم ۾ وڌيڪ ٿيندي آهي.",
      },
      {
        en: "White mold (Sclerotinia) affecting stems and leaves.",
        ur: "سفید پھپھوندی جو تنوں اور پتوں پر لگتی ہے۔",
        sd: "اڇي پڦونڊي جاڪا ٿڙن ۽ پنن تي لڳندي آهي.",
      },
    ],
    nextSteps: [
      {
        en: "Improve air circulation by avoiding overcrowded planting.",
        ur: "پودوں کو زیادہ قریب نہ لگائیں تاکہ ہوا گزر سکے۔",
        sd: "پوڌن کي گهڻو ويجهو نه لڳايو ته جيئن هوا لنگهي سگهي.",
      },
      {
        en: "Remove affected plant parts and destroy them.",
        ur: "متاثر پتے توڑ کر پھینک دیں۔",
        sd: "متاثر پن ڦاڙي اُڇي ڇڏيو.",
      },
      {
        en: "Consult an extension expert for confirmation and guidance.",
        ur: "تشخیص اور رہنمائی کے لیے زرعی ماہر سے مشورہ کریں۔",
        sd: "تشخيص ۽ رهنمائي لاءِ زرعي ماهر سان مشورو ڪريو.",
      },
    ],
  },
  {
    id: "leafCurl",
    labelKey: "problems.symptom7",
    cropIds: ["cotton", "wheat"],
    causes: [
      {
        en: "Viral infection transmitted by insects such as whitefly.",
        ur: "وائرس کی بیماری جو سفید مکھی سے پھیلتی ہے۔",
        sd: "وائرس جي بيماري جاڪا اڇي مکھي سان پکڙندي آهي.",
      },
      {
        en: "Aphid or thrips feeding causing leaf distortion.",
        ur: "چوسنے والے کیڑوں سے پتے ٹہر جاتے ہیں۔",
        sd: "چوسيندڙ ڪيڙن سان پن ونجي وڃن ٿا.",
      },
      {
        en: "Herbicide drift from nearby weed control applications.",
        ur: "قریب کھاد یا دوا اڑ کر آنا۔",
        sd: "ويجهو ڪاد يا دوا اُڙي اچڻ.",
      },
    ],
    nextSteps: [
      {
        en: "Check for insects on the underside of curled leaves.",
        ur: "ٹہرے ہوئے پتوں کے پیچھے کیڑے دیکھیں۔",
        sd: "ونجڻ وارن پنن جي پٺيان ڪيڙا ڏسو.",
      },
      {
        en: "Remove and destroy affected plants if a viral disease is suspected.",
        ur: "وائرس کا شک ہو تو متاثر پودے اکھاڑ کر پھینک دیں۔",
        sd: "وائرس جو شڪ هجي ته متاثر پوڌ اکڙي اُڇي ڇڏيو.",
      },
      {
        en: "Contact extension services for proper identification.",
        ur: "شناخت کے لیے زرعی ماہر سے رابطہ کریں۔",
        sd: "سڃاڻپ لاءِ زرعي ماهر سان رابطو ڪريو.",
      },
    ],
  },
  {
    id: "poorGermination",
    labelKey: "problems.symptom8",
    cropIds: ["cotton", "wheat", "rice"],
    causes: [
      {
        en: "Old or low-viability seed.",
        ur: "پرانا یا کمزور بیج۔",
        sd: "پراڻو يا ڪمزور ٻج.",
      },
      {
        en: "Improper sowing depth — too deep or too shallow.",
        ur: "غلط گہرائی میں بونا — بہت گہرا یا بہت اوپر۔",
        sd: "غلط اونداهي ۾ پوکڻ — تمام گهرو يا تمام مٿاهين.",
      },
      {
        en: "Dry soil at sowing time or crusting after irrigation.",
        ur: "بونے کے وقت خشک مٹی یا پانی کے بعد مٹی سخت ہو جانا۔",
        sd: "پوکڻ جي وقت خشڪ مٽي يا پاڻي پوءِ مٽي سخت ٿي وڃڻ.",
      },
    ],
    nextSteps: [
      {
        en: "Always use certified, fresh seed from a reliable source.",
        ur: "ہمیشہ اچھی جگہ سے تصدیق شدہ تازہ بیج لیں۔",
        sd: "هميشه سٺي جاءِ کان تصديق ٿيل تازو ٻج وٺو.",
      },
      {
        en: "Sow at the recommended depth for your crop type.",
        ur: "اپنی فصل کے لیے صحیح گہرائی میں بوئیں۔",
        sd: "پنهنجي فصل لاءِ صحيح اونداهي ۾ پوکيو.",
      },
      {
        en: "Ensure adequate soil moisture before and after sowing.",
        ur: "بونے سے پہلے اور بعد میں مٹی نم رکھیں۔",
        sd: "پوکڻ کان اڳ ۽ پوءِ مٽي نم رکو.",
      },
    ],
  },
];
