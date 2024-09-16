<template>
  <div v-if="modelValue" class="fixed left-0 top-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-5">
    <div class="px-6 py-6 bg-white relative">
      <button class="w-[40px] h-[40px] flex items-center justify-center absolute -right-[20px] -top-[20px] bg-white shadow" @click="modelValue=false">
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_429_11083)">
            <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_429_11083">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">

const modelValue = defineModel("modelValue", {
  type: Boolean,
  default: false
});
</script>