$(function(){
  function buildHTML(message, createdAt){
    if (message.image_url === null) {
      var html = `
<div class="chat-main__message" id="latest">
  <div class="chat-main__message--top">
    <div class="chat-main__message--name">
      ${message.user_name}
    </div>
    <div class="chat-main__message--date-and-time">
      ${createdAt}
    </div>
  </div>
  <div class="chat-main__message--bottom">
    ${message.body}
  </div>
</div>
      `
    } else {
      var html = `
<div class="chat-main__message" id="latest">
  <div class="chat-main__message--top">
    <div class="chat-main__message--name">
      ${message.user_name}
    </div>
    <div class="chat-main__message--date-and-time">
      ${createdAt}
    </div>
  </div>
  <div class="chat-main__message--bottom">
    ${message.body}
    <br>
    <img src="${message.image_url}">
  </div>
</div>
      `
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
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
    .done(function(data){
      var createdAt = data.created_at.substr(0, 19).replace(/-/g, '/').replace('T', ' ');
      var html = buildHTML(data, createdAt);
      $('.chat-main__body--messages').append(html)
      $('#message_body').val('')
      $('#message_image').val('')
      $('.chat-main__body').animate({scrollTop:$('#latest').position().top})
    })
    .fail(function(){
      alert('error');
    })
  })
})
