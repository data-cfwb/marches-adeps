<template>
  <l-map
    ref="map"
    style="height: 300px"
    :zoom="zoom"
    :center="center"
    :options="{attributionControl: false}"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-control-attribution
      position="topright"
      prefix="A custom prefix"
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
    v-if="selected_marche"
    :marche="selected_marche"
  />
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip, LControlAttribution} from '@vue-leaflet/vue-leaflet';
import MarcheDescription from '@/components/partials/MarcheDescription.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlAttribution,
    MarcheDescription,
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
    marcheFromList: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      zoom: 8,
      center: [50.8503, 4.3517],
      selected_marche: null,
    };
  },
  mounted() {
    if (this.marcheFromList) {
      this.selected_marche = this.marcheFromList;
      this.center = this.marcheFromList.latLong;
    }
  },
  methods: {
    openDetails(marche) {
      this.selected_marche = marche;
      this.center = marche.latLong;
    },
  },

};
</script>

