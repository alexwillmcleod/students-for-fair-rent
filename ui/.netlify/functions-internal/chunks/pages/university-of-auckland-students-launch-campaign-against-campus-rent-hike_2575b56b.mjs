/* empty css                                */import { _ as __astro_tag_component__, F as Fragment, l as createVNode } from '../astro_705d6c18.mjs';
import { $ as $$Image } from './404_243f40e1.mjs';
import 'html-escaper';
import 'clsx';

const MDXLayout = async function ({
  children
}) {
  const Layout = (await import('../article_a9046a3d.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode(Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    "server:root": true,
    children
  });
};
const frontmatter = {
  "title": "University of Auckland students launch campaign against campus rent hike",
  "layout": "../../layouts/article.astro",
  "author": "Kexin Li",
  "pubDate": "2023-08-29T00:00:00.000Z",
  "repostedFrom": {
    "name": "Te Waha Nui",
    "href": "https://tewahanui.nz/culture/university-of-auckland-students-launch-campaign-against-campus-rent-hike"
  },
  "image": {
    "url": "https://tewahanui.nz/__data/assets/image/0003/815709/varieties/content.jpg"
  },
  "tags": ["Politics", "Petition", "Auckland", "T\u0101maki Makaurau", "One News", "SFR", "Students for Fair Rent", "University of Auckland", "Waipapa Taumata Rau", "Landlords", "Renters", "Housing Crisis", "Waip\u0101r\u016Br\u016B", "O'Rorke", "Grafton", "Carlaw Park", "Parnell"]
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "University of Auckland students are rising up against the burgeoning cost of student accommodation on campus."
    }), "\n", createVNode(_components.p, {
      children: "Students for Fair Rent\u2019s (SFR) campaign started after students learned the university was to increase its accommodation prices by an average of 8 per cent in 2024."
    }), "\n", createVNode(_components.p, {
      children: "The campaign wants to ensure \u201Csafe, secure, and affordable accommodation on campus\u201D."
    }), "\n", createVNode(_components.p, {
      children: "The group has launched a survey to help it understand student renters\u2019 situation better and is planning to launch a petition in September."
    }), "\n", createVNode(_components.p, {
      children: "Data from Statistics NZ shows on average Auckland\u2019s listed rental price has increased by 7.1 per cent since last July."
    }), "\n", createVNode(_components.p, {
      children: "A university spokesperson said the hike was the result of many operational cost increases, including food prices increasing by 12 per cent and a living-wage increase of 10 per cent."
    }), "\n", createVNode(_components.p, {
      children: "SFR chair Matthew Lee said students understood the university was facing higher costs, but the price hike was way above current inflation and that rent had already increased by 8 per cent since 2022, when the inflation rate was lower."
    }), "\n", createVNode(_components.p, {
      children: "He said students thought it was \u201Cabsolutely unfair\u201D, especially for international students, out-of-town students, or people from lower socioeconomic backgrounds."
    }), "\n", createVNode(_components.p, {
      children: "\u201CThey rely on the university to provide safe, secure, and especially affordable housing.\u201D"
    }), "\n", createVNode(_components.p, {
      children: "In 2024, a first-year student can expect to pay between $470 and $510 a week for a room and three meals a day. A non-catered room will cost between $310 and $355."
    }), "\n", createVNode(_components.p, {
      children: "On top, students are expected to pay a non-refundable $300 application fee and $330 annual residential services fee, as well as a $950 upfront payment for rent."
    }), "\n", createVNode(_components.p, {
      children: "This means students need to find $1580 before moving in."
    }), "\n", createVNode(_components.p, {
      children: "Currently, the university offers beds to 4371 students around its CBD campus."
    }), "\n", createVNode(_components.p, {
      children: "Private accommodation is also available for students. A single studio offered by student accommodation company UniLodge costs from $250 to $370."
    }), "\n", createVNode(_components.p, {
      children: "The university spokesperson said university accommodation was not covered by any earnings made by the university, and all costs must be covered by residents\u2019 fees."
    }), "\n", createVNode(_components.p, {
      children: "\u201CIf we do not cover all [accommodation] costs they must be met by the university through funding that would otherwise be spent on teaching and research,\u201D said the spokesperson."
    }), "\n", createVNode(_components.p, {
      children: "Domestic students have the option to ease the pressure through student loans or student allowances."
    }), "\n", createVNode(_components.p, {
      children: "\u201CFor students who have student loans or student allowance, [what they receive] doesn\u2019t cover rent. So they have to work extra hours, which means taking time out of their study and that affects their mental well-being and their studies,\u201D said Lee."
    }), "\n", createVNode(_components.p, {
      children: "The allowance for a student living away from home is currently $300 and they may be able to receive $60 to cover their accommodation cost."
    }), "\n", createVNode(_components.p, {
      children: "For students ineligible for a student allowance, domestic students can borrow a living-costs loan of $302.32 per week, which is still not enough to cover the cheapest room offered by the university."
    }), "\n", createVNode(_components.p, {
      children: "International students cannot access StudyLink funds."
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/posts/university-of-auckland-students-launch-campaign-against-campus-rent-hike";
const file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/posts/university-of-auckland-students-launch-campaign-against-campus-rent-hike.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/posts/university-of-auckland-students-launch-campaign-against-campus-rent-hike.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
