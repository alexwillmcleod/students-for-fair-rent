/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { a as $$Layout } from './404_3afe2bb5.mjs';

const $$Astro = createAstro();
const $$Quiz = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Quiz;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-4 px-4 py-4 md:px-12 md:py-12"> ${renderComponent($$result2, "CostQuiz", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/quiz/Quiz", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/quiz.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/quiz.astro";
const $$url = "/quiz";

export { $$Quiz as default, $$file as file, $$url as url };
