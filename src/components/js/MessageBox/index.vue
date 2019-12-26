<template>
    <div class="MessageBox">
       <p>{{title}}</p>
       <h2>{{content}}</h2>
       <div>
           <div @click='handleOk'>{{ok}}</div>
           <div @click='handleCancel'>{{cancel}}</div>
       </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.MessageBox{width: 200px; height: 120px; border:solid 1px #ccc; border-radius:4px; position:absolute; left:50%; top:50%; margin:-60px 0 0 -100px; background-color:white; box-shadow:2px 2px 2px 2px #ccc;}
.MessageBox p{line-height: 30px; text-align: center;}
.MessageBox h2{line-height: 40px; text-align: center; font-size: 18px;}
.MessageBox > div{display: flex;position: absolute;bottom:0; width: 100%; border-top:solid 1px #ccc;}
.MessageBox > div div{flex:1;text-align: center; line-height: 30px;border-right:solid 1px #ccc;}
.MessageBox > div div:last-child{border:none;}
</style>