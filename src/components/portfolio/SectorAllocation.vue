<template>
  <div class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-4">
    <h2 class="m-0 text-[16px] font-bold">Sektorlar bo'yicha taqsimot</h2>

    <div
      class="flex h-3.5 rounded-[7px] overflow-hidden gap-[3px]"
      role="img"
      :aria-label="sectors.map(s => `${s.name} ${s.pct.toFixed(1)}%`).join(', ')"
    >
      <div
        v-for="sector in sectors"
        :key="sector.name"
        :style="{ background: colorOf(sector.name), width: sector.pct + '%' }"
      ></div>
    </div>

    <div class="grid gap-x-5 gap-y-2.5 grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]">
      <div v-for="sector in sectors" :key="sector.name" class="flex items-center gap-2.5 text-[14px]">
        <span class="w-3 h-3 flex-none rounded-[3px]" :style="{ background: colorOf(sector.name) }"></span>
        <span class="flex-1 text-[#2B323C]">{{ sector.name }}</span>
        <span class="font-mono font-semibold">{{ sector.pct.toFixed(1) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
// Ranglar yorqinligi bilan ham farqlanadi — faqat rangga tayanmaslik uchun
const PALETTE = ['#1E4FD8', '#8CA9F3', '#D9822B', '#6B7380', '#163BA3', '#F0B67A', '#B9C0CC']

export default {
  props: {
    // [{ name, pct }] — pct bo'yicha kamayish tartibida
    sectors: { type: Array, required: true }
  },

  methods: {
    colorOf(name) {
      const i = this.sectors.findIndex(s => s.name === name)
      return PALETTE[i % PALETTE.length]
    }
  }
}
</script>
