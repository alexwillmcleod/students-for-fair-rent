/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, i as renderComponent } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_243f40e1.mjs';
import axios from 'axios';

const $$Astro$1 = createAstro();
const $$Pledge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pledge;
  return renderTemplate`${maybeRenderHead()}<div class="form w-full max-w-screen-sm flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4 lg:p-8"> <p class="text-white"><strong>${Astro2.props.fullName}</strong> pledges to withold rent <strong>${Astro2.props.numberWeeks ? `for ${Astro2.props.numberWeeks} weeks` : "until further notice"}</strong></p> <p class="text-white">${Astro2.props.why?.substring(0, 500)}</p> </div>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/atoms/pledge.astro", void 0);

const $$Astro = createAstro();
const $$Pledges = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pledges;
  let pledges;
  try {
    const res = await axios({
      url: "/dashboard",
      baseUrl: "http://localhost:3000/api"
    });
    pledges = res.data;
    console.log(`pledges = ${pledges.map((element) => JSON.stringify(element))}`);
  } catch {
  }
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
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-12 w-full flex flex-col gap-4 "> ${concurrentStrikerCount > 0 && renderTemplate`<div class="w-full  rounded-xl flex flex-col gap-4 p-8" style="background-image: url('/strike-gradient.png')"> <div class="flex flex-col gap-4 justify-center items-center"> <p class="text-white text-2xl">${concurrentStrikerCount} Students are Striking</p> </div> <div class="flex flex-col justify-center items-center gap-8"> <p class="text-white text-2xl">We have taken back <strong>$${totalDollarCount}</strong> from the university</p> </div> </div>`} <div class="w-full  rounded-xl flex flex-col gap-4 p-8" style="background-image: url('/strike-gradient.png')"> <div class="flex flex-col gap-4 justify-center items-center"> <a class="p-4 rounded-lg cursor-pointer bg-[#7289da] border-none text-white text-2xl font-strike">Join our Discord</a> </div> </div> <div class="form w-full flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4 lg:p-8" style="background-image: url('/strike-gradient.png')"> <h2 class="text-2xl text-white font-strike">Pledges:</h2> <div class="flex flex-col w-full items-center gap-4 justify-center p-4"> ${pledges != void 0 ? pledges.map((element) => renderTemplate`${renderComponent($$result2, "Pledge", $$Pledge, { ...element })}`) : renderTemplate`<div class="w-full h-40 skeleton bg-primary/20"></div>`} ${pledges.length == 0 && renderTemplate`<div class="w-full h-40 flex justify-center items-center">No pledges to show...</div>`} </div> </div> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/pledges.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/pledges.astro";
const $$url = "/pledges";

export { $$Pledges as default, $$file as file, $$url as url };
