$(function(){
  function buildHTML(message){
    var createdAt = message.created_at.substr(0, 19).replace(/-/g, '/').replace('T', ' ');
    var imgTag = ``
    if (message.image_url !== null) {
      imgTag = `
      <br>
      <img src="${message.image_url}">
      `
    }
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
        ${imgTag}
      </div>
    </div>
    `
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
      var html = buildHTML(data);
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
