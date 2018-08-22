/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures that URL is defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            for (let feeds of allFeeds){
                expect(feeds.url).toBeDefined();
                expect(feeds.url.length).not.toBe(0);
            }
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures that a name is defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            for (let name of allFeeds){
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            }
        });
    });

    /* This is the test suite named "The menu" */
    describe('The menu', function() {
        /* This is the test that ensures the menu element is
         * hidden by default. 
         */
        it('hidden', function() {
            let body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* This is the test that ensures the menu changes
          * visibility when the menu icon is clicked.  
          * The menu display when clicked and does it hide when clicked again.
          */
        it('toggles', function() {
            let body = document.querySelector('body');
            let menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        }); 
    });

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        let feed = document.querySelector('.feed');
        /* Below is the test that ensures when the loadFeed
         * function is called and completes its work, 
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //there is at least a single .entry element within the .feed container.
        it('completes work', function() {
            expect(feed.length < 0).toBe(false);
            expect(feed.children.length < 0).toBe(false);
        });

    });

    /* This is a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feed = document.querySelector('.feed');
        const newFeed = [];
        const nextFeed = [];
        /* This test ensures that the a new feed is loaded
         * by the loadFeed function 
         */
        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(item){
                newFeed.push(item.innerText);
            });
            loadFeed(1, done);
            Array.from(feed.children).forEach(function(item){
                nextFeed.push(item.innerText);
            });
        }); 
            // this ensures that the content actually changes.           
        it('changes content', function() {
            Array.from(feed.children).forEach(function(item, i){
                expect(newFeed[i] !== item.innerText).toBe(true);
                expect(newFeed[i] !== nextFeed[i]).toBe(false);
            });
        });
    });    
}());
/* 
Referenced:
 Udacity Javascript Testing course
 Matthew Cranford - Feed Reader Walkthrough part 1-4. 
*/