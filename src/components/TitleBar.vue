<template>
    <div class="title">
        <img v-if="img=='user'" src="@/assets/icon-user.png" alt="">
        <img v-if="img=='wuye'" src="@/assets/icon-wuye.png" alt="">
        <img v-if="img=='baoxiu'" src="@/assets/icon-baoxiu.png" alt="">
        <img v-if="img=='baoshi'" src="@/assets/icon-baoshi.png" alt="">
        <img v-if="img=='gonggao'" src="@/assets/icon-gonggao.png" alt="">
        <img v-if="img=='fuwu'" src="@/assets/icon-fuwu.png" alt="">
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
  name: "TitleBar",
  props:["text","img"]
};
</script>

<style scoped>
.title {
  font-size: 1.6rem;
  color: #262626;
  line-height: 2.4rem;
  padding: 2rem 0;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.title img{
    margin: -0.3rem 0.8rem 0 1.1rem;
}
</style>
