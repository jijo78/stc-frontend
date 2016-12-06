 (function () {
   'use strict';

  /**
   * This is the Aem constructor
   * @constructor
   * @this {Aem}
   */
    function Aem() {
      var _this = this;
      this.queryResults = document.querySelector( '.output' );

      //call to display data.
      _this.getQuery(_this.dataSuccess.bind(_this));
    }

    /**
     * getQuery make the ajax call to the feed.
     * @param {[Function]} callback
     */
    Aem.prototype.getQuery = function ( callback ) {
      var _this = this;

        $.ajax( {
            type: 'GET',
            url: '/js/sample.json',
            cache: false,
            dataType: 'json',
            success: onResponse,
            error: onError
        });

        /**
         * Return a successful response
         * @param {[Object]} response
         */
        function onResponse(response) {
            callback(response);
        }

        /**
         * Return an error on response
         * @param {[Object]} response
         */
        function onError(response) {
            callback((response.status +' '+ response.statusText));
        }

    };

    /**
     * dataSuccess deal with the data and pass it back to handlebars view.
     * @param  {[Object]}   data
     */
    Aem.prototype.dataSuccess = function ( data ) {
      //lets check we have some data back, and the data is the right format before we proceed.
      if(!data && data !=='object'){
        throw new Error('Missing data.');
      }
      
      var _this = this;

      //call to handlebarsHelpers.
      _this.handlebarsHelpers();

      //Handlebars to update the view with the right data.
      //I would normally loop through the data and pass it back to the view.
      //for easy of use in this test just pass the array key.
      var template = Handlebars.compile( $( '#output-results' ).html() ),
      context = {
        'main' : data.heroList.heroItems[0],
        'side_top' : data.heroList.heroItems[1],
        'side_bottom' : data.heroList.heroItems[2]
      },
      html = template( context );

      _this.queryResults.innerHTML = html;
    };

    Aem.prototype.handlebarsHelpers = function ( ) {
      Handlebars.registerHelper( 'concat', function(path) {
       return 'http://www.savethechildren.org.uk' + path;
     });
    };

    return new Aem();
})();
