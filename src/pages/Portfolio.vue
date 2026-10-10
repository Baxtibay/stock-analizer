<template>
  <div class="max-w-[1180px] mx-auto flex flex-col gap-5 text-[#11151B]">

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="m-0 text-[30px] font-bold tracking-[-0.02em]">My portfel</h1>
        <p class="m-0 text-[15px] text-[#565E6B]">
          {{ positions.length ? `${positions.length} ta aksiya · narxlar qo'lda kiritilgan` : "Hali aksiya qo'shilmagan" }}
        </p>
      </div>

      <button
        v-if="positions.length"
        type="button"
        class="h-11 px-[18px] rounded-[10px] bg-[#11151B] text-white font-semibold text-[14px] flex items-center gap-2 hover:bg-black"
        @click="addPosition"
      >
        <i class="fa-solid fa-plus"></i>
        Pozitsiya qo'shish
      </button>
    </div>

    <EmptyPortfolio v-if="!positions.length" @add="addPosition" />

    <template v-else>
      <PortfolioStats
        :value="totalValue"
        :cost="totalCost"
        :count="positions.length"
        :analyzed="positions.filter(p => p.score !== null).length"
      />

      <div class="flex flex-wrap gap-3">
        <SectorAllocation :sectors="sectors" class="flex-[999_1_520px]" />
        <PerformanceCard :best="ranked[0]" :worst="ranked[ranked.length - 1]" class="flex-[1_1_300px]" />
      </div>

      <PositionsTable :positions="rows" @remove="toRemove = $event" />
    </template>

    <ConfirmDialog
      :open="!!toRemove"
      :title="`${toRemove?.ticker} sotilsinmi?`"
      :message="`${toRemove?.shares} dona aksiya portfeldan chiqariladi. Aksiya tahlili o'chirilmaydi.`"
      confirm-text="Sotish"
      @confirm="removePosition"
      @cancel="toRemove = null"
    />

  </div>
</template>

<script>
import PortfolioStats from '../components/portfolio/PortfolioStats.vue'
import SectorAllocation from '../components/portfolio/SectorAllocation.vue'
import PerformanceCard from '../components/portfolio/PerformanceCard.vue'
import PositionsTable from '../components/portfolio/PositionsTable.vue'
import EmptyPortfolio from '../components/portfolio/EmptyPortfolio.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import { portfolioDemo } from '../data/portfolioDemo'

export default {
  components: { PortfolioStats, SectorAllocation, PerformanceCard, PositionsTable, EmptyPortfolio, ConfirmDialog },

  data() {
    return {
      positions: [...portfolioDemo],
      toRemove: null
    }
  },

  computed: {
    totalValue() {
      return this.positions.reduce((sum, p) => sum + p.shares * p.price, 0)
    },

    totalCost() {
      return this.positions.reduce((sum, p) => sum + p.shares * p.avgPrice, 0)
    },

    // Har bir pozitsiya uchun hisoblangan qiymatlar
    rows() {
      return this.positions.map(p => {
        const value = p.shares * p.price
        const cost = p.shares * p.avgPrice
        return {
          ...p,
          value,
          pl: value - cost,
          plPct: (value - cost) / cost * 100,
          weight: value / this.totalValue * 100
        }
      })
    },

    // Foyda % bo'yicha: birinchisi eng yaxshi, oxirgisi eng past
    ranked() {
      return [...this.rows].sort((a, b) => b.plPct - a.plPct)
    },

    sectors() {
      const sums = {}
      this.rows.forEach(r => { sums[r.sector] = (sums[r.sector] || 0) + r.value })
      return Object.entries(sums)
        .map(([name, value]) => ({ name, pct: value / this.totalValue * 100 }))
        .sort((a, b) => b.pct - a.pct)
    }
  },

  methods: {
    addPosition() {
      // TODO: aksiya, soni va o'rtacha narxni kiritish oynasini oching
    },

    removePosition() {
      // TODO: API orqali portfeldan chiqarish so'rovini yuboring
      this.positions = this.positions.filter(p => p.ticker !== this.toRemove.ticker)
      this.toRemove = null
    }
  }
}
</script>
