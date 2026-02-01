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

            /* --- КАРТОЧКА --- */
            .card {
                /* Важно: разрешаем выход за границы, чтобы зум не обрезался */
                overflow: visible !important;
                /* Плавность трансформации */
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0s !important;
                background: transparent !important;
            }

            /* Картинка (Постер) */
            .card__view {
                border-radius: 4px !important;
                /* Тень для глубины */
                box-shadow: 0 4px 5px rgba(0,0,0,0.4);
                overflow: hidden !important; /* Скругляем углы картинки */
                position: relative !important;
                background-color: #202020;
            }

            /* Текст (Название) - накладываем поверх картинки */
            .card__content {
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100% !important;
                padding: 10px !important;
                padding-top: 30px !important;
                z-index: 5 !important;
                /* По умолчанию скрываем текст, чтобы было как на постере */
                opacity: 0; 
                transform: translateY(10px);
                transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out !important;
                /* Черная подложка-градиент, чтобы текст читался */
                background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%) !important;
                pointer-events: none !important; /* Чтобы текст не перехватывал клики */
            }
            
            /* --- АКТИВНАЯ КАРТОЧКА (ФОКУС) --- */
            
            /* Когда наводим на карточку */
            .card.focus, .card:hover {
                /* Увеличиваем масштаб */
                transform: scale(1.1) !important;
                /* КРИТИЧЕСКИ ВАЖНО: поднимаем слой над остальными, чтобы не обрезалось соседями */
                z-index: 9999 !important; 
            }

            /* Рамка при фокусе (через inset shadow, чтобы не ломать размеры) */
            .card.focus .card__view, .card:hover .card__view {
                /* Белая рамка как у Netflix */
                box-shadow: inset 0 0 0 3px #fff, 0 15px 25px rgba(0,0,0,0.7) !important;
            }

            /* Показываем текст при фокусе */
            .card.focus .card__content, .card:hover .card__content {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            /* --- ТИПОГРАФИКА --- */
            .card__title {
                display: block !important;
                color: #fff !important;
                font-weight: 700 !important;
                font-size: 13px !important; /* Чуть компактнее */
                line-height: 1.2 !important;
                margin-bottom: 2px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            
            .card__subtitle, .card__age {
                /* Скрываем всё лишнее, оставляем только название для чистоты */
                display: none !important;
            }

            /* Акцентные цвета интерфейса */
            .head__logo { color: #E50914 !important; }
            .menu__item.selector {
                background-color: #E50914 !important;
                box-shadow: 0 0 15px rgba(229, 9, 20, 0.4);
            }
        `;

        function addStyle() {
            if (document.getElementById('netflix-style-v3')) return;
            var style = document.createElement('style');
            style.id = 'netflix-style-v3';
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
    }

    if(typeof Lampa !== 'undefined') startPlugin();
})();
