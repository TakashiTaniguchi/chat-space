$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var imgTag = message.image_url === null
      ? ``
      : `<br>
        <img src="${ message.image_url }">`
    var html = `
    <div class="chat-main__message" data-message-id="${ message.id }">
      <div class="chat-main__message--top">
        <div class="chat-main__message--name">
          ${ message.user_name }
        </div>
        <div class="chat-main__message--date-and-time">
          ${ message.created_at }
        </div>
      </div>
      <div class="chat-main__message--bottom">
        ${ message.body }
        ${ imgTag }
      </div>
    </div>
    `
    return html;
  }

  function scrollToLastMessage() {
    $('.chat-main__body').animate({scrollTop:$('.chat-main__message:last').position().top})
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body--messages').append(html)
      $('form')[0].reset();
      scrollToLastMessage();
    })

    .fail(function() {
      alert('error');
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var messageId = $('.chat-main__message:last').data('message-id');

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: messageId },
        dataType: 'json'
      })

      .done(function(data) {
        var html = '';
        data.forEach(function(message) {
          html += buildHTML(message);
        });
        $('.chat-main__body--messages').append(html);
        scrollToLastMessage();
      })

      .fail(function() {
        alert('error');
      })
    } else {
      clearInterval(interval);
    }
  }, 5000);
})
