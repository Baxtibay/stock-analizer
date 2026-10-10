<template>
  <article class="bg-white border border-[#E2E5EA] rounded-[14px] px-5 py-4 flex flex-col gap-3">
    <!-- Mobil: nom + badge yuqorida, indikator pastda. sm+: nom | indikator | badge bitta qatorda -->
    <div class="flex flex-wrap sm:flex-nowrap items-center gap-x-6 gap-y-3">
      <div class="flex items-center gap-3 min-w-0 flex-1 sm:flex-none sm:w-72">
        <div
          class="w-10 h-10 flex-none rounded-[10px] bg-[#F0F2F5] flex items-center justify-center font-mono font-semibold text-[13px] text-[#2B323C]"
        >
          {{ stock.ticker.slice(0, 2) }}
        </div>
        <div class="flex flex-col min-w-0">
          <h2 class="m-0 font-mono font-semibold text-[16px] tracking-[0.01em] text-[#11151B]">
            {{ stock.ticker }}
          </h2>
          <span class="text-[13px] text-[#5D6573] truncate">{{ stock.name }} · {{ stock.sector }}</span>
        </div>
      </div>

      <div class="order-last sm:order-none w-full sm:w-auto sm:flex-1 flex items-center gap-3">
        <div
          class="flex-1 grid gap-1"
          :style="{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }"
          role="img"
          :aria-label="`Ma'lumot to'ldirilishi: ${stock.done} / ${stages.length} etap`"
          :title="nextText"
        >
          <div
            v-for="(stage, i) in stages"
            :key="stage"
            class="h-1.5 rounded"
            :class="i < stock.done ? 'bg-[#1E4FD8]' : 'bg-[#DDE2EA]'"
          ></div>
        </div>
        <span class="flex-none font-mono font-semibold text-[12px] text-[#2B323C]">
          {{ stock.done }}/{{ stages.length }}
        </span>
      </div>

      <span
        class="flex-none sm:w-28 text-center text-[12px] font-semibold px-[9px] py-1 rounded-full"
        :class="badge.class"
      >
        {{ badge.label }}
      </span>
    </div>

    <div class="border-t border-[#EEF0F3] pt-2.5 flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
      <span class="text-[12px] text-[#5D6573]">{{ nextText }}</span>
      <div class="flex items-center gap-2 ml-auto">
        <RouterLink
          :to="status === 'full' ? `/analysis/${stock.ticker}` : '/stock-analyzer'"
          class="text-[13px] font-semibold py-1 text-[#1E4FD8] hover:text-[#163BA3]"
        >
          {{ actionText }} →
        </RouterLink>
        <ActionMenu
          :items="menu"
          :label="`${stock.ticker} amallari`"
          @select="onMenu"
        />
      </div>
    </div>
  </article>
</template>

<script>
import ActionMenu from '../common/ActionMenu.vue'

export default {
  components: { ActionMenu },

  props: {
    stock: { type: Object, required: true },
    stages: { type: Array, required: true },
    status: { type: String, required: true }
  },

  emits: ['delete'],

  data() {
    return {
      menu: [
        { key: 'edit', label: 'Tahrirlash', icon: 'fa-pen' },
        { key: 'delete', label: "O'chirish", icon: 'fa-trash-can', danger: true }
      ]
    }
  },

  computed: {
    badge() {
      if (this.status === 'full') {
        return { label: "To'liq", class: 'bg-[#E3EAFC] text-[#163BA3]' }
      }
      if (this.status === 'partial') {
        return { label: 'Jarayonda', class: 'bg-[#FDEBDD] text-[#8A3B0A]' }
      }
      return { label: 'Boshlanmagan', class: 'bg-[#EEF0F3] text-[#4A525E]' }
    },

    nextText() {
      if (this.status === 'full') return "Barcha etaplar to'ldirilgan"
      return 'Keyingi etap: ' + this.stages[this.stock.done]
    },

    actionText() {
      if (this.status === 'full') return "Tahlilni ko'rish"
      if (this.status === 'empty') return "To'ldirishni boshlash"
      return 'Davom ettirish'
    }
  },

  methods: {
    onMenu(key) {
      if (key === 'edit') this.$router.push('/stock-analyzer')
      if (key === 'delete') this.$emit('delete', this.stock)
    }
  }
}
</script>
