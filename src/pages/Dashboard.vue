<template>
  <div class="max-w-[1280px] mx-auto flex flex-col gap-6 text-[#11151B]">

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-3">
        <h1 class="m-0 text-[30px] font-bold tracking-[-0.02em]">Aksiyalar</h1>

        <div class="flex flex-wrap gap-2" role="group" aria-label="Holat bo'yicha filtr">
          <button
            v-for="chip in chips"
            :key="chip.key"
            type="button"
            :aria-pressed="filter === chip.key"
            class="h-10 px-3.5 rounded-full border text-[13px] cursor-pointer"
            :class="filter === chip.key
              ? 'border-[#11151B] bg-[#11151B] text-white font-semibold'
              : 'border-[#D3D8DF] bg-white text-[#2B323C] font-medium hover:bg-gray-100'"
            @click="filter = chip.key"
          >
            {{ chip.label }} · {{ counts[chip.key] }}
          </button>
        </div>
      </div>

      <RouterLink
        to="/stock-analyzer"
        class="h-11 px-[18px] rounded-[10px] bg-[#11151B] text-white font-semibold text-[14px] flex items-center gap-2 hover:bg-black"
      >
        <i class="fa-solid fa-plus"></i>
        Aksiya qo'shish
      </RouterLink>
    </div>

    <div class="flex flex-col gap-3">
      <StockCard
        v-for="stock in shown"
        :key="stock.ticker"
        :stock="stock"
        :stages="stages"
        :status="statusOf(stock)"
        @delete="toDelete = $event"
      />

      <p v-if="!shown.length" class="text-center text-[14px] text-[#565E6B] py-10">
        Hech narsa topilmadi
      </p>
    </div>

    <ConfirmDialog
      :open="!!toDelete"
      :title="`${toDelete?.ticker} tahlilini o'chirasizmi?`"
      :message="`${toDelete?.name} bo'yicha kiritilgan barcha ma'lumotlar o'chiriladi. Bu amalni qaytarib bo'lmaydi.`"
      confirm-text="O'chirish"
      danger
      @confirm="removeStock"
      @cancel="toDelete = null"
    />

  </div>
</template>

<script>
import StockCard from '../components/home/StockCard.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'

export default {
  components: { StockCard, ConfirmDialog },

  data() {
    return {
      filter: 'all',
      toDelete: null,
      search: this.$route.query.q || '',

      // Stock analyzer sahifasidagi etaplar bilan bir xil
      stages: [
        "Asosiy ma'lumotlar",
        "Moliyaviy ko'rsatkichlar",
        "Qarz va majburiyatlar",
        "Multiplikatorlar",
        "FCF - Pul oqimi",
        "Yakuniy baholash"
      ],

      chips: [
        { key: 'all', label: 'Hammasi' },
        { key: 'full', label: "To'liq" },
        { key: 'partial', label: 'Jarayonda' },
        { key: 'empty', label: 'Boshlanmagan' }
      ],

      // TODO: demo ma'lumotlar — keyinchalik API yoki saqlangan tahlillar bilan almashtiring
      stocks: [
        { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Texnologiya', done: 6 },
        { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Texnologiya', done: 5 },
        { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: "Yarimo'tkazgichlar", done: 6 },
        { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: "Iste'mol tovarlari", done: 3 },
        { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Aloqa xizmatlari', done: 2 },
        { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Avtomobilsozlik', done: 1 },
        { ticker: 'META', name: 'Meta Platforms', sector: 'Aloqa xizmatlari', done: 3 },
        { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Moliya', done: 0 },
        { ticker: 'KO', name: 'Coca-Cola Co.', sector: 'Ichimliklar', done: 6 },
        { ticker: 'V', name: 'Visa Inc.', sector: 'Moliya', done: 2 },
        { ticker: 'JNJ', name: 'Johnson & Johnson', sector: "Sog'liqni saqlash", done: 4 },
        { ticker: 'XOM', name: 'Exxon Mobil', sector: 'Energetika', done: 0 }
      ]
    }
  },

  computed: {
    counts() {
      const counts = { all: this.stocks.length, full: 0, partial: 0, empty: 0 }
      this.stocks.forEach(s => counts[this.statusOf(s)]++)
      return counts
    },

    shown() {
      const q = this.search.trim().toLowerCase()
      return this.stocks.filter(s =>
        (this.filter === 'all' || this.statusOf(s) === this.filter) &&
        (!q || s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
      )
    }
  },

  watch: {
    // Header'dagi qidiruv formasi ?q= orqali shu yerga keladi
    '$route.query.q'(q) {
      this.search = q || ''
    }
  },

  methods: {
    removeStock() {
      // TODO: API orqali o'chirish so'rovini yuboring
      this.stocks = this.stocks.filter(s => s.ticker !== this.toDelete.ticker)
      this.toDelete = null
    },

    statusOf(stock) {
      if (stock.done >= this.stages.length) return 'full'
      if (stock.done === 0) return 'empty'
      return 'partial'
    }
  }
}
</script>
