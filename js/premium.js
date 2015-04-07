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

        getCat: function(catID) {
            var cats = this.getAllCat();            
            model.currentCat = catID;

            var cat = cats[model.currentCat];

            return cat; 
        },

        getAllCat: function() {
            return model.data;
        },

        updateCatData: function(d) {
            var currentCat = model.data[model.currentCat];
    
            for (var i = d.length - 1; i >= 0; i--) {
                var data = d[i];

                switch(data.name) {
                    case "inputCatName":
                        currentCat.name = data.value;
                        break;

                    case "inputImgUrl":
                        currentCat.fName = data.value;
                        break;

                    case "inputNumClicks":
                        currentCat.counter = data.value;
                        break;
                }
            };

            catAreaView.render(currentCat);
            listView.init();
        }
    };

    var catAreaView = {
        init: function() {
            var self = this;
            var cats = octopus.getAllCat();
            var img = $('#catImg');
            var list = '';    

            $('#main').on('click', '.cat-name', function() {
                img.off('click');

                var data = octopus.getCat($(this).data('id'));
                self.render(data);
            });
            var data = octopus.getCat(0);
            self.render(data);
        },

        render: function(data) {
            var title = $('#catName');
            var img = $('#catImg');
            var count = $('#counter');
            
            if (data.fName.indexOf('http') >= 0) {
                img.attr('src', data.fName);
            }
            else {
                img.attr('src', '/img/' + data.fName);
            }

            title.text(data.name);
            count.text(data.counter);

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
            self.updateForm = $('#updateForm');            
            self.cancelBtn = $('#cancelBtn');

            // Initiate admin panel
            self.adminBtn.on('click', function() {
                self.adminPanel.show();
            });

            // Hide admin panel
            self.cancelBtn.on('click', function(e) {
                e.preventDefault();
                self.adminPanel.hide();
            });

            self.updateForm.on('submit', function(e) {
                e.preventDefault();

                self.updateCats($(this));
                
            });
        },

        updateCats: function(data) {
            var updateData = data.serializeArray();

            octopus.updateCatData(updateData);

            this.updateForm.find('input:not([type=submit])').val("");
            this.adminPanel.hide();
        }
    }

    octopus.init();
});