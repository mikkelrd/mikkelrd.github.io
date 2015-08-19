angular
  .module('mrd', [])

  .directive('scrollBox', function(){
    return {
      link: function(scope, elem, attrs){
        var top = 49;
        var left = 101;
        // var h = elem.prop('offsetHeight');
        // var w = elem.prop('offsetWidth');
        var h = 2;
        var w = 2;
        var y = 0;
        angular.element(window).on('scroll', function(){
          if (window.scrollY > y) {h++; w++; top = 50 - (w / 2); left--;}
          if (window.scrollY < y) {h--; w--; top = 50 - (w / 2); left++;}
          elem.css({
            'height': h + '%',
            'width': w + '%',
            'top': top + '%',
            'left': left + '%'
          });
          y = window.scrollY;
          console.log(y);
        });
      }
    };
  });
