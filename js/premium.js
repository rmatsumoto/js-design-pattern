

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
        ]
    };

    var octopus = {
        init: function() {
            listView.init();
            catAreaView.init();
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
                    catAreaView.render(cat);
                };
            }
        },

        getAllCat: function() {
            return model.data;
        }
    };


    var catAreaView = {
        init: function() {
            var cats = octopus.getAllCat();
            var img = $('#catImg');
            var list = '';    

            $('.cat-name').on('click', function() {
                img.off('click');
                octopus.getCat($(this).text());
            });
            octopus.getCat(cats[0].name);
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
                list += this.makeList(cats[i].name);
            }

            this.$listEl.html(list);
        },

        makeList: function(name) {
            var list = '<li class="cat-name">' + name + '</li>';
            return list;
        }
    }

    octopus.init();
});