<template>
    <div v-if="isShown" class="wrapper">
      <ul class="x-page-nav-wrapper">
        <li class="x-page-item x-page-number" v-show="selectPage !== 1" @click="previousPage">上一页</li>
        <li :class="{'x-page-number':pageNumber !== '...','active':pageNumber === selectPage}"
            class="x-page-item"
            v-for="pageNumber in pageNumbers"
            @click="getPage(pageNumber)">
          {{ pageNumber }}
        </li>
        <li class="x-page-item x-page-number" v-show="selectPage !== maxPage" @click="nextPage">下一页</li>
        <li class="x-page-item">
          共{{ maxPage }}页
        </li>
        <li class="x-page-item">
          <span>跳到第</span>
          <input type="number" v-model="chosenPage" min="1" :max="maxPage" class="choose-page">
          <span>页</span>
        </li>
        <li class="x-page-item">
          <button class="nav-page-btn" @click="choosePage">确定</button>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "XuPageNav",
    props:{
      //该组件是否显示，默认不显示
      isShown:{
        type:Boolean,
        default:false,
      },
      //最大页码
      maxPage:{
        type: Number,
        default: 1
      },
    },
    data:function () {
      return {
        selectPage:1,//当前选择的页码
        chosenPage:'',//跳转的页码
        pageNumbers:[],//用于显示出来的页码
      }
    },
    methods:{
      // 给定一个范围产生一个序列（包括首尾）
      getArray:function(min,max){
        let array = [];
        let range = max-min;
        if (range < 0) {
          return -1;
        } else {
          for (let i=0;i<=range;i++){
            array[i] = min + i
          }
          return array;
        }
      },
      // 产生用于显示的数字
      initPageNumbers:function () {
        if (this.maxPage <= 6 && this.maxPage >= 1){//最大页码在4页之内
          this.pageNumbers = this.getArray(1,this.maxPage);
        } else {//最大页码超过了6页
          this.pageNumbers = [1,2,3,4,5,'...',this.maxPage];
        }
      },
      //根据选择的页码调整显示的页码
      adjustPageNumbers:function (selectPage) {
        if (this.maxPage >= 7){//只有最大页码大于等于7才会出现这种情况
          if (selectPage === 1 || selectPage === 2 || selectPage === 3){
            this.pageNumbers = [1,2,3,4,5,'...',this.maxPage];
          } else if (selectPage === this.maxPage - 2 || selectPage === this.maxPage - 1 || selectPage === this.maxPage){
            this.pageNumbers = [1,'...',this.maxPage-4,this.maxPage-3,this.maxPage-2,this.maxPage-1,this.maxPage];
          } else {
            this.pageNumbers = [1,'...',selectPage-1,selectPage,selectPage+1,'...',this.maxPage];
          }
        }
      },
      //点击页码跳转
      getPage:function (pageNumber) {
        if (pageNumber !== '...'){
          this.selectPage = pageNumber;
          this.adjustPageNumbers(this.selectPage);
          this.$emit('selectedPage',this.selectPage);
        }
      },
      //点击上一页跳转
      previousPage:function () {
        this.selectPage = this.selectPage - 1;
        this.adjustPageNumbers(this.selectPage);
        this.$emit('selectedPage',this.selectPage);
      },
      //点击下一页跳转
      nextPage:function () {
        this.selectPage = this.selectPage + 1;
        this.adjustPageNumbers(this.selectPage);
        this.$emit('selectedPage',this.selectPage);
      },
      //点击页码选择跳转
      choosePage:function () {
        //限定页码的范围才能进行点击
        if (Number(this.chosenPage) > 0 && Number(this.chosenPage) <= this.maxPage){
          this.selectPage = Number(this.chosenPage);
          this.adjustPageNumbers(this.selectPage);
          this.$emit('selectedPage',this.selectPage);
        }
      }
    },
    watch:{
      maxPage:function () {
        this.initPageNumbers()
      }
    },
    mounted() {
      this.initPageNumbers()
    }
  }
</script>

<style scoped>
  .wrapper {
    margin-bottom: 5px;
  }
  .x-page-nav-wrapper {
    font-size: 12px;
    color: #e0e3e9;
  }
  .x-page-number {
    border: 1px solid #325893;
    border-radius: 3px;
  }
  .x-page-number:hover{
    cursor: pointer;
    background-color: #304981;
  }
  .x-page-item {
    display: inline-block;
    padding: 2px 8px;
  }
  .active {
    background-color: #325893;
  }
  .choose-page {
    width: 35px;
  }
  .nav-page-btn {
    height: 25px;
    margin-left: 10px;
    background-color: #3869aa;
    width: 50px;
    color: #f7f7f7;
    border-radius: 3px;
  }

  .nav-page-btn:hover {
    background-color: #33629e;
  }
</style>
