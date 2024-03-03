import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute, j as renderSlot } from './astro_705d6c18.mjs';
import 'html-escaper';
import { a as $$Layout } from './pages/404_243f40e1.mjs';
/* empty css                                                    */
const $$Astro = createAstro();
const $$Article = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Article;
  const { frontmatter } = Astro2.props;
  let imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tsamgt.com%2Fwp-content%2Fuploads%2FWPH_AKL_Waiparuru-Hall.jpg&f=1&nofb=1&ipt=f655de7e029eb381f77be73739ea8308d1bb237058cd1e363be2e1647f658f59&ipo=images";
  if (frontmatter.image != void 0 && frontmatter.image.url != void 0) {
    imageUrl = frontmatter.image.url;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-ed2fxd7y": true }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="p-12 flex flex-col gap-12 justify-center items-center" data-astro-cid-ed2fxd7y> <div class="flex flex-col justify-center items-center gap-2" data-astro-cid-ed2fxd7y> <img${addAttribute(imageUrl, "src")} class="w-3/4 h-64 object-cover rounded-xl" data-astro-cid-ed2fxd7y> <h1 class="text-4xl w-3/4 md:text-4xl font-bold font-display text-center" data-astro-cid-ed2fxd7y>${frontmatter.title}</h1> <h2 class="text-2xl text-center" data-astro-cid-ed2fxd7y>${frontmatter.subtitle}</h2> <h3 class="text-2xl text-center" data-astro-cid-ed2fxd7y>Article by <b data-astro-cid-ed2fxd7y>${frontmatter.author}</b></h3> <span class="flex flex-row w-full justify-center gap-3" data-astro-cid-ed2fxd7y><img src="/images/repost.svg" data-astro-cid-ed2fxd7y> <h3 class="text-2xl text-center w-max" data-astro-cid-ed2fxd7y>Reposted from <a class="font-bold"${addAttribute(frontmatter.repostedFrom.href, "href")} target="_blank" data-astro-cid-ed2fxd7y>${frontmatter.repostedFrom.name}</a></h3></span> <p class="text-2xl text-center" data-astro-cid-ed2fxd7y>Published on <b data-astro-cid-ed2fxd7y>${new Date(frontmatter.pubDate).toDateString()}</b></p> <button id="shareButton" data-astro-cid-ed2fxd7y> <img src="/images/share.svg" data-astro-cid-ed2fxd7y> </button> </div> <div class="flex flex-col text-lg gap-4 leading-relaxed text-balanced max-w-screen-md" data-astro-cid-ed2fxd7y> ${renderSlot($$result2, $$slots["default"])} </div> </div> ` })}`;
}, "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/layouts/article.astro", void 0);

export { $$Article as default };
