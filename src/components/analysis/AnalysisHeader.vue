<template>
  <section
    class="bg-white border border-[#E2E5EA] rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-5"
  >
    <div class="flex items-center gap-4 min-w-0">
      <div
        class="w-14 h-14 flex-none rounded-[14px] bg-[#11151B] text-white flex items-center justify-center font-mono font-semibold text-[16px]"
      >
        {{ stock.ticker.slice(0, 2) }}
      </div>
      <div class="flex flex-col gap-1.5 min-w-0">
        <div class="flex flex-wrap items-center gap-2.5">
          <h1 class="m-0 font-mono font-semibold text-[28px] tracking-[0.01em] text-[#11151B]">
            {{ stock.ticker }}
          </h1>
          <StatusBadge :status="stock.halal ? 'good' : 'bad'">
            {{ stock.halal ? 'Halol' : 'Halol emas' }}
          </StatusBadge>
          <StatusBadge :status="done >= total ? 'info' : 'average'">
            {{ done >= total ? "To'liq" : 'Jarayonda' }} · {{ done }}/{{ total }}
          </StatusBadge>
        </div>
        <span class="text-[15px] text-[#3B434E]">
          {{ stock.name }} · {{ stock.sector }} · {{ stock.industry }}
        </span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2.5">
      <button
        type="button"
        class="h-11 px-4 rounded-[10px] border border-[#D3D8DF] bg-white text-[#11151B] font-semibold text-[14px] flex items-center gap-2 hover:bg-gray-50"
        @click="$emit('edit')"
      >
        <i class="fa-solid fa-pen"></i>
        Tahrirlash
      </button>
      <button
        type="button"
        class="h-11 px-4 rounded-[10px] bg-[#11151B] text-white font-semibold text-[14px] flex items-center gap-2 hover:bg-black"
        @click="$emit('download')"
      >
        <i class="fa-solid fa-download"></i>
        PDF yuklab olish
      </button>
      <ActionMenu
        class="self-center"
        placement="bottom"
        :items="menu"
        :label="`${stock.ticker} amallari`"
        @select="$emit($event)"
      />
    </div>
  </section>
</template>

<script>
import StatusBadge from './StatusBadge.vue'
import ActionMenu from '../common/ActionMenu.vue'

export default {
  components: { StatusBadge, ActionMenu },
  props: {
    // { ticker, name, sector, industry, halal }
    stock: { type: Object, required: true },
    done: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  emits: ['edit', 'download', 'delete'],
  data() {
    return {
      menu: [
        { key: 'delete', label: "O'chirish", icon: 'fa-trash-can', danger: true }
      ]
    }
  }
}
</script>
