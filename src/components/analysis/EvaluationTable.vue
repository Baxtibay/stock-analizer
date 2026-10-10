<template>
  <div class="flex flex-col">
    <div
      class="hidden md:flex gap-4 px-3.5 py-2.5 bg-[#F4F5F7] rounded-[10px] text-[12px] font-semibold text-[#4A525E] uppercase tracking-[0.04em]"
    >
      <span class="flex-1 min-w-[200px]">Ko'rsatkich</span>
      <span class="w-[130px]">Qiymat</span>
      <span class="w-[110px]">Avtomatik</span>
      <span class="w-[280px]">Mening bahom</span>
    </div>

    <div
      v-for="metric in metrics"
      :key="metric.id"
      class="flex flex-wrap items-center gap-x-4 gap-y-3 p-3.5 border-b border-[#EEF0F3]"
    >
      <div class="flex-1 min-w-[200px] flex flex-col gap-0.5">
        <span class="text-[15px] font-semibold text-[#11151B]">{{ metric.title }}</span>
        <span class="text-[12px] text-[#5D6573]">{{ metric.from }}</span>
      </div>
      <span class="w-[130px] font-mono font-semibold text-[15px] text-[#11151B]">{{ metric.value }}</span>
      <span class="w-[110px]"><StatusBadge :status="metric.auto" /></span>
      <div class="w-full md:w-[280px]">
        <RatingSelector
          :modelValue="modelValue[metric.id] || metric.auto"
          @update:modelValue="rate(metric.id, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatusBadge from './StatusBadge.vue'
import RatingSelector from '../stockAnalyzer/final/RatingSelector.vue'

export default {
  components: { StatusBadge, RatingSelector },

  props: {
    // [{ id, title, from, value, auto: 'good' | 'average' | 'bad' }]
    metrics: { type: Array, required: true },
    // { [metric.id]: 'good' | 'average' | 'bad' } — foydalanuvchi bahosi
    modelValue: { type: Object, default: () => ({}) }
  },

  emits: ['update:modelValue'],

  methods: {
    rate(id, value) {
      this.$emit('update:modelValue', { ...this.modelValue, [id]: value })
    }
  }
}
</script>
