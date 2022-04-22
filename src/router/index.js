import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'info',
        component: () => import('../views/InfoView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'news',
        component: () => import('../views/NewsView.vue')
      },
      {
        path: 'news/:articleId',
        component: () => import('../views/NewsPageView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue'),
        meta: {
          hideFrontCart: true
        }
      },
      {
        path: 'order',
        component: () => import('../views/OrderView.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/CheckoutView.vue')
      },
      {
        path: 'checkout-success',
        component: () => import('../views/CheckoutSuccess.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'favorites',
        component: () => import('../views/FavoritesView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/AdminCoupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/admin/AdminArticleView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savePosition) {
    if (to.fullPath.match('')) {
      return {
        top: 0
      }
    }
    return {}
  }
})

export default router
