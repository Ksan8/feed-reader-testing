/* feedreader.js
* This is the spec file that Jasmine will read; it contains all of the tests
* that will be run against the application.
*/

/* All tests are placed within the $() function, since some may require DOM
* elements; this ensures that they don't run until the DOM is ready.
*/
$(function() {

  describe('RSS Feeds', function() {
    /* Make sure the allFeeds variable is defined */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loop through each feed in the allFeeds object and ensure it has an URL
    * defined and that the URL is not empty.
    */
    it('each have an url', function() {
      var len = allFeeds.length;
      for (var i = 0; i < len; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    /* Loop through each feed in the allFeeds object and ensure it has a name
    * with a string value and that the name is not empty.
    */
    it('each have a name', function() {
      var len = allFeeds.length;
      for (var i = 0; i < len; i++) {
        expect(typeof allFeeds[i].name).toBe('string');
        expect(allFeeds[i].name).not.toBe('');
      }
    });
  });

  describe('The menu', function() {
    var style = $('body').hasClass('menu-hidden');
    var menuIcon = $('.menu-icon-link');

    /* Ensure that the menu element is hidden by default. */
    it('is hidden by default', function() {
      expect(style).toBeTruthy();
    });

    /* Ensure that the menu changes visibility when the menu icon is clicked. */
    it('becomes visible when menu icon is clicked', function() {
      menuIcon.click();
      var clickedOnce = $('body').hasClass('menu-hidden');
      expect(clickedOnce).toBeFalsy();
      menuIcon.click();
      var clickedTwice = $('body').hasClass('menu-hidden');
      expect(clickedTwice).toBeTruthy();
    });
  });

  describe('Initial Entries', function() {
    /* Ensure that when the loadFeed function is called and completes its work,
    * there is at least a single .entry element within the .feed container.
    */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('has at least one entry', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  describe('New Feed Selection', function() {
    /* Ensure that when a new feed is loaded by the loadFeed function, the
    * content actually changes.
    */
    var initialFeed, newFeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        initialFeed = $('.feed').html();  // entire html code for feed list
        loadFeed(1, function() {
          newFeed = $('.feed').html();
          done();
        });
      });
    });

    it('changes the content', function() {
      expect(initialFeed != newFeed).toBeTruthy();
    });
  });

}());
