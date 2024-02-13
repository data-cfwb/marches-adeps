<template>
  <ul
    role="list"
    class="divide-y divide-gray-100"
  >
    <li
      v-for="marche in marches"
      :key="marche.id"
      class="relative flex justify-between gap-x-6 py-2 hover:bg-gray-100"
      :class="marche.statut === 'OK' ? 'bg-white' : 'bg-orange-100'"
      @click="emitSelectedMarche(marche)"
    >
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ marche.localite }} ({{ marche.entite }})
            <span
              v-if="marche.statut != 'OK'"
              class="items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 bg-orange-100 text-orange-700"
            >{{ marche.statut }}
            </span>
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500 truncate">
            {{ marche.diffFromTodayInFrench }} - {{ marche.frenchDate }}
          </p>
          <ParcoursComponent :parcours="marche.parcours" />
          <br>
          <ServicesComponent :services="marche.services" />
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p
            class="text-sm leading-6 text-gray-400 text-wrap truncate w-68"
          >
            par {{ marche.groupement }}
          </p>
        </div>
       
        <ChevronRightIcon
          class="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        /><span class="sr-only">Détails de {{ marche.name }}</span>
      </div>
    </li>
  </ul>
</template>
  
<script>
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import ServicesComponent from '@/components/partials/ServicesComponent.vue';
import ParcoursComponent from '@/components/partials/ParcoursComponent.vue';

export default {
  components: {
    ChevronRightIcon,
    ServicesComponent,
    ParcoursComponent
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
  },
  emits: ['selectedMarche'],
  methods: {
    emitSelectedMarche(marche) {
      this.$emit('selectedMarche', marche);
    },
  },
};
</script>