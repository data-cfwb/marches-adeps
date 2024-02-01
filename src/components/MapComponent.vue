<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="[50.2000, 4.8000]"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      credit="OpenStreetMap"
    />
    <div
      v-for="marche in marches"
      :key="marche"
    >
      <l-marker :lat-lng="marche.latLong">
        <l-tooltip>
          {{ marche.localite }}<br>
          {{ marche.entite }}
        </l-tooltip>
        <l-popup>
          <MarcheDescription :marche="marche" />
        </l-popup>
      </l-marker>
    </div>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet';
import MarcheDescription from '@/components/partials/MarcheDescription.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
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

    };
  },

};
</script>

