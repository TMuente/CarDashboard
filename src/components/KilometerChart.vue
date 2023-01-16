<template>
  <div class="km-chart">
    <h2>Kilometer Graph</h2>
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
// import { useMainStore } from '@/stores/carStore'
import { computed } from 'vue'

export default {
  name: 'KilometerChart',

  components: {
    highcharts: Chart
  },

  setup() {
    const mainStore = useMainStore()

    function parseDate(input) {
      const parts = input.match(/(\d+)/g)
      const newDate = Date.UTC(parts[2], parts[1] - 1, parts[0])
      return newDate
    }

    const options = computed(() => {
      return {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        title: {
          text: 'Kilometer',
          style: {
            'font-family': 'Avenir, Helvetica, Arial, sans-serif',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            'color': '#2c3e50',
            'font-weight': 'bold',
            'font-size': '100%'
          }
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
        tooltip: {
          headerFormat: '<b>{series.data</b><br/>',
          pointFormat: '{point.y} km'
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
                [0, '#f00'],
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
            name: 'Datum',
            data: mainStore.getData.map((data) => {
              return [parseDate(data.date), data.km, data.name]
            })
          }
        ]
      }
    })

    return { mainStore, options, parseDate }
  }
}
</script>

<style lang="scss">
.highcharts-background {

}
.highcharts-grid-line,
.highcharts-axis-line {
 
}
text {
  fill: #fff !important;
}
.highcharts-tooltip-box, .highcharts-button-box {
}
</style>
