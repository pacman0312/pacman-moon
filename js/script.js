function load() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.load');
        const bodyyyy = document.querySelector('body');

        function mainFunction() {
            // ------------------------------------------------------------------------ IMAGE
            function ibg() {
                let ibg = document.querySelectorAll('.ibg');
            
                for (let f = 0; f < ibg.length; f++) {
                    if (ibg[f].querySelector('img')) {
                        ibg[f].style.backgroundImage = 'url(' + ibg[f].querySelector('img').getAttribute('src') + ')';
                    }
                }
            }
            ibg();
        
            // ------------------------------------------------------------------------ WEBP - CSS (BACKGROUND)
            function webp(callback) {
                let webp = new Image();
            
                webp.onload = webp.onerror = function() {
                    callback(webp.height == 2);
                };
                
                webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            webp(function (support){
                if (support == true) {
                    document.querySelector('body').classList.add('webp');
                } else {
                    document.querySelector('body').classList.add('no-webp');
                }
            }); 
        
            // ------------------------------------------------------------------------ MENU
            function menu() {
                let menu = $('.menu-main'),
                    menuLink = $('.menu-main__link'),
                    phone = $('.menu-phone'),
                    close = $('.menu-main__close'),
                    body = $('body');
                
                phone.on('click', function() {
                    $(phone).toggleClass('active');
                    $(menu).toggleClass('active');
                    $(body).toggleClass('active');
                    $(close).toggleClass('active');
                });
            
                close.on('click', function() {
                    $(phone).removeClass('active');
                    $(menu).removeClass('active');
                    $(body).removeClass('active');
                    $(close).removeClass('active');
                });
            
                menuLink.on('click', function(e) {
                    e.preventDefault();
            
                    $(this).addClass('active');
            
                    if ($('.menu-main__wrapper li').children().hasClass('active')) {
                        $(menuLink).not($(this)).removeClass('active');
                    }
                })
            
                menuLink.each(function() {
                    $(this).on('click', function(e) {
                        e.preventDefault();
            
                        $(phone).removeClass('active');
                        $(menu).removeClass('active');
                        $(body).removeClass('active');
                        $(close).removeClass('active');
                    })
                })
            };
            menu();
        
            // ------------------------------------------------------------------------ SCROLL -> MENU, UP, MINI PARALLAX
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 1000 ) {
                    $('.header').addClass('sticky');
                }
                else if ( $(this).scrollTop() < 1 ) {
                    $('.header').removeClass('sticky');
                    $('.menu-main__link').removeClass('active');
                }
        
                if ( $(this).scrollTop() > 1000 ) {
                    $('.pageUp').fadeIn(100);
                } 
                else if ( $(this).scrollTop() < 1000 ) {
                    $('.pageUp').fadeOut(100);
                }
        
                let wScroll = $(this).scrollTop();
                $('.title_screen').css({
                    'transform': 'translate(0px, ' + wScroll / 10 + '%)'
                })
            });
        
            // ------------------------------------------------------------------------ SCROLL SMOOTH
            function linkUp() {
                $('a[href^="#"]').on('click', function(e) {
                    e.preventDefault();
            
                    let href = $(this).attr('href');
            
                    $('html, body').animate({
                        scrollTop: $(href).offset().top
                    }, 500);
            
                    return false;
                });
            };
            linkUp();
        
            // ------------------------------------------------------------------------ FORM SELECT
            let select = function() {
                let 
                    selectHeader = document.querySelector('.select__header'),
                    selectBody = document.querySelector('.select__body'),
                    selectText = document.querySelectorAll('.select__text'),
                    selectArrow = document.querySelector('.select__arrow');
        
                selectHeader.addEventListener('click', () => {
                    selectBody.classList.toggle('active');
                    selectArrow.classList.toggle('active');
                });
        
                selectText.forEach(item => {
                    item.addEventListener('click', choos);
                });
        
                function choos() {
                    let 
                        text = this.innerText,
                        select = this.closest('.select'),
                        textMain = select.querySelector('.select__text-main');
        
                    textMain.innerText = text;
                    selectBody.classList.remove('active');
                    selectArrow.classList.remove('active');
                }
            };
            select();
        
            // ----------------------------------------------------------------------- FORM
            function validateForms(form) {
                $(form).validate({
                    rules: {
                        name: 'required',
                        email: {
                            required: true,
                            email: true
                        },
                        phone: 'required'
                    }
                });
        
                function focusForm(name, email, phone) {
                    $(form).focusin(function() {
                        if ($(name).hasClass('error')) {
                            $(name).parent().addClass('error');
                        } else if ($(name).hasClass('valid')) {
                            $(name).parent().removeClass('error');
                        } 
        
                        if ($(email).hasClass('error')) {
                            $(email).parent().addClass('error');
                        } else if ($(email).hasClass('valid')) {
                            $(email).parent().removeClass('error');
                        } 
        
                        if ($(phone).hasClass('error')) {
                            $(phone).parent().addClass('error');
                        } else if ($(phone).hasClass('valid')) {
                            $(phone).parent().removeClass('error');
                        } 
                    });   
                }    
        
                focusForm('#question .form__el[name="name"]', '#question .form__el[name="email"]');
                focusForm('#order .form__el[name="name"]', '#order .form__el[name="email"]', '#order .form__el[name="phone"]');
            }
            validateForms('#order');
            validateForms('#question');
            validateForms('#subscribe');

            function submitForms(subForm) {
                $(subForm).submit(function(e) {
                    e.preventDefault();
    
                    $.ajax({
                        type: 'POST',
                        url: 'mailer/smart.php',
                        data: $(this).serialize()
                    }).done(function() {
                        $(this).find('input').val('');


                        $(subForm).trigger('reset');
                    });

                    return false; 
                });
            };
            submitForms('#order');
        
            // ------------------------------------------------------------------------ MODAL WINDOWS    
            function modal() {
                $('.plan__select').each(function(i) {
                    $(this).on('click', function() {
                        $('.form__order-name').text($('.plan__name').eq(i).text());
                        $('.form__order-price').text($('.plan__price').eq(i).text());
                        $('body').css({
                            'overflow': 'hidden'
                        });
                        $('.overflow').fadeIn(100);
                    })
                });

                $('input[name="name"]').keyup(function() {
                    if ($(this).val() === '') {
                        $('.form__people-name').text('');
                    } else {
                        $('.form__people-name').text('Привет, ' + $(this).val());
                    };
                });
            
                $('.modal__close').on('click', function() {
                    $('.overflow').fadeOut(100);
                    $('body').css({
                        'overflow': ''
                    });
                    $('.form__el').val('');
                })
            };
            modal();
        };
        mainFunction();

        loader.className += ' active';
        bodyyyy.className += ' overflow-active';
    });
}
load();