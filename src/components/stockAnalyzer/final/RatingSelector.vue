<template>

  <div class="inline-flex rounded-lg overflow-hidden border">

    <!-- Yaxshi -->

    <button
      @click="select('good')"
      :class="[
        buttonClass,
        modelValue === 'good'
          ? 'bg-green-600 text-white'
          : 'bg-white text-gray-700 hover:bg-green-50'
      ]"
    >
      Yaxshi
    </button>

    <!-- O'rtacha -->

    <button
      @click="select('average')"
      :class="[
        buttonClass,
        modelValue === 'average'
          ? 'bg-orange-500 text-white'
          : 'bg-white text-gray-700 hover:bg-orange-50'
      ]"
    >
      O'rtacha
    </button>

    <!-- Yomon -->

    <button
      @click="select('bad')"
      :class="[
        buttonClass,
        modelValue === 'bad'
          ? 'bg-red-600 text-white'
          : 'bg-white text-gray-700 hover:bg-red-50'
      ]"
    >
      Yomon
    </button>

  </div>

</template>

<script>
export default {

  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },

  emits: [
    "update:modelValue"
  ],

  data() {

    return {

      buttonClass:
        "px-5 py-2 border-r last:border-r-0 text-sm font-medium transition-all duration-200"

    }

  },

  methods: {

    select(value) {

      this.$emit(
        "update:modelValue",
        value
      )

    }

  }

}
</script>