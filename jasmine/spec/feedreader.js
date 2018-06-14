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
        beforeEach(function (done) {
            loadFeed(0,done);
        });

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Feeds should have a URL defined and not be an empty string', function () {
            // loop through each element in the allFeeds array to test it
            allFeeds.forEach(function (el) {
                // test for KEY - url
                expect(el.url).toBeDefined();
                // test that KEY - url is not an empty string
                expect(el.url).toBeTruthy();
            });

        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feeds should have a name defined and not be an empty string', function () {
            // loop through each element in the allFeeds array to test it
            allFeeds.forEach(function (el) {
                // test for KEY - name
                expect(el.name).toBeDefined();
                // test that KEY - name is not an empty string
                expect(el.name).toBeTruthy();
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function () {
            // test body has menu-hidden class to determine if menu is hidden
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('displays and hides the menu when clicked', function () {

            // get Hamburger Menu from the DOM
            const menuIcon = document.getElementsByClassName('menu-icon-link')[0];


            // Trigger a click on the menu icon to set it state to visible
            $('.menu-icon-link').trigger('click');
            // should be False because toggleClass was called on the body emoving the class menu-hidden from the body
            expect(document.body.classList.contains('menu-hidden')).toBe(false);


            // Trigger a click on the menu icon to reset it's state to hidden
            $('.menu-icon-link').trigger('click');
            // should be TRUE because toggleClass was called on the body adding the class menu-hidden to the body
            expect(document.body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // wait for the feed to load before executing our test
        beforeEach(function (done) {
            // load the first feed, then call done() to signal that the async operation has completed
            loadFeed(0, done);
        });

        it('should have at least one entry in the feed container after the Rss feed has loaded', function () {
            // grab the number of articles
            const numberOfEntries = $( '.feed' )[0].children.length;
            // test to insure there is at least one .entry-x element
            expect(numberOfEntries).not.toBe(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let firstFeedHeadings = [];
        let secondFeedHeadings = [];

        // The first feed loads, then completes its tasks and calls the second feed to load, completes its tasks, then uses the callback done to signal completion of all asynchronous operations
        beforeEach(function (done) {
            // when first feed loads, call the anonymous function to complete tasks
            loadFeed(0,function () {
                // loop through each .entry
                document.querySelectorAll('.entry h2').forEach(function (el) {
                    // grab the innerText and push it into array
                    firstFeedHeadings.push(el.innerText);
                });
                // when tasks complete from first feed, call second feed, wait for it to load, then call the anonymous function to completes its tasks
                loadFeed(1,function () {
                    // loop through each .entry
                    document.querySelectorAll('.entry h2').forEach(function (el) {
                        // grab the innerTexxt and push it into array
                        secondFeedHeadings.push(el.innerText);
                    });
                    // call done to signal that all asynchronous operations have completed
                    done();
                });
            });


        });


        // wait till the feed loads to perform this test using the done parameter
        it('should have new content after the feed loads', function () {

            // loop through each element in both arrays (10 is the number of items that are displayed in the DOM)
            for (var i = 0; i < 10; i++) {
                // The first 'heading' of the first feed should not be the same as the first 'heading' of the second feed
                expect(firstFeedHeadings[i]).not.toEqual(secondFeedHeadings[i]);
            };
        });
    });
}());
