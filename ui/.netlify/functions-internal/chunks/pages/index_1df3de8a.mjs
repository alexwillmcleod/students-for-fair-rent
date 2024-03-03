/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Image, a as $$Layout } from './404_3afe2bb5.mjs';

const $$Astro$1 = createAstro();
const $$ArticleCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArticleCard;
  let imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tsamgt.com%2Fwp-content%2Fuploads%2FWPH_AKL_Waiparuru-Hall.jpg&f=1&nofb=1&ipt=f655de7e029eb381f77be73739ea8308d1bb237058cd1e363be2e1647f658f59&ipo=images";
  const { title, subtitle, url, pubDate, image } = Astro2.props;
  const date = new Date(pubDate).toDateString();
  if (image != void 0 && image.url != void 0) {
    imageUrl = image.url;
  }
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block w-96"> <a${addAttribute(url, "href")} class="relative flex flex-col justify-end min-w-[96] w-96 h-64 rounded-xl shadow-xl backdrop-blur-xs p-4"> <!-- Background Image --> <div class="absolute rounded-xl inset-0 bg-cover bg-center"${addAttribute(`background-image: url(${imageUrl})`, "style")}></div> <!-- Gradient Overlay --> <div class="absolute rounded-xl inset-0 bg-gradient-to-b from-transparent to-gray-900"></div> <h2 class="relative text-xl text-white font-bold">${title}</h2> <p class="relative text-white">${subtitle}</p> <p class="relative text-white ">${date}</p> </a> </div>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/molecules/article-card.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./posts/akl-uni-students-slam-rent-hike.mdx": () => import('./akl-uni-students-slam-rent-hike_a7873786.mjs'),"./posts/auckland-central-candidates-back-students-rent-hike-campaign.mdx": () => import('./auckland-central-candidates-back-students-rent-hike-campaign_b0fb64e2.mjs'),"./posts/university-of-auckland-students-launch-campaign-against-campus-rent-hike.mdx": () => import('./university-of-auckland-students-launch-campaign-against-campus-rent-hike_38d8bea6.mjs')}), () => "../pages/posts/*.md*");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-4 pt-4 pb-12"> <div class="hero"> <div class="hero-content flex-col justify-center lg:flex-row gap-10 lg:gap-12 w-full p-12"> <div class="rounded-xl w-full gap-12 p-12 md:gap-0 md:h-96 flex flex-col md:flex-row justify-around" style="background-image: url('/strike-gradient.png');"> <div class="flex flex-col gap-4 justify-center items-center"> <img class="w-32" src="/sfr-dark.png"> <h1 class="font-strike text-white text-5xl text-center">Strike for<br> Fair Rent</h1> </div> <div class="flex flex-col justify-center items-center gap-8"> <div> <h4 class="font-sans text-white text-2xl text-center">We are striking against</h4> <h3 class="font-strike text-white text-3xl text-center">Waipapa Taumata Rau</h3> <h4 class="font-sans text-white text-2xl text-center">for fair rent now!</h4> </div> <a href="/strike" class="bg-[#e1e1e1] p-8  rounded-xl font-strike text-4xl text-[#272627] shadow-xl">Pledge</a> </div> </div> </div> </div> <div id="why" class="hero"> <div class="hero-content flex-col justify-center items-start text-left w-full p-8"> <h3 class="text-lg sm:text-3xl font-bold font-display">Our Why</h3> <p class="text-lg sm:text-2xl">We strongly oppose the University's unfair and disproportionate rent increases and urge them to stop exploiting their students by decreasing their rent. The University is a tertiary education institution, not a business, and its students are not consumers or customers. They must prioritise student wellbeing and make the students their focus. We demand that the University of Auckland lower the rent at their student accommodation to ease the cost of living pressures on students. </p> </div> </div> <div class="hero"> <div class="hero-content relative w-full justify-center items-center"> ${renderComponent($$result2, "Image", $$Image, { "width": "1600", "height": "300", "src": "/images/signature.svg", "alt": "Graphic of a signature" })} <a href="https://chng.it/pTSGNWQGDT" class="absolute font-bold font-display bg-accent bg-opacity-80 px-12 py-6 shadow-lg text-2xl sm:text-3xl rounded-full" target="_blank">View our Petition</a> </div> </div> <div class="hero"> <div class="hero-content flex flex-col w-full justify-center items-start text-left p-8"> <h3 class="text-lg sm:text-3xl font-bold font-display">Students Thoughts</h3> <ul class="flex flex-col gap-6 list-disc"> <li> <p class="text-xl">“It has made me need to overwork and miss classes just to pay bills by working weekends (10 hours) and weekdays (10 pm - 2 am, 4 nights a week).” - First Year Student</p> </li> <li> <p class="text-xl">“Alongside feeling as though the price I am paying is not properly justified for a self-catered accommodation, I also have an internal feeling of guilt that my parents have to help. I work 21 hours a week while studying full-time to ensure that I can keep up with other additional expenses. The price for a safe place (particularly as a young woman) should not be this expensive.” - Second-year student</p> </li> </ul> </div> </div> <div class="hero"> <div class="hero-content flex flex-col w-screen justify-center items-start text-left p-8"> <h3 class="text-lg sm:text-3xl font-bold font-display">Articles</h3> <div class="carousel carousel-center flex flex-row gap-4 overflow-x-scroll w-full"> ${allPosts.map((post, index) => renderTemplate`<div class="carousel-item"${addAttribute(`slide-${index}`, "id")}>${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "title": post.frontmatter.title, "subtitle": post.frontmatter.subtitle, "author": post.frontmatter.author, "pubDate": post.frontmatter.pubDate, "image": post.frontmatter.image, "url": post.url })}</div>`)} </div> </div> </div> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/index.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };