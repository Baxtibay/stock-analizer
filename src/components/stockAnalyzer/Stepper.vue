<template>
  <div class="bg-white border rounded-xl p-6 mb-6">

    <!-- Desktop -->
    <div class="hidden md:flex items-start">

      <div
        v-for="(item,index) in steps"
        :key="index"
        class="flex-1 flex flex-col items-center relative"
      >

        <!-- line -->

        <div
          v-if="index !== steps.length-1"
          class="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200"
        >
        </div>

        <div
          :class="[
            'relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition',
            index+1<=step
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-600'
          ]"
        >
          {{ index+1 }}
        </div>

        <span
          class="mt-3 text-sm text-center px-2"
        >
          {{ item }}
        </span>

      </div>

    </div>


    <!-- Mobile -->

    <div class="md:hidden">

      <div class="flex justify-between items-center">

        <div
          class="flex items-center gap-2 overflow-x-auto pb-2"
        >

          <template
            v-for="(item,index) in steps"
            :key="index"
          >

            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0',
                index+1<=step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              ]"
            >

              {{ index+1 }}

            </div>

            <div
              v-if="index!==steps.length-1"
              class="w-5 h-0.5 bg-gray-300 shrink-0"
            ></div>

          </template>

        </div>

      </div>

      <div
        class="mt-5 flex justify-between items-center"
      >

        <div>

          <p class="text-sm text-gray-500">

            {{ step }} / {{ steps.length }}

          </p>

          <h3 class="font-semibold">

            {{ steps[step-1] }}

          </h3>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    step: Number,
    steps: Array
  }
}
</script>