import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../pages/HomePage.vue'),
	},
	{
		path: '/compare',
		name: 'compare',
		component: () => import('../pages/ComparePage.vue'),
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: () => import('../pages/FavoritesPage.vue'),
	},
	{
		path: '/products',
		name: 'products',
		component: () => import('../pages/ProductsPage.vue'),
	},
	{
		path: '/products/:id',
		name: 'product',
		component: () => import('../pages/ProductPage.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('../pages/NotFoundPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0, behavior: 'smooth' };
		}
	},
});

export default router;
