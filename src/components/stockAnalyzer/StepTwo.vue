<template>
  <div class="bg-white border rounded-lg p-8">

    <h3 class="text-xl font-semibold mb-1">
      2-etap: Moliyaviy ko'rsatkichlar
    </h3>

    <p class="text-gray-500 mb-8">
      Kompaniyaning moliyaviy ma'lumotlarini kiriting.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormField
        v-model="form.marketCap"
        type="number"
        label="Market Cap"
        placeholder="1000000000"
        suffix="USD"
        required
      />

      <FormField
        v-model="form.price"
        type="number"
        label="Aksiya narxi"
        placeholder="Masalan: 189.30"
        suffix="USD"
        hint="Bir dona aksiyaning joriy narxi."
        min="0"
        step="0.01"
        required
      />

      <FormField
        v-model="form.ticker"
        label="Ticker"
        placeholder="Masalan: AAPL"
        required
      />

      <FormField
        v-model="form.sector"
        as="select"
        label="Sector"
        required
      >
          <option>Basic Materials</option>
          <option>Communication Services</option>
          <option>Consumer Cyclical</option>
          <option>Consumer Defensive</option>
          <option>Energy</option>
          <option>Financial</option>
          <option>Healthcare</option>
          <option>Industrials</option>
          <option>Real Estate</option>
          <option>Technology</option>
          <option>Utilities</option>
          <option>Other</option>
      </FormField>

      <FormField
        v-model="form.industry"
        label="Industry"
        placeholder="Masalan: Semiconductors"
        required
      />
    </div>

    <!-- Halol -->

    <div class="mt-8">

      <label class="font-medium block mb-3">

        Halol kompaniyami?

      </label>

      <div class="flex items-center gap-4">

        <button
          @click="halal=!halal"
          :class="[
            'w-16 h-9 rounded-full transition relative',
            halal
              ? 'bg-blue-600'
              : 'bg-gray-300'
          ]"
        >

          <span
            :class="[
              'absolute top-1 w-7 h-7 rounded-full bg-white transition',
              halal
                ? 'right-1'
                : 'left-1'
            ]"
          ></span>

        </button>

        <span class="font-medium">

          {{ halal ? 'Halol' : 'Halol emas' }}

        </span>

      </div>

    </div>

    <div class="flex flex-col md:flex-row md:justify-end gap-3 mt-10">

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
  data() {
    return {
      halal: false,
      form: {
        marketCap: '',
        price: '',
        ticker: '',
        sector: 'Basic Materials',
        industry: ''
      }
    }
  }
}
</script>
