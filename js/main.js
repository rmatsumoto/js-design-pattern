var catClicker = function(name, nameEl, img, counter) {
    var self = this;
    var el = document.getElementById(img);
    var ct = document.getElementById(counter);
    var nm = document.getElementById(nameEl);

    self.i = 1;

    // Assigning name from name variable.
    nm.innerHTML = name;

    // attaching click event
    self.clickEvt = function() {
        el.addEventListener('click', function() {
            self.incrementCounter();
        }, false);
    };

    // On every click event, increment counter
    self.incrementCounter = function() {
        ct.innerHTML = self.i;
        self.i += 1;
    };

    
};

(function() {
    var cat1 = new catClicker("Kitty", "catName1", "catImg1", "counter1");
    var cat2 = new catClicker("Katty", "catName2", "catImg2", "counter2");

    cat1.clickEvt();
    cat2.clickEvt();
})();