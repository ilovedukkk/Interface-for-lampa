(function () {
    'use strict';

    function startPlugin() {
        // Проверяем, загружена ли Lampa
        if (!window.Lampa) return;

        // CSS стили для интерфейса Netflix
        var css = `
            /* Основной фон и цвета */
            body, .activity, .activity__content {
                background-color: #141414 !important;
                color: #e5e5e5;
            }
            
            /* Логотип и меню (акценты) */
            .head__logo {
                color: #E50914 !important; /* Netflix Red */
                font-weight: 800;
            }
            .menu__item.selector {
                background-color: #E50914 !important; /* Красный активный элемент */
                border-radius: 4px;
            }
            
            /* Карточки (постеры) */
            .card__view {
                border-radius: 4px !important; /* Небольшое скругление как у Netflix */
                box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                border: none !important;
            }
            
            /* Эффект фокуса (выделения) как в Netflix */
            .card.focus .card__view, 
            .card:hover .card__view {
                transform: scale(1.15) !important; /* Увеличение */
                z-index: 100 !important;
                box-shadow: 0 10px 20px rgba(0,0,0,0.8) !important;
                border: 2px solid #E50914 !important; /* Красная рамка при фокусе */
            }
            
            /* Скрываем возраст и лишние детали на карточке, пока нет фокуса (опционально) */
            .card__age {
                display: none;
            }
            
            /* Заголовки разделов */
            .title {
                font-size: 1.4em !important;
                font-weight: 700 !important;
                color: #fff;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            
            /* Фон (Backdrop) - делаем темнее */
            .background {
                opacity: 0.4 !important; /* Более темный фон для контраста */
            }
            .background:after {
                background: linear-gradient(to bottom, rgba(20,20,20,0) 0%, #141414 100%) !important;
            }
            
            /* Информация о фильме (Head) */
            .head__title {
                font-size: 3em !important;
                font-weight: 900;
                text-shadow: 2px 2px 10px rgba(0,0,0,0.8);
            }
            .head__description {
                font-size: 1.1em;
                line-height: 1.5;
                max-width: 60%;
                text-shadow: 1px 1px 5px rgba(0,0,0,0.8);
            }
            
            /* Кнопки действий */
            .button--primary {
                background-color: #fff !important;
                color: #000 !important;
                font-weight: bold;
                border-radius: 4px !important;
            }
            .button--primary.focus {
                background-color: #c0c0c0 !important; /* Затемнение белой кнопки */
            }
            .button--secondary {
                background-color: rgba(109, 109, 110, 0.7) !important;
                color: #fff !important;
                border-radius: 4px !important;
            }
        `;

        // Функция внедрения стилей
        function addStyle() {
            if (document.getElementById('netflix-theme-css')) return;
            var style = document.createElement('style');
            style.id = 'netflix-theme-css';
            style.type = 'text/css';
            style.innerHTML = css;
            document.body.appendChild(style);
        }

        // Запуск
        if (window.Lampa.Listener) {
            window.Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') {
                    addStyle();
                }
            });
        } else {
            addStyle();
        }
        
        // Попытка применить сразу, если плагин загружен после старта
        addStyle();
        
        console.log('Netflix Theme Plugin: Loaded');
    }

    if(typeof Lampa !== 'undefined') startPlugin();
})();
