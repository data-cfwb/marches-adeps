<template>
  <l-map
    ref="map"
    style="height: 300px"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      credit="OpenStreetMap"
      attribution="© Contributors"
    />
    <div
      v-for="marche in marches"
      :key="marche"
    >
      <l-marker
        :lat-lng="marche.latLong"
        @click="openDetails(marche)"
      >
        <l-tooltip>
          {{ marche.localite }}<br>
          {{ marche.entite }}
        </l-tooltip>
      </l-marker>
    </div>
  </l-map>

  <MarcheDescription
    v-if="selected_map"
    :marche="selected_map"
  />
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import MarcheDescription from '@/components/partials/MarcheDescription.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    MarcheDescription
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      zoom: 8,
      center: [50.8503, 4.3517],
      selected_map: null,
    };
  },
  methods: {
    openDetails(marche) {
      this.selected_map = marche;
      this.center = marche.latLong;
    },
  },

};
</script>

