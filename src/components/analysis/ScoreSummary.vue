<template>
  <div class="bg-[#11151B] text-white rounded-2xl p-6 flex flex-col gap-[18px]">
    <span class="text-[13px] font-semibold text-[#B9C0CC] tracking-[0.04em] uppercase">Umumiy baho</span>

    <div class="flex items-end gap-3.5">
      <span class="font-mono font-semibold text-[64px] leading-none">{{ score }}</span>
      <span class="text-[16px] text-[#B9C0CC] pb-2">/ 100</span>
      <span class="ml-auto text-[14px] font-bold px-3 py-1.5 rounded-full" :class="verdict.class">
        {{ verdict.label }}
      </span>
    </div>

    <div
      class="flex h-2.5 rounded-[5px] overflow-hidden gap-[3px]"
      role="img"
      :aria-label="`${counts.good} yaxshi, ${counts.average} o'rtacha, ${counts.bad} yomon`"
    >
      <div class="bg-[#3FB37F]" :style="{ width: pct(counts.good) }"></div>
      <div class="bg-[#F0A04B]" :style="{ width: pct(counts.average) }"></div>
      <div class="bg-[#F0645A]" :style="{ width: pct(counts.bad) }"></div>
    </div>

    <div class="flex flex-wrap gap-4 text-[14px]">
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-[3px] bg-[#3FB37F]"></span>Yaxshi · <b>{{ counts.good }}</b>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-[3px] bg-[#F0A04B]"></span>O'rtacha · <b>{{ counts.average }}</b>
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-[3px] bg-[#F0645A]"></span>Yomon · <b>{{ counts.bad }}</b>
      </span>
    </div>

    <span class="text-[13px] text-[#B9C0CC]">
      Baho sizning reytinglaringiz asosida hisoblanadi — jadvalda o'zgartirsangiz, darhol yangilanadi.
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // { good, average, bad }
    counts: { type: Object, required: true }
  },

  computed: {
    total() {
      return this.counts.good + this.counts.average + this.counts.bad
    },

    // Yaxshi = 2 ball, O'rtacha = 1 ball, Yomon = 0 ball
    score() {
      if (!this.total) return 0
      return Math.round((this.counts.good * 2 + this.counts.average) / (this.total * 2) * 100)
    },

    verdict() {
      if (this.score >= 75) return { label: 'Kuchli', class: 'bg-[#3FB37F] text-[#0B2A1B]' }
      if (this.score >= 50) return { label: "O'rtacha", class: 'bg-[#F0A04B] text-[#3A1D04]' }
      return { label: 'Zaif', class: 'bg-[#F0645A] text-[#3A0B07]' }
    }
  },

  methods: {
    pct(n) {
      return this.total ? (n / this.total * 100) + '%' : '0%'
    }
  }
}
</script>
