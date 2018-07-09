var routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function(){
            $.getJSON('./js/books.json').done(function(response){
                let items = response.items;

                var ract = new Ractive({
                    target: "#books",
                    template: "#templateCard",
                    data: {items: items }
                });

                // let template;

                // $.ajax(
                //     {
                //         url: './components/templates/card.html',
                //         type: 'GET',
                //         dataType: 'text',
                //         success: function(response){
                //             template = response;
                //             items.forEach((item) => {
                //                 let newTemplate = template.slice(0);
                //                 let volInfo = item.volumeInfo;
                //                 let id = item.id;
                //                 let keys = Object.keys(volInfo);
                //                 let link = `#/detail/${id}`;
                //                 newTemplate = newTemplate.replace("{{routerLink}}", link).slice(0);

                //                 keys.forEach(function(key) {
                //                     if(key === 'imageLinks'){
                //                         let urlImage = volInfo[key].smallThumbnail;
                //                         newTemplate = newTemplate.replace(`{{${key}}}`, urlImage).slice(0);
                //                     } else {
                //                         let textBook = volInfo[key];
                //                         newTemplate = newTemplate.replace(`{{${key}}}`, textBook).slice(0);
                //                     }
                //                 });
                                
                //                 $('#books').append(newTemplate);
                //             });                           
                //         },
                //         error: function(error){
                //             console.log(error);
                //         },
                //         complete: function(xhr, status){
                //             console.log(status);
                //         }
                //     }
                // );
        
                
            });
        }

    },
    {
        "path": "/detail/:id",
        "component": "detail.html",
        "controller": function(id){
            $.getJSON('./js/books.json').done(function(response){
                let items = response.items;
                let itemResult = items.find((item) =>{
                                    return item.id === id;
                                });
                var ract = new Ractive({
                    target: "#book",
                    template: "#templateBook",
                    data: itemResult.volumeInfo
                });

                // let template;

                // $.ajax({
                //     url: './components/templates/book.html',
                //     type: 'GET',
                //     dataType: 'text',
                //     success: function(response){
                //         template = response;
                //         let itemResult = items.find((item) =>{
                //             return item.id === id;
                //         });

                //         if (itemResult){

                //             let newTemplate = template.slice(0);
                //             let volInfo = itemResult.volumeInfo;
                //             let keys = Object.keys(volInfo);

                //             keys.forEach(function(key) {
                //                 if(key === 'imageLinks'){
                //                     let urlImage = volInfo[key].thumbnail;
                //                     newTemplate = newTemplate.replace(`{{${key}}}`, urlImage).slice(0);
                //                 } else {
                //                     let textBook = volInfo[key];
                //                     newTemplate = newTemplate.replace(`{{${key}}}`, textBook).slice(0);
                //                 }
                //             });
                //             $("#book").html(newTemplate);
                //         }
                //     },
                //     error: function(error){
                //         console.log(error);
                //     },
                //     complete: function(xhr, status){
                //         console.log(status);
                //     }
                    
                // }
                // );
            });
        }
    }
];


$(document).ready(function(){
    $('.toggle-sidebar').click(function(event){
        event.preventDefault();
        if(!$('.left-aside').hasClass('aside-close')){
            $('.left-aside').toggleClass('aside-close');            
            $('.left-aside').animate({
                width: '50px'
            }, function(){
                $('.main-section').toggleClass('main-collape');
            });
        }else {
            $('.main-section').toggleClass('main-collape');
            $('.left-aside').animate({
                width: '300px'
            }, function(){                
                $(this).toggleClass('aside-close');               
            });
        }        
    });
    
    $(window).on('load', function(e){
        let loc = e.originalEvent.target.location;
        router(loc);
    });

    $(window).on('hashchange', function(e){
        let event = e.originalEvent;
        console.log(event);
        router(event.target.location);
    });
});

function router(ltn){
    let loc = ltn;
    let hash = loc.hash.split("#")[1];

    routes.map(function(data){
        let url = loc.hash.slice(1) || '/';
        let parts = url.substr(1).split('/'), param;
        console.log(url);

        if(url == "/" && data.path == "/"){
            getContent("./components/" + data.component, data.controller);
        } else if(data.path.match(/:id/g)) {
            let mod = data.path.split("/:id")[0].slice(1);
            while(parts.length){
                if(parts.shift() == mod){
                    param = parts.shift();
                    getContent("./components/" + data.component, data.controller, param);
                } else {
                    parts.shift()
                }
            }
        } else {
            let mod = data.path.split("/:id")[0].slice(1);
            while(parts.length){
                if(parts.shift() == mod){
                    getContent("./components/" + data.component, data.controller);
                } else {
                    parts.shift()
                }
            }
        }
    });
}

function getContent(url, callback, param){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function(response){
            $("#content").html(response);
            if(param != undefined){
                callback(param);
            }else {
                callback();
            }
        },
        error: function(error){
            console.log(error);
        },
        complete: function(xhr, status){
            console.log(status);
        }
    });
}

function loadBooks(){
    

    $.ajax({
        url: './components/list.html',
        type: 'GET',
        dataType: 'text',
        success: function(response) {
            
            $("#content").html(response);

            

            
        

        },
        error: function(error) {
            console.log(error);
        },
        complete: function(xhr, status){
            console.log(status);
        }
    });
}