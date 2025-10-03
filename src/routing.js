import { createWebHistory, createRouter } from 'vue-router'

import HomeScreen from './components/HomeScreen.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import List from './components/List/List.vue';
import TrashList from './components/List/TrashList.vue';
import ListHolder from './components/ListHolder.vue';

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/sign-up', component: SignUp },
  { path: '/sign-in', component: SignIn },
  { path: '/list', component: ListHolder, children: [
    {path: '', component: List},
    {path: 'trash', component: TrashList}
  ]},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})