/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import axios from 'axios';
import { a as $$Layout } from './404_243f40e1.mjs';

const $$Astro$1 = createAstro();
const $$Stats = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Stats;
  let concurrentStrikerCount;
  let totalDollarCount;
  try {
    const res = await axios({
      method: "get",
      url: "/stats/",
      baseURL: "http://localhost:3000/api"
    });
    concurrentStrikerCount = res.data.concurrentStrikerCount;
    totalDollarCount = res.data.totalDollarCount;
  } catch (err) {
  }
  return renderTemplate`${concurrentStrikerCount > 0 && renderTemplate`${maybeRenderHead()}<div class="w-full md:w-[44rem] rounded-xl flex flex-col gap-4 p-8" style="background-image: url('/strike-gradient.png')"><div class="flex flex-col gap-4 justify-center items-center"><p class="text-white text-2xl">${concurrentStrikerCount} Students Are Striking</p></div><div class="flex flex-col justify-center items-center gap-8"><p class="text-white text-2xl">We have taken back <strong>$${totalDollarCount}</strong> from the university</p><a href="/pledges" class="text-blue-200 underline cursor-pointer">View Pledges</a></div></div>`}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/molecules/strike/stats.astro", void 0);

const $$Astro = createAstro();
const $$Strike = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Strike;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center items-center w-full p-12 gap-4"> ${renderComponent($$result2, "Stats", $$Stats, {})} ${renderComponent($$result2, "StrikeForm", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@molecules/strike/StrikeForm", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/strike.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/strike.astro";
const $$url = "/strike";

export { $$Strike as default, $$file as file, $$url as url };
