<template>
  <div class="bg-white border rounded-2xl p-6 lg:p-8">

    <!-- Header -->

    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
    >

      <div>

        <h2 class="text-3xl font-bold">
          6-etap: Yakuniy baholash
        </h2>

        <p class="text-gray-500 mt-2">
          Kompaniyani barcha ko'rsatkichlari bo'yicha yakuniy baholang.
        </p>

      </div>

      <button
        class="border border-blue-500 text-blue-600 rounded-xl px-6 py-3 hover:bg-blue-50 transition"
      >
        <i class="fa-solid fa-rotate-right mr-2"></i>

        Qayta hisoblash

      </button>

    </div>

    <!-- Desktop -->

    <div class="hidden lg:block mt-8">

      <div
        class="grid grid-cols-4 gap-5 px-5 py-4 bg-gray-50 border rounded-xl font-semibold"
      >

        <div>Ko'rsatkich</div>

        <div>Qiymat</div>

        <div>Baholash</div>

        <div>Mening bahom</div>

      </div>

      <!-- MetricRow lar shu yerga keladi -->
      <MetricRow
        title="Halol / Islomga mosligi"
        subtitle="2-etapdan"
        value="Halol"
        status="good"
      />

      <MetricRow
        title="Current Assets - Liabilities"
        subtitle="3-etapdan"
        value="200,000,000"
        status="good"
      />

     <MetricRow
        title="Koefitsent (CA / CL)"
        subtitle="3-etapdan"
        value="1.50"
        status="good"
     />

      <MetricRow
        title="P/E (Price / Earnings)"
        subtitle="4-etapdan"
        value="18.5"
        status="average"
     />

      <MetricRow
        title="P/S (Price / Sales)"
        subtitle="4-etapdan"
        value="3.2"
        status="good"
      />

     <MetricRow
        title="P/B (Price / Book)"
        subtitle="4-etapdan"
        value="2.1"
        status="good"
      />

      <MetricRow
        title="Dividend"
        subtitle="4-etapdan"
        value="2.5%"
        status="good"
     />

      <MetricRow
        title="Payout Ratio"
        subtitle="4-etapdan"
        value="45%"
        status="average"
     />

      <MetricRow
        title="Graham Multiple"
        subtitle="4-etapdan"
        value="38.85"
        status="bad"
     />

      <MetricRow
        title="FCF"
        subtitle="5-etapdan"
        value="150,000,000"
        status="good"
      />

    </div>

    <!-- Investorlar fikri (FCF dan keyin, barcha ekranlarda ko'rinadi) -->

    <div class="mt-8">
      <FormField
        v-model="investorOpinion"
        as="textarea"
        label="Investorlar fikri"
        placeholder="Kompaniya haqida investorlar va tahlilchilar fikrini yozing..."
        rows="4"
      />
    </div>

    <!-- Mobile -->

    <div class="lg:hidden mt-6">

      <!-- MetricRow card lar shu yerga keladi -->

    </div>

    <!-- Summary -->

    <div class="mt-10">

      <!-- SummaryCard -->

    </div>

    <!-- Recommendation -->

    <div class="mt-6">

      <!-- Recommendation -->

    </div>

    <!-- Buttons -->

    <div
      class="flex flex-col lg:flex-row lg:justify-end gap-3 mt-10"
    >

      <button
        class="border rounded-xl px-6 py-3"
        @click="$emit('prev')"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>

        Orqaga
      </button>

      <button
        class="border border-red-400 text-red-500 rounded-xl px-6 py-3"
      >
        Bekor qilish
      </button>

      <button
        class="bg-green-600 text-white rounded-xl px-6 py-3"
      >
        Aksiyani saqlash
      </button>

      <button
        class="bg-blue-600 text-white rounded-xl px-6 py-3"
      >
        Tahlilni yakunlash

        <i class="fa-solid fa-check ml-2"></i>

      </button>

    </div>

  </div>
</template>

<script>
import MetricRow from "./final/MetricRow.vue";
import FormField from "../common/FormField.vue";

export default{

  components: {
    MetricRow,
    FormField
  },

  props:[
      "currentStep",
      "totalSteps"
  ],

  data() {
    return {
      investorOpinion: ""
    }
  }
}
</script>