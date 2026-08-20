/*
 * Oʻzbekiston viloyatlari va tumanlari — Q-06 (Faoliyat hududi) uchun.
 *
 * Viloyat kodlari ISO 3166-2:UZ standartidan olingan (UZ-TK, UZ-SA ...) —
 * ular hech qachon oʻzgarmaydi, shu bois backend uchun ishonchli kalit.
 * Tuman kodlari nomdan hosil qilinadi (`viloyat-kodi:tuman-slug`).
 *
 * DIQQAT: tumanlar roʻyxati maʼmuriy boʻlinish oʻzgarishi bilan
 * yangilanishi kerak — ishga tushirishdan oldin tasdiqlab chiqing.
 */

export type District = { code: string; name: string };
export type Region = { code: string; name: string; districts: District[] };

const RAW: Array<[string, string, string[]]> = [
  ["UZ-QR", "Qoraqalpogʻiston Respublikasi", [
    "Amudaryo", "Beruniy", "Chimboy", "Ellikqalʼa", "Kegeyli", "Moʻynoq", "Nukus tumani",
    "Qanlikoʻl", "Qoʻngʻirot", "Qoraoʻzak", "Shumanay", "Taxtakoʻpir", "Toʻrtkoʻl", "Xoʻjayli",
    "Nukus shahri",
  ]],
  ["UZ-AN", "Andijon viloyati", [
    "Andijon tumani", "Asaka", "Baliqchi", "Boʻston", "Buloqboshi", "Izboskan", "Jalaquduq",
    "Xoʻjaobod", "Qoʻrgʻontepa", "Marhamat", "Oltinkoʻl", "Paxtaobod", "Shahrixon", "Ulugʻnor",
    "Andijon shahri", "Xonobod shahri",
  ]],
  ["UZ-BU", "Buxoro viloyati", [
    "Buxoro tumani", "Gʻijduvon", "Jondor", "Kogon tumani", "Olot", "Peshku", "Qorakoʻl",
    "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent", "Buxoro shahri", "Kogon shahri",
  ]],
  ["UZ-JI", "Jizzax viloyati", [
    "Arnasoy", "Baxmal", "Doʻstlik", "Forish", "Gʻallaorol", "Sharof Rashidov", "Mirzachoʻl",
    "Paxtakor", "Yangiobod", "Zarbdor", "Zafarobod", "Jizzax shahri",
  ]],
  ["UZ-QA", "Qashqadaryo viloyati", [
    "Chiroqchi", "Dehqonobod", "Gʻuzor", "Kasbi", "Kitob", "Koson", "Mirishkor", "Muborak",
    "Nishon", "Qamashi", "Qarshi tumani", "Shahrisabz tumani", "Yakkabogʻ", "Koʻkdala",
    "Qarshi shahri", "Shahrisabz shahri",
  ]],
  ["UZ-NW", "Navoiy viloyati", [
    "Karmana", "Konimex", "Navbahor", "Nurota", "Qiziltepa", "Xatirchi", "Tomdi", "Uchquduq",
    "Navoiy shahri", "Zarafshon shahri", "Gʻozgʻon shahri",
  ]],
  ["UZ-NG", "Namangan viloyati", [
    "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Namangan tumani", "Norin", "Pop",
    "Toʻraqoʻrgʻon", "Uchqoʻrgʻon", "Uychi", "Yangiqoʻrgʻon", "Namangan shahri",
  ]],
  ["UZ-SA", "Samarqand viloyati", [
    "Bulungʻur", "Ishtixon", "Jomboy", "Kattaqoʻrgʻon tumani", "Narpay", "Nurobod", "Oqdaryo",
    "Payariq", "Pastdargʻom", "Paxtachi", "Samarqand tumani", "Toyloq", "Urgut",
    "Kattaqoʻrgʻon shahri", "Samarqand shahri",
  ]],
  ["UZ-SU", "Surxondaryo viloyati", [
    "Angor", "Bandixon", "Boysun", "Denov", "Jarqoʻrgʻon", "Muzrabot", "Oltinsoy", "Qiziriq",
    "Qumqoʻrgʻon", "Sariosiyo", "Sherobod", "Shoʻrchi", "Termiz tumani", "Uzun", "Termiz shahri",
  ]],
  ["UZ-SI", "Sirdaryo viloyati", [
    "Boyovut", "Guliston tumani", "Mirzaobod", "Oqoltin", "Sardoba", "Sayxunobod",
    "Sirdaryo tumani", "Xovos", "Guliston shahri", "Shirin shahri", "Yangiyer shahri",
  ]],
  ["UZ-TO", "Toshkent viloyati", [
    "Bekobod tumani", "Boʻka", "Boʻstonliq", "Chinoz", "Qibray", "Ohangaron tumani", "Oqqoʻrgʻon",
    "Parkent", "Piskent", "Quyichirchiq", "Oʻrtachirchiq", "Yangiyoʻl tumani", "Yuqorichirchiq",
    "Zangiota", "Toshkent tumani", "Angren shahri", "Bekobod shahri", "Chirchiq shahri",
    "Nurafshon shahri", "Olmaliq shahri", "Ohangaron shahri", "Yangiyoʻl shahri",
  ]],
  ["UZ-FA", "Fargʻona viloyati", [
    "Bagʻdod", "Beshariq", "Buvayda", "Dangʻara", "Fargʻona tumani", "Furqat", "Oltiariq",
    "Qoʻshtepa", "Quva", "Rishton", "Soʻx", "Toshloq", "Uchkoʻprik", "Oʻzbekiston", "Yozyovon",
    "Fargʻona shahri", "Margʻilon shahri", "Qoʻqon shahri", "Quvasoy shahri",
  ]],
  ["UZ-XO", "Xorazm viloyati", [
    "Bogʻot", "Gurlan", "Hazorasp", "Xiva tumani", "Qoʻshkoʻpir", "Shovot", "Urganch tumani",
    "Xonqa", "Yangiariq", "Yangibozor", "Tuproqqalʼa", "Urganch shahri", "Xiva shahri",
  ]],
  ["UZ-TK", "Toshkent shahri", [
    "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugʻbek", "Olmazor", "Sergeli", "Shayxontohur",
    "Uchtepa", "Yakkasaroy", "Yashnobod", "Yunusobod", "Yangihayot",
  ]],
];

/** Nomdan barqaror kod hosil qiladi: "Mirzo Ulugʻbek" -> "mirzo-ulugbek" */
function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[ʻʼ'`]/g, "")
    .replace(/[^a-z0-9Ѐ-ӿ]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const REGIONS: Region[] = RAW.map(([code, name, districts]) => ({
  code,
  name,
  districts: districts.map((d) => ({ code: `${code}:${slug(d)}`, name: d })),
}));

export function regionByCode(code: string): Region | undefined {
  return REGIONS.find((r) => r.code === code);
}

export function districtName(regionCode: string, districtCode: string): string {
  return regionByCode(regionCode)?.districts.find((d) => d.code === districtCode)?.name ?? districtCode;
}
