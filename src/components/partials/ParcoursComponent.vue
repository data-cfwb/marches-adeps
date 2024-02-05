<template>
  <span
    v-for="prc in parcours"
    :key="prc"
    class="items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
    :class="prc.value === 'Oui' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
  >
    {{ prc.label }}
  </span>
</template>

<script>
export default {
  props: {
    parcours: {
      type: Object,
      required: true,
    },
  },  
};
</script>