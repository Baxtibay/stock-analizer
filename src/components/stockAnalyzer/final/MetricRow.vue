<template>

  <!-- Desktop -->

  <div
    class="hidden lg:grid grid-cols-5 gap-5 items-center border-b px-4 py-4 hover:bg-gray-50 transition"
  >

    <!-- Chap taraf -->

    <div class="flex items-center gap-4">

      <div
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center text-white text-lg',
          iconBg
        ]"
      >
        <i :class="icon"></i>
      </div>

      <div>

        <h4 class="font-semibold">

          {{ title }}

        </h4>

        <p class="text-gray-500 text-sm">

          {{ subtitle }}

        </p>

      </div>

    </div>

    <!-- Qiymat -->

    <div>

      <span
        class="font-bold text-xl"
        :class="valueColor"
      >

        {{ value }}

      </span>

    </div>

    <!-- Status -->

    <div>

      <span
        :class="[
          'px-4 py-2 rounded-full text-sm font-semibold',
          badgeClass
        ]"
      >

        {{ status }}

      </span>

    </div>

    <!-- Radio -->

    <div>

      <RatingSelector
        v-model="localRating"
      />

    </div>

    <!-- Izoh -->

    <div>

      <FormField
        v-model="comment"
        label="Izoh"
        placeholder="Izoh yozing..."
      />

    </div>

  </div>

  <!-- Mobile -->

  <div
    class="lg:hidden border rounded-xl p-4 mb-4"
  >

    <div class="flex gap-3">

      <div
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center text-white',
          iconBg
        ]"
      >

        <i :class="icon"></i>

      </div>

      <div class="flex-1">

        <h3 class="font-semibold">

          {{ title }}

        </h3>

        <p class="text-gray-500 text-sm">

          {{ subtitle }}

        </p>

      </div>

    </div>

    <div class="mt-4">

      <div class="flex justify-between">

        <span class="text-gray-500">

          Qiymat

        </span>

        <span
          class="font-bold"
          :class="valueColor"
        >

          {{ value }}

        </span>

      </div>

      <div class="flex justify-between mt-3">

        <span class="text-gray-500">

          Baholash

        </span>

        <span
          :class="[
            'px-3 py-1 rounded-full text-sm',
            badgeClass
          ]"
        >

          {{ status }}

        </span>

      </div>

    </div>

    <div class="mt-5">

      <RatingSelector
        v-model="localRating"
      />

    </div>

    <div class="mt-4">
      <FormField
        v-model="comment"
        label="Izoh"
        placeholder="Izoh yozing..."
      />
    </div>

  </div>

</template>

<script>

import RatingSelector from "./RatingSelector.vue"
import FormField from "../../common/FormField.vue"

export default{

components:{
RatingSelector,
FormField
},

props:{

icon:String,

iconBg:String,

title:String,

subtitle:String,

value:[String,Number],

status:String,

badgeClass:String,

valueColor:String

},

data(){

return{

localRating:"",

comment:""

}

}

}

</script>