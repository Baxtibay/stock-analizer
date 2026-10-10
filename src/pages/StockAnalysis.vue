<template>
  <div class="max-w-[1120px] mx-auto flex flex-col gap-5 text-[#11151B]">

    <RouterLink
      to="/"
      class="self-start flex items-center gap-1.5 text-[14px] font-semibold py-2 text-[#4A525E] hover:text-[#11151B]"
    >
      <i class="fa-solid fa-chevron-left text-[12px]"></i>
      Aksiyalar
    </RouterLink>

    <AnalysisHeader
      :stock="a.stock"
      :done="a.done"
      :total="a.total"
      @edit="$router.push('/stock-analyzer')"
      @delete="confirmDelete = true"
    />

    <ConfirmDialog
      :open="confirmDelete"
      :title="`${a.stock.ticker} tahlilini o'chirasizmi?`"
      :message="`${a.stock.name} bo'yicha kiritilgan barcha ma'lumotlar o'chiriladi. Bu amalni qaytarib bo'lmaydi.`"
      confirm-text="O'chirish"
      danger
      @confirm="removeAnalysis"
      @cancel="confirmDelete = false"
    />

    <div class="flex flex-wrap gap-5">
      <ScoreSummary :counts="counts" class="flex-[1_1_340px]" />

      <div class="flex-[999_1_480px] grid grid-cols-2 gap-3">
        <StatTile label="Market Cap" :value="short(a.marketCap)" hint="2-etap" large />
        <StatTile label="Free Cash Flow" :value="short(fcf)" hint="5-etap" large />
        <StatTile label="Koeffitsient (CA / CL)" :value="ratio.toFixed(2)" hint="Me'yor: ≥ 1" large />
        <StatTile label="P/E" :value="a.pe" hint="4-etap" large />
      </div>
    </div>

    <nav aria-label="Bo'limlar" class="flex flex-wrap gap-2">
      <a
        v-for="(link, i) in nav"
        :key="link.id"
        :href="'#' + link.id"
        class="h-10 px-3.5 flex items-center rounded-full text-[13px]"
        :class="i === 0
          ? 'bg-[#11151B] text-white font-semibold'
          : 'bg-white border border-[#D3D8DF] text-[#2B323C] font-medium hover:bg-gray-100'"
      >
        {{ link.label }}
      </a>
    </nav>

    <AnalysisSection
      id="baholash"
      title="Yakuniy baholash"
      subtitle="Har bir ko'rsatkich uchun avtomatik baho va sizning bahoingiz."
    >
      <EvaluationTable v-model="ratings" :metrics="metrics" />

      <div class="flex flex-col gap-1.5 mt-2">
        <label for="xulosa" class="text-[14px] font-semibold">Mening yakuniy xulosam</label>
        <textarea
          id="xulosa"
          v-model="conclusion"
          rows="4"
          placeholder="Ushbu kompaniya bo'yicha umumiy fikringizni yozing..."
          class="p-3 border border-[#D3D8DF] rounded-[10px] text-[14px] leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        ></textarea>
      </div>
    </AnalysisSection>

    <AnalysisSection id="etap-1" number="1" title="Asosiy ma'lumotlar">
      <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <div
          v-for="note in notes"
          :key="note.label"
          class="bg-[#F7F8FA] rounded-xl p-4 flex flex-col gap-2"
        >
          <h3 class="m-0 text-[14px] font-semibold text-[#4A525E]">{{ note.label }}</h3>
          <p class="m-0 text-[15px] leading-relaxed" :class="note.text ? '' : 'text-[#5D6573] italic'">
            {{ note.text || "Ma'lumot kiritilmagan" }}
          </p>
        </div>
      </div>
    </AnalysisSection>

    <AnalysisSection id="etap-2" number="2" title="Moliyaviy ko'rsatkichlar">
      <div class="grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <StatTile label="Market Cap" :value="money(a.marketCap)" />
        <StatTile label="Ticker" :value="a.stock.ticker" />
        <StatTile label="Sector" :value="a.stock.sector" :mono="false" />
        <StatTile label="Industry" :value="a.stock.industry" :mono="false" />
        <StatTile label="Halollik" :value="a.stock.halal ? 'Halol' : 'Halol emas'" :mono="false" />
      </div>
    </AnalysisSection>

    <AnalysisSection id="etap-3" number="3" title="Qarz va majburiyatlar">
      <div class="grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <StatTile label="Total Current Assets" :value="money(a.currentAssets)" />
        <StatTile label="Total Liabilities" :value="money(a.totalLiabilities)" />
        <StatTile label="Total Current Liabilities" :value="money(a.currentLiabilities)" />
      </div>

      <div class="grid gap-3 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        <StatTile
          label="Qoida 1 · Assets − Liabilities"
          :value="(netAssets >= 0 ? '+' : '') + money(netAssets)"
          :hint="netAssets >= 0
            ? 'Musbat — kompaniya barcha qarzlarini qoplay oladi.'
            : 'Manfiy — kompaniya moliyaviy bosim ostida.'"
          :tone="netAssets >= 0 ? 'good' : 'bad'"
          large
        />
        <StatTile
          label="Qoida 2 · CA / CL koeffitsienti"
          :tone="ratio >= 1 ? 'good' : 'bad'"
          large
        >
          {{ ratio.toFixed(2) }}
          <div
            class="relative h-2 rounded mt-2.5 bg-[linear-gradient(90deg,#F6C9C4_0_33%,#CDEBD8_33%_100%)]"
            role="img"
            :aria-label="`Koeffitsient ${ratio.toFixed(2)}, me'yor 1`"
          >
            <div
              class="absolute -top-1 w-1 h-4 rounded-sm bg-[#11151B]"
              :style="{ left: `calc(${Math.min(ratio / 3, 1) * 100}% - 2px)` }"
            ></div>
          </div>
          <div class="flex justify-between font-mono font-medium text-[12px] text-[#5D6573] mt-1.5">
            <span>0</span><span>1.0</span><span>3.0</span>
          </div>
        </StatTile>
      </div>
    </AnalysisSection>

    <AnalysisSection id="etap-4" number="4" title="Multiplikatorlar">
      <div class="grid gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        <StatTile label="P/E" :value="a.pe" />
        <StatTile label="P/S" :value="a.ps" />
        <StatTile label="P/B" :value="a.pb" />
        <StatTile label="Dividend" :value="a.dividend + '%'" />
        <StatTile label="Payout Ratio" :value="a.payout + '%'" />
        <StatTile
          label="Graham Multiple"
          :value="graham.toFixed(2)"
          hint="P/E × P/B"
          :tone="graham > 22.5 ? 'bad' : 'good'"
        />
      </div>
    </AnalysisSection>

    <AnalysisSection id="etap-5" number="5" title="FCF — Pul oqimi">
      <div class="flex flex-wrap items-stretch gap-3">
        <StatTile class="flex-[1_1_200px]" label="Cash From Operations" :value="money(a.cashFromOperations)" />
        <span class="self-center font-mono font-semibold text-[24px] text-[#5D6573]" aria-hidden="true">−</span>
        <StatTile class="flex-[1_1_200px]" label="Capital Expenditure" :value="money(a.capitalExpenditure)" />
        <span class="self-center font-mono font-semibold text-[24px] text-[#5D6573]" aria-hidden="true">=</span>
        <StatTile
          class="flex-[1_1_200px]"
          label="Free Cash Flow"
          :value="money(fcf)"
          :tone="fcf >= 0 ? 'good' : 'bad'"
        />
      </div>
    </AnalysisSection>

  </div>
</template>

<script>
import AnalysisHeader from '../components/analysis/AnalysisHeader.vue'
import AnalysisSection from '../components/analysis/AnalysisSection.vue'
import ScoreSummary from '../components/analysis/ScoreSummary.vue'
import StatTile from '../components/analysis/StatTile.vue'
import EvaluationTable from '../components/analysis/EvaluationTable.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import { analysisDemo } from '../data/analysisDemo'

export default {
  components: { AnalysisHeader, AnalysisSection, ScoreSummary, StatTile, EvaluationTable, ConfirmDialog },

  data() {
    return {
      // TODO: $route.params.ticker bo'yicha saqlangan tahlilni yuklang
      a: analysisDemo,
      ratings: {},
      conclusion: '',
      confirmDelete: false,
      nav: [
        { id: 'baholash', label: 'Yakuniy baholash' },
        { id: 'etap-1', label: "1 · Asosiy ma'lumotlar" },
        { id: 'etap-2', label: '2 · Moliyaviy' },
        { id: 'etap-3', label: '3 · Qarz' },
        { id: 'etap-4', label: '4 · Multiplikatorlar' },
        { id: 'etap-5', label: '5 · FCF' }
      ]
    }
  },

  computed: {
    netAssets() {
      return this.a.currentAssets - this.a.totalLiabilities
    },

    ratio() {
      return this.a.currentAssets / this.a.currentLiabilities
    },

    graham() {
      return this.a.pe * this.a.pb
    },

    fcf() {
      return this.a.cashFromOperations - this.a.capitalExpenditure
    },

    notes() {
      return [
        { label: 'Nega aynan shu kompaniya?', text: this.a.notes.why },
        { label: 'Daromad manbalari', text: this.a.notes.revenue },
        { label: 'Business Moat', text: this.a.notes.moat }
      ]
    },

    metrics() {
      const a = this.a
      return [
        { id: 'halal', title: 'Halol / Islomga mosligi', from: '2-etap', value: a.stock.halal ? 'Halol' : 'Halol emas', auto: a.stock.halal ? 'good' : 'bad' },
        { id: 'net', title: 'Current Assets − Liabilities', from: '3-etap', value: this.short(this.netAssets), auto: this.netAssets >= 0 ? 'good' : 'bad' },
        { id: 'ratio', title: 'Koeffitsient (CA / CL)', from: '3-etap', value: this.ratio.toFixed(2), auto: this.ratio >= 1 ? 'good' : 'average' },
        { id: 'pe', title: 'P/E (Price / Earnings)', from: '4-etap', value: a.pe, auto: 'average' },
        { id: 'ps', title: 'P/S (Price / Sales)', from: '4-etap', value: a.ps, auto: 'good' },
        { id: 'pb', title: 'P/B (Price / Book)', from: '4-etap', value: a.pb, auto: 'good' },
        { id: 'div', title: 'Dividend', from: '4-etap', value: a.dividend + '%', auto: 'good' },
        { id: 'payout', title: 'Payout Ratio', from: '4-etap', value: a.payout + '%', auto: 'average' },
        { id: 'graham', title: 'Graham Multiple', from: '4-etap', value: this.graham.toFixed(2), auto: this.graham > 22.5 ? 'bad' : 'good' },
        { id: 'fcf', title: 'Free Cash Flow', from: '5-etap', value: this.short(this.fcf), auto: this.fcf >= 0 ? 'good' : 'bad' }
      ]
    },

    counts() {
      const counts = { good: 0, average: 0, bad: 0 }
      this.metrics.forEach(m => counts[this.ratings[m.id] || m.auto]++)
      return counts
    }
  },

  methods: {
    removeAnalysis() {
      // TODO: API orqali o'chirish so'rovini yuboring
      this.confirmDelete = false
      this.$router.push('/')
    },

    money(n) {
      return n.toLocaleString('ru-RU') + ' $'
    },

    short(n) {
      const abs = Math.abs(n)
      if (abs >= 1e9) return '$' + (n / 1e9).toFixed(1) + ' mlrd'
      if (abs >= 1e6) return '$' + Math.round(n / 1e6) + ' mln'
      return '$' + n.toLocaleString('ru-RU')
    }
  }
}
</script>
