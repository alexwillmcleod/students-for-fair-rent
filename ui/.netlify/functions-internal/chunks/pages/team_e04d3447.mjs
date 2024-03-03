/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_243f40e1.mjs';

const $$Astro$1 = createAstro();
const $$TeamAvatar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TeamAvatar;
  return renderTemplate`${maybeRenderHead()}<div class="avatar flex flex-col justify-center items-center gap-0"> <div class="w-24 rounded-full"> <img${addAttribute(Astro2.props.src, "src")}> </div> <h3 class="text-lg font-bold text-center">${Astro2.props.name}</h3> <p class="text-lg">${Astro2.props.role}</p> <p class="text-md italic">${Astro2.props.bio}</p> </div>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/atoms/team-avatar.astro", void 0);

const $$Astro = createAstro();
const $$Team = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Team;
  const teamMembers = [
    // { src: "/images/matthew-lee.jpg", name:"Matthew Lee", role:"Chair" },
    { src: "/images/jennifer-setefano.jpg", name: "Fesolai Jennifer Setefano", role: "Vice Chair", bio: "Favourite Hall: Grafton" },
    { src: "/images/gauri-singh.jpg", name: "Gauri Singh", role: "Research", bio: "Favourite Hall: Waikohanga" },
    { src: "/images/alex-mcleod.jpg", name: "Alex McLeod", role: "Treasurer", bio: "Favourite Hall: O'Rorke" },
    { src: "/images/kalana-piramanage.jpg", name: "Kalana Piramanage", role: "Social", bio: "Favourite Hall: O'Rorke" },
    { src: "/images/maria-truong.jpg", name: "Maria Truong", role: "Events & Research", bio: "Favourite Hall: Carlaw Park Nichols" },
    { src: "/images/christopher-gerred.jpg", name: "Christopher Gerred", role: "Secretary", bio: "Favourite Hall: Whitaker Block" }
  ].sort(
    (_) => 0.5 - Math.random()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-4 py-12"> <div class="hero"> <div class="hero-content flex-col justify-center gap-10 w-full"> <h1 class="text-4xl text-wrap sm:text-5xl font-bold font-display">Our Team</h1> <div class="flex flex-row flex-wrap justify-items-center md:grid md:grid-cols-4 gap-8 justify-center items-center"> ${renderComponent($$result2, "TeamAvatar", $$TeamAvatar, { "src": "/images/matthew-lee.jpg", "name": "Matthew Lee", "role": "Chair", "bio": "Favourite Hall: Waiparuru" })} ${teamMembers.map((props) => renderTemplate`${renderComponent($$result2, "TeamAvatar", $$TeamAvatar, { ...props })}`)} </div> </div> </div> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/team.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/team.astro";
const $$url = "/team";

export { $$Team as default, $$file as file, $$url as url };
