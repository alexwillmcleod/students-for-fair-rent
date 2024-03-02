/* empty css                                */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_705d6c18.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Image, a as $$Layout } from './404_3afe2bb5.mjs';

const $$Astro = createAstro();
const $$EmailSentSuccessfully = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EmailSentSuccessfully;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full h-full flex-col justify-center items-center p-12 gap-4"> ${renderComponent($$result2, "Image", $$Image, { "src": "/images/mail.svg", "width": "200", "alt": "404", "height": "10" })} <p class="font-bold text-3xl justify-center items-center text-center">We just sent an email your way,<br>check your inbox</p> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/email-sent-successfully.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/email-sent-successfully.astro";
const $$url = "/email-sent-successfully";

export { $$EmailSentSuccessfully as default, $$file as file, $$url as url };
