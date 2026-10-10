<template>
  <div class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-3.5">
    <h2 class="m-0 text-[16px] font-bold">Natijalar</h2>

    <div class="flex items-center justify-between gap-3 px-3.5 py-3 rounded-[10px] bg-[#F1FAF4]">
      <div class="flex flex-col gap-0.5">
        <span class="text-[12px] font-semibold text-[#1F6B45]">Eng yaxshi</span>
        <span class="font-mono font-semibold text-[16px]">{{ best.ticker }}</span>
      </div>
      <span class="font-mono font-semibold text-[16px]" :class="tone(best.plPct)">{{ signedPct(best.plPct) }}</span>
    </div>

    <div class="flex items-center justify-between gap-3 px-3.5 py-3 rounded-[10px] bg-[#FEF4F3]">
      <div class="flex flex-col gap-0.5">
        <span class="text-[12px] font-semibold text-[#8F1D14]">Eng past</span>
        <span class="font-mono font-semibold text-[16px]">{{ worst.ticker }}</span>
      </div>
      <span class="font-mono font-semibold text-[16px]" :class="tone(worst.plPct)">{{ signedPct(worst.plPct) }}</span>
    </div>
  </div>
</template>

<script>
import { signedPct } from '../../utils/format'

export default {
  props: {
    // { ticker, plPct }
    best: { type: Object, required: true },
    worst: { type: Object, required: true }
  },

  methods: {
    signedPct,

    tone(n) {
      return n >= 0 ? 'text-[#1F7A4D]' : 'text-[#B42318]'
    }
  }
}
</script>
