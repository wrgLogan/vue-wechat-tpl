/*
 * @Author: Yan Yuanfeng 
 * @Date: 2018-11-05 12:16:14 
 * @Last Modified by: Yan Yuanfeng
 * @Last Modified time: 2018-11-05 16:25:42
 * @descript 条款模板1
 */
//  <provision :tiaokuan="tiaokuan" :json="json" :firstPageInfo="firstPageInfo" ></provision>
//          json:[
//             {   title:"条款1",
//                 json:json1,//条款1对应的数据
//                 anchorNum:"shui1"//锚点条款唯一标识
//             },
//             {   title:"条款2",
//                 json:json2,//条款2对应的数据
//                 anchorNum:"shui2"//锚点条款唯一标识
//             },
//         ],
//         tiaokuan:tiaokuan,条款下载链接
//         firstPageInfo:{
//             title:"总标题",//所有条款总标题
//             remind:"条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
//         }
<template>
<div class="provision">
    <div id="top"></div>
    <div class="pagewarp">
        <div class="pagebg">
            <h3 class="provision_title" >{{firstPageInfo.title}}</h3> 
            <div class="firstpage" style="height:15.5rem">
                <div class="guide" v-for="(item , index) in json" :key="index">
                        <p class="note" > <span class="note_t">{{item.title}}</span> <span class="note_a" v-anchor="'title'+item.anchorNum" >前往</span> </p>
                </div>
                <p class="remind" >
                        <img src="./image/warning.png" alt="">  <span>{{firstPageInfo.remind}}</span>
                </p>
            </div>           
        </div>
    </div>
    <div class="warpcontent" v-for="(json_sub,index_json) in json" :key="index_json">
        <div class="catalog clearfix">
            <p class="tiaokuanTitle" :id="'anchor-'+'title'+json_sub.anchorNum">{{json_sub.title}}</p>
                <h4 class="title_1">条款目录 </h4>
                <div   style="height:15.5rem" class="catalog_warp" v-for="(col_item,col_key) in json_sub.col" :key="col_key" :class="{rightcata : col_key%2==1,leftcata : col_key%2==0,noAfter:(json_sub.col-2)<=col_key}" >
                    <div v-for="item in json_sub.catalogArr.slice((col_item-1) * json_sub.colnum,(col_item-1) * json_sub.colnum + json_sub.colnum)" :key="item.number" >
                        <p v-if="item.level==1" class="catalog_item " v-anchor="item.number+'_'+json_sub.anchorNum">{{item.number}} {{item.title}}</p>
                        <!-- <p v-if="item.level==2"  class="catalog_item catalog_item_sub" v-anchor="item.number">{{item.number}} {{item.title}}</p> -->
                        <!-- <p v-if="item.level==3 &&key!=0" class="line" ></p> -->
                    </div>
                </div>
         </div>
        <div class="content"  >
            <!-- 一级 -->
            <div class="content_part"  v-for="(item , key) in json_sub.json" :key = "key">
                    <h4 class="title_1"  :id="'anchor-'+item.number+'_'+json_sub.anchorNum" >第{{item.number}}条、{{item.title}}</h4>
                    <div class="content_det" v-for="(part , part_key) in item.content" :key="part_key">
                            <p v-if="!!part.text">{{part.text}}</p>
                            <div v-if="!!part.img" class="list">
                                <img  :src="part.img" alt="">
                            </div>
                    </div>     
            </div>
        </div>
    </div>
   <div class="bottomfixed">
        <!-- 回到顶部 -->
        <img v-if="showTopBtn==true" src="./image/toTop.png" alt="totop" @click="top" >
        <!-- 安卓设备提供下载pdf功能 -->
        <a :href="tiaokuan"  v-if="!isIos&&!!tiaokuan"  >
                <img src="./image/download.png" alt="download" >
        </a>
   </div>

   <!-- 图片缩放插件 -->
   <section class="imgzoom_pack">
    		<div class="imgzoom_x">X</div>
    		<div class="imgzoom_img"><img src="" /></div>
    </section>
</div>
</template>
<style scoped src="./style2.css"></style>
<script>
import ImagesZoom from "@/lib/js/scale.js"
export default {
    name: 'Provisionseb',
    props:{
        tiaokuan:{
            type:String,
            default(){
                return ''
            }
        },
        json:{
            type:Array,
            default(){
                return []
            }
        },
        firstPageInfo:{
            type:Object,
            default(){
                return {
                    title:"条款",
                    guide:[
                        //    {
                        //      des:"描述",
                        //       num:'2.1'
                        //    }
                    ],
                    remind:"条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
                }
            }
        }
    },
    data(){
       return{

            // catalog:{//目录
            //     catalogArr:[],//[{title:'xx',number:'1'},{sun_title:'yy',number}]
            //     col:1,//列数
            //     colnum:17//每列目录标题数
            // },
            // colnum:17,//列数
            isIos:false,
            showTopBtn:false,
       }
    },
    directives: {
        anchor : {      
            inserted:function(el,binding){
                el.onclick = function(){
                    document.getElementById('anchor-'+binding.value).scrollIntoView() 
                }
            }
        }
    },
    created(){
        this.adjustJson(this.json) 
        
        // 判断是否是ios 如果是就不显示下载按钮 
        this.isIos=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? true :false
        // 微信内屏蔽了文件的下载，必须拼接完整的下载路径
        // this.tiaokuan =`${location.origin}${location.pathname}${this.tiaokuan}`
        // console.log(this.tiaokuan)
        
    },
    mounted(){
        document.getElementsByClassName('provision')[0].addEventListener('scroll',(e)=>{
            this.showTopBtn =e.target.scrollTop>1000
        })
       
       ImagesZoom.init({
            "elem": ".list"
        });  
    },
    
    methods: {
        // 文件下载
        // exportfile(){
        //     window.location.href= this.tiaokuan
        // },
        // 整理josn,添加编号
        adjustJson(arr,key){
            var key = key||'0'
            // 超过三级目录不进行遍历子标题
            if(key.split('.').length>=3){
                return
            }
           arr.forEach((item,item_key)=>{
               var catalog = {
                   catalogArr:[],
                   col:1,
                   colnum:17,//默认列数
               }
               console.log(item)
               item.json.forEach((element,index) => {
                   let number = key=='0'?index+1+"":key+'.'+(index+1)
                    catalog.catalogArr.push({title:element.title,number:number,level:1})
                    if(element.title.length>9){
                            catalog.catalogArr.push({title:"",number:"",level:4})//添加一个空的目录作为计数，避免目录文字太多换行导致该列超出一页而溢出
                    }
                    element.number= number
                    // console.log(1)
               });

                catalog.col=Math.ceil(catalog.catalogArr.length/catalog.colnum)
                // console.log(catalog.col)
               Object.assign(item,catalog)
           })
        },
        /**
         * 回到顶部
         */
        top(){
            document.getElementById('top').scrollIntoView() 
             this.showTopBtn=false
        },
    },
    computed: {
    }
}
</script>