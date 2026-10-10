import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import StockAnalyzer from '../pages/StockAnalyzer.vue'
import StockAnalysis from '../pages/StockAnalysis.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard
  },
  {
    path: "/stock-analyzer",
    component: StockAnalyzer,
  },
  {
    path: "/analysis/:ticker",
    component: StockAnalysis,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
