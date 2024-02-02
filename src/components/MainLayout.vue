<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/vue/20/solid';

const mobileFiltersOpen = ref(false);
</script>
<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot
        as="template"
        :show="mobileFiltersOpen"
      >
        <Dialog
          as="div"
          class="relative z-40 lg:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">
                    Filtres
                  </h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Fermer menu</span>
                    <XMarkIcon
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
  
                <!-- Filters -->
                <Disclosure
                  v-for="section in filters"
                  :key="section.name"
                  v-slot="{ open }"
                  as="div"
                  class="border-t border-gray-200 pb-4 pt-4"
                >
                  <fieldset>
                    <legend class="w-full px-2">
                      <DisclosureButton class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                        <span class="text-sm font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </legend>
                    <DisclosurePanel class="px-4 pb-2 pt-4">
                      <div class="space-y-3 pt-6">
                        <button
                          v-for="option in section.options"
                          :key="option"
                          class="flex items-center"
                          @click="filterCategory(section.id, option)"
                        >
                          {{ option }}
                        </button>
                      </div>
                      <div
                        v-if="data_loaded"
                        class="py-6"
                      >
                        <button
                          class="relative flex items-center space-x-3"
                          @click="nextMarches"
                        >
                          Semaine suivante
                        </button>

                        <button
                          class="relative flex items-center space-x-3"
                          @click="resetFilter"
                        >
                          Voir tout
                        </button>
                      </div>
                    </DisclosurePanel>
                  </fieldset>
                </Disclosure>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <main class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pb-10">
          <!-- logo -->
          <div class="flex items-center justify-center">
            <img
              src="https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_PNG_et_SVG_24px/pastille_Adeps24.svg"
              alt="Fédération Wallonie-Bruxelles"
              width="48"
              class="px-1 sm:px-2"
            >
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">
              Les marches ADEPS
            </h1>
          </div>
          <p class="mt-4 text-base text-gray-500">
            Les marches ADEPS sont des marches organisées par la Fédération Wallonie-Bruxelles.
          </p>
  
          <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 class="sr-only">
                Filtres
              </h2>
  
              <button
                type="button"
                class="inline-flex items-center lg:hidden"
                @click="mobileFiltersOpen = true"
              >
                <span class="text-sm font-medium text-gray-700">Filters</span>
                <PlusIcon
                  class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>
  
              <div class="hidden lg:block">
                <div
                  v-for="(section, sectionIdx) in filters"
                  :key="section.name"
                  :class="sectionIdx === 0 ? null : 'pt-10'"
                >
                  <fieldset>
                    <legend class="block text-md font-medium text-gray-900">
                      {{ section.name }}
                    </legend>
                    <div class="space-y-3 pt-6">
                      <button
                        v-for="option in section.options"
                        :key="option"
                        class="flex items-center"
                        @click="filterCategory(section.id, option)"
                      >
                        {{ option }}
                      </button>
                    </div>
                  </fieldset>
                </div>

                <div
                  v-if="data_loaded"
                  class="py-6"
                >
                  <button
                    class="relative flex items-center space-x-3"
                    @click="nextMarches"
                  >
                    Semaine suivante
                  </button>

                  <button
                    class="relative flex items-center space-x-3"
                    @click="resetFilter"
                  >
                    Voir tout
                  </button>
                </div>
              </div>
            </aside>
  
            <!-- Marche table -->
            <div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <!-- Your content -->
              <div>
                <LoadingFwb v-if="!data_loaded" />
                <div v-else />
              </div>
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                  <div class="sm:flex-auto" />
                  <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      v-if="!seeMap"
                      type="button"
                      class="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      @click="seeMap = !seeMap"
                    >
                      Voir sur une carte
                    </button>
                    <button
                      v-if="seeMap"
                      type="button"
                      class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      @click="seeMap = !seeMap"
                    >
                      Voir sur une liste
                    </button>
                  </div>
                </div>
                <div class="mt-8 flow-root">
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div
                        v-if="seeMap" 
                        style="height:400px; width:600px"
                      >
                        <MapComponent
                          :marches="marches"
                          class="z-0"
                        />
                      </div>
                      <TableComponent
                        v-if="!seeMap"
                        :marches="marches"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import MapComponent from '@/components/MapComponent.vue';
import TableComponent from '@/components/TableComponent.vue';

export default {
  components: {
    MapComponent,
    TableComponent
  },
  data() {
    return {
      title: 'Les marches ADEPS',
      filters: [ 
        {
          id: 'province',
          name: 'Provinces',
          options: [],
        },
        {
          id: 'dates',
          name: 'Choisissez une date',
          options: [],
        },
      ],
      start_date: '',
      end_date: '',
      original_marches: {},
      marches: {},
      data_loaded: false,
      seeMap: false,
    };
  },
  computed: {
    isActive() {
      return this.active ? 'ON' : 'OFF';
    },
    distinctProvince() {
      // order by province
      return [...new Set(this.marches.map(marche => marche.province))].sort();
    },
    distinctDate() {
      return [...new Set(this.marches.map(marche => marche.date))];
    },
    addDiffDays() {
      return this.marches.map(marche => {
        marche.diffDays = Math.floor((new Date(marche.date) - new Date()) / (1000 * 60 * 60 * 24));
        return marche;
      });
    },
    addLatLong() {
      return this.marches.map(marche => {
        marche.latLong = [parseFloat(marche.latitude), parseFloat(marche.longitude)];
        return marche;
      });
    },
  },
  created() {
    this.start_date = this.convertToISODate(new Date());
    // this.end_date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    this.end_date = this.convertToISODate(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
    this.getMarches();
  },
  methods: {
    defineFilters() {
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].options = [...new Set(this.marches.map(marche => marche[this.filters[i].id]))].sort();
      }
    },
    convertToISODate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
    nextMarches() {
      this.start_date = new Date(new Date(this.start_date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      this.end_date = new Date(new Date(this.end_date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      this.getMarches();
      this.defineFilters();
    },
   
    filterCategory(category, item) {
      if (category === 'province') {
        this.marches = this.marches.filter(marche => {
          return marche.province === item;
        });
      }
      else if (category === 'date') {
        this.marches = this.marches.filter(marche => {
          return marche.date === item;
        });
      }
      this.defineFilters();
    },
  
    orderByDate() {
      this.marches.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    },
    resetFilter() {
      this.marches = this.original_marches;
      this.defineFilters();

    },
    getMarches() {
      axios.get('https://www.odwb.be/api/explore/v2.1/catalog/datasets/points-verts-de-ladeps/exports/json?lang=fr&qv1=(date%3A[' + this.start_date + '%20TO%20' + this.end_date + '])&timezone=Europe%2FBrussels')
        .then(response => {
          this.original_marches = response.data;
          this.marches = response.data;
          this.addDiffDays;
          this.addLatLong;
          this.orderByDate();
          this.defineFilters();
          console.log(this.marches);
          this.data_loaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
  
  },
};

</script>