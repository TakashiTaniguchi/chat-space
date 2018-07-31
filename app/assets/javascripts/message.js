$(function(){
  function buildHTML(message){
    var imgTag = message.image_url === null
      ? ``
      : `<br>
        <img src="${message.image_url}">`
    var html = `
    <div class="chat-main__message" id="latest">
      <div class="chat-main__message--top">
        <div class="chat-main__message--name">
          ${message.user_name}
        </div>
        <div class="chat-main__message--date-and-time">
          ${message.created_at}
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
      $('form')[0].reset();
      $('.chat-main__body').animate({scrollTop:$('#latest').position().top})
    })
    .fail(function(){
      alert('error');
    })
  })
})
