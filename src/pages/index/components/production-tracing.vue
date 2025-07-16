<script setup lang="ts">
import { type Data } from '../types'

interface Props {
  data: Data
}

const props = defineProps<Props>()

function navToReport() {
  if (!props.data.批号) {
    uni.showToast({
      title: '请先进行查询',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: `/pages/report/index?batch=${props.data.批号}&cInvCode=${props.data.产品编号}`
  })
}
</script>

<template>
  <wd-cell-group>
    <wd-cell
      title="生产产品编号"
      :value="props.data.产品编号"
    />
    <wd-cell
      title="生产批号"
      :value="props.data.批号"
    />
    <wd-cell
      title="生产日期"
      :value="props.data.生产日期"
    />
    <wd-cell
      title="保质期"
      :value="props.data.保质期"
      title-width="80px"
    />
    <wd-cell
      title="检验报告"
      value="查看"
      is-link
      @click="navToReport"
    />
  </wd-cell-group>
  <view style="padding: 12px">
    <wd-steps
      :active="4"
      vertical
    >
      <wd-step
        title="原料验收"
        description="原料索证齐全，原料验收合格"
      />
      <wd-step
        title="生产投料"
        description="根据生产订单配方投料"
      />
      <wd-step
        title="过程检验"
        description="生产过程检验合格"
      />
      <wd-step
        title="产品完工报检"
        description="完工产品检验合格"
      />
    </wd-steps>
  </view>
</template>
