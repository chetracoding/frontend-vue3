<template>
  <v-layout>
    <res-owner-side-bar></res-owner-side-bar>
    <!-- Left side bar -->
    <side-bar />

    <v-main class="ml-2">
      <!-- Header top -->
      <header-component title="Manage Money"> </header-component>
      <!-- Main container -->
      <main class="d-flex mt-3">
        <!-- <div class="w-75 d-flex flex-column"></div>  -->
        <div class="w-100 d-flex flex-column">
          <!-- Tab of month  -->
          <!-- Select date -->
          <div class="w-25 mb-3">
            <vue-date-picker
              :model-value="year"
              @update:model-value="change"
              year-picker
              dark
              auto-apply
            ></vue-date-picker>
          </div>

          <apexchart :class="[
            moneyReports.length == 0 ? 'd-none' : '',
            'bg-grey-darken-2 rounded-lg mr-2 text-black',
          ]" height="485" type="bar" :options="options" :series="series"></apexchart>

          <!-- No product report -->
          <div v-if="moneyReports.length == 0" class="h-screen">
            <h4 class="text-center mt-5 text-white">Don't have any report.</h4>
          </div>
        </div>
        <!--Money summary -->
        <summary-component class="mt-2" title="Money Summary">
          <template v-slot:content>
            <div v-for="moneyReport in moneyReports" :key="moneyReport"
              class="bg-grey-darken-2 mt-2 rounded-lg d-flex justify-space-between align-center">
              <div class="w-50 card-summary py-2 m-2 rounded-lg text-center">
                {{ getMonthName(moneyReport.month) }}
              </div>
              <span class="mr-2">${{ Number(moneyReport.total_money).toFixed(2) }}</span>
            </div>
            <div class="bg-grey-darken-2 mt-4 py-3 rounded-lg d-flex justify-space-between align-center">
              <span class="ml-2">Total</span>
              <span class="mr-2">${{ totalMoney }}</span>
            </div>
          </template>
        </summary-component>
      </main>
    </v-main>
  </v-layout>
</template>
<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { computed, onMounted, ref } from "vue";
import { useReportsStore } from "@/stores/reports";
import { storeToRefs } from "pinia";

// Variables
const { getMoneyReports } = useReportsStore();
const { moneyReports } = storeToRefs(useReportsStore());
const currentYear = new Date().getFullYear();
const year = ref(currentYear);

// Get values from object in array
const filter = (array, key) => {
  let items = [];
  array.filter(function (value) {
    if (key === 'month') {
      items.push(getMonthName(value[key]));
    } else {
      items.push(Number(value[key]));
    }
  });
  return items;
};

// Reference: https://codingbeautydev.com/blog/javascript-convert-month-number-to-name/#:~:text=To%20convert%20a%20month%20number%20to%20a%20month%20name%2C%20create,a%20specified%20locale%20and%20options.&text=Our%20getMonthName()%20function%20takes,the%20month%20with%20that%20position.
const getMonthName = (monthNumber) => {
  const date = new Date(`${year.value}-${monthNumber}-1`);
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

const options = ref({
  plotOptions: {
    bar: {
      columnWidth: "50px",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
      borderRadius: 10,
      margin: 70,
    },
  },
  yaxis: {
    min: 0,
    labels: {
      style: {
        fontSize: "0.8rem",
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        cssClass: "apexcharts-yaxis-label",
        colors: "white",
      },
    },
  },
  xaxis: {
    categories: filter(moneyReports.value, "month"),
    labels: {
      style: {
        fontSize: "0.8rem",
        fontFamily: "Inter, sans-serif",
        cssClass: "apexcharts-xaxis-label",
        colors: "white",
      },
    },
  },
});

const series = ref([
  {
    data: filter(moneyReports.value, "total_money"),
    color: "#F25657",
  },
]);

const totalMoney = computed(() => {
  let sum = 0;
  moneyReports.value.filter(function (value) {
    sum += Number(value.total_money);
  });
  return sum;
});

// Render date to chart view
const renderChart = () => {
  options.value = {
    xaxis: {
      categories: filter(moneyReports.value, "month"),
    },
  };
  series.value[0].data = filter(moneyReports.value, "total_money");
};

const change = async (value) => {
  if (!value) return;
  year.value = value
  await getMoneyReports(value);
  renderChart();
}
// Lifecycle hook
onMounted(async () => {
  await getMoneyReports(year.value);
  renderChart();
});
</script>

<style scoped>
.card-summary {
  background: #2c2c2c;
}
</style>
