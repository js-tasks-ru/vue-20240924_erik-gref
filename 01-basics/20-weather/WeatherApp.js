import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons as icons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup(){
    return {
      weather_data: getWeatherData(),
      icons,
      is_day: ({dt, sunrise, sunset}) => {
        const dt_time = (new Date()).setHours(...dt.split(':'), 0)
        const sunrise_time = (new Date()).setHours(...sunrise.split(':'), 0)
        const sunset_time = (new Date()).setHours(...sunset.split(':'), 0)
        
        return dt_time <= sunrise_time && dt_time < sunset_time
      }
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="data in weather_data" class="weather-card" :class="{'weather-card--night': is_day(data.current)}">
          <div v-if="data.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{data.alert.sender_name}}: {{data.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{data.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{data.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="data.current.weather.description">{{icons[data.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{(data.current.temp-273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{Math.round(data.current.pressure * 0.75)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{data.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{data.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{data.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
