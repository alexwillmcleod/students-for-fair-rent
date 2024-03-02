import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_da533b0d.mjs';

const _page0  = () => import('./chunks/generic_e524ea6b.mjs');
const _page1  = () => import('./chunks/index_8bdea350.mjs');
const _page2  = () => import('./chunks/calculator_e1363802.mjs');
const _page3  = () => import('./chunks/mission_bca50438.mjs');
const _page4  = () => import('./chunks/pledges_67499527.mjs');
const _page5  = () => import('./chunks/strike_3a718eb8.mjs');
const _page6  = () => import('./chunks/university-of-auckland-students-launch-campaign-against-campus-rent-hike_52da344a.mjs');
const _page7  = () => import('./chunks/auckland-central-candidates-back-students-rent-hike-campaign_eac9108e.mjs');
const _page8  = () => import('./chunks/akl-uni-students-slam-rent-hike_51d43bae.mjs');
const _page9  = () => import('./chunks/quiz_b83bcca7.mjs');
const _page10  = () => import('./chunks/team_3c0f1ff3.mjs');
const _page11  = () => import('./chunks/404_9b44f53b.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/calculator.astro", _page2],["src/pages/mission.astro", _page3],["src/pages/pledges.astro", _page4],["src/pages/strike.astro", _page5],["src/pages/posts/university-of-auckland-students-launch-campaign-against-campus-rent-hike.mdx", _page6],["src/pages/posts/auckland-central-candidates-back-students-rent-hike-campaign.mdx", _page7],["src/pages/posts/akl-uni-students-slam-rent-hike.mdx", _page8],["src/pages/quiz.astro", _page9],["src/pages/team.astro", _page10],["src/pages/404.astro", _page11]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
