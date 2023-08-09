<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo ($title); ?></title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<header style="background-color: yellow;">
    <div class="header__cntent" style="display: flex; justify-content: space-between">
        <div class="header__content__ico">
            <a href="home.blade.php" style="color: red;"><img src="" alt="">img</a>
        </div>
        <div class="header__content__menu">
            <ul style="display: flex; justify-content: space-around">
                <li>
                    <div class="">Home</div>
                </li>
                <li>
                    <div class="">Rewievs</div>
                </li>
                <li>
                    <div class="">About</div>
                </li>
            </ul>
        </div>
        <div class="header__content__right" style="display: flex; justify-content: space-between">
            <div class="header__content__right-account">
                <div class="account-authorized" style="display: none;">
                    <a href=""><img src="" alt="">img</a>
                </div>
                <div class="account-registered" style="display: flex; justify-content: space-around">
                    <div class="account-registered__registration">Registration</div>
                    <b>/</b>
                    <div class="account-registered__authorization">Autherization</div>
                </div>
            </div>
            <div class="header__content__right-burger">
                <button>menu</button>
            </div>
        </div>
    </div>
</header>

<body>
    <div class="content" style="display: flex; justify-content: center; margin: 5px 10px 5px 10px; background-color: red;">
        @yield('content')
    </div>
</body>

<footer>
    <div class="footer__content" style="display: flex; justify-content: center; background-color: green">
        <p>© 2018 Protected by rights</p>
    </div>
</footer>

</html>