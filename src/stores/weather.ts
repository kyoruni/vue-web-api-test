import { ref, computed, isShallow } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

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
    // 基本のURL
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    // クエリパラメータ作成
    const params: {
      lang: string,
      q: string,
      appId: string
    } = {
      lang: 'ja',
      q: selectedCity.value.q,
      appId: 'xxxxxxxxxxxxxxxxxxxxx' // ここにAPIキーを記載
    };
    const queryParams = new URLSearchParams(params);
    // API URL
    const apiUrl = `${url}?${queryParams}`;
    // API叩いて、jsonとして取得
    const response = await axios.get(apiUrl);
    const json = response.data;
    // jsonの内容をstateに格納
    const weatherArray = json.weather;
    const weather = weatherArray[0];
    weatherDescription.value = weather.description;
    // 取得中の表示をやめる
    isLoading.value = false;
  }

  return { cityList, selectedCity, isLoading, weatherDescription, prepareCityList, recieveWeatherInfo }
});