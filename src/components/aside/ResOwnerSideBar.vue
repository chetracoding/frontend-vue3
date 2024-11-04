<template>
  <base-side-bar :menus="menus"></base-side-bar>
</template>

<script setup>
import { ref } from "vue";
const menus = ref([
  {
    link: '/',
    title: 'Home',
    icon: 'mdi-home-analytics'
  },
  {
    link: '/product',
    title: 'Product',
    icon: 'mdi-cube-outline'
  },
  {
    link: '/category',
    title: 'Category',
    icon: 'mdi-shape-plus-outline'
  },
  {
    link: '/table',
    title: 'Table',
    icon: 'mdi-table-chair'
  },
  {
    link: '/staff',
    title: 'Staff',
    icon: 'mdi-account-group-outline'
  },
  {
    link: '/sale',
    title: 'Sale',
    icon: 'mdi-chart-bar'
  },
  {
    link: '/money',
    title: 'Money',
    icon: 'mdi-finance'
  },
])
</script>