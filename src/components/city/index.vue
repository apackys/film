<template>
    <div class="city_body">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
						<li @click='handleToCity(city.nm,city.id)' v-for="city in hotCity" :key="city.id">{{city.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li @click='handleToCity(city.nm,city.id)' v-for="city in item.list" :key="city.id" >{{city.nm}}</li>
							</ul>
						</div>
						
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleIndex(index)">{{item.index}}</li>
					</ul>
				</div>
			</div>
</template>
<script>
export default {
    name:'City',
    data(){
        return{
		   hotCity:[],
		   cityList:[],
		 

        }
	},
	mounted(){
		var hotcitys=window.localStorage.getItem('hotcity');
		var citylists=window.localStorage.getItem('citylist');
		if(hotcitys && citylists){
			this.hotCity =JSON.parse(hotcitys);	
			this.cityList= JSON.parse(citylists);
		}else{
		this.$axios.get('/api/cityList')
		.then(res=>{
			var msg =res.data.msg;
			if(msg ==='ok'){
			   var cities =res.data.data.cities;
			   var {hotcity,citylist} = this.formatCityList(cities);
			   this.hotCity =hotcity;
			   this.cityList= citylist;
			   window.localStorage.setItem('hotcity',JSON.stringify(hotcity));
			   window.localStorage.setItem('citylist',JSON.stringify(citylist));
			}
		})
		}
	},
	methods:{
		//构造成[{index:A,list:[{nm:北京，id:10}, ]}，{index:B,list:[{nm:北京，id:10},{nm:上海，id:11}]}]
		formatCityList(cities){
			let hotcity=[];
			let citylist=[];
			for(var i=0;i < cities.length; i++){
				if(cities[i].isHot===1){
					hotcity.push(cities[i]);
				}
			}
			for(var i=0; i< cities.length;i++) {
				var FirstLetter = cities[i].py.substring(0,1).toUpperCase();
				if(GetListFromData(FirstLetter)){//index不存在 创建
					citylist.push({index:FirstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});

				}else{  //index存在  list 数组累加
                     for(var j=0; j< citylist.length;j++){
						 if(citylist[j].index === FirstLetter){
							 citylist[j].list.push({nm:cities[i].nm,id:cities[i].id})
						 }
					 }
				}

			}
			citylist.sort((a,b)=>{
				if(a.index > b.index){return 1;}
				else if(a.index < b.index){return -1;}
				else{return 0;}
			});
			function GetListFromData(FirstLetter){
			for(var i=0; i< citylist.length;i++){
				if(citylist[i].index === FirstLetter){
					return false
				}
			}return true   }
			
			//console.log(citylist)
			return {hotcity,citylist}
		    
		},
		handleIndex(index){
			var h2 = this.$refs.city_sort.getElementsByTagName('h2');
			this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
		},
		handleToCity(nm,id){
			this.$store.commit('city/CITY_INFO',{nm,id});
			//store的mutations在city的文件下引入 ，所以要加city
			window.localStorage.setItem('Nownm',nm);
			window.localStorage.setItem('Nowid',id);
			this.$router.push('/movie/nowplay');
		}
		
	

	}
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}

.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}

.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>