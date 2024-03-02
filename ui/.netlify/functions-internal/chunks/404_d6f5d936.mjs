export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/404_3afe2bb5.mjs').then(n => n._);

export { page };
