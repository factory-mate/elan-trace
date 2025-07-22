export interface ReportData {
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
