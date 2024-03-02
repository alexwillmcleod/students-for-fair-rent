/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_243f40e1.mjs';

const $$Astro = createAstro();
const $$Mission = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Mission;
  Astro2.cookies.has("authToken");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-4 py-12"> <div class="hero"> <div class="hero-content flex-col justify-center items-start text-left w-full p-8"> <h3 class="text-lg sm:text-3xl font-bold font-display">Mission 🚀</h3> <p class="text-lg sm:text-2xl">Affordable and safe student accommodation is essential for providing equitable access to education. Waipapa Taumata Rau and other universities across Aotearoa, withold education from lower income people while taking everything they can from current students. </p> <p class="text-lg sm:text-2xl">Students so often have too choose between food and rent. On top of forty hours of study each week, we are forced to work an absurd number of hours more just to get by, and still go into 5 figures of debt. </p> <p class="text-lg sm:text-2xl">There is no reason students should pay this much. We are hurting our economy and our country's future by making education so financially difficult to achieve, all to line the pockets of people with a land deed.</p> <p class="text-lg sm:text-2xl">We're going to do something about it.</p> </div> </div> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/mission.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/mission.astro";
const $$url = "/mission";

export { $$Mission as default, $$file as file, $$url as url };
