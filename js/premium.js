$(function() {
    var model = {
        data: [
            {
                name: 'amy',
                fName: 'cat1.jpg',
                counter: 0
            },
            {
                name: 'ben',
                fName: 'cat2.jpg',
                counter: 0
            },
            {
                name: 'casey',
                fName: 'cat3.jpg',
                counter: 0
            },
            {
                name: 'dwayne',
                fName: 'cat4.jpg',
                counter: 0
            },
            {
                name: 'emmy',
                fName: 'cat5.jpg',
                counter: 0
            },
        ],

        currentCat: 0
    };

    var octopus = {
        init: function() {
            listView.init();
            catAreaView.init();
            adminView.init();
        },

        updateCount: function(data) {
            var count = $('#counter');
            data.counter++
            count.text(data.counter);
        },

        getCat: function(catName) {
            var cats = this.getAllCat();

            for(var i = 0; cats.length > i; i++) {
                var cat = cats[i];

                if (catName === cat.name) {
                    return cat;
                };
            }
        },

        getAllCat: function() {
            return model.data;
        }
    };

    var catAreaView = {
        init: function() {
            var self = this;
            var cats = octopus.getAllCat();
            var img = $('#catImg');
            var list = '';    

            $('.cat-name').on('click', function() {
                console.log($(this));
                img.off('click');
                var data = octopus.getCat($(this).text());
                self.render(data);
            });
            var data = octopus.getCat(cats[0].name);
            self.render(data);
        },

        render: function(data) {
            var title = $('#catName');
            var img = $('#catImg');
            var count = $('#counter');

            title.text(data.name);
            count.text(data.counter);
            img.attr('src', '/img/' + data.fName);

            img.on('click', (function() {
                return function() {
                    octopus.updateCount(data);
                }
            })());
        }
    };

    var listView = {
        init: function() {
            var cats = octopus.getAllCat();
            var list = "";
            this.$listEl = $('#catList')

            for(var i = 0; cats.length > i; i++) {
                list += this.makeList(cats[i].name, i);
            }

            this.$listEl.html(list);
        },

        makeList: function(name, i) {
            var list = '<li class="cat-name" data-id="' + i + '" >' + name + '</li>';
            return list;
        }
    };

    var adminView = {
        init: function() {
            var self = this;

            self.adminBtn = $('#adminBtn');
            self.adminPanel = $('.admin-panel');
            self.form = $('#updateForm');
            self.inputName = $('#inputCatName');
            self.imgURL = $('#inputImgUrl');
            self.numClicks = $('#inputNumClicks');
            self.cancelBtn = $('#cancelBtn');

            // Initiate admin panel
            self.adminBtn.on('click', function() {
                self.adminPanel.show();
                self.generateFields();
            });

            // Hide admin panel
            self.cancelBtn.on('click', function(e) {
                e.preventDefault();
                self.adminPanel.hide();
            });
        },

        // D = data from model through octopus 
        generateFields: function() {

        }
    }

    octopus.init();
});