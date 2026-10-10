<template>
  <section class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-3.5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="m-0 text-[16px] font-bold">Pozitsiyalar</h2>

      <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Saralash">
        <span class="text-[13px] text-[#5D6573]">Saralash:</span>
        <button
          v-for="option in sortOptions"
          :key="option.key"
          type="button"
          :aria-pressed="sortBy === option.key"
          class="h-9 px-3 rounded-full border text-[13px] font-semibold"
          :class="sortBy === option.key
            ? 'border-[#11151B] bg-[#11151B] text-white'
            : 'border-[#D3D8DF] bg-white text-[#2B323C] hover:bg-gray-100'"
          @click="sortBy = option.key"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Kichik va o'rta ekranlarda: kartochkalar ro'yxati -->
    <ul class="xl:hidden m-0 p-0 list-none flex flex-col gap-3">
      <li
        v-for="row in sorted"
        :key="row.ticker"
        class="border border-[#EEF0F3] rounded-xl p-4 flex flex-col gap-3"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 flex-none rounded-[10px] bg-[#F0F2F5] flex items-center justify-center font-mono font-semibold text-[12px] text-[#2B323C]"
          >
            {{ row.ticker.slice(0, 2) }}
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <span class="font-mono font-semibold text-[15px]">{{ row.ticker }}</span>
            <span class="text-[13px] text-[#5D6573] truncate">{{ row.name }}</span>
          </div>
          <div class="flex flex-col items-end">
            <span class="font-mono font-semibold text-[15px]">{{ money(row.value) }}</span>
            <span class="font-mono text-[12px]" :class="row.pl >= 0 ? 'text-[#1F7A4D]' : 'text-[#B42318]'">
              {{ signedMoney(row.pl) }} ({{ signedPct(row.plPct) }})
            </span>
          </div>
        </div>

        <dl class="m-0 grid grid-cols-3 gap-2 text-[13px]">
          <div class="flex flex-col gap-0.5">
            <dt class="text-[#5D6573]">Soni</dt>
            <dd class="m-0 font-mono">{{ row.shares }}</dd>
          </div>
          <div class="flex flex-col gap-0.5">
            <dt class="text-[#5D6573]">O'rt. narx</dt>
            <dd class="m-0 font-mono">{{ money(row.avgPrice) }}</dd>
          </div>
          <div class="flex flex-col gap-0.5">
            <dt class="text-[#5D6573]">Joriy narx</dt>
            <dd class="m-0 font-mono">{{ money(row.price) }}</dd>
          </div>
        </dl>

        <div class="flex items-center justify-between gap-2 border-t border-[#EEF0F3] pt-2.5">
          <div class="flex items-center gap-2 min-w-0">
            <RouterLink
              :to="row.score !== null ? `/analysis/${row.ticker}` : '/stock-analyzer'"
              class="inline-block whitespace-nowrap text-[12px] font-semibold px-2.5 py-1 rounded-full"
              :class="row.score !== null ? 'bg-[#E3EAFC] text-[#163BA3]' : 'bg-[#FDEBDD] text-[#8A3B0A]'"
            >
              {{ analysisText(row) }}
            </RouterLink>
            <span class="text-[12px] text-[#5D6573] whitespace-nowrap">Ulush {{ row.weight.toFixed(1) }}%</span>
          </div>
          <ActionMenu
            :items="menu"
            :label="`${row.ticker} amallari`"
            @select="onMenu($event, row)"
          />
        </div>
      </li>
    </ul>

    <!-- Katta ekranlarda: jadval (joy yetmasa yon tomonga suriladi) -->
    <div class="hidden xl:block overflow-x-auto">
      <div class="min-w-[920px] flex flex-col">
        <div
          class="grid gap-3 px-3 py-2.5 bg-[#F4F5F7] rounded-[10px] text-[12px] font-semibold text-[#4A525E] uppercase tracking-[0.04em]"
          :style="{ gridTemplateColumns: columns }"
        >
          <span>Aksiya</span>
          <span class="text-right">Soni</span>
          <span class="text-right">O'rt. narx</span>
          <span class="text-right">Joriy narx</span>
          <span class="text-right">Qiymat</span>
          <span class="text-right">Foyda / zarar</span>
          <span class="text-right">Ulush</span>
          <span>Tahlil</span>
          <span></span>
        </div>

        <div
          v-for="(row, i) in sorted"
          :key="row.ticker"
          class="grid gap-3 items-center px-3 py-3.5 border-b border-[#EEF0F3] text-[14px]"
          :style="{ gridTemplateColumns: columns }"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-[38px] h-[38px] flex-none rounded-[10px] bg-[#F0F2F5] flex items-center justify-center font-mono font-semibold text-[12px] text-[#2B323C]"
            >
              {{ row.ticker.slice(0, 2) }}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-mono font-semibold text-[15px]">{{ row.ticker }}</span>
              <span class="text-[13px] text-[#5D6573] truncate">{{ row.name }}</span>
            </div>
          </div>
          <span class="text-right font-mono">{{ row.shares }}</span>
          <span class="text-right font-mono">{{ money(row.avgPrice) }}</span>
          <span class="text-right font-mono">{{ money(row.price) }}</span>
          <span class="text-right font-mono font-semibold">{{ money(row.value) }}</span>
          <div class="flex flex-col items-end font-mono" :class="row.pl >= 0 ? 'text-[#1F7A4D]' : 'text-[#B42318]'">
            <span class="font-semibold">{{ signedMoney(row.pl) }}</span>
            <span class="text-[12px]">{{ signedPct(row.plPct) }}</span>
          </div>
          <span class="text-right font-mono">{{ row.weight.toFixed(1) }}%</span>
          <span>
            <RouterLink
              :to="row.score !== null ? `/analysis/${row.ticker}` : '/stock-analyzer'"
              class="inline-block whitespace-nowrap text-[12px] font-semibold px-2.5 py-1 rounded-full"
              :class="row.score !== null ? 'bg-[#E3EAFC] text-[#163BA3]' : 'bg-[#FDEBDD] text-[#8A3B0A]'"
            >
              {{ analysisText(row) }}
            </RouterLink>
          </span>
          <!-- Jadval yon tomonga suriladigan quti ichida: pastki qatorlarda menyu kesilmasligi uchun yuqoriga ochiladi -->
          <ActionMenu
            :placement="i > 0 && i >= sorted.length - 2 ? 'top' : 'bottom'"
            :items="menu"
            :label="`${row.ticker} amallari`"
            @select="onMenu($event, row)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ActionMenu from '../common/ActionMenu.vue'
import { money, signedMoney, signedPct } from '../../utils/format'

export default {
  components: { ActionMenu },

  props: {
    // [{ ticker, name, shares, avgPrice, price, value, pl, plPct, weight, score, done }]
    positions: { type: Array, required: true },
    totalStages: { type: Number, default: 6 }
  },

  emits: ['remove'],

  data() {
    return {
      sortBy: 'value',
      sortOptions: [
        { key: 'value', label: 'Qiymat' },
        { key: 'plPct', label: 'Foyda %' },
        { key: 'ticker', label: 'Nomi' }
      ],
      menu: [
        { key: 'analysis', label: "Tahlilni ko'rish", icon: 'fa-chart-pie' },
        { key: 'remove', label: 'Sotish', icon: 'fa-hand-holding-dollar' }
      ],
      columns: '2fr 0.6fr 1fr 1fr 1.1fr 1.2fr 0.7fr 1.4fr 44px'
    }
  },

  computed: {
    sorted() {
      const rows = [...this.positions]
      if (this.sortBy === 'ticker') return rows.sort((a, b) => a.ticker.localeCompare(b.ticker))
      return rows.sort((a, b) => b[this.sortBy] - a[this.sortBy])
    }
  },

  methods: {
    money,
    signedMoney,
    signedPct,

    analysisText(row) {
      if (row.score === null) return `${row.done}/${this.totalStages} · Jarayonda`
      const verdict = row.score >= 75 ? 'Kuchli' : row.score >= 50 ? "O'rtacha" : 'Zaif'
      return `${row.score} · ${verdict}`
    },

    onMenu(key, row) {
      if (key === 'analysis') {
        this.$router.push(row.score !== null ? `/analysis/${row.ticker}` : '/stock-analyzer')
      }
      if (key === 'remove') this.$emit('remove', row)
    }
  }
}
</script>
