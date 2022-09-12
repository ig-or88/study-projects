import { createRouter, createWebHistory } from "vue-router";
import vContactList from "../components/contacts/v-contact-list.vue";
import vUsersList from "../components/users/v-users-list.vue";
import vUserChat from "../components/users/chat/v-user-chat.vue";
import vErrorDisplay from "../components/v-error-display.vue";

const routes = [
  {
    path: '/',
    name: 'contacts',
    component: vContactList,
    alias: "/contacts" // alias - переход на '/' при ручном вводе url /contacts
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/contacts/v-contact-user-info.vue'),
    props: true
  },
  {
    path: '/chats',
    name: 'chats',
    component: vUsersList
  },
  {
    path: '/user/:id/:login',
    name: 'user',
    component: vUserChat,

    // передача props в компонент vUserChat
    props: route => ({...route.params, id: parseInt(route.params.id) }),
    // beforeEnter(to, from){
    // сравниваем id из пути с данными из базы и если совпадение, то остаемся, иначе переадресация на стр NotFound
    //   const exists = store.state.chats.find(
    //     chat => chat.id === parseInt(to.params.id)
    //   )
    //   if(!exists) return {
    //     name: 'NotFound',
    //     // allows keeping the URL while rendering a different page
    //     params: { pathMatch: to.path.split('/').slice(1) },
    //     query: to.query,
    //     hash: to.hash,
    //   }
    // },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../components/v-not-found.vue')
  },
  {
    path: '/protected',
    name: 'protected',
    component: () => import('../components/v-protected.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/v-login.vue'),
  },
  {
    path: '/error/:error',
    name: 'ErrorDiaplay',
    component: vErrorDisplay,
    props: true,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/v-home.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: () => import("../components/settings/v-settings.vue"),
  // },
  // {
  //   path: '/call',
  //   name: 'call',
  //   component: () => import("../components/call/v-call.vue"),
  // },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import("../components/home/v-home.vue"),
  // },
  // {
  //   path: '/user',
  //   name: 'user',
  // загрузка компонента при обращении
  //   component: () => import("../components/users/chat/v-user-chat.vue"),
  //   props: true
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // short for `routes: routes`

  // linkActiveClass: 'new-active-link' // добавление своего класса для выбранной ссылки взамен стандартного "router-link-active"

  // поведение прокрутки
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve)=>{
      setTimeout(() => resolve({ top:0 }), 300)
    })
    // return {top:null, left:null, behavior:null}
  }
});

// если не выполняется условие, перенаправление на стр login для авторизации
router.beforeEach((to)=>{
  if(to.meta.requiresAuth && !window.user){
    return {name: 'login', query:{ redirect: to.fullPath }}
  }
})

export default router;
