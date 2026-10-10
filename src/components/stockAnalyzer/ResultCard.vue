<template>
  <div class="border rounded-xl p-5 bg-white">

    <!-- Title -->

    <h3 class="font-semibold text-lg text-center">
      {{ title }}
    </h3>

    <!-- Value -->

    <div class="text-center my-6">

      <div
        class="text-3xl font-bold"
        :class="valueColor"
      >
        {{ value }}
      </div>

      <p
        v-if="hint"
        class="text-sm text-gray-500 mt-2"
      >
        {{ hint }}
      </p>

    </div>

    <!-- Radio -->

    <div class="space-y-3">

      <label class="flex items-center cursor-pointer">

        <input
          type="radio"
          value="good"
          v-model="selected"
          class="mr-3"
        >

        <span class="text-green-600 font-medium">

          Yaxshi

        </span>

      </label>

      <label class="flex items-center cursor-pointer">

        <input
          type="radio"
          value="medium"
          v-model="selected"
          class="mr-3"
        >

        <span class="text-yellow-500 font-medium">

          O'rtacha

        </span>

      </label>

      <label class="flex items-center cursor-pointer">

        <input
          type="radio"
          value="bad"
          v-model="selected"
          class="mr-3"
        >

        <span class="text-red-600 font-medium">

          Yomon

        </span>

      </label>

    </div>

  </div>
</template>

<script>
export default {

  props:{

    title:String,

    value:[String,Number],

    hint:String,

    valueColor:{
      type:String,
      default:"text-black"
    }

  },

  data(){

    return{

      selected:null

    }

  }

}
</script>