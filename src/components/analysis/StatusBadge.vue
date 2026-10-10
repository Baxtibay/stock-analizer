<template>
  <span
    class="inline-block text-[12px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
    :class="styles[status]"
  >
    <slot>{{ labels[status] }}</slot>
  </span>
</template>

<script>
export default {
  props: {
    // good | average | bad | info
    status: { type: String, default: 'info' }
  },

  data() {
    return {
      labels: { good: 'Yaxshi', average: "O'rtacha", bad: 'Yomon', info: '' },
      styles: {
        good: 'bg-[#E3F4EA] text-[#1F6B45]',
        average: 'bg-[#FDEBDD] text-[#8A3B0A]',
        bad: 'bg-[#FDE7E5] text-[#8F1D14]',
        info: 'bg-[#E3EAFC] text-[#163BA3]'
      }
    }
  }
}
</script>
