$(function(){

  /* 左侧个人信息吸顶样式添加 */
  (function(){
    let $main = $("#main")
    /* 页面滚动监听 注意：一定要一刷新页面就要执行，不然会恢复到最初位置*/
    $(window).scroll((function m(){
      /* 获取滚动高 */
      let sTop = $(window).scrollTop();
      /* 判断滚动高是否大于80，如果大于就给$div加名字 */
      if(sTop >= 80){
        $main.addClass("fixed");
      }else{
        $main.removeClass("fixed");
      }
      return m; 
      /* $main[sTop>=80?"addClass":"removseClass"]("fixed"); */
    }()));
  })();

  /* 右侧栏点击事件与检测 */
  (function(){
    let $li = $("#main .side-nav ul li");
    let $active = $("#main .introduce article");
    
    /* 点击事件 */
    $li.click(function(){
      let i = $(this).index();
      // console.log($active[i]);
      /* 得到对应的active距离文档的高度 */
      let toTop = $active.eq(i).offset().top;
      // console.log(toTop);
      /* 浏览器滚动高变成相对应的高度 */
      $("html").stop().animate({
        scrollTop : toTop
      },800);
      /* window没有 window.scrollTop = toTop的操作, 应该是document.documentElement*/
      // $(window).animate({
      //   scrollTop : toTop
      // },300);

      /* 对应的a标签添加active,其他去掉active */
      $(this)
        .find("a")
        .addClass("active")
        .addBack().siblings().find("a")
        .removeClass("active");
    });

    /* 滚动改变右侧栏动画 */
    function m(){
      /* 获取滚动高 */
      let sTop = $(window).scrollTop();
      /* 定义变量接收显示的序号 */
      let len = $active.length;
      let index;
      /* 遍历检测差值 */
      for(let i = 0;i < len;i++){
        /* 得到当前active的距离顶部的距离 */
        let toTop = $active.eq(i).offset().top;
        /* 相减 */
        if(toTop - sTop > 100){
          index = i-1;
          break;
        }
      }
      /* 调整index极端值 */
      index === undefined && (index = len-1); // 不然当是00的时候，直接跳到最后了。
      index = Math.max(index,0);
      /* 调整名字 */
      $li.eq(index)
      .find("a")
      .addClass("active")
      .addBack().siblings().find("a")
      .removeClass("active");

    return m;
    };
    /* 页面一加载就应该检测 */
    m();

    /* 节流 */
    /* 如果scroll一直触发，那么m就不会执行，因为下一次的scorll清除了上一次scorll的timer，所以没有机会在0.3s执行 */
    let timer = null;
    $(window).scroll(function(){
      clearTimeout(timer);
      timer = this.setTimeout(m,300);
    });
  })();
});