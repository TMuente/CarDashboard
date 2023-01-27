<template>
  <div class="km-chart">
    <h3 class="title">Kilometer Graph</h3>
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { computed } from 'vue'
import { useCarStore } from '@/stores/carStore'

export default {
  name: 'KilometerChart',

  components: {
    highcharts: Chart
  },

  setup() {
    const carStore = useCarStore()

    function ToLocalDate(inDate) {
      var date = new Date()
      date.setTime(inDate.valueOf() - 60000 * inDate.getTimezoneOffset())
      return date
    }

    const options = computed(() => {
      return {
        chart: {
          // type: 'spline',
          zoomType: 'x'
        },
        title: {
          text: '',
        },
        yAxis: {
          title: {
            text: 'Kilometer'
          },
          labels: {
            format: '{value} km'
          }
        },
        xAxis: {
          type: 'datetime'
        },
        legend: {
          enabled: false
        },
        tooltip: {
          formatter: function () {
            const point = this.point
            return `Datum: ${new Date(point.x).toLocaleDateString('de-DE')}<br/>Kilometer: ${point.y} km<br/>Preis: ${point.price} €<br/>Arbeiten: ${point.work}`
          }
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, '#000'],
                [1, '#ff0']
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [
          {
            data: carStore.getRepair.map((data) => {
              let item = { y: data.km, x: Date.parse(data.date), work: data.items, price: data.price }
              return item
            })
          }
        ]
      }
    })

    return { options, carStore }
  }
}
</script>

<style lang="scss">
.km-chart {
  padding: 2rem;
}
.highcharts-background {
  fill: $light!important;
}
</style>
