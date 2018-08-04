$(document).on('turbolinks:load', function() {
  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${ user.name }
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>
        追加
      </a>
    </div>
    `
    $('#user-search-result').append(html);
  }

  function appendNoUser(info) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${ info }
      </p>
    </div>
    `
    $('#user-search-result').append(html);
  }

  function addUserToGroup(userId, userName) {
    var html = `
    <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${ userId }">
      <input class="user_id" name="group[user_ids][]" type="hidden" value="${ userId }">
      <p class="chat-group-user__name">
        ${ userName }
      </p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id=${ userId } data-user-name=${ userName }>
        削除
      </a>
    </div>
    `
    $('.chat-group-users').append(html);
  }

  function addUserToResult(userId, userName) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${ userName }
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ userId } data-user-name=${ userName }>
        追加
      </a>
    </div>
    `
    $('#user-search-result').append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    var userIds = [];
    $('input.user_id').each(function() {
      userIds.push($(this).val());
    })
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, user_ids: userIds },
      dataType: 'json',
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length  !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })

    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  })

  $(document).off('click', '.user-search-add');
  $(document).on('click', '.user-search-add', function(){
    var userId = $(this).data("user-id")
    var userName = $(this).data("user-name")
    $(this).parent().remove();
    addUserToGroup(userId, userName);
  })

  $(document).off('click', '.js-remove-btn');
  $(document).on('click', '.js-remove-btn', function(){
    var userId = $(this).data("user-id")
    var userName = $(this).data("user-name")
    $(this).parent().remove();
    addUserToResult(userId, userName);
  })
})
