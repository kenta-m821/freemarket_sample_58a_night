$(function() {
  // 子カテゴリーを追加するための処理です。
  function buildChildHTML(child){
    var html =`<a class="child_category" id="${child.id}" 
                href="/category/${child.id}">${child.name}</a>
              `;
    return html;
  }
  
  $(".category_btn").mouseenter(
    function () {
      $(".category_box").css("display", "flex");
      $(".parents_list").css("display", "block");
    });

  $(".parents_list").mouseenter(
    function () {
      $(".parents_list").css("display", "block");
      $(".grand_child_category").remove();
    });

  $(".category_box").mouseleave(
    function () {
      $(".parents_list").css("display", "none");
      $(".child_category").remove();
      $(".grand_child_category").remove();
    });

  $(".category-parent").on("mouseenter", function() {
    var id = this.id;//どのリンクにマウスが乗ってるのか取得します

    $(".now-selected-red").removeClass("now-selected-red")
    $('#' + id).addClass("now-selected-red");
    $(".child_category").remove();
    $(".grand_child_category").remove();
    $.ajax({
      type: 'GET',
      url: '/category/new',
      data: {parent_id: id},
      dataType: 'json'
      
    }).done(function(children) {
      children.forEach(function (child) {
        var html = buildChildHTML(child);
        $(".category_list_children").append(html);
      })
    });
  });
  
  function buildGrandChildHTML(child){
    var html =`<a class="grand_child_category" id="${child.id}"
              href="/category/${child.id}">${child.name}</a>`;
    return html;
  }

  $(".grand_children_list").mouseleave(
    function() {
    }
  );

  $(document).on("mouseenter", ".child_category", function () {
    var id = this.id
    $(".grand_child_category").remove();
    $(".now-selected-gray").removeClass("now-selected-gray");
    $('#' + id).addClass("now-selected-gray");
    $.ajax({
      type: 'GET',
      url: '/category/new',
      data: {parent_id: id},
      dataType: 'json'
    }).done(function(children) {
      children.forEach(function (child) {
        var html = buildGrandChildHTML(child);
        $(".grand_children_list").append(html);
      })
    });
  }); 
});