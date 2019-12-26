<template>
   <div id="main"> 
    <Header title="喵喵影院"/>
       <div id="content">
			<div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
             <CiList />
       </div>
    <TabBar/>
   </div>
</template>
<script>
import Header from '@/components/header'
import TabBar from '@/components/tabbar'
import CiList from '@/components/cilist'
export default {
    name:'cinema',
    data(){
        return{

        }
    },
    components:{
    Header,
    TabBar,
    CiList,
    },
}
</script>

<style scoped>

</style>