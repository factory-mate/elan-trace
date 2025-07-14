<script setup lang="ts">
import { ENV } from '@/common'

function navToLink(url: string) {
  window.open(url)
}
</script>

<template>
  <wd-cell-group border>
    <wd-cell
      title="企业名称"
      value="依伦(上海)香精香料有限公司"
      title-width="80px"
    />
    <wd-cell
      title="企业地址"
      value="中国上海市松江区洞泾镇同顺路38号3栋"
      title-width="80px"
    />
    <wd-cell
      title="联系电话"
      value="021-67768118"
    />
    <wd-cell
      title="社会信用代码"
      value="913100006074179291"
    />
    <wd-cell
      title="营业执照"
      value="查看"
      is-link
      @click="navToLink(`${ENV.API_URL}/image/yyzz.jpg`)"
    />
    <wd-cell
      title="食品生产许可证"
      value="查看"
      is-link
      @click="navToLink(`${ENV.API_URL}/image/scxkz.jpg`)"
    />
  </wd-cell-group>
</template>
