<template>
  <section class="grid gap-3 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
    <div class="bg-[#11151B] text-white rounded-[14px] p-5 flex flex-col gap-2">
      <span class="text-[13px] text-[#B9C0CC] font-medium">Joriy qiymat</span>
      <span class="font-mono font-semibold text-[28px]">{{ money(value) }}</span>
      <span class="text-[13px] font-semibold" :class="up ? 'text-[#8FDCB4]' : 'text-[#F7A39C]'">
        {{ signedMoney(pl) }} ({{ signedPct(plPct) }})
      </span>
    </div>

    <div class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-2">
      <span class="text-[13px] text-[#5D6573] font-medium">Kiritilgan mablag'</span>
      <span class="font-mono font-semibold text-[28px]">{{ money(cost) }}</span>
      <span class="text-[13px] text-[#5D6573]">O'rtacha xarid narxi bo'yicha</span>
    </div>

    <div class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-2">
      <span class="text-[13px] text-[#5D6573] font-medium">Umumiy foyda / zarar</span>
      <span class="font-mono font-semibold text-[28px]" :class="plClass">{{ signedMoney(pl) }}</span>
      <span class="text-[13px] font-semibold" :class="plClass">{{ signedPct(plPct) }}</span>
    </div>

    <div class="bg-white border border-[#E2E5EA] rounded-[14px] p-5 flex flex-col gap-2">
      <span class="text-[13px] text-[#5D6573] font-medium">Tahlil holati</span>
      <span class="font-mono font-semibold text-[28px]">{{ analyzed }}/{{ count }}</span>
      <span class="text-[13px] text-[#5D6573]">to'liq tahlil qilingan</span>
    </div>
  </section>
</template>

<script>
import { money, signedMoney, signedPct } from '../../utils/format'

export default {
  props: {
    value: { type: Number, required: true },
    cost: { type: Number, required: true },
    count: { type: Number, required: true },
    analyzed: { type: Number, required: true }
  },

  computed: {
    pl() {
      return this.value - this.cost
    },

    plPct() {
      return this.cost ? this.pl / this.cost * 100 : 0
    },

    up() {
      return this.pl >= 0
    },

    plClass() {
      return this.up ? 'text-[#1F7A4D]' : 'text-[#B42318]'
    }
  },

  methods: { money, signedMoney, signedPct }
}
</script>
