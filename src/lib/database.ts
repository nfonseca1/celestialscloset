export interface IListing {
    id: number,
    title: string,
    price: number,
    photos: {
        link: string,
        crop?: {
            x: number,
            y: number
        }
    }[]
}

export interface IProduct extends IListing {
    description: string,
    stones: string[],
    chakras: string[],
    benefits: string[]
}

export function getAllListings(): IListing[] {
    return data.map(d => {
        return {
            id: d.id,
            title: d.title,
            price: d.price,
            photos: d.photos
        }
    })
}

export function getProductById(id: number) {
    return data.find(d => d.id === id);
}


const data = [
    {
        id: 1,
        title: 'Sunshine Aura Pendant',
        description: 'This super simple piece is a sunshine aura quartz this crystal is know for raising your vibrations, bring happiness and joy into your life, and helps to change your perseption of the world to a much positive mindset. This crystal brings you nothing but good, pure energy.',
        price: 8,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/166653757_858535991544354_104385706680929035_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=nV6QJg3mAxQAX8lzK5j&ccb=7-4&oh=579dfd78cefaa5e8828b44cec3eb745a&oe=608A3FB2&_nc_sid=4f375e',
            crop: { x: 50, y: 25 }
        }],
        stones: ['Sunshine Aura Quartz'],
        chakras: ['Solar Plexus'],
        benefits: ['Positivity', 'Joyfulness', 'Energetic']
    },
    {
        id: 2,
        title: 'Angel Aura Quartz Pendant',
        description: 'This simple piece is an angel aura quartz. This quartz is great for bringing serenity, inner peace, giving you mental clarity. This crystal has so many more benefits that help you not only with peace, but also on emotional, physical, mental, and spiritual level :) I’m selling this simple, but staple piece for around 7 dollars!!',
        price: 7,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165742995_929059237896108_3118265944846753854_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=UC_-6-fvaNkAX_Uz3-Q&ccb=7-4&oh=77f7a73557fe1e683c75a7c3a01e18c6&oe=608A601B&_nc_sid=4f375e',
            crop: { x: 100, y: 85 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165785772_1817448081792203_3589824587177032243_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=KqfYN2eyCbMAX-wgPkO&ccb=7-4&oh=0ed404bb2ef6928d9994c7d340e6f260&oe=608B7AF0&_nc_sid=4f375e',
            crop: { x: 50, y: 100 }
        },
        ],
        stones: ['Angel Aura Quartz'],
        chakras: ['Crown', 'Heart'],
        benefits: ['Serenity', 'Mental Clarity']
    },
    {
        id: 3,
        title: 'Sunshine Plate Pendant',
        description: 'This little piece is made of sunshine aura quartz which is amazing for raising your vibrations to bring joy into your life, and help you view the world with a much brighter and positive mindset i paired the quartz with a piece of citrine at the top to elevate the feeling of joy while wearing it and citrine is also is known for being abundance in once’s life. This is a great piece to wear while manifesting!!!',
        price: 12,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165447422_241753711008186_1257834783004277144_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Hf3IuUXPMlAAX-m_Nnc&ccb=7-4&oh=08ebea2d25766c26d20d4b1eb8c09baf&oe=608C1FB9&_nc_sid=4f375e',
            crop: { x: 50, y: 10 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165391678_2737612959789038_8852573143912705694_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ya7mR37zJYEAX_TCSQe&ccb=7-4&oh=579ca6bf453d094390d95b243fdf037d&oe=608B3F2D&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165260618_914938882588712_5319791210302030460_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=ln5Fmv8T5WwAX8P9mWi&ccb=7-4&oh=e997b4e1f305210ee0973155abb81a94&oe=608C0B24&_nc_sid=4f375e',
        }],
        stones: ['Sunshine Aura Quartz'],
        chakras: ['Solar Plexus'],
        benefits: ['Positivity', 'Joyfulness', 'Energetic']
    },
    {
        id: 4,
        title: 'Cluster Necklace',
        description: 'This beautiful necklace is made with two rose quartz, a piece of citrine, and a pice of turquoise. This necklace becuase of the three different crystals holds many benefits rose quartz will help to aid in healing your heart chakra, learning to love selflessly, and working with your own self love. The citrine is a perfect mix because it helps it encourages self expression, creativity, balances you emotionally, releases things like fears, negativity, phobias, and revitalizes your concentration and mind. Lastly turquoise perfectly fingers off the trio because it’s known for promoting self realization, aligns all chakras to creat balance, It also like citrine aids in depression, and helps to aid/stop panic attacks and anxiety. This trio of crystals is super powerful and amazing for people who are feeling down and a little lost lately :)',
        price: 10,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165597742_821408795254842_6332792994757587918_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=rQoIHpbZlxUAX9cJY8H&ccb=7-4&oh=916e8f2f78327ed5bfc0948d5df80e3d&oe=608CD29E&_nc_sid=4f375e',
            crop: { x: 50, y: 10 }

        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165298591_460550268697260_1368507050663560172_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=U_pjAUIurZcAX-FhTWW&ccb=7-4&oh=444b233175bf7f0df97ce7609f547113&oe=608A686C&_nc_sid=4f375e'
        }],
        stones: ['Rose Quartz', 'Citrine', 'Turquoise'],
        chakras: ['Crown', 'Third Eye', 'Throat', 'Heart', 'Solar Plexus', 'Sacral'],
        benefits: ['Confidence', 'Joyfulness', 'Creativity', 'Self Love']
    },
    {
        id: 5,
        title: 'Purple Spirit Pendant',
        description: 'this is a purple spirit aura quartz paired with a little silver butterfly this crystal is great for not only the crown but also the third eye chakra, it helps reduce anxiety, it helps aid you in prayer and meditation to bring you closer to the divine/source, assists with connection and communications to the higher realms and your spider guides, and it transmits an overall extremely healing light this is a very beautiful as powerful piece.',
        price: 10,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165237978_498299247875810_4945384809123738565_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=oXLlWl_sPjcAX9I8ndI&ccb=7-4&oh=686d95647f43feb8a26a64dc0f1d4640&oe=608C7C70&_nc_sid=4f375e',
            crop: { x: 30, y: 100 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165330740_839795179937152_7298142602470413828_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=4_GT1L-8NxcAX_hjBeC&ccb=7-4&oh=547ca7327dc17072d8dc6cdf8b8be61d&oe=608C0151&_nc_sid=4f375e',
            crop: { x: 50, y: 100 }
        }],
        stones: ['Spirit Quartz'],
        chakras: ['Crown', 'Third Eye'],
        benefits: ['Harmony', 'Spiritual Growth']
    },
    {
        id: 6,
        title: 'Midnight Love Pendant',
        description: 'This is a beautiful pink aura quartz paired with a moon and heart charm this is a great crystal for working with the heart chakra, supporting you through your self love journey, helps to align you with your souls purpose, it helps you gain a new perspective on yourself and others, it’s very uplifting but not in a very overwhelming way... it’s great for gently pushing you into a person that you love entirely :)',
        price: 12,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165181667_1115945638922732_7099065110232039433_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=TmKXMvq2Km4AX-egE_t&ccb=7-4&oh=cbeff5efce781729c048c029b044395d&oe=608B98E2&_nc_sid=4f375e',
            crop: { x: 50, y: 100 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/164813892_346888776760981_1683883769890018351_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=Pwyddv7lf-cAX_VyOIK&ccb=7-4&oh=c381d720e07159ba0f590cb4f7ae54e4&oe=608BB3DD&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165307315_893496284834115_5010950973155102212_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=1b0SJPD1DlUAX_nJtSK&ccb=7-4&oh=225b9166cbe9b5977588ed914f6c46f3&oe=608C005C&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165677017_879633842610928_6297250392219775008_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=bwXu7d63Er0AX-_Bixw&ccb=7-4&oh=ccc575b6f73bb451940629b085b37be1&oe=608D3A9A&_nc_sid=4f375e'
        }],
        stones: ['Pink Aura Quartz'],
        chakras: ['Third Eye', 'Heart'],
        benefits: ['Self Love', 'Healing', 'Spiritual Growth']
    },
    {
        id: 7,
        title: 'Aqua Aura Pendant',
        description: 'Aqua aura quartz🥰🥰🥰 This crystal is great for processing grief, trauma, stress, and is used by healers to calm but only others emotions but they’re body as well :)',
        price: 10,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/166196764_1342999602743633_2074961832930189710_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=6PZuQsym1R4AX-GULvK&ccb=7-4&oh=a376b72835f131c9aef26698eaa630f6&oe=608DA1D7&_nc_sid=4f375e',
            crop: { x: 50, y: 15 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165530622_443854543547272_4621298107297583528_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=JIRGiXr-tdgAX9LJHAw&ccb=7-4&oh=9bee18b92caef6224d2d9bf88a58d370&oe=608B9455&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165222051_163235582320091_8543395598630114072_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=juSGkXLJ5UEAX_651hf&ccb=7-4&oh=b8ec420639a8f951eaa730d575c76251&oe=608BEF2B&_nc_sid=4f375e'
        }],
        stones: ['Aqua Aura Quartz'],
        chakras: ['Crown', 'Throat'],
        benefits: ['Anxiety Relief', 'Honesty', 'Calmness']
    },
    {
        id: 8,
        title: 'Black Obsidian Necklace',
        description: 'Black obsidian 😍 this crystal is great for absorbing negative energy, doing shadow work, reduces stress/tension, holds a strong psychic protection and so many other amazing healing properties :)))',
        price: 11,
        photos: [{
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165306773_483407909456567_6351296638374428636_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=8E5GsLlPKXUAX_YFmtp&ccb=7-4&oh=9f0894dc84eaff9bb67554b33a698d2f&oe=608CF78B&_nc_sid=4f375e',
            crop: { x: 50, y: 75 }
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165247476_498057781227347_5470345189005099720_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=maiqNKBKu2AAX_f_89r&ccb=7-4&oh=94ac3f50f6a16eff6b6361f37ccbee09&oe=608CDD55&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/165552603_931461847423732_3076912775615371546_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=vgRBR0WUgkAAX_Z6zeX&ccb=7-4&oh=a00e2894ccf5300a9a21076db24a8780&oe=608A7D54&_nc_sid=4f375e'
        },
        {
            link: 'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/164966148_274186684361786_8565842097071965462_n.jpg?tp=1&_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=vzcarPoHmI0AX-U3ssb&ccb=7-4&oh=9404376ffae599816870697786fe38cf&oe=608B78B6&_nc_sid=4f375e'
        }],
        stones: ['Obsidian'],
        chakras: ['Sacral', 'Root'],
        benefits: ['Energy Clearing', 'Shadow Work', 'Anxiety Relief']
    }
]