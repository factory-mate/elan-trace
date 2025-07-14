<script setup lang="ts">
import { ENV } from '@/common'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import reportBanner from '@/static/images/report_banner.png'
import reportBadge from '@/static/images/report_badge.jpg'

interface ReportData {
  head: {
    客户料号?: string
    客户料品名称?: string
    生产日期?: string
    生产批号?: string
    生产数量?: string
    检验依据?: string
    复核人?: string
    复核日期?: string
    检验日期?: string
    检验者?: string
    结论?: string
  }
  list_body: {
    分析项目: string
    标准: string
    上限值: string
    下限值: string
    结果: string
  }[]
}

const batch = ref('')
const reportData = ref<ReportData>({
  head: {},
  list_body: []
})

function getReportData() {
  uni.showLoading({ title: '加载中' })
  uni.request({
    url: `${ENV.API_URL}/api/p/GetZJDInfo?Batch=${batch.value}`,
    method: 'GET',
    timeout: 30000,
    success: (res) => {
      const { data } = res
      reportData.value = res.data as ReportData
    },
    complete: () => uni.hideLoading()
  })
}

onLoad((options) => {
  batch.value = options?.batch
})

onShow(() => {
  if (batch.value) {
    getReportData()
  }
})
</script>

<template>
  <view style="width: 100%">
    <wd-img
      style="width: 100%"
      :src="reportBanner"
      mode="widthFix"
    />
    <view style="font-size: 18px; text-align: center; font-weight: 500">
      <view>食品用香精成品分析报告(液体)</view>
      <view style="font-size: 12px">Certificate Of Analysis</view>
    </view>

    <wd-gap />

    <wd-row
      style="font-size: 13px"
      :gutter="4"
    >
      <wd-col :span="12">
        <view>客户料号：{{ reportData.head.客户料号 }}</view>
        <view class="en-text">Product Number</view>
      </wd-col>
      <wd-col :span="12">
        <view>客户料品名称：{{ reportData.head.客户料品名称 }}</view>
        <view class="en-text">Product Name</view>
      </wd-col>

      <wd-col :span="12">
        <view>生产日期：{{ reportData.head.生产日期 }}</view>
        <view class="en-text">Product Date</view>
      </wd-col>
      <wd-col :span="12">
        <view>生产批号：{{ reportData.head.生产批号 }}</view>
        <view class="en-text">Lot NO.</view>
      </wd-col>
      <wd-col :span="12">
        <view>生产数量：{{ reportData.head.生产数量 }}</view>
        <view class="en-text">Product Quantity</view>
      </wd-col>
      <wd-col :span="12">
        <view>检验依据：{{ reportData.head.检验依据 }}</view>
        <view class="en-text">Test Standard</view>
      </wd-col>
    </wd-row>

    <wd-table
      :data="reportData.list_body"
      :fixed-header="false"
      :ellipsis="false"
      style="margin: 12px 4px"
    >
      <wd-table-col
        prop="分析项目"
        label="分析项目 Item of Analysis"
        align="center"
        width="200px"
      />
      <wd-table-col
        prop="标准"
        label="标准 Specification"
        align="center"
        width="200px"
      />
      <wd-table-col
        prop="上限值"
        label="上限值 Upper Limit"
        align="center"
        width="150px"
      />
      <wd-table-col
        prop="下限值"
        label="下限值 Low Limit"
        align="center"
        width="150px"
      />
      <wd-table-col
        prop="结果"
        label="结果 Result"
        align="center"
      />
    </wd-table>

    <wd-row
      style="font-size: small"
      :gutter="4"
    >
      <wd-col :span="24">
        <view>结论：{{ reportData.head.结论 }}</view>
        <view class="en-text">Conclusion</view>
      </wd-col>
      <wd-col :span="12">
        <view>检验者：{{ reportData.head.检验者 }}</view>
        <view class="en-text">Inspector</view>
      </wd-col>
      <wd-col :span="12">
        <view>检验日期：{{ reportData.head.检验日期 }}</view>
        <view class="en-text">Inspection Date</view>
      </wd-col>

      <wd-col :span="12">
        <view>复核人：{{ reportData.head.复核人 }}</view>
        <view class="en-text">Reviewer</view>
      </wd-col>
      <wd-col :span="12">
        <view>复核日期：{{ reportData.head.复核日期 }}</view>
        <view class="en-text">Review Date</view>
      </wd-col>
    </wd-row>

    <wd-img
      style="float: right; margin-right: 12px"
      :width="100"
      :height="100"
      :src="reportBadge"
      mode="scaleToFill"
    />

    <wd-row
      style="font-size: 13px"
      :gutter="4"
    >
      <wd-col :span="24">地址：上海松江工业区洞泾分区同顺路38号3幢</wd-col>
      <wd-col :span="24">邮编：201619</wd-col>
      <wd-col :span="24">电话：021-67768118</wd-col>
      <wd-col :span="24">传真：021-67768106</wd-col>
      <wd-col :span="24">
        Address: Building 3, No.38, Tongshun Road, Songji Industrial Zone Dongjing Branch, Shanghai
      </wd-col>
      <wd-col :span="24">Tel: 021-67768118</wd-col>
      <wd-col :span="24">Fax: 021-67768106</wd-col>
    </wd-row>
  </view>
</template>

<style lang="scss" scoped>
.en-text {
  font-size: 12px;
  padding-bottom: 4px;
}
</style>
