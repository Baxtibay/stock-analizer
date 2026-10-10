<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="w-9 h-9 flex items-center justify-center rounded-lg text-[#5D6573] hover:bg-gray-100 hover:text-[#11151B]"
      :class="open ? 'bg-gray-100 text-[#11151B]' : ''"
      :aria-label="label"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      <i class="fa-solid fa-ellipsis"></i>
    </button>

    <div
      v-if="open"
      role="menu"
      class="absolute right-0 bottom-full mb-1 z-20 min-w-[170px] bg-white border border-[#E2E5EA] rounded-xl shadow-lg p-1"
      :class="placement === 'bottom' ? '!top-full !bottom-auto mt-1 mb-0' : ''"
    >
      <button
        v-for="item in items"
        :key="item.key"
        type="button"
        role="menuitem"
        class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] text-left"
        :class="item.danger
          ? 'text-[#B42318] hover:bg-[#FEF4F3]'
          : 'text-[#2B323C] hover:bg-gray-100'"
        @click="choose(item)"
      >
        <i :class="['fa-solid', item.icon, 'w-4']"></i>
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // [{ key, label, icon, danger }]
    items: { type: Array, required: true },
    label: { type: String, default: 'Amallar' },
    // top | bottom — menyu tugmaning ustida yoki ostida ochiladi
    placement: { type: String, default: 'top' }
  },

  emits: ['select'],

  data() {
    return { open: false }
  },

  mounted() {
    document.addEventListener('click', this.onOutside)
    document.addEventListener('keydown', this.onKey)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.onOutside)
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    choose(item) {
      this.open = false
      this.$emit('select', item.key)
    },

    onOutside(e) {
      if (this.open && !this.$refs.root.contains(e.target)) this.open = false
    },

    onKey(e) {
      if (this.open && e.key === 'Escape') this.open = false
    }
  }
}
</script>
