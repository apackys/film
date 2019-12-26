<template>
   <div class="cinema_body"><BScroll :handleToScroll="handleToScroll" :handleTopullingUp="handleTopullingUp">
				<ul>
					<li v-for="item in cinemas" :key="item.id">
						<div>
							<span>{{item.nm}}</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distance}}</span>
						</div>
						<div class="card">
                			<div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key | cardstyle" >{{key | formatcard}}</div>
                			
       					</div>
					</li>
					<li class="pullDown">{{pullDownMsg}}</li>
				</ul></BScroll>
		
		 </div>
</template>

<script>

export default {
  name: 'CiList',
  data(){
	  return{
		  cinemas:'',
		  pullDownMsg:'',

	  }
  },

  mounted(){
	  this.$axios.get('http://localhost:8081/cinemas')
	  .then(res=>{
		  var data = res;
		  if(data){
			  this.cinemas= res.data;
		  }
	  })
  },
  methods:{
	 
	  async handleTopullingUp(){
			await this.$axios.get('http://localhost:8081/cinemas2')
			  .then(res=>{
				  let arr2=res.data;
				  if(arr2){
					this.pullDownMsg="loading";
					this.cinemas = [...this.cinemas, ...arr2];
					this.pullDownMsg="";
						
					  }
				  
			  })
		  
	  }
  },
  filters:{
	  formatcard(key){
		  var card=[
			{key:'allowRefund',value:'改签'},
			{key:'endorse',value:'退'},
			{key:'sell',value:'折扣卡'},
			{key:'snack',value:'小吃'},
		  ]
		  for(var i=0; i<card.length;i++){
			  if(card[i].key===key){
				  return card[i].value;
			  }
		  }return ''
	  },
	  cardstyle(key){
		   var cardcolor=[
			{key:'allowRefund',value:'bl'},
			{key:'endorse',value:'bl'},
			{key:'sell',value:'or'},
			{key:'snack',value:'or'},
		  ]
		   for(var i=0; i<cardcolor.length;i++){
			  if(cardcolor[i].key===key){
				  return cardcolor[i].value;
			  }
		  }return ''
	  }
  }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.cinema_body .pullDown{padding: 0;margin: 0;border:none;}
</style>