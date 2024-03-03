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
  "title": "University of Auckland students slam 8% accommodation rent hike",
  "layout": "../../layouts/article.astro",
  "author": "Leo Zaugg",
  "pubDate": "2023-10-19T00:00:00.000Z",
  "repostedFrom": {
    "name": "One News",
    "href": "https://www.1news.co.nz/2023/10/19/auckland-uni-students-slam-8-accommodation-rent-hike/"
  },
  "image": {
    "url": "/images/one-news-article-1-cover.jpg"
  },
  "description": "Students living at the The University of Auckland's halls are facing a rent hike of around 8% next year, leading to a petition and calls for a reduction in accommodation prices.",
  "tags": ["Petition", "Auckland", "T\u0101maki Makaurau", "One News", "SFR", "Students for Fair Rent", "University of Auckland", "Waipapa Taumata Rau", "Landlords", "Renters", "Housing Crisis", "Waip\u0101r\u016Br\u016B", "O'Rorke", "Grafton", "Carlaw Park", "Parnell"]
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
      children: "This year students are paying $470 per week for a single standard room at Waip\u0101r\u016Br\u016B Hall with shared facilities and catering, but that\u2019s about to go up."
    }), "\n", createVNode(_components.p, {
      children: "From 2024 that same room will cost $510 per week, an increase of around 8%. Students for Fair Rent founder Matthew Lee said he was paying much less at that same hall just last year."
    }), "\n", createVNode(_components.p, {
      children: "\u201DIn comparison last year I was living at Waipa [Waip\u0101r\u016Br\u016B], I was paying $435, this year they\u2019re paying $470, and next year it\u2019s just over that $500 mark.\u201D"
    }), "\n", createVNode(_components.p, {
      children: "That increase prompted him to start Students for Fair Rent. They\u2019re calling for the university to reduce the cost of rent at their facilities and implement measures to ensure their prices are in line with average rent prices in central Auckland."
    }), "\n", createVNode(_components.p, {
      children: "They\u2019ve sent a petition with almost 1500 signatures to the university."
    }), "\n", createVNode(_components.p, {
      children: "\u201DAs part of the petition, we want the University to implement three metrics of fairness to measure all future rent and rent increases,\u201D Lee said."
    }), "\n", createVNode(_components.p, {
      children: "Those measures include comparing rental price increases to inflation and the price of a room in the CBD as well as calculating the government income support available for students."
    }), "\n", createVNode("img", {
      class: "rounded-xl",
      alt: "Students gathered at the University of Auckland clocktower in early October to protest rental price increases. (Source: 1News)",
      src: "https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/yDY4ig8icm4z7ZoXIaJ1MfT6co4=/800x450/cloudfront-ap-southeast-2.images.arcpublishing.com/tvnz/IBYNQRH5MJASVDYN5JB4UU5VPE.jpg"
    }), "\n", createVNode(_components.p, {
      children: "The University of Auckland said on average fees were increasing 8.2% at catered halls and 7.3% at self-catered halls."
    }), "\n", createVNode(_components.p, {
      children: "It said many of its costs - such as food and living wage increases - had increased by more than inflation."
    }), "\n", createVNode(_components.p, {
      children: "\u201DWaipapa Taumata Rau University of Auckland is well aware of the challenges the cost of living puts on many of our students,\u201D it said."
    }), "\n", createVNode(_components.p, {
      children: "\u201DWe work hard to minimise accommodation fees, and in fact have kept these low in comparison to other Aotearoa New Zealand universities.\u201D"
    }), "\n", createVNode(_components.p, {
      children: "It said if it couldn\u2019t cover its costs, the university would need to use money otherwise spent on teaching and research."
    }), "\n", createVNode(_components.p, {
      children: "Auckland\u2019s not the only university lifting prices. Next year, University of Otago accommodation will increase by 3%, while Victoria University of Wellington said it\u2019s making \u201Cmodest adjustments\u201D."
    }), "\n", createVNode(_components.p, {
      children: "Inflation data released by Stats NZ this week had inflation at 5.6%."
    }), "\n", createVNode(_components.p, {
      children: "High rental prices and the cost of living are leaving students struggling - one of them is Catherine Franicevic who is studying at the University of Auckland to get into medical school and living in university accommodation."
    }), "\n", createVNode(_components.p, {
      children: "She said a move to Australia is looking increasingly appealing after having to pick up more hours at work to pay for rent, giving her less time to study."
    }), "\n", createVNode(_components.p, {
      children: "\u201DIt\u2019s a huge strain on a lot of students\u2019 mental health, and for the services they provide, that bump up is just not worth it. I know lots of people who skip classes because they have to go to work - to pay for university - that should not be the case.\u201D\r\nCatherine Franicevic\u2019s room which costs $320 per week at the University of Auckland."
    }), "\n", createVNode("img", {
      class: "rounded-xl",
      src: "https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/i5BOpSKFROsizhHi0IctF-a6AP0=/800x450/cloudfront-ap-southeast-2.images.arcpublishing.com/tvnz/TIAIIZDR3NGTBGDNVDMR7Z7H6Q.jpg",
      alt: "Catherine Franicevic's room which costs $320 per week at the University of Auckland. (Source: Supplied)"
    }), "\n", createVNode(_components.p, {
      children: "\u201DI am potentially looking at going to Australia because it\u2019s just a lot more affordable over there.\u201D"
    }), "\n", createVNode(_components.p, {
      children: "Student allowances provided by the government don\u2019t tend to cover rent, leaving students to work more hours, but the more you work, the less allowance you\u2019re entitled to."
    }), "\n", createVNode(_components.p, {
      children: "\u201DThe most I can take out per week at the moment is $300 and so you\u2019d have to work a bit on top of that to even just cover the rent, then to cover food and transport costs that\u2019s just too much,\u201D Franicevic said."
    }), "\n", createVNode(_components.p, {
      children: "The Ministry of Social Development (MSD) manages student allowances and said on their website students earning $516 or less each week could be eligible for between $300 and $630 per week."
    }), "\n", createVNode(_components.p, {
      children: ["The payment doesn\u2019t contribute to student loans but there are many factors that can change how much you\u2019re entitled to, if any. MSD has a ", createVNode("a", {
        href: "https://www.studylink.govt.nz/products/rates/calculators/index.html",
        class: "link",
        target: "_blank",
        children: "calculator"
      }), " to help people assess how much they could be eligible for."]
    }), "\n", createVNode("table", {
      class: "table",
      children: [createVNode("tr", {
        class: "table-row",
        children: [createVNode("th", {
          children: "Combined weekly income before tax is:"
        }), createVNode("th", {
          children: "You might be able to get between:"
        })]
      }), createVNode("tr", {
        class: "table-row",
        children: [createVNode("td", {
          children: "$516.16 or less"
        }), createVNode("td", {
          children: "$300 - $630 a week after tax"
        })]
      }), createVNode("tr", {
        class: "table-row",
        children: [createVNode("td", {
          children: "Between $516.16 and $1,074.94"
        }), createVNode("td", {
          children: "$179 - $255 a week after tax"
        })]
      }), createVNode("tr", {
        class: "table-row",
        children: [createVNode("td", {
          children: "$1074.93"
        }), createVNode("td", {
          children: "You can\u2019t get a student allowance"
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: "Ellen Dixon from the NZ Union of Students\u2019 Associations said it\u2019s an issue at universities across the country."
    }), "\n", createVNode(_components.p, {
      children: '\u201DIt\u2019s something that is seen largely in bigger cities, Auckland and Wellington, and what we\u2019re seeing is a bit of an exodus to the universities that are not charging as much."'
    }), "\n", createVNode(_components.p, {
      children: '"Student accommodation doesn\u2019t have the same renters rights as you would in typical accommodation because it sits under the Education and Training Act, so it\u2019s largely a relationship navigated with your university,\u201D Dixon said.'
    }), "\n", createVNode(_components.p, {
      children: "So what are the prices like across the country."
    }), "\n", createVNode("h2", {
      class: "font-bold text-xl",
      children: "The numbers by region"
    }), "\n", createVNode("h3", {
      class: "font-bold text-lg",
      children: "Auckland"
    }), "\n", createVNode(_components.p, {
      children: "The University of Auckland has one of the most expensive rooms in the country. For $510 per week starting next year students get a single room at Waip\u0101r\u016Br\u016B Hall with shared facilities and catering."
    }), "\n", createVNode(_components.p, {
      children: "A small number of large rooms are available for $540 per week, priority for these is given to students with a disability or medical needs."
    }), "\n", createVNode(_components.p, {
      children: "Current students at Waip\u0101r\u016Br\u016B are paying $470 per week, meaning a weekly increase of $40 from 2024."
    }), "\n", createVNode(_components.p, {
      children: "All of Auckland\u2019s halls are catered, with both Grafton Hall and University towers coming in at $490 per week, and O\u2019Rorke hall at $470."
    }), "\n", createVNode(_components.p, {
      children: "Down the road at AUT prices are lower but aren\u2019t catered."
    }), "\n", createVNode(_components.p, {
      children: "$453 is the weekly price at Te \u0100huru on Mayoral Drive while at the Wellesley Student Apartments rooms vary from as low as $313 to $357. On the North Shore AUT students will pay $316 from next year."
    }), "\n", createVNode(_components.p, {
      children: ["Data from the Ministry of Business, Innovation and Employment (MBIE) has the ", createVNode("a", {
        class: "link",
        target: "_blank",
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Auckland+-+Auckland+Central&period=6&action_doSearchValues=Find+Rent",
        children: "median price for a room"
      }), " in central Auckland at $265 per week."]
    }), "\n", createVNode("h3", {
      class: "font-bold text-lg",
      children: "Waikato"
    }), "\n", createVNode(_components.p, {
      children: "Waikato University\u2019s Hamilton halls are the cheapest in the country, with optional catering. Bryant Hall and Student Village are $394 per week - $260 without catering - while College Hall is $451 with catering."
    }), "\n", createVNode(_components.p, {
      children: ["The ", createVNode("a", {
        class: "link",
        target: "_blank",
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Hamilton+-+Hamilton+Central&period=6&action_doSearchValues=Find+Rent",
        children: "median weekly price for a room"
      }), " in central Hamilton is $260 according to MBIE.\r\n", createVNode("h3", {
        class: "font-bold text-lg",
        children: "Palmerston North"
      })]
    }), "\n", createVNode(_components.p, {
      children: "Massey University have plenty of options, the cheapest is a flat-like apartment with individual rooms and shared facilities at Kairanga and Rotary Courts which cost $221 per week. Catering is not included."
    }), "\n", createVNode(_components.p, {
      children: "Most of the other options are $434 per week and are catered for two meals each day."
    }), "\n", createVNode(_components.p, {
      children: ["$205 each week is the ", createVNode("a", {
        class: "link",
        target: "_blank",
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Palmerston+North+-+Palmerston+North&period=6&action_doSearchValues=Find+Rent",
        children: "median price in Palmerston North"
      }), ".\r\n", createVNode("h3", {
        class: "font-bold text-lg",
        children: "Wellington"
      })]
    }), "\n", createVNode(_components.p, {
      children: "Victoria University of Wellington\u2019s halls in Central Wellington are all around $490 per week, with catering."
    }), "\n", createVNode(_components.p, {
      children: "There are also halls at Massey University in Wellington, all three halls are self-catered and range from as low as $267 - $397 per week at Whanake Hall, to as high as $331 - $439 per week at Cube Hall."
    }), "\n", createVNode(_components.p, {
      children: ["Things are again looking cheaper away from university accommodation with the ", createVNode("a", {
        class: "link",
        target: "_blank",
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Wellington+-+Wellington+Central&period=6&action_doSearchValues=Find+Rent",
        children: "median price"
      }), " for a room in central Wellington $250 per week.\r\n", createVNode("h3", {
        class: "font-bold text-lg",
        children: "Christchurch"
      })]
    }), "\n", createVNode(_components.p, {
      children: "Down to the South Island now, Canterbury University has 10 halls to choose from. Just looking at some of the first-year options, at Rochester and Rutherford Hall it\u2019s $517 per week, including includes food. Kirkwood Avenue Hall is $289 without food."
    }), "\n", createVNode(_components.p, {
      children: ["$200 is the median price for a single room in Christchurch, using ", createVNode("a", {
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Christchurch+-+Christchurch+Central&period=6&action_doSearchValues=Find+Rent",
        target: "_blank",
        class: "link",
        children: "data from MBIE"
      }), ".\r\n", createVNode("h3", {
        class: "font-bold text-lg",
        children: "Otago"
      })]
    }), "\n", createVNode(_components.p, {
      children: "In Otago, everything is catered, but you\u2019ll be paying more for it. The University of Otago doesn\u2019t list the price per week on their website, but does list the annual fee."
    }), "\n", createVNode(_components.p, {
      children: "We\u2019ve divided those annual prices by 40 weeks, which how long you\u2019re usually able to stay at university-run accommodation facilities."
    }), "\n", createVNode(_components.p, {
      children: "At Aquinas, Caroline Freeman, Carrington, Cumberland, Hayward, Studholme, Te Rangih\u012Broa, Toroa and University Colleges it\u2019s $504 per week ($20,186 annually). While the most expensive is $571 per week at Otago\u2019s Selwyn College ($22,873 annually)."
    }), "\n", createVNode(_components.p, {
      children: ["For a single room in Dunedin central outside of university accommodation you\u2019re looking at ", createVNode("a", {
        href: "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Dunedin+-+Dunedin+Central&period=6&action_doSearchValues=Find+Rent",
        class: "link",
        target: "_blank",
        children: "$247 per week"
      }), "."]
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
const url = "/posts/akl-uni-students-slam-rent-hike";
const file = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/posts/akl-uni-students-slam-rent-hike.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/alexw/Documents/Github/students-for-fair-rent/ui/src/pages/posts/akl-uni-students-slam-rent-hike.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
