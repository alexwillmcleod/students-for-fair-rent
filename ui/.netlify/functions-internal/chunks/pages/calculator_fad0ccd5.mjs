/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_3afe2bb5.mjs';

const $$Astro = createAstro();
const $$Calculator = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Calculator;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-4 px-4 py-4 md:px-12 md:py-12"> ${renderComponent($$result2, "CostCalculator", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/organisms/Calculator", "client:component-export": "default" })} </div> ` })}../components/organisms/Calculator`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/calculator.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/calculator.astro";
const $$url = "/calculator";

export { $$Calculator as default, $$file as file, $$url as url };
