import { ref, computed, isShallow } from 'vue';
import { defineStore } from 'pinia';

export interface City {
  name: string;
  q: string;
}

interface State {
  cityList: Map<string, City>;
  selectedCity: City;
  isLoading: boolean;
  weatherDescription: string;
}

export const useWeatherStore = defineStore('weather', () => {
  // state
  const cityList = ref(new Map<string, City>);
  const selectedCity = ref({
    name: '',
    q: ''
  });
  const isLoading = ref(true);
  const weatherDescription = ref('');
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

  async function recieveWeatherInfo(id: string) {
    selectedCity.value = cityList.value.get(id) as City;
    // ここでWebアクセス
  }

  return { cityList, selectedCity, isLoading, weatherDescription, prepareCityList, recieveWeatherInfo }
});