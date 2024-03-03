/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_3afe2bb5.mjs';

const $$Astro = createAstro();
const $$Join = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Join;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center w-full"> ${renderComponent($$result2, "StartStrikeForm", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@molecules/StartStrikeForm", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/join.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/join.astro";
const $$url = "/join";

export { $$Join as default, $$file as file, $$url as url };
