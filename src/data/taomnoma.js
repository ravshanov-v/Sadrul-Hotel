/*
  ===== TAOMNOMA DATA STRUCTURE =====
  Har bir menyu itemi quyidagi maydonlardan iborat:

    id          - unikal raqam
    name        - taom nomi
    category    - kategoriya (Milliy taomlar | Fast food | Salat | Ichimliklar | Shirinliklar)
    image       - asosiy rasm (400px)
    available   - mavjudmi (true | false)
    info        - qaysi ovqat vaqtiga mos
    description - qisqa tavsif
    variants[]  - variantlari:
      name        - variant nomi
      available   - mavjudmi
      image       - variant rasmi (200px)
      price       - narx (so'm)
      desc        - variant tavsifi

  Rasm linkini o'zgartirish uchun image qiymatini to'g'ridan-to'g'ri URL bilan almashtiring:
    "https://images.unsplash.com/photo-XXXXXXXXXX?w=400&q=80"
*/

export const menuItems = [


  {
    id: 1,
    name: "Osh (Palov)",
    category: "Milliy taomlar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGFCtBL_zry4Pri38xTlM7tN2_thPVovfxdf-QDa-IPjqDRY900LCjTY&s=10",
    available: true,
    info: "Nonushta va tushlik",
    description: "An'anaviy o'zbek palovi, sabzi va ziravorlar bilan",
    variants: [
      { name: "Qo'zi go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCj7DsUSZU7yE6L1GNRREi6Bd02QUl6wvxAbFyn0Kbkw&s=10", price: "45 000 so'm", desc: "Qo'zi go'shti qo'shilgan an'anaviy palov" },
      { name: "Tovuq go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWLy_Z-JNWGhW8Scg3CtJytWWgu4KfMVtUvIH4qjT5Q&s=10", price: "38 000 so'm", desc: "Tovuq go'shti bilan tayyorlangan yengil palov" },
      { name: "Kishmishli", available: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&q=80", price: "42 000 so'm", desc: "Kishmish va sabzi bilan bezatilgan shirin palov" },
      { name: "Bedana go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4qx-vCimnsxt-4Z36RnfYZWMG_FX7OovG7GOKnN9SJ4ZpPDH6auNkGFN&s=10", price: "55 000 so'm", desc: "Bedana go'shti bilan maxsus palov" },
      { name: "No'xatli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8YaNee5Q9kn73YaQXpHIrVSFslcFu_Ds89VgpohT7YLXlj_NY0vYwLrT4&s=10", price: "35 000 so'm", desc: "No'xat qo'shilgan vegetarian palov" }
    ]
  },

  {
    id: 2,
    name: "Shashlik",
    category: "Milliy taomlar",
    image: "https://st2.depositphotos.com/16122460/47360/i/450/depositphotos_473608248-stock-photo-metal-skewers-delicious-meat-onion.jpg",
    available: true,
    info: "Kechki ovqat",
    description: "Mangalda pishirilgan shashlik, maxsus marinad bilan",
    variants: [
      { name: "Qo'y go'shtli", available: true, image: "https://shashlik.uz/storage/menu-items/6916fcca7189d071612018-4.jpg", price: "50 000 so'm", desc: "Yumshoq qo'y go'shtidan marinadlangan shashlik" },
      { name: "Mol go'shtli", available: true, image: "https://blog.greenmountaingrills.com/wp-content/uploads/2016/08/IMG_7176.jpg", price: "45 000 so'm", desc: "Mol go'shti bilan tayyorlangan klassik shashlik" },
      { name: "Tovuq go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNs1RniRjCtpJIj1f6sARdI1W6iP2gGBthcs725wNxzA39FvnquaQ0-w&s=10", price: "35 000 so'm", desc: "Tovuq go'shtidan yengil va mazali shashlik" },
      { name: "Sirli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGC6JticHgFd_s9fQlfeAfo4zzL4YGRzbKUkUF8UEPIPebvI7cv8lUFp7B&s=10", price: "55 000 so'm", desc: "Eritilgan pishloq bilan tortilgan maxsus shashlik" },
      { name: "Baliq shashlik", available: true, image: "https://i.ytimg.com/vi/8P1UzoyqtMo/maxresdefault.jpg", price: "50 000 so'm", desc: "Losos balig'idan tayyorlangan nozik shashlik" },
      { name: "Qo'ziqorinli", available: false, image: "https://i.ytimg.com/vi/PzsBvSOdV0k/sddefault.jpg", price: "40 000 so'm", desc: "Qo'ziqorin bilan vegetarian shashlik" }
    ]
  },

  {
    id: 3,
    name: "Manti",
    category: "Milliy taomlar",
    image: "https://st.depositphotos.com/20376588/54095/i/450/depositphotos_540952138-stock-photo-traditional-manti-food-on-plate.jpg",
    available: true,
    info: "Nonushta va tushlik",
    description: "Bug'da pishirilgan manti, qatiq bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "https://tavsiyalar.uz/wp-content/uploads/2022/01/manti-tayyorlash-retsepti-ketma-ketligi.jpg", price: "35 000 so'm", desc: "Qiyma go'shtli an'anaviy manti" },
      { name: "Qovoqli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kDIES9ALzUqYHFUMjCwDV6rRxd0YXDvIGrRjHGjCvR08YwWzcEwqHmVn&s=10", price: "30 000 so'm", desc: "Qovoq bilan to'ldirilgan yengil manti" },
      { name: "Kartoshkali", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7DViy1EBJ9K7d07kK2dfsatdR43dSL6ZxJc2EVre5Ol_pw1-GeZUzzk&s=10", price: "28 000 so'm", desc: "Kartoshka bilan to'ldirilgan manti" },
      { name: "Ismaloqli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-dI9BTF9O3ZL3dS_LJTuUCnvV_-VRYhK1HI907HM6hbXFT1IBUPsWWPZ&s=10", price: "32 000 so'm", desc: "Ismaloq qo'shilgan yashil manti" }
    ]
  },

  {
    id: 4,
    name: "Somsa",
    category: "Milliy taomlar",
    image: "https://media.istockphoto.com/id/1158780263/photo/asian-food-samsa-with-chicken-fillet-and-green-herbs-on-wooden-background.jpg?s=612x612&w=0&k=20&c=98COZmD6Dot-FZFqoyprypXqGnyEbH1QL4KLjLKgfLo=",
    available: true,
    info: "Nonushta",
    description: "Tandirda pishirilgan somsa, kunjut bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "https://www.gazeta.uz/media/img/2023/10/FQeodD16984691481709_l.jpg", price: "15 000 so'm", desc: "Qiyma go'shtli an'anaviy somsa" },
      { name: "Kartoshkali", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7S64w2wFqV3wxyLlsK_2llHj9kcl_BLrgu92DLQNz63ZIlPPSqnFxUhP&s=10", price: "12 000 so'm", desc: "Kartoshka bilan to'ldirilgan somsa" },
      { name: "Qovoqli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoveB-EPmzR2qeTxNDIztbu7-P1XYx0xNoWAl9vlW-1fhCUoE6EzdHkIR&s=10", price: "13 000 so'm", desc: "Qovoq bilan to'ldirilgan mazali somsa" },
      { name: "Ko'k somsa", available: true, image: "https://i.ytimg.com/vi/h6-WZ-hlMy8/sddefault.jpg", price: "14 000 so'm", desc: "Ko'k (ismaloq) bilan to'ldirilgan somsa" },
      { name: "Kunjutli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDhr6BQPAdW76Is3VzuLyZIbMPFwEYvHITLQt9lemvRbClUc0EOPUdNYSu&s=10", price: "18 000 so'm", desc: "Kunjut bilan bezatilgan maxsus somsa" }
    ]
  },

  {
    id: 5,
    name: "Lag'mon",
    category: "Milliy taomlar",
    image: "https://st3.depositphotos.com/13798620/32613/i/450/depositphotos_326131868-stock-photo-oriental-lagman-uzbek-soup-on.jpg",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Qo'lda uzilgan lag'mon, go'shtli sho'rva bilan",
    variants: [
      { name: "Suyuq lag'mon", available: true, image: "https://avatars.mds.yandex.net/get-altay/6236523/2a000001811b007a2d7f7173cbc8367331f1/L_height", price: "32 000 so'm", desc: "Go'shtli sho'rva bilan tortiladigan suyuq lag'mon" },
      { name: "Quruq lag'mon", available: true, image: "https://makepedia.uz/wp-content/uploads/2018/10/qovurma-lagmon.jpg", price: "35 000 so'm", desc: "Qovurilgan sabzavotlar bilan quruq lag'mon" },
      { name: "Kesma lag'mon", available: true, image: "https://zira.uz/wp-content/uploads/2020/02/kesma-lagman.jpg", price: "30 000 so'm", desc: "Yupqa kesilgan lag'mon, maxsus sous bilan" },
      { name: "Chuchvara", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0JEoAZqGJOYD4R6qyrTvxaq7214jfqPUA3YELTM2e7hYfDvuNLvGKNM&s=10", price: "28 000 so'm", desc: "Chuchvara qo'shilgan lag'mon" }
    ]
  },

  {
    id: 6,
    name: "Sho'rva",
    category: "Milliy taomlar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgBcOevcAyQUMUfzO0l_XFlnDDNGje_YUOzc50zduK5w&s=10",
    available: true,
    info: "Tushlik",
    description: "An'anaviy o'zbek sho'rvasi, sabzavot va go'sht bilan",
    variants: [
      { name: "Mol go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpD2cpY0wj4Nu1FVkHZzLDVoYk5jqB3-UG3ATaavt1ObM2OsCCWRuLg3I&s=10", price: "28 000 so'm", desc: "Mol go'shti va sabzavotli to'yingan sho'rva" },
      { name: "Tovuq go'shtli", available: true, image: "https://i.ytimg.com/vi/9pwyvDMJbj4/maxresdefault.jpg", price: "25 000 so'm", desc: "Tovuq go'shti bilan yengil sho'rva" },
      { name: "Dumaloq sho'rva", available: true, image: "https://shifo.uz/upload/iblock/ba2/ba260b387e8763ffd724ac3154ebf341.jpg", price: "30 000 so'm", desc: "Dumaloq go'sht bilan boyitilgan sho'rva" },
      { name: "Sabzavotli", available: false, image: "https://data.daryo.uz/media/2021/04/photo_2021-04-25_01-54-23.jpg", price: "22 000 so'm", desc: "Loviya qo'shilgan vegetarian sho'rva" }
    ]
  },

  {
    id: 7,
    name: "Norin",
    category: "Milliy taomlar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Jz8SyYQWvj6x2gaxIDqbXIMpCLeOZL3vv956XErcuQBQPT4rL6BtNGQ&s=10",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Yupqa kesilgan xamir va go'sht, piyoz bilan",
    variants: [
      { name: "Qo'y go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXy9vxv7RyirWAEmvvJLtMS7zTSv0i1_tfVQ9GeryhPcnmU8KEUKgeryY&s=10", price: "35 000 so'm", desc: "Qo'y go'shti bilan an'anaviy norin" },
      { name: "Mol go'shtli", available: true, image: "https://i.ytimg.com/vi/NBL0t7yYgTo/maxresdefault.jpg", price: "32 000 so'm", desc: "Mol go'shtidan tayyorlangan norin" },
      { name: "Ot go'shtli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstTsrpKfkqvre5e7OcHJK8SynvoBcKfPFgtRR1phlR05BEDAYBvkaaWI&s=10", price: "40 000 so'm", desc: "Ot go'shti bilan maxsus norin" }
    ]
  },

  {
    id: 8,
    name: "Mastava",
    category: "Milliy taomlar",
    image: "https://images.bolt.eu/store/2025/2025-03-10/e1cc0ac6-f188-42a9-9ce5-c12541b16505.jpeg",
    available: true,
    info: "Tushlik",
    description: "Guruchli o'zbek sho'rvasi, go'sht va sabzavot bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NY7FLTO_6UQrZbJZul15JogP9bOKNOZbGZG-wTmwf1FLnyARDGrsJkT7&s=10", price: "25 000 so'm", desc: "Mol go'shti bilan an'anaviy mastava" },
      { name: "Vegetarian", available: true, image: "https://i2.wp.com/rusuz.com/wp-content/uploads/2017/09/Mastava-scaled.jpg?fit=1200%2C800&ssl=1", price: "20 000 so'm", desc: "Go'shtsiz yengil mastava" }
    ]
  },

  {
    id: 9,
    name: "Dimlama",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2019/10/shilpildok.jpg",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Go'sht va sabzavotlarni dimlab pishirilgan an'anaviy taom",
    variants: [
      { name: "Go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHIcl9tPirTZPYGDM3hEjKEIZL9-DTN_9TWdMZLLwoJEgZ-gqzp2xZE0&s=10", price: "38 000 so'm", desc: "Qo'y go'shti va sabzavotli dimlama" },
      { name: "Tovuq go'shtli", available: true, image: "https://i.ytimg.com/vi/z8HUAO313fQ/maxresdefault.jpg", price: "32 000 so'm", desc: "Tovuq go'shti bilan yengil dimlama" },
      { name: "Vegetarian", available: false, image: "https://www.shutterstock.com/image-photo/traditional-turkish-olive-oil-fennel-260nw-2758910449.jpg", price: "25 000 so'm", desc: "Faqat sabzavotlardan dimlama" }
    ]
  },

  {
    id: 10,
    name: "Qozon kabob",
    category: "Milliy taomlar",
    image: "https://avatars.mds.yandex.net/i?id=19260f235a420cf35401173cc4c6b936a05dfdd6-10197150-images-thumbs&n=13",
    available: true,
    info: "Kechki ovqat",
    description: "Qozonda dimlab pishirilgan go'shtli kabob",
    variants: [
      { name: "Qo'y go'shtli", available: true, image: "https://makepedia.uz/wp-content/uploads/2018/04/qozon-kabob.jpg", price: "45 000 so'm", desc: "Qo'y go'shtidan tayyorlangan qozon kabob" },
      { name: "Mol go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsz5tkwxQFzFTJm2pFGl3UkwYfGuekTDWEdoTo4D2hJKv82znIlz-fhg&s=10", price: "42 000 so'm", desc: "Mol go'shti bilan kabob" },
      { name: "Tandir kabob", available: true, image: "https://www.shutterstock.com/image-photo/plate-tandoor-gosht-meat-uzbekistan-600w-2587326595.jpg", price: "48 000 so'm", desc: "Tandirda pishirilgan maxsus kabob" }
    ]
  },

  {
    id: 11,
    name: "Jiz (Jigar)",
    category: "Milliy taomlar",
    image: "https://st4.depositphotos.com/1198682/41126/i/450/depositphotos_411263238-stock-photo-warm-salad-with-eggplant-beef.jpg",
    available: true,
    info: "Kechki ovqat",
    description: "Qovurilgan jigar, piyoz va kartoshka bilan",
    variants: [
      { name: "Mol jigari", available: true, image: "https://st2.depositphotos.com/1198682/49052/i/450/depositphotos_490523998-stock-photo-chinese-warm-beef-salad-with.jpg", price: "28 000 so'm", desc: "Mol jigaridan tayyorlangan jiz" },
      { name: "Qo'y jigari", available: true, image: "https://st2.depositphotos.com/1198682/49052/i/450/depositphotos_490523998-stock-photo-chinese-warm-beef-salad-with.jpg", price: "30 000 so'm", desc: "Qo'y jigari bilan an'anaviy jiz" }
    ]
  },

  {
    id: 12,
    name: "Beshbarmoq",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2019/01/beshbarmak-6.jpg",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Yupqa yoyilgan xamir, go'sht va piyoz bilan",
    variants: [
      { name: "Qo'y go'shtli", available: true, image: "https://chakchak.uz/uploads/images/reciepts/ad851666ed3b6156.jpg", price: "40 000 so'm", desc: "Qo'y go'shti bilan an'anaviy beshbarmoq" },
      { name: "Mol go'shtli", available: true, image: "https://telegraf.com.ua/static/storage/originals/4/5b/9c214b99e404a911f1f289aea31505b4.jpg", price: "38 000 so'm", desc: "Mol go'shtidan beshbarmoq" },
      { name: "Ot go'shtli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWQSv-4XN9PEgHcqbqw0qU3dsKESIsuY6BNoEJpnJU4y4e_uLTo4jOg3MX&s=10", price: "50 000 so'm", desc: "Ot go'shti bilan maxsus beshbarmoq" }
    ]
  },

  {
    id: 13,
    name: "Do'lma",
    category: "Milliy taomlar",
    image: "https://img.freepik.com/fotos-premium/deliciosas-hojas-parra-rellenas-caseras-dolma-perejil-placa-ceramica-sobre-fondo-madera-oxido_131350-1307.jpg",
    available: true,
    info: "Tushlik",
    description: "Uzum bargiga o'ralgan go'sht va guruch",
    variants: [
      { name: "Uzum bargli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61W8f2WkqJ4v2ddEj2I5W6AfVulFvh_tA7TF2Om3UUw7ebavYeR_N8aQ&s=10", price: "30 000 so'm", desc: "Uzum bargiga o'ralgan an'anaviy dolma" },
      { name: "Karamli", available: true, image: "https://data.daryo.uz/media/cache/2021/01/photo_2021-01-29_13-25-50-666x445-666x445.jpg", price: "28 000 so'm", desc: "Karam bargiga o'ralgan dolma" }
    ]
  },

  {
    id: 14,
    name: "Qurma (Shavla)",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2018/10/shavla-14.jpg",
    available: true,
    info: "Tushlik",
    description: "Palovga o'xshash, ammo yumshoqroq taom",
    variants: [
      { name: "Go'shtli shavla", available: true, image: "", price: "28 000 so'm", desc: "Go'sht qo'shilgan to'yingan shavla" },
      { name: "Tovuq shavla", available: true, image: "", price: "25 000 so'm", desc: "Tovuq go'shtidan yengil shavla" }
    ]
  },

  {
    id: 15,
    name: "Oromo",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta va tushlik",
    description: "Bug'da pishirilgan xamir, go'sht va sabzavot bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "", price: "32 000 so'm", desc: "Qiyma go'sht bilan to'ldirilgan oromo" },
      { name: "Sabzavotli", available: true, image: "", price: "26 000 so'm", desc: "Sabzavot va ko'kat bilan oromo" }
    ]
  },

  {
    id: 16,
    name: "Xonim",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta va tushlik",
    description: "Bug'da pishirilgan xamir rullari, sous bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "", price: "30 000 so'm", desc: "Qiyma go'sht bilan to'ldirilgan xonim" },
      { name: "Kartoshkali", available: true, image: "", price: "25 000 so'm", desc: "Kartoshka piyola bilan xonim" },
      { name: "Ko'katli", available: false, image: "", price: "28 000 so'm", desc: "Yangi ko'katlar bilan xonim" }
    ]
  },

  {
    id: 17,
    name: "Tuxum-barak",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta",
    description: "Tuxum va piyoz bilan to'ldirilgan chuchvara",
    variants: [
      { name: "Klassik", available: true, image: "", price: "22 000 so'm", desc: "Tuxum va piyozli an'anaviy tuxum-barak" },
      { name: "Ko'katli", available: false, image: "", price: "25 000 so'm", desc: "Ko'kat qo'shilgan maxsus tuxum-barak" }
    ]
  },

  {
    id: 18,
    name: "Quymoq",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta",
    description: "Yumshoq quymoq, asal va qaymoq bilan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "18 000 so'm", desc: "Asal va qaymoq bilan tortilgan quymoq" },
      { name: "Mevali", available: true, image: "", price: "22 000 so'm", desc: "Mavsumiy mevalar qo'shilgan quymoq" }
    ]
  },

  {
    id: 19,
    name: "Kabob",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Kechki ovqat",
    description: "Qiyma go'shtdan tayyorlangan kabob, lavash bilan",
    variants: [
      { name: "Qo'y kabob", available: true, image: "", price: "40 000 so'm", desc: "Qo'y go'shtidan mayda kabob" },
      { name: "Mol kabob", available: true, image: "", price: "38 000 so'm", desc: "Mol go'shtidan tayyorlangan kabob" },
      { name: "Lula kabob", available: true, image: "", price: "45 000 so'm", desc: "Maxsus shakldagi lula kabob" }
    ]
  },

  {
    id: 20,
    name: "Kashk (Bulyon)",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta",
    description: "Issiq bulyon, non va ko'kat bilan",
    variants: [
      { name: "Go'shtli bulyon", available: true, image: "", price: "18 000 so'm", desc: "Mol go'shtli to'yimli bulyon" },
      { name: "Tovuq bulyon", available: true, image: "", price: "15 000 so'm", desc: "Tovuq go'shtidan yengil bulyon" }
    ]
  },

  {
    id: 21,
    name: "Tutqich",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta",
    description: "Yupqa xamirdan tayyorlangan uy taomi",
    variants: [
      { name: "Go'shtli", available: true, image: "", price: "28 000 so'm", desc: "Go'sht bilan to'ldirilgan tutqich" },
      { name: "Piyozli", available: false, image: "", price: "22 000 so'm", desc: "Piyoz qovurilgan tutqich" }
    ]
  },

  {
    id: 22,
    name: "Moshkichiri",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Tushlik",
    description: "Mosh va guruchdan tayyorlangan an'anaviy taom",
    variants: [
      { name: "Go'shtli", available: true, image: "", price: "25 000 so'm", desc: "Mol go'shti qo'shilgan moshkichiri" },
      { name: "Vegetarian", available: true, image: "", price: "20 000 so'm", desc: "Go'shtsiz yengil moshkichiri" }
    ]
  },

  {
    id: 23,
    name: "Cholop",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Yozgi taom",
    description: "Sovuq sho'rva, qatiq va ko'kat bilan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "18 000 so'm", desc: "Qatiq va bodringli sovuq cholop" },
      { name: "Go'shtli", available: false, image: "", price: "25 000 so'm", desc: "Go'sht qo'shilgan to'yimli cholop" }
    ]
  },

  {
    id: 24,
    name: "Bog'irsoq",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta va choy",
    description: "Qovurilgan xamir mahsuloti, kuk bilan",
    variants: [
      { name: "Oddiy", available: true, image: "", price: "10 000 so'm", desc: "Shakar kukuni bilan bog'irsoq" },
      { name: "Asalli", available: true, image: "", price: "14 000 so'm", desc: "Asal bilan tortilgan maxsus bog'irsoq" }
    ]
  },

  {
    id: 25,
    name: "Pishloqli non",
    category: "Milliy taomlar",
    image: "",
    available: true,
    info: "Nonushta",
    description: "Tandirda pishirilgan pishloqli non",
    variants: [
      { name: "Klassik", available: true, image: "", price: "12 000 so'm", desc: "Pishloq bilan to'ldirilgan issiq non" },
      { name: "Ko'katli", available: true, image: "", price: "14 000 so'm", desc: "Ko'kat va pishloq qo'shilgan non" }
    ]
  },

  // ==================== FAST FOOD ====================

  {
    id: 26,
    name: "Gamburger",
    category: "Fast food",
    image: "",
    available: true,
    info: "Kechki ovqat",
    description: "100% mol go'shtli gamburger, fri kartoshka bilan",
    variants: [
      { name: "Classic", available: true, image: "", price: "25 000 so'm", desc: "Klassik mol go'shtli gamburger" },
      { name: "Double", available: true, image: "", price: "35 000 so'm", desc: "Ikkilamchi go'shtli katta gamburger" },
      { name: "Cheese", available: true, image: "", price: "28 000 so'm", desc: "Pishloq qo'shilgan gamburger" },
      { name: "Spicy", available: false, image: "", price: "30 000 so'm", desc: "Achchiq sousli maxsus gamburger" }
    ]
  },

  {
    id: 27,
    name: "Hot-dog",
    category: "Fast food",
    image: "",
    available: true,
    info: "Kechki ovqat",
    description: "Yangi pishirilgan bulochkada sosiskali hot-dog",
    variants: [
      { name: "Classic", available: true, image: "", price: "18 000 so'm", desc: "Klassik sosiskali hot-dog" },
      { name: "Cheese", available: true, image: "", price: "22 000 so'm", desc: "Pishloq sousli hot-dog" },
      { name: "Maxsus", available: false, image: "", price: "28 000 so'm", desc: "Bekon va pishloqli maxsus hot-dog" }
    ]
  },

  {
    id: 28,
    name: "Pizza",
    category: "Fast food",
    image: "",
    available: true,
    info: "Kechki ovqat",
    description: "Italiya usulidagi pizza, mozzarella bilan",
    variants: [
      { name: "Margarita", available: true, image: "", price: "35 000 so'm", desc: "Pomidor, mozzarella va rayhonli klassik pizza" },
      { name: "Pepperoni", available: true, image: "", price: "40 000 so'm", desc: "Pepperoni kolbasali mazali pizza" },
      { name: "Four Cheese", available: true, image: "", price: "45 000 so'm", desc: "To'rt xil pishloq qo'shilgan pizza" },
      { name: "Vegetarian", available: true, image: "", price: "38 000 so'm", desc: "Sabzavotli yengil pizza" },
      { name: "Gavayi", available: false, image: "", price: "42 000 so'm", desc: "Ananas va tovuq go'shtli gavayi pizzasi" }
    ]
  },

  {
    id: 29,
    name: "Lavash",
    category: "Fast food",
    image: "",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Go'shtli lavash, sabzavot va sous bilan",
    variants: [
      { name: "Tovuq go'shtli", available: true, image: "", price: "28 000 so'm", desc: "Tovuq go'shti va sabzavotli lavash" },
      { name: "Mol go'shtli", available: true, image: "", price: "32 000 so'm", desc: "Mol go'shti bilan to'ldirilgan lavash" },
      { name: "Sirli", available: true, image: "", price: "30 000 so'm", desc: "Pishloq qo'shilgan maxsus lavash" },
      { name: "Achchiq", available: false, image: "", price: "30 000 so'm", desc: "Achchiq sousli lavash" }
    ]
  },

  {
    id: 30,
    name: "Tovuq qanotchalari",
    category: "Fast food",
    image: "",
    available: true,
    info: "Kechki ovqat",
    description: "Qovurilgan tovuq qanotchalari, sous bilan",
    variants: [
      { name: "BBQ", available: true, image: "", price: "30 000 so'm", desc: "BBQ sousli tovuq qanotchalari" },
      { name: "Achchiq", available: true, image: "", price: "32 000 so'm", desc: "Achchiq chili sousli qanotchalar" },
      { name: "Teriyaki", available: false, image: "", price: "35 000 so'm", desc: "Yapon teriyaki sousli qanotchalar" }
    ]
  },

  {
    id: 31,
    name: "Doner",
    category: "Fast food",
    image: "",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Aylantirilgan go'shtli doner, non va salat bilan",
    variants: [
      { name: "Tovuq doner", available: true, image: "", price: "28 000 so'm", desc: "Tovuq go'shtli doner" },
      { name: "Mol doner", available: true, image: "", price: "32 000 so'm", desc: "Mol go'shtidan tayyorlangan doner" },
      { name: "Pishloqli", available: true, image: "", price: "35 000 so'm", desc: "Pishloq qo'shilgan maxsus doner" }
    ]
  },

  {
    id: 32,
    name: "Sendvich",
    category: "Fast food",
    image: "",
    available: true,
    info: "Nonushta va tushlik",
    description: "Turli xil sendvichlar, yangi non bilan",
    variants: [
      { name: "Classic", available: true, image: "", price: "18 000 so'm", desc: "Pishloq va kolbasali klassik sendvich" },
      { name: "Tovuqli", available: true, image: "", price: "22 000 so'm", desc: "Tovuq go'shtli sendvich" },
      { name: "Vegetarian", available: true, image: "", price: "20 000 so'm", desc: "Sabzavotli yengil sendvich" }
    ]
  },

  {
    id: 33,
    name: "Fri kartoshka",
    category: "Fast food",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Qovurilgan kartoshka, turli souslar bilan",
    variants: [
      { name: "Kichik", available: true, image: "", price: "10 000 so'm", desc: "Kichik porsiya fri kartoshka" },
      { name: "Katta", available: true, image: "", price: "16 000 so'm", desc: "Katta porsiya fri kartoshka" },
      { name: "Pishloqli", available: true, image: "", price: "20 000 so'm", desc: "Pishloq sousli fri kartoshka" }
    ]
  },

  {
    id: 34,
    name: "Sho'rvadon",
    category: "Fast food",
    image: "",
    available: true,
    info: "Tushlik",
    description: "Tez tayyorlanadigan sho'rva, non bilan",
    variants: [
      { name: "Classic", available: true, image: "", price: "20 000 so'm", desc: "Klassik sho'rvadon" },
      { name: "Achchiq", available: false, image: "", price: "22 000 so'm", desc: "Achchiq sousli sho'rvadon" }
    ]
  },

  // ==================== SALATLAR ====================

  {
    id: 35,
    name: "Grech salati",
    category: "Salat",
    image: "",
    available: true,
    info: "Nonushta va tushlik",
    description: "Yangi sabzavotlar: pomidor, bodring, salat barglari",
    variants: [
      { name: "Klassik", available: true, image: "", price: "18 000 so'm", desc: "Pomidor, bodring va piyozli klassik salat" },
      { name: "Piyozli", available: true, image: "", price: "20 000 so'm", desc: "Ko'k piyoz qo'shilgan salat" },
      { name: "Limonli", available: true, image: "", price: "22 000 so'm", desc: "Limon sharbati bilan maxsus salat" },
      { name: "Pishloqli", available: false, image: "", price: "25 000 so'm", desc: "Feta pishlog'i qo'shilgan salat" }
    ]
  },

  {
    id: 36,
    name: "Sezar salati",
    category: "Salat",
    image: "",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Tovuq go'shti, parmesan, kruton va Sezar sousi bilan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "28 000 so'm", desc: "Tovuq go'shti va parmesanli klassik Sezar" },
      { name: "Qisqichbaqa", available: true, image: "", price: "35 000 so'm", desc: "Qisqichbaqa go'shti qo'shilgan Sezar" },
      { name: "Vegetarian", available: false, image: "", price: "25 000 so'm", desc: "Go'shtsiz yengil Sezar varianti" }
    ]
  },

  {
    id: 37,
    name: "Achchiq-chuchuk",
    category: "Salat",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "An'anaviy o'zbek salati, pomidor va bodringdan",
    variants: [
      { name: "Oddiy", available: true, image: "", price: "14 000 so'm", desc: "Pomidor va bodringli oddiy salat" },
      { name: "Maxsus", available: true, image: "", price: "18 000 so'm", desc: "Piyoz va ko'kat qo'shilgan maxsus salat" }
    ]
  },

  {
    id: 38,
    name: "Mimoza",
    category: "Salat",
    image: "",
    available: true,
    info: "Tushlik",
    description: "Qatlamli salat, baliq va tuxum bilan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "22 000 so'm", desc: "Konserva baliqli an'anaviy mimoza" },
      { name: "Lososli", available: false, image: "", price: "30 000 so'm", desc: "Losos balig'i bilan maxsus mimoza" }
    ]
  },

  {
    id: 39,
    name: "Olivier",
    category: "Salat",
    image: "",
    available: true,
    info: "Tushlik",
    description: "An'anaviy Olivier salati, go'sht va sabzavot bilan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "20 000 so'm", desc: "Kolbasa va sabzavotli klassik olivier" },
      { name: "Tovuq go'shtli", available: true, image: "", price: "24 000 so'm", desc: "Tovuq go'shti bilan to'yimli olivier" }
    ]
  },

  {
    id: 40,
    name: "Sabzavotli salat",
    category: "Salat",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Mavsumiy sabzavotlardan tayyorlangan salat",
    variants: [
      { name: "Mavsumiy", available: true, image: "", price: "16 000 so'm", desc: "Yangi mavsumiy sabzavotlardan salat" },
      { name: "Qizilcha salati", available: true, image: "", price: "18 000 so'm", desc: "Qaynatilgan qizilcha va yong'oqli salat" }
    ]
  },

  // ==================== ICHIMLIKLAR ====================

  {
    id: 41,
    name: "Ko'k choy",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "An'anaviy o'zbek ko'k choyi, kovruk bilan",
    variants: [
      { name: "Ko'k choy", available: true, image: "", price: "5 000 so'm", desc: "An'anaviy o'zbek ko'k choyi" },
      { name: "Qora choy", available: true, image: "", price: "5 000 so'm", desc: "Issiq qora choy" },
      { name: "Limonli choy", available: true, image: "", price: "7 000 so'm", desc: "Limon bilan tortiladigan choy" },
      { name: "Asalli choy", available: false, image: "", price: "10 000 so'm", desc: "Asal qo'shilgan maxsus choy" }
    ]
  },

  {
    id: 42,
    name: "Qahva",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Nonushta va kun bo'yi",
    description: "Italy usulidagi qahva turlari",
    variants: [
      { name: "Espresso", available: true, image: "", price: "12 000 so'm", desc: "Kuchli italyan espressosi" },
      { name: "Americano", available: true, image: "", price: "14 000 so'm", desc: "Suv qo'shilgan yengil americano" },
      { name: "Cappuccino", available: true, image: "", price: "18 000 so'm", desc: "Sutli ko'pikli cappuccino" },
      { name: "Latte", available: true, image: "", price: "20 000 so'm", desc: "Yumshoq sutli latte" },
      { name: "Mocha", available: false, image: "", price: "22 000 so'm", desc: "Shokoladli mocha qahvasi" }
    ]
  },

  {
    id: 43,
    name: "Sharbat",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Tabiiy meva sharbati, mavsumiy mevalardan",
    variants: [
      { name: "Apelsin", available: true, image: "", price: "12 000 so'm", desc: "Yangi siqilgan apelsin sharbati" },
      { name: "Olma", available: true, image: "", price: "10 000 so'm", desc: "Tabiiy olma sharbati" },
      { name: "Anor", available: true, image: "", price: "15 000 so'm", desc: "Anor sharbati, boy vitamin manbai" },
      { name: "Shaftoli", available: false, image: "", price: "14 000 so'm", desc: "Shaftoli sharbati, mavsumiy" }
    ]
  },

  {
    id: 44,
    name: "Mineral suv",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Gazli va gazsiz mineral suv",
    variants: [
      { name: "Gazli", available: true, image: "", price: "4 000 so'm", desc: "Gazlangan mineral suv" },
      { name: "Gazsiz", available: true, image: "", price: "4 000 so'm", desc: "Gazsiz toza mineral suv" }
    ]
  },

  {
    id: 45,
    name: "Limonad",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Uy usulida tayyorlangan limonad",
    variants: [
      { name: "Klassik", available: true, image: "", price: "10 000 so'm", desc: "Limon va yalpizli klassik limonad" },
      { name: "Mevali", available: true, image: "", price: "12 000 so'm", desc: "Mavsumiy mevali limonad" }
    ]
  },

  {
    id: 46,
    name: "Kompot",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Uy usulida tayyorlangan meva kompoti",
    variants: [
      { name: "Olma kompot", available: true, image: "", price: "7 000 so'm", desc: "Olma qo'shilgan kompot" },
      { name: "Mevali kompot", available: true, image: "", price: "8 000 so'm", desc: "Turli mevalardan tayyorlangan kompot" }
    ]
  },

  {
    id: 47,
    name: "Ayron",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Qatiqdan tayyorlangan an'anaviy ichimlik",
    variants: [
      { name: "Oddiy", available: true, image: "", price: "6 000 so'm", desc: "An'anaviy ayron" },
      { name: "Yalpizli", available: true, image: "", price: "8 000 so'm", desc: "Yalpiz qo'shilgan maxsus ayron" }
    ]
  },

  {
    id: 48,
    name: "Sok (Sharbat)",
    category: "Ichimliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Turli xil sharbat va soklar",
    variants: [
      { name: "Olma sok", available: true, image: "", price: "8 000 so'm", desc: "Tabiiy olma sok" },
      { name: "Apelsin sok", available: true, image: "", price: "10 000 so'm", desc: "Apelsin sok" },
      { name: "Multimevali", available: false, image: "", price: "12 000 so'm", desc: "Turli mevalar aralashmasi" }
    ]
  },

  // ==================== SHIRINLIKLAR ====================

  {
    id: 49,
    name: "Medovik",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Shirinlik",
    description: "Asal qatlamli an'anaviy tort",
    variants: [
      { name: "Klassik", available: true, image: "", price: "25 000 so'm", desc: "Asal qatlamli klassik medovik" },
      { name: "Yong'oqli", available: true, image: "", price: "30 000 so'm", desc: "Yong'oq qo'shilgan medovik" },
      { name: "Shokoladli", available: false, image: "", price: "35 000 so'm", desc: "Shokolad qo'shilgan maxsus medovik" }
    ]
  },

  {
    id: 50,
    name: "Napaleon",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Shirinlik",
    description: "Qatma qatlamli an'anaviy tort",
    variants: [
      { name: "Klassik", available: true, image: "", price: "28 000 so'm", desc: "Qatma qatlamli klassik napaleon" },
      { name: "Mevali", available: true, image: "", price: "32 000 so'm", desc: "Meva qo'shilgan napaleon" }
    ]
  },

  {
    id: 51,
    name: "Muzqaymoq",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Kun bo'yi",
    description: "Turli xil muzqaymoq turlari",
    variants: [
      { name: "Vanilli", available: true, image: "", price: "12 000 so'm", desc: "Yumshoq vanilli muzqaymoq" },
      { name: "Shokoladli", available: true, image: "", price: "14 000 so'm", desc: "Shokoladli muzqaymoq" },
      { name: "Qulupnayli", available: true, image: "", price: "14 000 so'm", desc: "Qulupnayli mevali muzqaymoq" },
      { name: "Pista", available: false, image: "", price: "18 000 so'm", desc: "Pista yong'og'i qo'shilgan maxsus muzqaymoq" }
    ]
  },

  {
    id: 52,
    name: "Chak-chak",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy tatar shirinligi, asal bilan",
    variants: [
      { name: "Asalli", available: true, image: "", price: "22 000 so'm", desc: "Asal bilan tayyorlangan an'anaviy chak-chak" },
      { name: "Yong'oqli", available: true, image: "", price: "26 000 so'm", desc: "Yong'oq qo'shilgan chak-chak" }
    ]
  },

  {
    id: 53,
    name: "Halva",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy halva, kunjut va yong'oq bilan",
    variants: [
      { name: "Kunjutli", available: true, image: "", price: "18 000 so'm", desc: "Kunjutdan tayyorlangan klassik halva" },
      { name: "Yong'oqli", available: true, image: "", price: "22 000 so'm", desc: "Yong'oq qo'shilgan maxsus halva" }
    ]
  },

  {
    id: 54,
    name: "Parvarda",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy o'zbek konfeti, shakar va yong'oqdan",
    variants: [
      { name: "Klassik", available: true, image: "", price: "15 000 so'm", desc: "Shakar va yong'oqdan klassik parvarda" },
      { name: "Kunjutli", available: false, image: "", price: "18 000 so'm", desc: "Kunjut qo'shilgan parvarda" }
    ]
  },

  {
    id: 55,
    name: "Sumalak",
    category: "Shirinliklar",
    image: "",
    available: true,
    info: "Mavsumiy (Navro'z)",
    description: "Bug'doydan tayyorlanadigan an'anaviy shirinlik",
    variants: [
      { name: "Traditsion", available: true, image: "", price: "20 000 so'm", desc: "An'anaviy usulda tayyorlangan sumalak" },
      { name: "Yong'oqli", available: false, image: "", price: "25 000 so'm", desc: "Yong'oq qo'shilgan sumalak" }
    ]
  }
]

export const menuCategories = ["Barchasi", "Milliy taomlar", "Fast food", "Salat", "Ichimliklar", "Shirinliklar"]
