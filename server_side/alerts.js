'use strict';

exports.ModalDialog = function(id, title, body, onok, oncancel)
{
  const ok_button = $('<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>');
  const close_button = $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
  
  const footer = $('<div class="modal-footer"></div>');
  
  //const strID = '#' + id;
 
  ok_button.click(function() {
      //$(strID).remove();
      if (onok) onok();
  });
  
  close_button.click(function() {
      //$(strID).remove();
      if (oncancel) oncancel();
  });

  if (onok) 
    footer.append(ok_button);

  footer.append(close_button);
  
  const $html = $(
        '<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="'+id+'Label"></div>').append(
          $('<div class="modal-dialog" role="document"></div>').append(
            $('<div class="modal-content"></div>').append(
              '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                '<h4 class="modal-title" id="'+id+'Label">'+title+'</h4>'+
              '</div>',
              '<div class="modal-body">'+ body + '</div>',
              footer
            )
          )
  );
    
  $('#' + id).remove();
    
  $( "body" ).append($html);

  
  return jQuery('#' + id);
};

exports.OnTransactionSent = function(result)
{
    var responce = result;
    if (result.responseJSON)
        responce = result.responseJSON;
        
    var title = "Success!";
    if (!responce || !responce.status || responce.status != 'success')
    {
        title = "Failed!"
    }
    
    var message1 = "";
    if (responce.data)
        message1 = responce.data;
    
    var message2 = result.responseText || "";
    message2 += "<br>Please try again later<br>";
    if (responce.message)
        message2 = responce.message;
    if (title == "Success!")
        message2 = "";


    const id = "OnTransactionSent";
    
    exports.ModalDialog(id, title, '<div>'+message1 +'<br>'+message2+'<br>Note, that push TX has an active limit of 5 API requests per minute.</div>');
    
    if (title == "Failed!")
    {
        $('#' + id + 'Label').addClass('');
    }
    
    jQuery('#' + id).modal('show');    
};

exports.Alert = function(title, message, onok, oncancel)
{
  const strTitle = title || "";
  const strMessage = message || "";
  const id = "SimpleAlert";
  
  jQuery('#' + id).modal('hide');    

  exports.ModalDialog(id, strTitle, '<div>'+strMessage+'</div>', onok, oncancel);
  
  jQuery('#' + id).modal('show');    
  
}