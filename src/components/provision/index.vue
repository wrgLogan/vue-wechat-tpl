/*
 * @Author: Yan Yuanfeng 
 * @Date: 2018-11-05 12:16:14 
 * @Last Modified by: Yan Yuanfeng
 * @Last Modified time: 2018-11-05 16:23:46
 * @descript 条款模板1
 */
//  <provision :tiaokuan="tiaokuan" :json="json" :firstPageInfo="firstPageInfo" ></provision>
// json:[]条款json数据
// firstPageInfo:{ 条款第一页的数据
//     title:"条款名称",
//         tip:"本阅读指引有助于您理解条款，对本合同内容的解释以条款为准。",
//         guide:[
//                 {
//                 titel:"head",
//                 arr:[
//                     {
//                         des:"描述",
//                         num:'2.1'
//                     }
//                 ]
//             }
//         ],
//         remind:"条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
//  }
// tiaokuan:条款下载链接
<template>
<div class="provision">
    <div id="top"></div>
    <div class="pagewarp">
        <div class="pagebg">
            <div class="firstpage" style="height:15.5rem">
                <h3 class="provision_title" >{{firstPageInfo.title}}</h3> 
                <p class="tip">{{firstPageInfo.tip}}</p>
                <div class="guide" v-for="(item , index) in firstPageInfo.guide" :key="index">
                    <p class="title_1 title_weight"> {{item.title}}</p>
                    <template v-for="(sub , index_sub) in item.arr" >
                        <p class="note" :key="index_sub"> <span class="note_t">{{sub.des}}</span> <span class="note_a" v-anchor="2.7" >第{{sub.num}}条</span> </p>
                    </template>
                </div>
                <!-- <div class="guide">
                    <p class="title_1">您拥有的重要权益：</p>
                    <p class="note"><span class="note_t">被保险人享受本保险合同提供的保障</span> <span class="note_a" v-anchor="2.3" >第2.3条</span></p>
                </div>
                <div class="guide">
                    <p class="title_1">您应当特别注意的事项：</p>
                    <p class="note"><span class="note_t">在某些情况下，本公司不承担保险责任</span> <span class="note_a" v-anchor="2.7" >第2.7条</span></p>
                    <p class="note"><span class="note_t">退保会给您造成一定的损失，请您慎重决策</span> <span class="note_a" v-anchor="5.1" >第5.1条</span></p>
                    <p class="note"><span class="note_t">您有如实告知的义务</span> <span class="note_a" v-anchor="6.2" >第6.2条</span></p>
                    <p class="note"><span class="note_t">在某些情况下，本公司不承担保险责任</span> <span class="note_a" v-anchor="7" >第7条</span></p>
                </div> -->
                <p class="remind" >
                        <img src="./image/warning.png" alt="">  <span>{{firstPageInfo.remind}}</span>
                </p>
            </div>

            <div class="catalog clearfix">
                <h4 class="title_1">条款目录</h4>
                <div   style="height:15.5rem" class="catalog_warp" v-for="(col_item,col_key) in catalog.col" :key="col_key" :class="{rightcata : col_key%2==1,leftcata : col_key%2==0,noAfter:(catalog.col-2)<=col_key}" >
                    <div v-for="(item , key) in catalog.catalogArr.slice((col_item-1) * catalog.colnum,(col_item-1) * catalog.colnum + catalog.colnum)" :key="item.number" >
                        <p v-if="item.level==1" class="catalog_item title_weight">{{item.number}} {{item.title}}</p>
                        <p v-if="item.level==2"  class="catalog_item catalog_item_sub" v-anchor="item.number">{{item.number}} {{item.title}}</p>
                        <p v-if="item.level==3 &&key!=0" class="line" ></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div class="content">
       <!-- 一级 -->
       <div class="content_part"  v-for="(item , key) in json" :key = "key">
            <h4 class="title_1 title_weight"  :id="'anchor-'+item.number" >{{item.title}}</h4>
            <!--二级 -->
            <div class="content_title" v-if="item.children" v-for="(item_sub,key_sub) in item.children" :key="key_sub" >
                <p :id="'anchor-'+item_sub.number" >{{item_sub.number}}  {{item_sub.title}}</p>
                <div class="content_det" v-for="(part , part_key) in item_sub.content" :key="part_key">
                    <p v-if="!!part.text">{{part.text}}</p>
                    <div v-if="!!part.img" class="list">
                        <img  :src="part.img" alt="">
                    </div>
                </div>
                <!-- 三级 -->
                <div class="content_title" v-if="item_sub.children" v-for="(item_three,key_three) in item_sub.children" :key="key_three" >
                    <p :id="'anchor-'+item_three.number" >{{item_three.number}}  {{item_three.title}}</p>
                    <div class="content_det" v-for="(part_three , ket_part_three) in item_three.content" :key="ket_part_three">
                        <p v-if="!!part_three.text">{{part_three.text}}</p>
                        <div v-if="!!part_three.img" class="list">
                            <img  :src="part_three.img" alt="">
                        </div>
                    </div>
                    <!-- 四级 -->
                     <div class="content_title" v-if="item_three.children" v-for="(item_four,key_four) in item_three.children" :key="key_four" >
                        <p style="padding-left:5px" >◇   &nbsp; {{item_four.title}}</p>
                        <div class="content_det" v-for="(part_four , ket_part_four) in item_four.content" :key="ket_part_four">
                            <p v-if="!!part_four.text">{{part_four.text}}</p>
                            <div v-if="!!part_four.img" class="list">
                                <img  :src="part_four.img" alt="">
                            </div>
                        </div>
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
<style scoped src="./style.css"></style>
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
                    tip:"本阅读指引有助于您理解条款，对本合同内容的解释以条款为准。",
                    guide:[
                        // {
                        //     titel:"head",
                        //     arr:[
                        //         {
                        //             des:"描述",
                        //             num:'2.1'
                        //         }
                        //     ]
                        // }
                    ],
                    remind:"条款是保险合同的重要内容，为充分保障您的权益，请您仔细阅读本条款。"
                }
            }
        }
    },
    data(){
       return{
            catalog:{//目录
                catalogArr:[],//[{title:'xx',number:'1'},{sun_title:'yy',number}]
                col:1,//列数
                colnum:17//每列目录标题数
            },
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
        this.catalog.col=Math.ceil(this.catalog.catalogArr.length/this.catalog.colnum)
        
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
            // console.log(key)
            // 超过三级目录不进行遍历子标题
            if(key.split('.').length>=3){
                return
            }
            arr.forEach((element,index) => {
                // this.count++
                let number = key=='0'?index+1+"":key+'.'+(index+1)
                if(key=='0'){
                    if(index!='0'){
                        this.catalog.catalogArr.push({title:element.title,number:number,level:3})//添加分割线
                    }
                    this.catalog.catalogArr.push({title:element.title,number:number,level:1})
                    if(element.title.length>9){
                             this.catalog.catalogArr.push({title:"",number:"",level:4})//添加一个空的目录作为计数，避免目录文字太多换行导致该列超出一页而溢出
                    }
                }else{//子目录
                    this.catalog.catalogArr.push({title:element.title,number:number,level:2})
                    if(element.title.length>9){
                        this.catalog.catalogArr.push({title:"",number:"",level:4})//添加一个空的目录作为计数，避免目录文字太多换行导致该列超出一页而溢出
                    }
                }
                element.number= number
                if(element.children!=null){
                    this.adjustJson(element.children,number)
                }
            });
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