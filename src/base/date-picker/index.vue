<template>
  <date-range v-if="['daterange', 'monthrange'].includes($attrs.type)" v-bind="$attrs" v-on="$listeners" />
  <date-picker v-else v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import DatePicker from './date-picker'
import DateRange from './date-range'

export default {
  name: 'IDatePicker',
  inheritAttrs: false,
  components: {
    DatePicker,
    DateRange
  }
}
</script>
