import { renderToString, ssr, createComponent } from 'solid-js/web';
import { n as AstroJSX, A as AstroError, o as renderJSX, l as createVNode } from './chunks/astro_705d6c18.mjs';

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "s" + this.c.toString();
    }
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function check$1(Component, props, children) {
  if (typeof Component !== "function")
    return false;
  if (Component.name === "QwikComponent")
    return false;
  const { html } = renderToStaticMarkup$1.call(this, Component, props, children);
  return typeof html === "string";
}
function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
  const renderId = metadata?.hydrate ? incrementId(getContext(this.result)) : "";
  const needsHydrate = metadata?.astroStaticSlot ? !!metadata.hydrate : true;
  const tagName = needsHydrate ? "astro-slot" : "astro-static-slot";
  const html = renderToString(
    () => {
      const slots = {};
      for (const [key, value] of Object.entries(slotted)) {
        const name = slotName$1(key);
        slots[name] = ssr(`<${tagName} name="${name}">${value}</${tagName}>`);
      }
      const newProps = {
        ...props,
        ...slots,
        // In Solid SSR mode, `ssr` creates the expected structure for `children`.
        children: children != null ? ssr(`<${tagName}>${children}</${tagName}>`) : children
      };
      return createComponent(Component, newProps);
    },
    {
      renderId
    }
  );
  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html
  };
}
var server_default$1 = {
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true
};

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    const error = e;
    if (Component[Symbol.for("mdx-component")]) {
      throw new AstroError({
        message: error.message,
        title: error.name,
        hint: `This issue often occurs when your MDX component encounters runtime errors.`,
        name: error.name,
        stack: error.stack
      });
    }
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const renderers = [Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js"}, { ssr: server_default$1 }),Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

export { renderers };
