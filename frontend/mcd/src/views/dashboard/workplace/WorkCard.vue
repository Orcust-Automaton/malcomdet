<template>
  <a-card title="工作台" :bordered="false" size="medium" class="card-box">
    <template #extra>
      <GiNowTime></GiNowTime>
    </template>
    <a-row justify="space-between" align="center" class="work-platform">
      <a-space :size="15">
        <a-avatar :size="80">
          <img :src="userStore.userInfo.avatar" />
        </a-avatar>
        <div class="tip">
          <p>早安，{{ userStore.userName }}！</p>
          <p>{{msg}}</p>
        </div>
      </a-space>

      <a-space :size="50">
        <a-statistic :value-from="0" :start="true" animation>
          <template #title>
            <a-space>
              <GiSvgIcon name="icon-msg"></GiSvgIcon>
              <span>评论总量： {{ count }}</span>
            </a-space>
          </template>
        </a-statistic>
      </a-space>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { ref } from 'vue'
import { getCommentCount } from '@/apis'
import axios from 'axios';

const userStore = useUserStore()
const msg = ref("最爱东山晴后雪，软红光里涌银山。 -- 杨万里")
const count = ref(0)


const Init = async () => {
  var config = {
  method: 'get',
  url: 'https://v1.hitokoto.cn/?c=i',
  };

  axios(config)
  .then(function (response) {
    let data = response.data;
    msg.value = data.hitokoto + " —— " + data.from_who
  })
  .catch(function (error) {
    console.log(error);
  });
  const {success , data} = await getCommentCount()
  count.value = data.res

}

Init()

</script>

<style lang="scss" scoped>
:deep(.arco-statistic-title) {
  margin-bottom: 0;
}
.card-box {
  margin-top: $margin;
}
.work-platform {
  padding: 0 20px;
  .tip {
    color: $color-text-3;
    p {
      &:first-child {
        font-size: 1.25rem;
        color: $color-text-1;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
