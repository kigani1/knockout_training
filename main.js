$(function () {
    var BookingViewModel = function (options) {
        var self = this;
        this.rooms = ko.observableArray(options.rooms);
        this.bookings = ko.observableArray();
        this.roomId = ko.observable();
        this.guestName = ko.observable();
        this.query = ko.observable('');

        this.categories = ko.observableArray(options.categories);
        
        function bookRoom(x, y) {
            self.bookings.push({
                roomId: x,
                guestName: y
            });
            self.rooms.remove(x);
        };
        function save() {
            var savedData = ko.toJSON(self.bookings());
            localStorage.setItem('savedData', savedData);
        };
        
        this.addBooking = function () {
            if (self.guestName() && self.roomId()) {
                bookRoom(self.roomId(), self.guestName());
                self.guestName('');
                save();
            }
        };
        
        this.remove = function (data) {
            self.rooms.push(data.roomId);
            self.rooms.sort(function (a, b) {
                return a - b;
            });
            self.bookings.remove(data);
            save();
        };
        
        if (localStorage && localStorage.getItem('savedData')) {
            var retrievedData = JSON.parse(localStorage.getItem('savedData'));
               if (typeof retrievedData === 'object') {
                  retrievedData.map(function(item){
                     bookRoom(item.roomId, item.guestName);
                  });
                }
        };
        
        this.computedBookings = ko.computed(function(){
            var search = self.query().toLowerCase(); 
            if(search.length == 0){
                return self.bookings();
            }else{
                
              return ko.utils.arrayFilter(self.bookings(), function(item) {    
                return item.guestName.toLowerCase().indexOf(search)  >= 0 || item.roomId.toString().indexOf(search) >= 0;        
            });
            
            }
          
        });
    };

    ko.applyBindings(new BookingViewModel({
       'rooms' : [101, 102, 103, 104, 105, 106],
       'categories' : ['plates', 'cups', 'forks', 'spoon']
    }));

    /*JQuery goes here*/
    jQuery.fn.highlight = function (str, className) {
        var regex = new RegExp(str, "gi");
        return this.each(function () {            
            this.innerHTML = this.innerHTML.replace(regex, function() {
            return "<span class=\"" + className + "\">" + str + "</span>";
            });
        });
    };
    
    $('.jquery-search').find('input[type="search"]').on('keyup', function(){
       var filter = $(this).val();
        
        $('.test-search li').each(function(){ 
            var el = $(this).text();
            var check = el.search(new RegExp(filter, "i"));
            if(check < 0){
                $(this).hide();
            }else{
                $(this).show();
                 $(this).find('span').map(function() {                    
                    $(this).replaceWith(this.childNodes);
                });
                $(this).highlight(filter , 'test');
            }
            
        });    
    });
    var game = new SnakeGame();
    game.init();

});






















//var myArray = [2,4,10]; // typeof --> object
//var myArray1 = new Array(2,4,5);
//
//
//var myString = new String('string'); // typeof --> object
//var myString1 = 'string'; // typeof --> string
//
//var Person = function(name, gender, age){
//    this.name = name;
//    this.gender = gender;
//    this.age= age;
//}
//var kate = new Person('kate', 'female', 23);
//
//var stringTest = 'foo';
//var stringCopy = stringTest;
//stringTest = null;
//
//var myNull = null;
//
//console.log(typeof myNull);

/*

 var Booking = function(name, room) {
 this.guestName = ko.observable(name);
 this.roomId = ko.observable(room);
 };

 var BookingViewModel = function(options) {
 var self = this;
 this.rooms = ko.observableArray(options.rooms);
 this.bookings = ko.observableArray();
 this.roomId = ko.observable();
 this.guestName = ko.observable();

 this.addBooking = function() {
 if (self.guestName() && self.roomId()) {
 self.bookings.push( new Booking(self.roomId(), self.guestName()) );

 self.rooms.remove(function(item) {
 return item === self.roomId();
 });

 self.guestName('');
 self.save();
 }
 };

 this.remove = function(data){
 self.rooms.push(data.roomId);
 self.rooms.sort(function(a, b){
 return a-b;
 });
 self.bookings.remove(data);
 self.save();
 };

 this.save = function () {
 var savedData = ko.toJSON({'data1': self.bookings(), 'data2':     self.rooms()});
 localStorage.setItem('savedData', savedData);
 };

 if (localStorage && localStorage.getItem('savedData')) {
 var retrievedData = JSON.parse(localStorage.getItem('savedData'));
 this.rooms = ko.observableArray(retrievedData.data2);
 this.bookings = ko.observableArray(retrievedData.data1);
 }

 };

 ko.applyBindings(new BookingViewModel({
 rooms: [101,102,103,104,105]
 }));

 */

