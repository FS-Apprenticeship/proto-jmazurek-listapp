import { createWebHistory, createRouter } from 'vue-router'

import HomeScreen from './components/HomeScreen.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import List from './components/List/List.vue';

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/sign-up', component: SignUp },
  { path: '/sign-in', component: SignIn },
  { path: '/list', component: List, children: [
    {path: 'trash', component: List}
  ]},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})