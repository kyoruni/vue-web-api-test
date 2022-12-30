<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useWeatherStore } from '@/stores/weather';
import type { City } from '@/stores/weather';

interface Props {
  id: string;
}
const props = defineProps<Props>();

const weatherStore = useWeatherStore();
weatherStore.recieveWeatherInfo(props.id);

const isLoading = computed((): boolean => {
  return weatherStore.isLoading;
});
const selectedCity = computed((): City => {
  return weatherStore.selectedCity;
});
const weatherDescription = computed((): string => {
  return weatherStore.weatherDescription;
});
</script>

<template>
  <div class="weather-info">
    <p v-if="isLoading">データ取得中です</p>
    <section v-else>
      <h2>{{ selectedCity.name }}の天気</h2>
      <p>{{ weatherDescription }}</p>
    </section>
    <p>
      <RouterLink :to="{ name: 'CityList' }">一覧に戻る</RouterLink>
    </p>
  </div>
</template>