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
      { name: "Go'shtli shavla", available: true, image: "https://i.ytimg.com/vi/hQR50MFFyXc/sddefault.jpg", price: "28 000 so'm", desc: "Go'sht qo'shilgan to'yingan shavla" },
      { name: "Tovuq shavla", available: true, image: "https://i.ytimg.com/vi/KlRpVfqWBo0/sddefault.jpg", price: "25 000 so'm", desc: "Tovuq go'shtidan yengil shavla" }
    ]
  },

  {
    id: 15,
    name: "O'rama",
    category: "Milliy taomlar",
    image: "https://i.ytimg.com/vi/2AHdYPwoC3M/maxresdefault.jpg",
    available: true,
    info: "Nonushta va tushlik",
    description: "Bug'da pishirilgan xamir, go'sht va sabzavot bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "https://i.ytimg.com/vi/oLGsZMA7lrw/maxresdefault.jpg", price: "32 000 so'm", desc: "Qiyma go'sht bilan to'ldirilgan oromo" },
      { name: "Sabzavotli", available: true, image: "https://i.ytimg.com/vi/ECueWtLdoPc/maxresdefault.jpg", price: "26 000 so'm", desc: "Sabzavot va ko'kat bilan oromo" }
    ]
  },

  {
    id: 16,
    name: "Xonim",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2018/01/hanum2-11.jpg",
    available: true,
    info: "Nonushta va tushlik",
    description: "Bug'da pishirilgan xamir rullari, sous bilan",
    variants: [
      { name: "Go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScEI86Wgk84oiiSaj-_Jp5omWxFVTNzCFUvyX_ibgz7siRQwkTF2BNuQfH&s=10", price: "30 000 so'm", desc: "Qiyma go'sht bilan to'ldirilgan xonim" },
      { name: "Kartoshkali", available: true, image: "https://i.ytimg.com/vi/tWrUgIxlL24/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGGUgXihQMA8=&rs=AOn4CLDIhPygmGLfcs9EIB9qmcJBsZo1tw", price: "25 000 so'm", desc: "Kartoshka piyola bilan xonim" },
      { name: "Ko'katli", available: false, image: "https://i.ytimg.com/vi/8ijHas_CrsM/maxresdefault.jpg", price: "28 000 so'm", desc: "Yangi ko'katlar bilan xonim" }
    ]
  },

  {
    id: 17,
    name: "Tuxum-barak",
    category: "Milliy taomlar",
    image: "https://podrobno.uz/upload/iblock/e6d/xikt0hgxoaa0jawr3x7zhsc7k2lwp237/217304d653c035dcd9429fe8e2d3f6f1.jpg",
    available: true,
    info: "Nonushta",
    description: "Tuxum va piyoz bilan to'ldirilgan chuchvara",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFz2FLsCgHfLIgRZ8WNqIkR96l6YR5AAtUaz6nbtqo466luPwqKa82BbM&s=10", price: "22 000 so'm", desc: "Tuxum va piyozli an'anaviy tuxum-barak" },
      { name: "Ko'katli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGihRiI1GciHGlg73voNj8LWVC2IhsNcQ5qrVVgis4TKOq5K4mRa1a1c&s=10", price: "25 000 so'm", desc: "Ko'kat qo'shilgan maxsus tuxum-barak" }
    ]
  },

  {
    id: 18,
    name: "Quymoq",
    category: "Milliy taomlar",
    image: "https://aniq.uz/photos/news/E29d9cNv1O8Zz9L.jpeg",
    available: true,
    info: "Nonushta",
    description: "Yumshoq quymoq, asal va qaymoq bilan",
    variants: [
      { name: "Klassik", available: true, image: "https://www.gazeta.uz/media/img/2023/02/Oh3Kx216773037184315_l.jpg", price: "18 000 so'm", desc: "Asal va qaymoq bilan tortilgan quymoq" },
      { name: "Mevali", available: true, image: "https://makepedia.uz/wp-content/uploads/2018/02/pancakes-2291908_960_720.jpg", price: "22 000 so'm", desc: "Mavsumiy mevalar qo'shilgan quymoq" }
    ]
  },

  {
    id: 19,
    name: "Kabob",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2020/09/shashlyk-v-kazane.jpg",
    available: true,
    info: "Kechki ovqat",
    description: "Qiyma go'shtdan tayyorlangan kabob, lavash bilan",
    variants: [
      { name: "Qo'y kabob", available: true, image: "https://dostavo4ka.uz/upload-file/2021/07/05/6226/750x750-5a3829f5-e1cb-40dd-bf54-4dc77b5ea9bf.jpg", price: "40 000 so'm", desc: "Qo'y go'shtidan mayda kabob" },
      { name: "Mol kabob", available: true, image: "https://cdn.zoomda.uz/products/2025/06/05/1749104065820158016.webp", price: "38 000 so'm", desc: "Mol go'shtidan tayyorlangan kabob" },
      { name: "Lula kabob", available: true, image: "https://i.ytimg.com/vi/dw2AJ4GMaeg/maxresdefault.jpg", price: "45 000 so'm", desc: "Maxsus shakldagi lula kabob" }
    ]
  },

  {
    id: 20,
    name: "Kashk (Bulyon)",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2018/01/sup-chechevichn-2.jpg",
    available: true,
    info: "Nonushta",
    description: "Issiq bulyon, non va ko'kat bilan",
    variants: [
      { name: "Go'shtli bulyon", available: true, image: "https://zira.uz/wp-content/uploads/2018/01/solyanka-1.jpg", price: "18 000 so'm", desc: "Mol go'shtli to'yimli bulyon" },
      { name: "Tovuq bulyon", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY02cqtozfc8-LsId7pGPAhFkd4oW5-V9NPUH6qJ07isTGlrReqzKjbHU&s=10", price: "15 000 so'm", desc: "Tovuq go'shtidan yengil bulyon" }
    ]
  },

  {
    id: 21,
    name: "Tutqich",
    category: "Milliy taomlar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScD8r4vqWVA81w90ogpkJJMgka6daQMAb8f7ryv6OqTQWLASOAFuRIKCM&s=10",
    available: true,
    info: "Nonushta",
    description: "Yupqa xamirdan tayyorlangan uy taomi",
    variants: [
      { name: "Go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXwEVrKY4qxzuXuJmwI_N4JtrzVDRCmX1cAX8zS2NLmOtgHRmA38XCf64&s=10", price: "28 000 so'm", desc: "Go'sht bilan to'ldirilgan tutqich" },
      { name: "Piyozli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7l6-ZQJnd7LBOfvUqzlMOM7jmLeMWZBMbhmMxNVfirMkgxAyUyaxWej8&s=10", price: "22 000 so'm", desc: "Piyoz qovurilgan tutqich" }
    ]
  },

  {
    id: 22,
    name: "Moshkichiri",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2018/08/maschkichir-1.jpg",
    available: true,
    info: "Tushlik",
    description: "Mosh va guruchdan tayyorlangan an'anaviy taom",
    variants: [
      { name: "Go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGdrUWPV1U2fJYYdAG1GAEpG1U0goE6IJT_UFAU4fIL25LFX6NShT_mnI&s=10", price: "25 000 so'm", desc: "Mol go'shti qo'shilgan moshkichiri" },
      { name: "Vegetarian", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAowcc0KWY5c7WnmO7MVxlEJnE3zPm_K7J46rI8ivPxuXi1YKrzg6b9Q&s=10", price: "20 000 so'm", desc: "Go'shtsiz yengil moshkichiri" }
    ]
  },

  {
    id: 23,
    name: "Cholop",
    category: "Milliy taomlar",
    image: "https://zira.uz/wp-content/uploads/2020/07/sup-chalop.jpg",
    available: true,
    info: "Yozgi taom",
    description: "Sovuq sho'rva, qatiq va ko'kat bilan",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzMal4-mrGEQmD3tzBTM6xbeaKeAeXwprydl5NUV0a1S_7ssdeSCSU6M&s=10", price: "18 000 so'm", desc: "Qatiq va bodringli sovuq cholop" },
      { name: "Go'shtli", available: false, image: "https://zira.uz/wp-content/uploads/2020/07/sup-chalop-3.jpg", price: "25 000 so'm", desc: "Go'sht qo'shilgan to'yimli cholop" }
    ]
  },

  {
    id: 24,
    name: "Bog'irsoq",
    category: "Milliy taomlar",
    image: "https://www.gazeta.uz/media/img/2022/04/lXKDvm16512233180507_l.jpg",
    available: true,
    info: "Nonushta va choy",
    description: "Qovurilgan xamir mahsuloti, kuk bilan",
    variants: [
      { name: "Oddiy", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBCnIX59TVOePBMjpXMvjJCsFKKxVrBmYqeufnc9oKDkEvpColjY_Mgk&s=10", price: "10 000 so'm", desc: "Shakar kukuni bilan bog'irsoq" },
      { name: "Asalli", available: true, image: "https://zira.uz/wp-content/uploads/2021/04/vozdushnyy-boursak.jpg", price: "14 000 so'm", desc: "Asal bilan tortilgan maxsus bog'irsoq" }
    ]
  },

  {
    id: 25,
    name: "Pishloqli non",
    category: "Milliy taomlar",
    image: "https://www.gazeta.uz/media/img/2025/10/aL34Vo17600968261663_l.webp",
    available: true,
    info: "Nonushta",
    description: "Tandirda pishirilgan pishloqli non",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8tMuShzPCQhgRQ1Y8fn2dQdyoUUqtvfV1FRLYQTIMHtmCi_hrKgyHZ6Kv&s=10", price: "12 000 so'm", desc: "Pishloq bilan to'ldirilgan issiq non" },
      { name: "Ko'katli", available: true, image: "https://www.gazeta.uz/media/img/2025/01/4rkBD717383326225883_b.jpg", price: "14 000 so'm", desc: "Ko'kat va pishloq qo'shilgan non" }
    ]
  },

  {
    id: 26,
    name: "Gamburger",
    category: "Fast food",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlXHM4Zf4onvF9Z3B1Ek1zqfoZd-BC8-e71GO7AxY3rP4VCDO1SaWvok&s=10",
    available: true,
    info: "Kechki ovqat",
    description: "100% mol go'shtli gamburger, fri kartoshka bilan",
    variants: [
      { name: "Classic", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWbwF7A-RCEVJ83xHUGJa284_Zp0rjxtRXFvfm3puejdkjbDjNt2xry9n&s=10", price: "25 000 so'm", desc: "Klassik mol go'shtli gamburger" },
      { name: "Double", available: true, image: "https://cdn.pixabay.com/photo/2022/07/15/18/18/burger-7323697_1280.jpg", price: "35 000 so'm", desc: "Ikkilamchi go'shtli katta gamburger" },
      { name: "Cheese", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOSaOybXw5TSWwWdBSUFmlYQFRi6KMFdrRHf4QLzgWnA&s=10", price: "28 000 so'm", desc: "Pishloq qo'shilgan gamburger" },
      { name: "Spicy", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qzWYaNfoMVF2J0wuaxY5BgrVl3Ctbj4iPKFxnsWBww&s=10", price: "30 000 so'm", desc: "Achchiq sousli maxsus gamburger" }
    ]
  },

  {
    id: 27,
    name: "Hot-dog",
    category: "Fast food",
    image: "https://t4.ftcdn.net/jpg/02/59/44/43/360_F_259444335_mcn0zTJMCZqGRyG96XK5Xusf67LPpobR.jpg",
    available: true,
    info: "Kechki ovqat",
    description: "Yangi pishirilgan bulochkada sosiskali hot-dog",
    variants: [
      { name: "Classic", available: true, image: "https://imageproxy.wolt.com/assets/69fda4f44002f22c2d6f2260", price: "18 000 so'm", desc: "Klassik sosiskali hot-dog" },
      { name: "Cheese", available: true, image: "https://www.airfryeryum.com/wp-content/uploads/2024/01/IMG_5314.jpeg", price: "22 000 so'm", desc: "Pishloq sousli hot-dog" },
      { name: "Maxsus", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQmJpvzSEMsT7un4XbK7W2E-9qvu4ZTfZ4ZupnJiwWsE7QVVUtvQuzodZF&s=10", price: "28 000 so'm", desc: "Bekon va pishloqli maxsus hot-dog" }
    ]
  },

  {
    id: 28,
    name: "Pizza",
    category: "Fast food",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Av-140OjFu8V5QTQf05RFmGIAAW6jzVRgrZN4yC5Ee7sY7lQ8kfJNtc&s=10",
    available: true,
    info: "Kechki ovqat",
    description: "Italiya usulidagi pizza, mozzarella bilan",
    variants: [
      { name: "Margarita", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkpD80HEkCS6ndSfjYTjTtXbNP4Iw1zMq3IVWSH_L08lRZSfVH5rzW68Uo&s=10", price: "35 000 so'm", desc: "Pomidor, mozzarella va rayhonli klassik pizza" },
      { name: "Pepperoni", available: true, image: "https://everdure.com/cdn/shop/articles/20251209014056-pepperoni-20pizza_002-20copy_28a32c8a-603d-4739-bd36-00622caf95f1.jpg?v=1765251911", price: "40 000 so'm", desc: "Pepperoni kolbasali mazali pizza" },
      { name: "Four Cheese", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY70xmnaMn_tdAc592hoT8ey9rptRLIdpzLuH7Rjl4EYCD1JytJrsXlnw&s=10", price: "45 000 so'm", desc: "To'rt xil pishloq qo'shilgan pizza" },
      { name: "Vegetarian", available: true, image: "https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png", price: "38 000 so'm", desc: "Sabzavotli yengil pizza" },
      { name: "Gavayi", available: false, image: "https://pizzalarenzo.ru/wp-content/uploads/60010-460x345.png", price: "42 000 so'm", desc: "Ananas va tovuq go'shtli gavayi pizzasi" }
    ]
  },

  {
    id: 29,
    name: "Lavash",
    category: "Fast food",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfj8lVfYeCXteYd1kD4VIhroyyhNfHRfkbx9b9WWur6np4OR7RmNscY2s&s=10",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Go'shtli lavash, sabzavot va sous bilan",
    variants: [
      { name: "Tovuq go'shtli", available: true, image: "https://img.povar.ru/mobile/9a/53/53/8d/rulet_iz_lavasha_s_kuricei_i_sirom_v_duhovke-630048.jpg", price: "28 000 so'm", desc: "Tovuq go'shti va sabzavotli lavash" },
      { name: "Mol go'shtli", available: true, image: "https://i.ytimg.com/vi/TTnIPBOnpWk/maxresdefault.jpg", price: "32 000 so'm", desc: "Mol go'shti bilan to'ldirilgan lavash" },
      { name: "Sirli", available: true, image: "https://anor.menyuyim.uz/storage/menu/zVjgPajqIGutitvnYZ4YqwCqACObI6e4DVqXcFfh_1769008459.webp", price: "30 000 so'm", desc: "Pishloq qo'shilgan maxsus lavash" },
      { name: "Achchiq", available: false, image: "https://yukber.uz/image/cache/catalog/5d2b573693800082600ba728-600x600.jpg", price: "30 000 so'm", desc: "Achchiq sousli lavash" }
    ]
  },

  {
    id: 30,
    name: "Tovuq qanotchalari",
    category: "Fast food",
    image: "https://xabar.uz/static/crop/2/4/920__95_2465573437.jpg",
    available: true,
    info: "Kechki ovqat",
    description: "Qovurilgan tovuq qanotchalari, sous bilan",
    variants: [
      { name: "BBQ", available: true, image: "https://zira.uz/wp-content/uploads/2019/06/krilishki-kfc.jpg", price: "30 000 so'm", desc: "BBQ sousli tovuq qanotchalari" },
      { name: "Achchiq", available: true, image: "https://zira.uz/wp-content/uploads/2019/06/krilishki-kfc-2.jpg", price: "32 000 so'm", desc: "Achchiq chili sousli qanotchalar" },
      { name: "Teriyaki", available: false, image: "https://i.ytimg.com/vi/Z48tL3-E7RY/maxresdefault.jpg", price: "35 000 so'm", desc: "Yapon teriyaki sousli qanotchalar" }
    ]
  },

  {
    id: 31,
    name: "Doner",
    category: "Fast food",
    image: "https://static01.nyt.com/images/2025/12/22/multimedia/22FD-VIRAL-DONER-KEBABREX-KW-Viral-Doner-Kebab-lhzm/22FD-VIRAL-DONER-KEBABREX-KW-Viral-Doner-Kebab-lhzm-videoSixteenByNineJumbo1600.jpg",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Aylantirilgan go'shtli doner, non va salat bilan",
    variants: [
      { name: "Tovuq doner", available: true, image: "https://dirndlkitchen.com/wp-content/uploads/2017/07/doner-kebab-recipe-chicken-dirndl-kitchen12-1.jpeg", price: "28 000 so'm", desc: "Tovuq go'shtli doner" },
      { name: "Mol doner", available: true, image: "https://lesbonnesrecettes.fr/images/recettes-512/recette-authentique-et-savoureuse-de-doner-kebab-maison-1685.webp  ", price: "32 000 so'm", desc: "Mol go'shtidan tayyorlangan doner" },
      { name: "Pishloqli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnXnsHVgf7IRmIp8wkqWwMuCbpuXVdDE8nrmRtP7FCEj7P20FoV3Cv2A&s=10", price: "35 000 so'm", desc: "Pishloq qo'shilgan maxsus doner" }
    ]
  },

  {
    id: 32,
    name: "Sendvich",
    category: "Fast food",
    image: "https://www.scarlett.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/94d/63nbambahb4kf93sajkmh3plywb7ckhl/960_5000_1/recept_sengvichei_1.webp",
    available: true,
    info: "Nonushta va tushlik",
    description: "Turli xil sendvichlar, yangi non bilan",
    variants: [
      { name: "Classic", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL8mjZ2C17nB10JHHwdNIR5zSjqO3rTDgVfi0ujiFnyCd0TAEg_pjTdBdE&s=10", price: "18 000 so'm", desc: "Pishloq va kolbasali klassik sendvich" },
      { name: "Tovuqli", available: true, image: "https://zira.uz/wp-content/uploads/2017/10/club-sandvich.jpg", price: "22 000 so'm", desc: "Tovuq go'shtli sendvich" },
      { name: "Vegetarian", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLryyUVsXMgilii10kD9BLQPUwPFwLDnyxlSUaoCZH0NNzy40yMVjBofA&s=10", price: "20 000 so'm", desc: "Sabzavotli yengil sendvich" }
    ]
  },

  {
    id: 33,
    name: "Fri kartoshka",
    category: "Fast food",
    image: "https://cdn.delever.uz/delever/f27675fb-27e7-44ad-9378-ac22a2fdc55c",
    available: true,
    info: "Kun bo'yi",
    description: "Qovurilgan kartoshka, turli souslar bilan",
    variants: [
      { name: "Kichik", available: true, image: "https://images.gastronom.ru/tSxIVllpUnjyd-TGsDifUgJgVk_vYPB30K9ozaKtN_0/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzBkOGRjYzNlLWY5NDEtNDI5MS05MTM2LTNhN2VkOTA0NmFmMy5qcGc.webp", price: "10 000 so'm", desc: "Kichik porsiya fri kartoshka" },
      { name: "Katta", available: true, image: "https://e3.edimdoma.ru/data/recipes/0014/9279/149279-ed4_big_wide.jpg?1759118997", price: "16 000 so'm", desc: "Katta porsiya fri kartoshka" },
      { name: "Pishloqli", available: true, image: "https://cdn.delever.uz/delever/d35b96dc-8896-404d-ad06-88b723386d11", price: "20 000 so'm", desc: "Pishloq sousli fri kartoshka" }
    ]
  },

  {
    id: 34,
    name: "Sho'rvadon",
    category: "Fast food",
    image: "https://cdn-mamafatma.b-cdn.net/wp-content/uploads/2023/06/Ezogelin-Soup-Recipe-A-Hearty-and-Flavourful-Turkish-Classic-3.jpg",
    available: true,
    info: "Tushlik",
    description: "Tez tayyorlanadigan sho'rva, non bilan",
    variants: [
      { name: "Classic", available: true, image: "https://i.ytimg.com/vi/s75ccQEC_Fw/maxresdefault.jpg", price: "20 000 so'm", desc: "Klassik sho'rvadon" },
      { name: "Achchiq", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlTxFM-z69jcSd5_l4W7L1aeoshyQaz6v4Cs9eOkX6JtoSRedvV2F8i18I&s=10", price: "22 000 so'm", desc: "Achchiq sousli sho'rvadon" }
    ]
  },

  {
    id: 35,
    name: "Grech salati",
    category: "Salat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp7QqQM_mPkeO75UmSnfzh-DVe89rvcK9A1-2DPmULux2TTyMltrQyuzI&s=10",
    available: true,
    info: "Nonushta va tushlik",
    description: "Yangi sabzavotlar: pomidor, bodring, salat barglari",
    variants: [
      { name: "Klassik", available: true, image: "https://data.daryo.uz/media/cache/2022/04/photo_2022-04-02_23-38-55-1280x640.jpg", price: "18 000 so'm", desc: "Pomidor, bodring va piyozli klassik salat" },
      { name: "Piyozli", available: true, image: "https://cdn-storage-media.tass.ru/resize/688x456/tass_media/2025/11/24/v/1763990200512643_vWLLyTr7.jpg", price: "20 000 so'm", desc: "Ko'k piyoz qo'shilgan salat" },
      { name: "Limonli", available: true, image: "https://i.ytimg.com/vi/eFgAAzFGuZA/maxresdefault.jpg", price: "22 000 so'm", desc: "Limon sharbati bilan maxsus salat" },
      { name: "Pishloqli", available: false, image: "https://recfood.ru/wp-content/uploads/2025/01/orig-e1736454182636-1024x683.jpg", price: "25 000 so'm", desc: "Feta pishlog'i qo'shilgan salat" }
    ]
  },

  {
    id: 36,
    name: "Sezar salati",
    category: "Salat",
    image: "https://i.ytimg.com/vi/agaF2y-4PcU/maxresdefault.jpg",
    available: true,
    info: "Tushlik va kechki ovqat",
    description: "Tovuq go'shti, parmesan, kruton va Sezar sousi bilan",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFk6QLj3INnJ7XJ06wpdo9L5161sla6Lb1-B85boKoh9zF5jI_t5gEJBd&s=10", price: "28 000 so'm", desc: "Tovuq go'shti va parmesanli klassik Sezar" },
      { name: "Qisqichbaqa", available: true, image: "https://zira.uz/wp-content/uploads/2020/04/salat-cezar-2.jpg", price: "35 000 so'm", desc: "Qisqichbaqa go'shti qo'shilgan Sezar" },
      { name: "Vegetarian", available: false, image: "https://images.gastronom.ru/-UHzDgNx-m0MMa6OR0ilz2qP7MB0mKQeGceObc9jpck/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzVhNzFhZGY1LTM3MTYtNDlmMy04NDNlLTAwMTg4MGNiM2E0OS5qcGc.webp", price: "25 000 so'm", desc: "Go'shtsiz yengil Sezar varianti" }
    ]
  },

  {
    id: 37,
    name: "Achchiq-chuchuk",
    category: "Salat",
    image: "https://i.ytimg.com/vi/HRnDNoYSwCI/maxresdefault.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "An'anaviy o'zbek salati, pomidor va bodringdan",
    variants: [
      { name: "Oddiy", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6kJjNrECGz_5HS4RJG3qg-Clngrw6_ncMQ8Yeopd9aq83uR3yGNqqvo&s=10", price: "14 000 so'm", desc: "Pomidor va bodringli oddiy salat" },
      { name: "Maxsus", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUL2YNpJC9xOrYiBuaY3lUQhnj0-GgYTo0YoWhfHmPY6sd0GicnbcrYHM&s=10", price: "18 000 so'm", desc: "Piyoz va ko'kat qo'shilgan maxsus salat" }
    ]
  },

  {
    id: 38,
    name: "Mimoza",
    category: "Salat",
    image: "https://zira.uz/wp-content/uploads/2019/11/mimoza.jpg",
    available: true,
    info: "Tushlik",
    description: "Qatlamli salat, baliq va tuxum bilan",
    variants: [
      { name: "Klassik", available: true, image: "https://rutxt.ru/files/19263/final/aae4a3db7f.jpg", price: "22 000 so'm", desc: "Konserva baliqli an'anaviy mimoza" },
      { name: "Lososli", available: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfv6KXRrFneeSOPTdPcH8pG9kZ9wFeifF6RvejjmKmTg&s=10", price: "30 000 so'm", desc: "Losos balig'i bilan maxsus mimoza" }
    ]
  },

  {
    id: 39,
    name: "Olivier",
    category: "Salat",
    image: "https://img.magnific.com/free-photo/russian-salad-olivier-salad-christmas-dinner-marble-background_123827-23214.jpg",
    available: true,
    info: "Tushlik",
    description: "An'anaviy Olivier salati, go'sht va sabzavot bilan",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCClrWTG3yEpRYNd9yUcOauXL7LMN6EM0N16mn1rTOaYXtv1zxLWBE45xr&s=10", price: "20 000 so'm", desc: "Kolbasa va sabzavotli klassik olivier" },
      { name: "Tovuq go'shtli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkyjebaaSBA5PDr3ULS20G4B3YfvATPEndhlEVMGpWq2eYz_Yoe1Z2W8&s=10", price: "24 000 so'm", desc: "Tovuq go'shti bilan to'yimli olivier" }
    ]
  },

  {
    id: 40,
    name: "Sabzavotli salat",
    category: "Salat",
    image: "https://zira.uz/wp-content/uploads/2021/02/svezhiy-ovoshhnoy-salat.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "Mavsumiy sabzavotlardan tayyorlangan salat",
    variants: [
      { name: "Mavsumiy", available: true, image: "https://zira.uz/wp-content/uploads/2021/02/svezhiy-ovoshhnoy-salat-2.jpg", price: "16 000 so'm", desc: "Yangi mavsumiy sabzavotlardan salat" },
      { name: "Qizilcha salati", available: true, image: "https://www.gazeta.uz/media/img/2022/08/IDY5Ne16609729036531_l.jpg", price: "18 000 so'm", desc: "Qaynatilgan qizilcha va yong'oqli salat" }
    ]
  },

  {
    id: 41,
    name: "Ko'k choy",
    category: "Ichimliklar",
    image: "https://data.daryo.uz/media/2022/06/photo_2022-06-18_00-10-38.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "An'anaviy o'zbek ko'k choyi, kovruk bilan",
    variants: [
      { name: "Ko'k choy", available: true, image: "https://cdn.beta.qalampir.uz/uploads/Jg/f_1VCkNxmuHefOKHdYf23Tc4LTUBFxdO.jpg", price: "5 000 so'm", desc: "An'anaviy o'zbek ko'k choyi" },
      { name: "Qora choy", available: true, image: "https://xabar.uz/static/crop/8/2/920__95_820179681.jpg", price: "5 000 so'm", desc: "Issiq qora choy" },
      { name: "Limonli choy", available: true, image: "https://data.daryo.uz/media/2023/10/651f186ece54c.jpg", price: "7 000 so'm", desc: "Limon bilan tortiladigan choy" },
      { name: "Asalli choy", available: false, image: "https://zamin.uz/uploads/posts/2017-06/1496671754_asalli_suv.jpg", price: "10 000 so'm", desc: "Asal qo'shilgan maxsus choy" }
    ]
  },

  {
    id: 42,
    name: "Qahva",
    category: "Ichimliklar",
    image: "https://www.savol-javob.com/wp-content/uploads/2020/11/photo_2020-11-09_22-48-47.jpg",
    available: true,
    info: "Nonushta va kun bo'yi",
    description: "Italy usulidagi qahva turlari",
    variants: [
      { name: "Espresso", available: true, image: "https://chocolatebakery.uz/_next/image?url=https%3A%2F%2Fcdn.chocolatebakery.uz%2Fproducts%2F1_1763476382.webp&w=640&q=75", price: "12 000 so'm", desc: "Kuchli italyan espressosi" },
      { name: "Americano", available: true, image: "https://brot.ae/cdn/shop/files/Americano_Final.jpg?v=1745577975", price: "14 000 so'm", desc: "Suv qo'shilgan yengil americano" },
      { name: "Cappuccino", available: true, image: "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg", price: "18 000 so'm", desc: "Sutli ko'pikli cappuccino" },
      { name: "Latte", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjNIBJd6EdxWzh_akdT1SUccCI4TK5QiQnAk6JUXLxMw&s=10", price: "20 000 so'm", desc: "Yumshoq sutli latte" },
      { name: "Mocha", available: false, image: "https://138113078.cdn6.editmysite.com/uploads/1/3/8/1/138113078/5RCB7A7HHH2BFEWRU7TPQZ6A.jpeg", price: "22 000 so'm", desc: "Shokoladli mocha qahvasi" }
    ]
  },

  {
    id: 43,
    name: "Sharbat",
    category: "Ichimliklar",
    image: "https://data.daryo.uz/media/cache/2017/02/soki-600x407-600x407.jpeg",
    available: true,
    info: "Kun bo'yi",
    description: "Tabiiy meva sharbati, mavsumiy mevalardan",
    variants: [
      { name: "Apelsin", available: true, image: "https://hoteljaascontinental.com/wp-content/uploads/2024/02/orange-juice.png", price: "12 000 so'm", desc: "Yangi siqilgan apelsin sharbati" },
      { name: "Olma", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiviGhFiyRv4ceDdgzLfh81FQnlcn4qhO8QVXOiRRm-Kow5SFQUK1HsJg&s=10", price: "10 000 so'm", desc: "Tabiiy olma sharbati" },
      { name: "Anor", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjALBskrtiY0ZLGKQXpUtUsjYPosCbU_CP31vVM_VQQ&s=10", price: "15 000 so'm", desc: "Anor sharbati, boy vitamin manbai" },
      { name: "Shaftoli", available: false, image: "https://healthy-food-near-me.com/wp-content/uploads/2020/10/apricot-juice-1.webp", price: "14 000 so'm", desc: "Shaftoli sharbati, mavsumiy" }
    ]
  },

  {
    id: 44,
    name: "Mineral suv",
    category: "Ichimliklar",
    image: "https://hydrolife.uz/thumb/2/5l0bus2i0AHVl6hiH4dJJw/r/d/geo_2.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "Gazli va gazsiz mineral suv",
    variants: [
      { name: "Gazli", available: true, image: "https://www.freshdirect.com/blog/wp-content/uploads/2017/03/sparkling-water.jpg", price: "4 000 so'm", desc: "Gazlangan mineral suv" },
      { name: "Gazsiz", available: true, image: "https://healthy-food-near-me.com/wp-content/uploads/2020/10/unnamed-1-17.webp", price: "4 000 so'm", desc: "Gazsiz toza mineral suv" }
    ]
  },

  {
    id: 45,
    name: "Limonad",
    category: "Ichimliklar",
    image: "https://zira.uz/wp-content/uploads/2023/08/arbuznyy-limonad.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "Uy usulida tayyorlangan limonad",
    variants: [
      { name: "Klassik", available: true, image: "https://img.povar.ru/mobile/a5/5b/48/00/ogurechnii_sok-586434.jpg", price: "10 000 so'm", desc: "Limon va yalpizli klassik limonad" },
      { name: "Mevali", available: true, image: "https://s0.rbk.ru/v6_top_pics/media/img/4/71/346820739329714.webp", price: "12 000 so'm", desc: "Mavsumiy mevali limonad" }
    ]
  },

  {
    id: 46,
    name: "Kompot",
    category: "Ichimliklar",
    image: "https://static1.squarespace.com/static/52f44413e4b0a2718e43e0f9/t/5990c886a803bb5b7c888994/1502682656544/?format=1500w",
    available: true,
    info: "Kun bo'yi",
    description: "Uy usulida tayyorlangan meva kompoti",
    variants: [
      { name: "Olma kompot", available: true, image: "https://poprostupycha.com.pl/wp-content/uploads/2022/07/kompot_3.jpg", price: "7 000 so'm", desc: "Olma qo'shilgan kompot" },
      { name: "Mevali kompot", available: true, image: "https://img.povar.ru/mobile/81/9a/51/c6/letnii_kompot_iz_vishni-871487.jpg", price: "8 000 so'm", desc: "Turli mevalardan tayyorlangan kompot" }
    ]
  },

  {
    id: 47,
    name: "Ayron",
    category: "Ichimliklar",
    image: "https://zira.uz/wp-content/uploads/2018/05/ayran-1.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "Qatiqdan tayyorlangan an'anaviy ichimlik",
    variants: [
      { name: "Oddiy", available: true, image: "https://i.ytimg.com/vi/VCk5ibyka-A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDUE3-0W8mRS9WhoFdTrQnStGKOvg ", price: "6 000 so'm", desc: "An'anaviy ayron" },
      { name: "Yalpizli", available: true, image: "https://zira.uz/wp-content/uploads/2018/05/ayran-2.jpg", price: "8 000 so'm", desc: "Yalpiz qo'shilgan maxsus ayron" }
    ]
  },

  {
    id: 48,
    name: "Sok (Sharbat)",
    category: "Ichimliklar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFuCDMh6EMTX-e2hefrMiHOYPfwVbdzSOQoBKNZk1zpboM8d6pqP8I5g&s=10",
    available: true,
    info: "Kun bo'yi",
    description: "Turli xil sharbat va soklar",
    variants: [
      { name: "Olma sok", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzKIULQvzLVhLLBw43P6Nk68dWNiKIHMDbeAyILvTyg&s", price: "8 000 so'm", desc: "Tabiiy olma sok" },
      { name: "Apelsin sok", available: true, image: "https://foto.vsesoki.ru/files/1/7864/17227448/original/apelsinovy_sok.jpg", price: "10 000 so'm", desc: "Apelsin sok" },
      { name: "Multimevali", available: false, image: "https://admin.golos.ua/images/2022/01/sok-fresh-1.jpg", price: "12 000 so'm", desc: "Turli mevalar aralashmasi" }
    ]
  },

  {
    id: 49,
    name: "Medovik",
    category: "Shirinliklar",
    image: "https://cdn.kisikatesakademi.com.tr/image-cache/cache/recipe_main_image_large/https---cdn.kisikatesakademi.com.tr/recipe-media/81d9395c95dfd12101f5b6ec7ef5595846be54c0.jpeg.webp",
    available: true,
    info: "Shirinlik",
    description: "Asal qatlamli an'anaviy tort",
    variants: [
      { name: "Klassik", available: true, image: "https://i.ytimg.com/vi/49sk6wg8pLc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSXsOwdfg3YYhskhMvDxOfDzG8fg", price: "25 000 so'm", desc: "Asal qatlamli klassik medovik" },
      { name: "Yong'oqli", available: true, image: "https://safiabakery.uz/_next/image?url=https%3A%2F%2Fweb.safiadelivery.com%2Fapi%2Fimage%2F31bd25f2-307f-4ebe-bc90-c4610a93cde5.jpg&w=3840&q=90", price: "30 000 so'm", desc: "Yong'oq qo'shilgan medovik" },
      { name: "Shokoladli", available: false, image: "https://i.ytimg.com/vi/kCHb5GMwHSs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDJQ8VJf4hsE5Gm_cU0DeqByduI7A", price: "35 000 so'm", desc: "Shokolad qo'shilgan maxsus medovik" }
    ]
  },

  {
    id: 50,
    name: "Napaleon",
    category: "Shirinliklar",
    image: "https://images.gastronom.ru/-7mpqmrplM5yeQqJxGSnJK5TlWCA1Ic8c2k-f7TsWhA/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzVmMGUyYzliLWM1N2QtNDFkMy1hNTIwLTcyMDBiYTM5M2YzNy5qcGc.webp",
    available: true,
    info: "Shirinlik",
    description: "Qatma qatlamli an'anaviy tort",
    variants: [
      { name: "Klassik", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFs2xwve7RaeDs-jPkR4IQpMMVvkXaqwecfqRNp0q5qQ&s=10", price: "28 000 so'm", desc: "Qatma qatlamli klassik napaleon" },
      { name: "Mevali", available: true, image: "https://i.ytimg.com/vi/F5wDzNda6Js/maxresdefault.jpg", price: "32 000 so'm", desc: "Meva qo'shilgan napaleon" }
    ]
  },

  {
    id: 51,
    name: "Muzqaymoq",
    category: "Shirinliklar",
    image: "https://odam.uz/public/upload/media/entries/2019-07/01/1937-19-828d744411b4b0d2c31503fc082ce6b1.jpg",
    available: true,
    info: "Kun bo'yi",
    description: "Turli xil muzqaymoq turlari",
    variants: [
      { name: "Vanilli", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzDQPO71urqQXidBP7vbNQyxWkkGR5ZU-VkMclK7k8PxJKmgPbS7szP2KU&s=10", price: "12 000 so'm", desc: "Yumshoq vanilli muzqaymoq" },
      { name: "Shokoladli", available: true, image: "https://i.ytimg.com/vi/qeTvmp1cgME/sddefault.jpg", price: "14 000 so'm", desc: "Shokoladli muzqaymoq" },
      { name: "Qulupnayli", available: true, image: "https://www.gazeta.uz/media/img/2023/05/773czt16833426660670_l.jpg", price: "14 000 so'm", desc: "Qulupnayli mevali muzqaymoq" },
      { name: "Pista", available: false, image: "https://aclassictwist.com/wp-content/uploads/2025/05/No-Churn-Pistachio-Ice-Cream-13-720x540.jpg", price: "18 000 so'm", desc: "Pista yong'og'i qo'shilgan maxsus muzqaymoq" }
    ]
  },

  {
    id: 52,
    name: "Chak-chak",
    category: "Shirinliklar",
    image: "https://media.istockphoto.com/id/1170819649/sv/foto/chak-chak-med-honung.jpg?s=170667a&w=0&k=20&c=MmAMHC013xa8THlL_W5mF9U2KfkjOBB_4kePiU5yr4A=",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy tatar shirinligi, asal bilan",
    variants: [
      { name: "Asalli", available: true, image: "https://t4.ftcdn.net/jpg/02/84/77/45/360_F_284774558_T5W33si0MM9mcW7z7zseTPKyccrekB53.jpg", price: "22 000 so'm", desc: "Asal bilan tayyorlangan an'anaviy chak-chak" },
      { name: "Yong'oqli", available: true, image: "https://zira.uz/wp-content/uploads/2018/03/chak-chak-3.jpg", price: "26 000 so'm", desc: "Yong'oq qo'shilgan chak-chak" }
    ]
  },

  {
    id: 53,
    name: "Holva",
    category: "Shirinliklar",
    image: "https://data.daryo.uz/media/2024/02/27/widen_960_crop_1060_707_0_0_q90_2038732_4ad1026d85378401c20a1cec0-ap4_kIfE.webp  ",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy halva, kunjut va yong'oq bilan",
    variants: [
      { name: "Kunjutli", available: true, image: "https://healthy-food-near-me.com/wp-content/uploads/2022/07/halva-benefits-and-harms-to-the-body.webp", price: "18 000 so'm", desc: "Kunjutdan tayyorlangan klassik halva" },
      { name: "Yong'oqli", available: true, image: "https://i.ytimg.com/vi/odghQGQuCBs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAkfRSFfhNKarEUxfwEAYQNBB6iTw", price: "22 000 so'm", desc: "Yong'oq qo'shilgan maxsus halva" }
    ]
  },

  {
    id: 54,
    name: "Parvarda",
    category: "Shirinliklar",
    image: "https://data.daryo.uz/media/cache/2021/03/photo_2021-03-31_15-06-51-680x398-680x398.jpg",
    available: true,
    info: "Shirinlik",
    description: "An'anaviy o'zbek konfeti, shakar va yong'oqdan",
    variants: [
      { name: "Klassik", available: true, image: "https://thumbs.dreamstime.com/b/traditional-parvarda-candy-central-asian-cuisine-traditional-parvarda-candy-served-edible-pastry-bowl-popular-central-461096150.jpg", price: "15 000 so'm", desc: "Shakar va yong'oqdan klassik parvarda" },
      { name: "Kunjutli", available: false, image: "https://cdn-img.birbir.uz/i/800x800-fit/files/57/7c/0608e7a13890942ee7a62ff04aaa.jpg", price: "18 000 so'm", desc: "Kunjut qo'shilgan parvarda" }
    ]
  },

  {
    id: 55,
    name: "Sumalak",
    category: "Shirinliklar",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Samanu_for_7_sin.jpg",
    available: true,
    info: "Mavsumiy (Navro'z)",
    description: "Bug'doydan tayyorlanadigan an'anaviy shirinlik",
    variants: [
      { name: "Traditsion", available: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZpa8V5QPXByKOW84EF8ZNFf9Nqqoc2YBNNvxXhgE-rnSkt95euhCnOk&s=10", price: "20 000 so'm", desc: "An'anaviy usulda tayyorlangan sumalak" },
      { name: "Yong'oqli", available: false, image: "https://135732222.cdn6.editmysite.com/uploads/1/3/5/7/135732222/YK2TJ4DHZ6DJ45FS6ECW5LND.png", price: "25 000 so'm", desc: "Yong'oq qo'shilgan sumalak" }
    ]
  }
]

export const menuCategories = ["Barchasi", "Milliy taomlar", "Fast food", "Salat", "Ichimliklar", "Shirinliklar"]
