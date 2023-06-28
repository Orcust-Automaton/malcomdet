<template>
  <div class="table-page">
    <!-- <a-alert type="success"
      >三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例。详情页请点击操作列按钮，支持tab多开并高亮左侧菜单</a-alert
    > -->
    <a-form label-align="right" auto-label-width :model="form" class="form">
      <a-row :gutter="16" wrap>
        <a-col :xs="12" :md="12" :lg="8" :xl="6" :xxl="6">
          <a-form-item field="value1" label="内容">
            <a-input v-model="form.value1" placeholder="请输入内容" />
          </a-form-item>
        </a-col>

        <a-col :xs="12" :md="12" :lg="8" :xl="6" :xxl="6" >
          <a-form-item field="value2" label="恶意性">
            <a-select v-model:model-value="form.value2" placeholder="请选择">
              <a-option>恶意</a-option>
              <a-option>非恶意</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="getTableData">
              <template #icon>
                <icon-search />
              </template>
              <template #default>查询</template>
            </a-button>
            <a-button @click="reload">
              <template #default>重置</template>
            </a-button>
          
          </a-space>
        </a-col>
      </a-row>
    </a-form>

    <section class="table-box">
      <a-table
        row-key="id"
        size="small"
        page-position="bottom"
        :bordered="{ cell: true }"
        :loading="loading"
        :data="tableData"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="{ showPageSize: true, total: total, current: current, pageSize: pageSize }"
        @page-change="changeCurrent"
        @page-size-change="changePageSize"
      >
        <template #columns>
          <!-- <a-table-column title="ID" :width="66" data-index="idx" align="center"></a-table-column> -->
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="内容" data-index="text" ellipsis ></a-table-column>
          <a-table-column title="创建时间" :width="200" data-index="time" ellipsis tooltip></a-table-column>
          <a-table-column title="来源" :width="80" ellipsis tooltip>
            <template #cell="{ record }">
              <a-typography-text v-if="record.type == 1" type="info">系统</a-typography-text>
              <a-typography-text v-if="record.type == 2" type="info">接口</a-typography-text>
              <a-typography-text v-if="record.type == 3" type="info">爬虫</a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="恶意性" :width="80" align="center">
            <template #cell="{ record }">
              <a-typography-text v-if="!record.attack" type="success">非恶意</a-typography-text>
              <a-typography-text v-else type="danger">恶意</a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="230" align="center">
            <template #cell="{ record }">
              <a-space :size="4">
                <a-link @click="fixComment(record)">
                  <template #icon><icon-edit :size="15" :stroke-width="3" /></template>
                  <template #default>修正</template>
                </a-link>
                <a-popover  trigger="click">
                  <a-link>
                    <template #icon><icon-eye :size="15" :stroke-width="3" /></template>
                    <template #default>详情</template>
                  </a-link>
                  <template #content>
                    <p>{{ record.text }}</p>
                  </template>
                </a-popover>
                <a-popconfirm type="warning" @ok="delComment(record)" content="您确定要删除该项吗?">
                  <a-link status="danger">
                    <template #icon><icon-delete :size="15" :stroke-width="3" /></template>
                    <template #default>删除 </template>
                  </a-link>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref } from 'vue'
import { usePagination } from '@/hooks'
import { getCommentList ,deleteComment , updateComment} from '@/apis'
import type { Comment } from '@/apis'
import { Notification } from '@arco-design/web-vue';

const form = reactive({
  value1: '',
  value2: '',
})

const loading = ref(false)
const tableData = ref<Comment[]>([])

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => getTableData())

const getTableData = async () => {
  loading.value = true
  let attack = 2

  if (form.value2 == "恶意"){
    attack =1
  }
  if(form.value2 == "非恶意"){
    attack =0
  }

  const { success, data } = await getCommentList({
    current: current.value,
    pageSize: pageSize.value,
    text:form.value1,
    attack:attack
  })

  if (success) {
    tableData.value = data.list
    setTotal(data.total)
    loading.value = false
  } else {
    loading.value = false
  }
}


const delComment = async(item : Comment) => {
  const { success, data } = await deleteComment({
    "idx":item.idx
  })
  if(success){
    Notification.success('删除成功！')
  }
  getTableData()
}

const fixComment = async(item : Comment) => {
  let res = item.attack? 0:1
  const { success, data } = await updateComment({
    "type":item.type,
    "text":item.text,
    "attack" : res
  })
  if(success){
    Notification.success('修正成功！')
  }

  getTableData()
}

const reload = async() => {
  form.value1 = ''
  form.value2 = ''
  getTableData()
}

getTableData()

</script>

<style lang="scss" scoped>
:deep(.arco-grid) {
  flex-wrap: wrap;
}
:deep(.arco-grid-item) {
  min-width: 250px;
}
:deep(.arco-alert-success) {
  padding: 14px 16px;
  border-color: rgb(var(--success-6));
  background-color: rgba(var(--success-6), 0.08);
  .arco-alert-content {
    color: rgb(var(--success-6));
    font-size: 12px;
  }
}
.collapsed-btn {
  &:hover,
  &:active {
    background: none;
  }
}
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: 12px;
    :deep(.arco-form-item) {
      margin-bottom: 10px;
    }
  }
  .table-box {
    flex: 1;
    overflow: hidden;
    margin-top: 12px;
  }
}
</style>
