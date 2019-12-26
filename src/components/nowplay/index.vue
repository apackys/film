<template>
	<div class="movie_body"><Loading v-if='isloading'/>
		<BScroll v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
		
				<ul><li class="pullDown">{{pullDownMsg}}</li>
					<li v-for="item in movieList" :key="item.id">
						<div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
						<div class="info_list">
							<h2>{{item.nm}} <img v-if='item.version' src="/static/images/maxs.png"></h2>
							<p>观众评 <span class="grade">{{item.sc}}</span></p>
							<p>主演: {{item.star}}</p>
							<p>{{item.showInfo}}</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul></BScroll>
			</div>

</template>
<script>
import {messagebox} from '@/components/js'
export default {
    name:'NowPlay',
    data(){
        return{
		   movieList:[],
		   pullDownMsg:'',
		   isloading:true,
		   precityid:-1
        }
	},
	mounted(){
		this.$axios.get('/api/getLocation')
		.then(res=>{
			var msg = res.data.msg;
			if(msg === 'ok'){
				 var nm = res.data.data.nm;
				 let sid = res.data.data.id;
				
				 if(this.$store.state.city.id == sid){return;}
				 messagebox({
							title : '定位',
							content :nm,
							cancel : '取消',
							ok : '切换位置',
							handleOk(){
								window.localStorage.setItem('nowNm',nm);
								window.localStorage.setItem('nowId',sid);
								window.location.reload();
							},
							handleCancel(){

							}
						})
			}

		})
		 
	},
	activated(){
		var cityid = this.$store.state.city.id;
		//城市不变时切换非城市选项是不在请求json
		if(this.precityid === cityid){return}
		this.isloading=true;
		console.log('正在上映请求json一次')
		this.$axios.get('/api/movieOnInfoList?cityId='+cityid)
		.then(res=>{
			//console.log(res.data)
			var msg =res.data.msg;
			if(msg === 'ok'){
				this.movieList = res.data.data.movieList;
				this.isloading=false;
				this.precityid =cityid;
			}
		})
	},
	methods:{
		handleToScroll(pos){
			if(pos.y>30){
					this.pullDownMsg="释放立即刷新";
					//console.log('释放立即刷新')	
			}
		},
		handleToTouchEnd(pos){
			if(pos.y>30){
				this.$axios.get('/api/movieOnInfoList?cityId=11')
				.then(res=>{
					var msg =res.data.msg;
					if(msg==='ok'){
						this.pullDownMsg="刷新成功";
						setTimeout(()=>{
							this.movieList = res.data.data.movieList;
							this.pullDownMsg="";
						},1000)
						
					}
				})
			}
		}
	}

}
</script>

<style scoped>

#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{padding: 0;margin: 0;border:none; text-align: center;}
</style>