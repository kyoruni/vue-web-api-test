import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface City {
  name: string;
  q: string;
}

interface State {
  cityList: Map<string, City>;
}

export const useWeatherStore = defineStore('weather', () => {
  // state
  const cityList = ref(new Map<string, City>);
  // actions
  function prepareCityList () {
    cityList.value.set('Tokyo', {
      name: '東京',
      q: 'Tokyo'
    });
    cityList.value.set('Yokohama', {
      name: '横浜',
      q: 'Yokohama'
    });
    cityList.value.set('Okinawa', {
      name: '沖縄',
      q: 'Okinawa'
    });
  };

  return { cityList, prepareCityList }
});