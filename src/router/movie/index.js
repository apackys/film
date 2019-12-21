export default {
  path:'/movie',
  redirect:'/movie/nowplay',
  component:()=>import('@/views/movie'),
  children:[{
    path:'city',
    component:()=>import('@/components/city'),
  },
  {
    path:'comesoon',
    component:()=>import('@/components/comesoon'),
  },
  {
    path:'search',
    component:()=>import('@/components/search'),
  },
  {
    path:'nowplay',
    component:()=>import('@/components/nowplay'),
  },
  
]
}