<template>
  <span
    v-for="service in services"
    :key="service"
    class="items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
    :class="service.value === 'Oui' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'"
  >
    {{ service.label }}
  </span>
</template>
  
<script>
export default {
  props: {
    services: {
      type: Object,
      required: true,
    },
  },  
};
</script>