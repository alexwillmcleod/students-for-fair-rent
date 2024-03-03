import '@astrojs/internal-helpers/path';
/* empty css                                */import 'html-escaper';
import { e as createAstro, f as createComponent, A as AstroError, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderSlot, k as renderHead } from '../astro_705d6c18.mjs';
import 'clsx';
import { i as isESMImportedImage, g as getImage$1 } from '../astro/assets-service_478cce6a.mjs';
/* empty css                                                     */import { config } from 'dotenv';
import axios from 'axios';

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$4 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Navbar;
  Astro2.cookies.has("authToken");
  return renderTemplate`${maybeRenderHead()}<div class="px-4 py-4 lg:px-12 lg:py-6"> <div class="navbar bg-slate-50 bg-opacity-30 shadow-lg px-6 py-4 lg:px-12 lg:py-4 rounded-full"> <div class="flex-1 lg:flex-none"> <a href="/" class="text-3xl font-bold"> ${renderComponent($$result, "Image", $$Image, { "width": "192", "height": "4", "class": "hidden lg:flex ", "src": "/images/navbar-logo-with-text.png", "alt": "Students for Fair Rent Logo" })} ${renderComponent($$result, "Image", $$Image, { "width": "48", "height": "4", "class": "flex lg:hidden", "src": "/images/navbar-logo-without-text.png", "alt": "Students for Fair Rent Logo" })} </a> </div> <div class="hidden lg:flex flex-row justify-center w-full"> <ul class="flex flex-row  justify-center items-center gap-8"> <li><a href="/mission">Mission</a></li> <li><a href="/team">Our Team</a></li> <li><a href="/calculator">Calculator</a></li> <!-- <li><a href="/quiz">Quiz</a></li>  --> <li><a href="/Press release 15_09_23.pdf" target="_blank">Press Release</a></li> <li><a href="https://docs.google.com/document/d/1RAuRSbyZ0m9CrRGfzZnH7PN5KVXQD-s0k9z6YLyLV8g/edit" target="_blank">Data Sheet</a></li> </ul> </div> <div class="flex justify-end items-center"> <div class="flex lg:hidden dropdown dropdown-bottom"> <label tabindex="0" class="btn btn-ghost rounded-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label> <ul class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"> <li><a href="/mission">Mission</a></li> <li><a href="/team">Our Team</a></li> <li><a href="/calculator">Calculator</a></li> <!-- <li><a href="/quiz">Quiz</a></li>  --> <li><a href="/Press release 15_09_23.pdf" target="_blank">Press Release</a></li> <li><a href="https://docs.google.com/document/d/1RAuRSbyZ0m9CrRGfzZnH7PN5KVXQD-s0k9z6YLyLV8g/edit" target="_blank">Data Sheet</a></li> </ul> </div> <a href="/strike" class="flex font-bold font-display bg-accent bg-opacity-60 shadow-lg  px-12 py-4 text-xl rounded-full">Strike</a> </div> </div> </div>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/organisms/navbar.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="footer p-10 bg-slate-50 bg-opacity-10"> <div> <p class="footer-title">Students for Fair Rent</p> <p>Established 2023</p> <p>Developed by Alex McLeod</p> </div> <div> <p class="footer-title">Social</p> <a target="_blank" class="cursor-pointer flex flex-row justify-center items-center gap-2" href="https://www.tiktok.com/@studentsforfairrent">TikTok</a> <a target="_blank" class="cursor-pointer flex flex-row justify-center items-center gap-2" href="https://www.instagram.com/studentsforfairrent/">Instagram</a> <a target="_blank" class="cursor-pointer flex flex-row justify-center items-center gap-2" href="mailto:contact@sfr.org.nz">Electronic Mail</a> </div> </footer>`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/organisms/footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate", handleForms } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${handleForms ? renderTemplate`<meta name="astro-view-transitions-forms" content="true">` : ""}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  config();
  axios.defaults.baseURL = process.env.PUBLIC_API_BASE_URL;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-mmggtga4> <head>', `<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Fighting to ensure safe, secure, and affordable accommodation for students at UoA"><meta name="theme-color" content="#1B1B25"><title>Students for Fair Rent</title><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><script>
      // \u261D\uFE0F This script prevent the FART effect.
      if (localStorage.getItem("theme") === null) {
        document.documentElement.setAttribute("data-theme", "light");
      } else
        document.documentElement.setAttribute(
          "data-theme",
          localStorage.getItem("theme")
        );
      // "theme" LocalStorage value is set by the package to remember user preference.
      // The value is checked and applyed before rendering anything.
      import { themeChange } from 'theme-change';
      themeChange();
      // \u{1F446} you could import the CDN directly instead of these two lines
    <\/script>`, `</head> <body class="flex flex-col bg-cover bg-no-repeat overflow-x-hidden min-h-screen" style="background-image: url('/images/sfr-background.png')" data-astro-cid-mmggtga4> `, ' <article class="flex-1 h-full" data-astro-cid-mmggtga4> ', ' </article> <div class="min-w-full" data-astro-cid-mmggtga4> ', " </div> ", " </body></html>"])), renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-mmggtga4": true }), renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-mmggtga4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-mmggtga4": true }), renderComponent($$result, "NotificationTray", null, { "client:only": true, "client:component-hydration": "only", "data-astro-cid-mmggtga4": true, "client:component-path": "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/components/organisms/NotificationTray", "client:component-export": "default" }));
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/layouts/layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full h-full flex-col justify-center items-center p-12 gap-4"> ${renderComponent($$result2, "Image", $$Image, { "src": "/images/void.svg", "width": "200", "alt": "404", "height": "10" })} <p class="font-bold text-3xl justify-center items-center text-center">We couldn't find this page</p> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/404.astro", void 0);

const $$file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, _404 as _, $$Layout as a, imageConfig as i };
