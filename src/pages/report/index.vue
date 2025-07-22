<script setup lang="ts">
import { ENV } from '@/common'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import reportBanner from '@/static/images/report_banner.png'
import reportBadge from '@/static/images/report_badge.jpg'
// import domtoimage from 'dom-to-image-more'
import { type ReportData } from './types'

const batch = ref('')
const cInvCode = ref('')
const reportData = ref<ReportData>({
  head: {},
  list_body: []
})
// const imageUrl = ref('')

function getReportData() {
  uni.showLoading({ title: '加载中' })
  uni.request({
    url: `${ENV.API_URL}/api/p/GetZJDInfo?Batch=${batch.value}&cInvCode=${cInvCode.value}`,
    method: 'GET',
    timeout: 30000,
    success: (res) => {
      const { head, list_body } = res.data as ReportData
      reportData.value = {
        head: head ?? {},
        list_body: list_body ?? []
      }
      // const node = document.getElementById('image-view')
      // domtoimage
      //   .toPng(node)
      //   .then((dataUrl: string) => {
      //     imageUrl.value = dataUrl
      //   })
      //   .catch(() => {})
    },
    complete: () => uni.hideLoading()
  })
}

onLoad((options) => {
  batch.value = options?.batch
  cInvCode.value = options?.cInvCode || ''
})

onShow(() => {
  if (batch.value) {
    getReportData()
  }
})
</script>

<template>
  <view
    style="height: fit-content; padding: 4px"
    id="image-view"
  >
    <view
      style="
        border: 1px #999999 solid;
        padding: 4px 0;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      "
    >
      <view style="padding: 0 12px">
        <wd-img
          :src="reportBanner"
          mode="widthFix"
          width="100%"
        />
      </view>

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
          <view class="sm-text">客户料号：{{ reportData.head.客户料号 }}</view>
          <view class="sm-text">Product Number</view>
        </wd-col>
        <wd-col :span="12">
          <view class="sm-text">客户料品名称：{{ reportData.head.客户料品名称 }}</view>
          <view class="sm-text">Product Name</view>
        </wd-col>

        <wd-col :span="12">
          <view class="sm-text">生产日期：{{ reportData.head.生产日期 }}</view>
          <view class="sm-text">Product Date</view>
        </wd-col>
        <wd-col :span="12">
          <view class="sm-text">生产批号：{{ reportData.head.生产批号 }}</view>
          <view class="sm-text">Lot NO.</view>
        </wd-col>
        <wd-col :span="12">
          <view class="sm-text">生产数量：{{ reportData.head.生产数量 }}</view>
          <view class="sm-text">Product Quantity</view>
        </wd-col>
        <wd-col :span="12">
          <view class="sm-text">检验依据：{{ reportData.head.检验依据 }}</view>
          <view class="sm-text">Test Standard</view>
        </wd-col>
      </wd-row>

      <view style="padding: 0 12px">
        <wd-table
          class="table"
          :data="reportData.list_body"
          :fixed-header="false"
          :ellipsis="false"
          :stripe="false"
          :rowHeight="25"
        >
          <wd-table-col
            prop="分析项目"
            label="分析项目\nItem of Analysis"
            align="center"
            width="25%"
          />
          <wd-table-col
            prop="标准"
            label="标准\nSpecification"
            align="center"
            width="25%"
          />
          <wd-table-col
            prop="上限值"
            label="上限值\nUpper Limit"
            align="center"
            width="12.5%"
          />
          <wd-table-col
            prop="下限值"
            label="下限值\nLow Limit"
            align="center"
            width="12.5%"
          />
          <wd-table-col
            prop="结果"
            label="结果\nResult"
            align="center"
            width="25%"
          />
        </wd-table>
      </view>

      <view style="display: flex; margin-bottom: 12px">
        <wd-row
          :gutter="4"
          style="width: 80%"
        >
          <wd-col :span="12">
            <view class="sm-text">结论：{{ reportData.head.结论 }}</view>
            <view class="sm-text">Conclusion</view>
          </wd-col>
          <wd-col :span="12">
            <view class="sm-text">检验者：{{ reportData.head.检验者 }}</view>
            <view class="sm-text">Inspector</view>
          </wd-col>

          <wd-col :span="12">
            <view class="sm-text">检验日期：{{ reportData.head.检验日期 }}</view>
            <view class="sm-text">Inspection Date</view>
          </wd-col>

          <wd-col :span="12">
            <view class="sm-text">复核人：{{ reportData.head.复核人 }}</view>
            <view class="sm-text">Reviewer</view>
          </wd-col>

          <wd-col :span="12">
            <view class="sm-text">复核日期：{{ reportData.head.复核日期 }}</view>
            <view class="sm-text">Review Date</view>
          </wd-col>
        </wd-row>

        <view style="width: 20%">
          <wd-img
            style="float: right; margin-right: 12px"
            :width="100"
            :height="100"
            :src="reportBadge"
            mode="scaleToFill"
          />
        </view>
      </view>

      <wd-row style="color: #999999">
        <wd-col :span="12">
          <view class="sm-text">地址：上海松江工业区洞泾分区同顺路38号3幢<br />邮编：201619</view>
        </wd-col>
        <wd-col :span="12">
          <view class="sm-text">
            Address: Building 3, No.38, Tongshun Road, Songji Industrial Zone Dongjing Branch,
            Shanghai
          </view>
        </wd-col>
        <wd-col :span="12"><view class="sm-text">电话：021-67768118</view></wd-col>
        <wd-col :span="12"><view class="sm-text">Tel: 021-67768118</view></wd-col>
        <wd-col :span="12"><view class="sm-text">传真：021-67768106</view></wd-col>
        <wd-col :span="12"><view class="sm-text">Fax: 021-67768106</view></wd-col>
      </wd-row>
    </view>
  </view>

  <!-- <img
    :src="imageUrl"
    width="100%"
    height="auto"
  /> -->
</template>

<style lang="scss" scoped>
.sm-text {
  font-size: 12px;
  transform: scale(0.85);
}

.table {
  text-align: center;
  margin: 12px 0;
  ::v-deep span {
    display: block;
    font-size: 12px;
    transform: scale(0.6);
  }
  ::v-deep .wd-table__cell {
    min-height: 25px;
    padding: 0;
  }
}
</style>
