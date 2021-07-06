<template>
  <span v-on="$listeners" class="i__icon__wrapper">
    <svg class="i__icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'IIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.i__icon__wrapper {
  display: inline-block;
  line-height: 1;
  .i__icon {
    display: inline-block;
    vertical-align: top;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
