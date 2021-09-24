<template>
  <range-picker
    v-if="['monthrange', 'daterange', 'datetimerange'].includes($attrs.type)"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <time-pick v-else-if="$attrs.type === 'time'" v-bind="{ ...$attrs, type: undefined }" v-on="$listeners" />
  <date-picker v-else v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import RangePicker from './range-picker'
import TimePick from './time-pick'
import DatePicker from './date-picker'

export default {
  name: 'IDatePicker',
  inheritAttrs: false,
  components: {
    RangePicker,
    TimePick,
    DatePicker
  }
}
</script>
