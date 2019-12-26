<template>
    <div class="MessageBox">
       <p>定位</p>
       <h2>桂林</h2>
       <div>
           <div>切换</div>
           <div>取消</div>
       </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.MessageBox{width: 200px; height: 120px; border:solid 1px #ccc; border-radius:4px; display:flex; position:absolute; left:50%; top:50%; margin:-60px 0 0 -100px; background-color:white; box-shadow:3px #ccc;}
.MessageBox p{line-height: 30px; text-align: center;width: 100%;}
.MessageBox h2{line-height: 40px; text-align: center;width: 100%;}
.MessageBox > div{display: flex;position: absolute;bottom:0; width: 100%;}
.MessageBox > div div{flex:1;text-align: center; line-height: 30px;}
</style>