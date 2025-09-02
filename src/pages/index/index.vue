<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { EnterpriseInfo, ProductInfo, ProductionTracing, SunshineFactory } from './components'
import { ref } from 'vue'
import { ENV } from '@/common'
import { type Data } from './types'

const pageHeight = ref(0)
const id = ref(null)
const searchText = ref('')
const tabIndex = ref(0)
const tabs = ref([
  { title: '产品信息' },
  { title: '生产溯源' },
  { title: '企业信息' },
  { title: '阳光工厂' }
])
const queryData = ref<Data>({})

function handleIdSearch() {
  uni.showLoading({ title: '加载中' })
  uni.request({
    url: `${ENV.API_URL}/api/p/selectById_New?id=${id.value}`,
    method: 'GET',
    timeout: 30000,
    success: (res) => {
      const { data } = res
      if (!(data as Data).uid) {
        uni.showToast({
          icon: 'none',
          title: '未找到数据'
        })
        return
      }
      queryData.value = data as Data
      searchText.value = (data as Data)?.批号 ?? ''
    },
    complete: () => uni.hideLoading()
  })
}

function handleBatchSearch() {
  uni.showLoading({ title: '加载中' })
  uni.request({
    url: `${ENV.API_URL}/api/p/selectByBatch_New?Batch=${searchText.value}`,
    method: 'GET',
    timeout: 30000,
    success: (res) => {
      const { data } = res
      if (!(data as Data).uid) {
        uni.showToast({
          icon: 'none',
          title: '未找到数据'
        })
        return
      }
      queryData.value = data as Data
    },
    complete: () => uni.hideLoading()
  })
}

onLoad((option) => {
  searchText.value = option?.batch
  id.value = option?.id
  pageHeight.value = uni.getSystemInfoSync().windowHeight
  uni.onWindowResize((res) => {
    pageHeight.value = res.size.windowHeight
  })
  if (id.value) {
    handleIdSearch()
  }
  if (searchText.value) {
    handleBatchSearch()
  }
})
</script>

<template>
  <view
    class="content"
    :style="{ minHeight: `${pageHeight - 88}px` }"
  >
    <wd-search
      v-model="searchText"
      placeholder="请输入批次号"
      hide-cancel
      @search="handleBatchSearch"
    />
    <wd-tabs
      v-model="tabIndex"
      animated
    >
      <block
        v-for="(item, index) in tabs"
        :key="item"
      >
        <wd-tab :title="item.title">
          <ProductInfo
            v-if="index === 0"
            :data="queryData"
          />
          <ProductionTracing
            v-if="index === 1"
            :data="queryData"
          />
          <EnterpriseInfo
            v-if="index === 2"
            :data="queryData"
          />
          <SunshineFactory v-if="index === 3" />
        </wd-tab>
      </block>
    </wd-tabs>
    <view class="footer">
      <view>技术支持：慧友科技股份有限公司</view>
      <view>联系人：顾海勤 联系电话：13611961608</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  padding-bottom: 40px;
}

.footer {
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #6f6f6f;
  height: 30px;
  padding-bottom: 4px;
}
</style>
