$(document).ready(function() {
   $('#form-data').on('submit', function(event) {
      // event.preventDefault();

      $.ajax({
         url: '/queries/',
         type: 'POST',
         // headers: {'X-CSRFToken': '{{ csrf_token }}'},
         data: $('#form-data').serialize(),

         beforeSend: function() {
            $("#codeModal").modal("show");
         },

         success: function(data) {
            $('#codeModal .modal-body').html(data);
         }
      });
   });
});