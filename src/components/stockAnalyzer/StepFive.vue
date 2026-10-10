<template>
  <div class="bg-white border rounded-xl p-8">

    <h3 class="text-2xl font-semibold">
      5-etap: FCF - Pul oqimi
    </h3>

    <p class="text-gray-500 mt-2 mb-8">
      Kompaniyaning Free Cash Flow (FCF) ko'rsatkichini hisoblash uchun ma'lumotlarni kiriting.
    </p>

 

    <!-- Inputs -->

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <FormField
        v-model="cashFromOperations"
        type="number"
        label="Cash From Operations"
        placeholder="Masalan: 250000000"
        suffix="USD"
        hint="Operatsion faoliyatdan kelgan pul oqimi."
      />

      <FormField
        v-model="capitalExpenditure"
        type="number"
        label="Capital Expenditure"
        placeholder="Masalan: 75000000"
        suffix="USD"
        hint="Asosiy vositalarga qilingan investitsiyalar."
      />
    </div>

    <!-- Qoida -->

    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">

      <div class="flex items-start gap-3">

        <i class="fa-solid fa-circle-info text-blue-600 text-xl mt-1"></i>

        <div>

          <h4 class="font-semibold text-lg mb-3">
            Qoida
          </h4>

          <p class="text-gray-700">
            <strong>Free Cash Flow (FCF)</strong> formulasi:
            Operatsion faoliyatdan tushgan pul oqimidan
            <strong>Capital Expenditure (CapEx)</strong>
            ayiriladi.
          </p>

        </div>

      </div>

      <div class="mt-5 bg-white rounded-lg border p-4 text-center text-blue-600 font-semibold text-lg">
        FCF = Cash From Operations − Capital Expenditure
      </div>

    </div>

    <!-- Natija -->

    <div
      class="mt-10 border rounded-xl p-6 bg-green-50 flex flex-col lg:flex-row justify-between items-center gap-6"
    >

      <div>

        <h4 class="text-xl font-semibold text-green-700">

          <i class="fa-solid fa-calculator mr-2"></i>

          Free Cash Flow (FCF)

        </h4>

        <p class="text-gray-600 mt-2">

          Formula:

          Cash From Operations − Capital Expenditure

        </p>

      </div>

      <div
        class="bg-white border rounded-xl px-10 py-6 text-center min-w-[220px]"
      >

        <p class="text-3xl font-bold">

          {{ formatCurrency(fcf) }}

        </p>

        <p class="text-gray-500 mt-2">

          USD

        </p>

      </div>

    </div>

    <!-- Tugmalar -->

    <div
      class="flex flex-col lg:flex-row lg:justify-end gap-3 mt-10"
    >

      <button
        class="border rounded-lg px-6 py-3"
        @click="$emit('prev')"
      >

        <i class="fa-solid fa-arrow-left mr-2"></i>

        Orqaga

      </button>

      <button
        class="border border-red-300 text-red-500 rounded-lg px-6 py-3"
      >

        Bekor qilish

      </button>

      <button
        class="bg-green-600 text-white rounded-lg px-6 py-3"
      >

        Aksiyani saqlash

      </button>

      <button
        v-if="currentStep < totalSteps"
        class="bg-blue-600 text-white rounded-lg px-6 py-3"
        @click="$emit('next')"
      >
        Keyingi etap
        <i class="fa-solid fa-arrow-right ml-2"></i>
      </button>

    </div>

  </div>
</template>

<script>
import FormField from '../common/FormField.vue'

export default {
  components: { FormField },

  props: {
    currentStep: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    }
  },

  data() {

    return {

      cashFromOperations: null,

      capitalExpenditure: null

    }

  },

  computed: {

    fcf() {

      return (this.cashFromOperations || 0) -

             (this.capitalExpenditure || 0)

    }

  },

  methods: {

    formatCurrency(value) {

      return Number(value).toLocaleString()

    }

  }

}
</script>