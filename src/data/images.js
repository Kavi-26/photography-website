import media from './media.json';

const CDN = 'https://images-pw.pixieset.com';

export const logo = `${CDN}/profile/009592/54da8a3d26f61f3c2b3c7efa26b9711e415224f5526ad813ec7d9e4cc1740723.png`;

export function uniquePhotos(urls = []) {
  const map = new Map();
  urls.forEach((url) => {
    const file = url.split('/').pop();
    const match = file.match(/^(.*)-[0-9a-f]{6,}-(\d{3,4})\./i);
    const key = match ? match[1] : file;
    const size = match ? Number(match[2]) : 0;
    const prev = map.get(key);
    if (!prev || size > prev.size) map.set(key, { url, size });
  });
  return [...map.values()].map((item) => item.url);
}

export const home = {
  slides: [
    {
      image: `${CDN}/elementfield/930439963/NIR00245-42f23134-2500.jpg`,
      position: '80% 7%',
      subtitle: 'Pre Wedding / Engagement Shots',
      title: 'Photography for Adventurous Souls & Rebels at Heart',
      cta: 'Discover More',
      to: '/portfolio',
    },
    {
      image: `${CDN}/elementfield/3KVwX4b/untitled-825a-4e1b4c29-2500.jpg`,
      position: '50% 50%',
      subtitle: 'Reception Portraits',
      title: 'Eternal Embrace...',
      cta: 'read more',
      to: '/weddings',
    },
    {
      image: `${CDN}/elementfield/447149963/NIR02301-9eb7cd55-2500.jpg`,
      position: '50% 50%',
      subtitle: '"Two souls, Two garlands, One promise — a moment frozen in love and tradition."',
      title: '',
      cta: null,
      to: null,
    },
  ],
  reasons: `${CDN}/elementfield/wRwk71E/DSC00298-6711b789-1500.jpg`,
  love: `${CDN}/elementfield/787339963/c3050a022f170b678aee718d12ea6b41-f538cfbe-2500.jpg`,
  stories: [
    `${CDN}/elementfield/409339963/MAN00644-072ee881-2500.jpg`,
    `${CDN}/elementfield/409339963/MAN00233-62819a04-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/5A1A6721-0d7e0cfb-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/028A0192-4c0a8cb9-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/028A0169-Edit-bebd0e4a-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/MAN00040-45acf169-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/MAN00207-58755676-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/SBM04621-0ab6774d-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/_DSC3313-14819235-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/_DSC3778_a-dfc1beb6-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/MAN01218-8d441ee0-2500.jpg`,
    `${CDN}/elementfield/6xm9XnO/abisha02-3-f458a355-2500.jpg`,
    `${CDN}/elementfield/409339963/bbc6f29e0faf4312fdc1854ec0575eb5-3212612b-2500.jpg`,
    `${CDN}/elementfield/409339963/NIR00694-2a81ccdd-2500.jpg`,
    `${CDN}/elementfield/409339963/53bd6702406087a367287755c0a9e729-c0a5e3d8-2500.jpg`,
  ],
  about: `${CDN}/elementfield/5EzLXyo/Viyal-222-ac569584-2500.jpg`,
  testimonials: [
    {
      name: 'Abi & Vino',
      image: `${CDN}/elementfield/QXdwllO/NIR00224-7a994ae9-1500.jpg`,
      text: 'We had an amazing experience with Kharthik & his team! He was friendly, prompt, and incredibly creative, making us feel at ease while capturing stunning, timeless portraits. His professionalism and artistic style are outstanding, and we’d love to work with him again. Highly recommend!',
    },
    {
      name: 'Arshad & Nyla',
      image: `${CDN}/elementfield/84VmXXZ/Arshadxnyla647of886-a41d8d8a-1500.jpg`,
      text: 'We are so grateful to have had Kharthik as our wedding photographer! From start to finish, he was an absolute professional—creative, patient, and incredibly talented. He made us feel comfortable and kept us in the flow, ensuring every moment was captured naturally and beautifully.\n\nNot only did he deliver our photos on time, but he also went above and beyond to accommodate all our requests, including those from our loved ones. He even stayed beyond his scheduled timeline to make sure nothing was missed.',
    },
    {
      name: 'Deepthi Saravanan',
      image: `${CDN}/elementfield/WKLOWW1/_DSC3750a-33f24625-1500.jpg`,
      text: 'I recently had my headshots done by Kharthik & his team, and I couldn’t be happier with the experience! He was swift, incredibly creative, and insanely professional. His use of color tones and overall style really stood out to me—it’s exactly what I was looking for.\n\nHe delivered the final photos on time, and the quality was exceptional. I’m so glad I utilized his services and would highly recommend him to anyone. Also, I found the name of his company really interesting—definitely ask him about it!',
    },
  ],
  banner: `${CDN}/elementfield/QXdwlbE/776A7603-fb8e3aae-2500.jpg`,
};

export const aboutImages = {
  portrait: `${CDN}/elementfield/796339963/Editedset-136-3e6232e2-1500.jpg`,
  curve: '/photos/About/info-a-vector.svg',
  team: [
    `${CDN}/site/2WK5qa/vqjX31/KAR08914-c3c49129-2500.jpg`,
    `${CDN}/site/2WK5qa/rq1oY3/WhatsAppImage2025-03-21at12.17.42-f1f9bebb-2500.jpeg`,
    `${CDN}/site/2WK5qa/vqjX1k/MAN00392-2e7a671a-2500.jpg`,
    `${CDN}/site/2WK5qa/vqjwxb/PHOTO-2020-08-10-11-36-39-9105c86f-2500.jpg`,
  ],
  cta: `${CDN}/elementfield/459339963/Editedset-211ab-df0f4b31-2500.jpg`,
};

export const portfolioBanner = `${CDN}/elementfield/84VmXLy/KAR06537-17323277-2500.jpg`;
export const couplesBanner = `${CDN}/elementfield/3KVwXyd/NIR00854-e887567e-2500.jpg`;
export const seaCta = 'https://assets-pw.pixieset.com/classic-themes/theme-images/sample_photos/theme_8_7f209e50_XL.jpg';

export const portfolioCards = [
  {
    title: 'WEDDINGS',
    subtitle: 'Timeless moments, Forever memories',
    to: '/weddings',
    image: `${CDN}/elementfield/vwVzMz3/NIR01471-0e5c8c73-2500.jpg`,
  },
  {
    title: 'PREWEDDING/ COUPLE PORTRAITS',
    subtitle: 'Capturing love & Connection',
    to: '/couples',
    image: `${CDN}/elementfield/VKAm7mJ/20170107-_76A9073-b9c9cc94-2500.jpg`,
  },
  {
    title: 'FOOD PHOTOGRAPHY',
    subtitle: 'Savour the Art of culinary storytelling',
    to: '/elopements',
    image: `${CDN}/elementfield/mW4YqYJ/MAN00101a-86a5ad8d-2500.jpg`,
  },
  {
    title: 'EQUESTRIAN',
    subtitle: 'SPORTS PHOTOGRAPHY',
    to: '/adventure',
    position: '51% 38%',
    image: `${CDN}/elementfield/bk0393M/KAR01484a-4209dd26-2500.jpg`,
  },
  {
    title: 'CORPORATE HEADSHOTS',
    subtitle: 'Your face is your brand. Let’s make it unforgettable',
    to: '/contact',
    image: `${CDN}/elementfield/ovbYybO/MAN00527b-d8f1e619-2500.jpg`,
  },
];

const investmentPhotos = uniquePhotos(media.investment);
const experiencePhotos = uniquePhotos(media.experience);
const contactPhotos = uniquePhotos(media.contact);

export const galleries = {
  couples: {
    banner: uniquePhotos(media.couples)[0],
    images: uniquePhotos(media.couples).slice(1),
  },
  weddings: {
    banner: uniquePhotos(media.weddings)[0],
    images: uniquePhotos(media.weddings).slice(1),
  },
  food: uniquePhotos(media.elopements),
  adventure: uniquePhotos(media.adventure),
  investment: investmentPhotos,
  experience: experiencePhotos,
  contact: contactPhotos,
};

export const blogCover = `${CDN}/page/77JXkG/POSTER-TITLEDBEACH-0a0fd348-2500.jpg`;
export const blogHero = `${CDN}/page/77JXkG/POSTER-TITLEDBEACH-3aa035c5-1500.jpg`;
export const blogCompare = [
  `${CDN}/elementfield/vXbJQlb/POSTER-TITLEDBEACHcopy1-aebd3f9b-1500.png`,
  `${CDN}/elementfield/wXpbaDX/INSPITRATION-poster-95ecfee0-1500.png`,
];
