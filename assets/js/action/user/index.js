$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);

});


function detailissue(id){
  $('#modal-detail').modal({backdrop: 'static', keyboard: false})

  $('#modal-detail').modal({
    show: true
  });
}

loadpangan();
function loadpangan(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadpangan',
        data : {
                param      : '',
         },
        success: function(result){

        var x = {};
        var cont = '';
        for (var i = 0; i < result.length; ++i) {
            var obj = result[i];

            if (x[obj.nama_varietas] === undefined)
                x[obj.nama_varietas] = [obj.nama_varietas];

            x[obj.nama_varietas].push(obj.nama_varietas);
            cont +=
            `<div class="col-lg-4 col-md-6 portfolio-item `+obj.nama_varietas+`">
              <div class="portfolio-img"><img src="`+obj.foto+`" class="img-fluid" alt=""></div>
              <div class="portfolio-info">
                <h4>`+obj.nama_varietas+`</h4>
                <p>App</p>
                <a href="`+obj.foto+`" data-gall="portfolioGallery" class="venobox preview-link" title="App 1"><i class="bx bx-plus"></i></a>
                <a href="#!" data-toggle="modal" data-target="#myModal" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>`;
        }

        let varietas = Object.keys(x);
        var ul = `<li class="filter-active" onclick="filterSelection('all')" id="all">Semua</li>`;

        for (var i = 0; i < varietas.length; i++) {

          if(varietas[i] != 'null'){
            ul += `<li onclick="filterSelection('`+varietas[i]+`')" id="`+varietas[i]+`">`+varietas[i]+`</li>`;
          }
        }

        for (var i = 0; i < result.length; ++i) {
            console.log();
        }


        $('#pilih-filter').append(ul);
        $('#content-filter').append(cont);
        filterSelection("all");


        }
    });
}


function filterSelection(c) {
  $('.portfolio-item').removeAttr("style");
  $('#pilih-filter > li').removeAttr("class");
  $('#'+ c).attr('class', 'filter-active');
  var x, i;
  x = document.getElementsByClassName("portfolio-item");
  if (c == "all") c = "";

  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {

    if (x[i].className.indexOf(c) > -1){
      w3AddClass(x[i], "show");
      w3RemoveClass(x[i], "hide");

    }else{
      w3AddClass(x[i], "hide");
      w3RemoveClass(x[i], "show");

    }
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {

      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
