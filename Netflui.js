(function () {
    'use strict';

    function startPlugin() {
        if (!window.Lampa) return;

        var css = `
            /* --- ОСНОВНОЙ ФОН --- */
            body, .activity, .activity__content {
                background-color: #141414 !important;
                color: #e5e5e5;
            }

            /* --- СТИЛИЗАЦИЯ КАРТОЧКИ (NETFLIX STYLE) --- */
            
            /* Основа карточки */
            .card {
                position: relative !important;
                overflow: visible !important; /* Разрешаем выход за границы для зума */
                border-radius: 4px !important;
                transition: transform 0.2s ease-in-out !important;
            }

            /* Картинка (Постер) */
            .card__view {
                border-radius: 4px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                border: 2px solid transparent !important; /* Резерв под рамку */
                overflow: hidden !important;
                background-color: #202020; /* Фон пока картинка грузится */
            }

            /* Текстовый блок (Название и инфо) */
            /* По умолчанию скрываем текст и переносим его ПОВЕРХ картинки */
            .card__content {
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100% !important;
                padding: 10px !important;
                padding-top: 40px !important; /* Место для градиента */
                box-sizing: border-box !important;
                z-index: 5 !important;
                opacity: 0; /* Скрыто по умолчанию */
                transform: translateY(10px); /* Небольшой сдвиг вниз */
                transition: all 0.2s ease-in-out !important;
                
                /* Градиент, чтобы текст читался на любом фоне */
                background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%) !important;
            }

            /* --- ЭФФЕКТ ФОКУСА (АКТИВНАЯ КАРТОЧКА) --- */
            
            /* Увеличение самой карточки */
            .card.focus, .card:hover {
                transform: scale(1.08) !important; /* Уменьшил зум с 1.15 до 1.08 */
                z-index: 100 !important;
            }

            /* Рамка при фокусе */
            .card.focus .card__view {
                border-color: #fff !important; /* Белая рамка как на TV Netflix */
                box-shadow: 0 10px 20px rgba(0,0,0,0.8) !important;
            }

            /* Показываем текст при фокусе */
            .card.focus .card__content, .card:hover .card__content {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            /* --- ТИПОГРАФИКА ВНУТРИ КАРТОЧКИ --- */
            
            .card__title {
                color: #fff !important;
                font-weight: 700 !important;
                font-size: 0.9em !important;
                text-shadow: 1px 1px 2px #000;
                margin-bottom: 3px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            
            .card__subtitle {
                color: #bcbcbc !important;
                font-size: 0.75em !important;
            }

            /* Скрываем возрастные рейтинги, они мешают чистоте дизайна */
            .card__age {
                display: none !important;
            }

            /* --- UI ЭЛЕМЕНТЫ (Меню, Лого) --- */
            .head__logo { color: #E50914 !important; }
            .menu__item.selector {
                background-color: #E50914 !important;
                border-radius: 4px;
            }
        `;

        function addStyle() {
            if (document.getElementById('netflix-cardify-css')) return;
            var style = document.createElement('style');
            style.id = 'netflix-cardify-css';
            style.type = 'text/css';
            style.innerHTML = css;
            document.body.appendChild(style);
        }

        if (window.Lampa.Listener) {
            window.Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addStyle();
            });
        } else {
            addStyle();
        }
        
        addStyle();
        console.log('Netflix Cardify Theme: Loaded');
    }

    if(typeof Lampa !== 'undefined') startPlugin();
})();
