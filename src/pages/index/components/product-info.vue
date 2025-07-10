<script setup lang="ts">
import { type Data } from '../types'

interface Props {
  data: Data
}

const props = defineProps<Props>()
</script>

<template>
  <wd-cell-group border>
    <wd-cell
      title="产品名称"
      :value="props.data.产品名称"
    />
    <wd-cell
      title="品牌"
      value="依伦香精香料"
    />
    <wd-cell
      title="执行标准"
      :value="props.data.产品标准"
    />
    <wd-cell
      title="条形码"
      value=""
    />
    <!-- <wd-cell
      title="内净含量"
      :value="props.data.净含量"
    /> -->
    <wd-cell
      title="生产批量"
      :value="props.data.外净含量"
    />
    <wd-cell
      title="配料"
      :value="props.data.配料表"
      title-width="80px"
    />
    <wd-cell
      title="生产厂家"
      :value="props.data.生产厂家"
      title-width="80px"
    />
    <wd-cell
      title="生产地址"
      :value="props.data.地址"
      title-width="80px"
    />
    <wd-cell
      title="联系电话"
      :value="props.data.联系方式"
    />
    <wd-cell
      title="生产许可证"
      :value="props.data.产品生产许可编号"
    />
    <wd-cell
      title="保质期"
      :value="props.data.保质期"
      title-width="80px"
    />
  </wd-cell-group>
</template>
