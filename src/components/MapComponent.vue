<template>
  <l-map
    ref="map"
    style="height: 300px"
    class="z-30"
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
      position="bottomleft"
      prefix="OSM"
    />
    <l-circle-marker
      v-if="current_marche.id"
      :lat-lng="current_marche.latLong"
      :radius="current_marche.statut === 'OK' ? 10 : 20"
      :color="current_marche.statut === 'OK' ? '#4063e7' : 'red'"
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
          <span class="text-blue-900 font-semibold uppercase">{{ marche.localite }} ({{ marche.entite }})</span> 
          <br>
          <span
            v-if="marche.statut != 'OK'"
            class="text-red-900"
          >{{ marche.statut }}</span>
          <span v-else>
            {{ marche.frenchDate }} - {{ marche.diffFromTodayInFrench }}
          </span>
          <br>
          {{ marche.province }}
          <br>
        </l-tooltip>
      </l-marker>
    </div>
  </l-map>

  <MarcheDescription
    v-if="current_marche.id"
    :marche="current_marche"
  />
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LTooltip, LControlAttribution, LCircleMarker} from '@vue-leaflet/vue-leaflet';
import MarcheDescription from '@/components/partials/MarcheDescription.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlAttribution,
    MarcheDescription,
    LCircleMarker
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
    selectedMarche: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      zoom: 8,
      center: [50.3503, 4.8517],
      current_marche: {},
    };
  },
  mounted() {
    if (this.selectedMarche.id) {
      this.current_marche = this.selectedMarche;
      this.center = this.selectedMarche.latLong;
    }
  },
  methods: {
    openDetails(marche) {
      this.current_marche = marche;
      this.center = this.current_marche.latLong;
    },
  },

};
</script>

