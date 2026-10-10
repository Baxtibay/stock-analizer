<template>
  <div>
    <!-- <h2 class="text-2xl font-semibold mb-6">
      Stock analyzer
    </h2> -->

    <Stepper
      :step="step"
      :steps="steps"
      @select="step = $event"
    />

    <StepOne
      v-if="step === 1"
      @next="nextStep"
    />

    <StepTwo
      v-if="step === 2"
      @prev="prevStep"
      @next="nextStep"
    />

    <StepThree
      v-if="step === 3"
      @prev="prevStep"
      @next="nextStep"
    />
    
    <StepFour
      v-if="step===4"
      :currentStep="step"
      :totalSteps="steps.length"
      @prev="prevStep"
      @next="nextStep"
    />

    <StepFive
      v-if="step === 5"
      :currentStep="step"
      :totalSteps="steps.length"
      @prev="prevStep"
      @next="nextStep"
    />

    <StepSix
        v-if="step===6"
        :currentStep="step"
        :totalSteps="steps.length"
        @prev="prevStep"
    />

  </div>
</template>

<script>
import Stepper from "../components/stockAnalyzer/Stepper.vue";
import StepOne from "../components/stockAnalyzer/StepOne.vue";
import StepTwo from "../components/stockAnalyzer/StepTwo.vue";
import StepThree from "../components/stockAnalyzer/StepThree.vue";
import StepFour from "../components/stockAnalyzer/StepFour.vue";
import StepFive from "../components/stockAnalyzer/StepFive.vue";
import StepSix from "../components/stockAnalyzer/StepSix.vue";

export default {
  components: {
    Stepper,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
    StepSix
  },

  data() {
    return {
      step: 1,

      steps: [
        "Asosiy ma'lumotlar",
        "Moliyaviy ko'rsatkichlar",
        "Qarz va majburiyatlar",
        "Multiplikatorlar",
        "FCF - Pul oqimi",
        "Yakuniy baholash"
      ]
    }
  },

  methods: {
    nextStep() {
      if (this.step < this.steps.length) {
        this.step++;
      }
    },

    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
  },
};
</script>