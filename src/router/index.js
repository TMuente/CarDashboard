import { createRouter, createWebHistory } from 'vue-router'
import { directus } from '@/services/directus'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      metatitle: 'CARLOG',
      metaTags: [
        {
          name: 'description',
          content: 'Carlog - Car history selfmade'
        }
      ]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard-container',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      metatitle: 'CARLOG Dashboard',
      metaTags: [
        {
          name: 'description',
          content: 'Carlog - Car history selfmade'
        }
      ]
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardHomeView.vue'),
        meta: {
          metatitle: 'CARLOG Dashboard',
          metaTags: [
            {
              name: 'description',
              content: 'Carlog - Car history selfmade'
            }
          ]
        },
        children: []
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = await directus.auth.token

  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  } else if (isAuthenticated && (to.name == 'login' || to.name == 'home')) {
    return { path: '/dashboard' }
  }
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`"s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metatitle)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.metatitle
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.metatitle
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create so we don"t interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag))

  next()
})

export default router
