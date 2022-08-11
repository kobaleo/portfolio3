$(function() {

  /************************************/
  /*******   ハンバーガー   ***********/
  /************************************/
  //ハンバーガーメニューをクリック
  $('.hamburger').on('click', function() {
    hamburger();
  });
  //メニューのリンクをクリック
  $('#navi a').on('click', function() {
    hamburger();
  });

  /************************************/
  /*******   スムーススクロール   *****/
  /************************************/
  $('a[href^="#"]').click(function(){
    //リンクを取得
    let href = $(this).attr("href");
    //ジャンプ先のid名をセット
    let target = $(href == "#" || href == "" ? 'html' : href);
    //トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    //animateでスムーススクロールを行う
    //600はスクロール速度で単位はミリ秒
    $("html, body").animate({scrollTop:position}, 600, "swing")
    return false;
  });

  /************************************/
  /*******   フェード表示   ***********/
  /************************************/
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      //要素(inviewクラス)が表示されたらshowクラスを追加
      $(this).stop().addClass("show");
    }
  });

  /************************************/
  /*******   スクロール時の表示   *****/
  /************************************/
  $(window).scroll(function() {
    //スクロール位置を取得
    let scroll = $(window).scrollTop();
  
    //メインビジュアルの拡大・縮小
    mv_scale(scroll);
    
    //ロゴ、ハンバーガーメニューの表示
    if (scroll > 520) {
      $('.logo').fadeIn(500);
      $('.hamburger').fadeIn(500);
    } else {
      $('.logo').fadeOut(500);
      $('.hamburger').fadeOut(500);
    }

    //サイドボタンを表示
    let gallery_position = $('#gallery').offset().top - $(window).height();
    let access_position = $('#access').offset().top - $(window).height();

    if (window.innerWidth > 900) {
      if(scroll > gallery_position) {
        if(scroll < access_position) {
          $('#side-btn').css( {
            'transform': 'rotate(-90deg) translateY(0)'
          });
        } else {
          $('#side-btn').css( {
            'transform': 'rotate(-90deg) translateY(60px)'
        });
       }
      } else {
        $('#side-btn').css( {
          'transform': 'rotate(-90deg) translateY(60px)'
        });
      }
     }
    
    //Accessの背景画像表示
      //画面下から#contactまでの距離を取得
      let contact_position = $('#contact').offset().top - $(window).height();

      //#accessが表示された場合
      if(scroll > access_position) {
        if(scroll < contact_position) {
          $('.bg').fadeIn(500);
        } else {
          $('.bg').fadeOut(500);
        }
      } else {
        $('.bg').fadeOut(500);
      }

  });

  /************************************/
  /****  画面読込時、幅変更時   *******/
  /************************************/
  $(window).on('load resize', function() {
    let scroll = $(window).scrollTop();
    mv_scale(scroll);
  });
});

/************************************/
/****  共通関数 ハンバーガー   ******/
/************************************/
function hamburger() {
  $('.hamburger').toggleClass('active');
  if ($('.hamburger').hasClass('active')) {
    $('#navi').addClass('active');
  } else {
    $('#navi').removeClass('active');
  }
}

/************************************/
/****  共通関数 メインビジュアル   **/
/************************************/
function mv_scale(scroll) {
  if (window.innerWidth > 900) {
    $('#mainvisual img').css({
      'width':100/3 + scroll/10 + '%'
    });
  } else {
    $('#mainvisual img').css({
      'width':100 - scroll/10 + '%'
    });
  }
}


