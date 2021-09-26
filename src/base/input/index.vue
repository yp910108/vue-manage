<template>
  <el-input v-bind="{ placeholder: '请输入 ', clearable: true, ...$attrs }" v-on="$listeners">
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'IInput',
  inheritAttrs: false
}
</script>
