<?php $title ?>
@extends('layout')
@section('content')
<div class="calculate">
    <div class="calculate-title">Рассчитайте кредит</div>
    <div class="calculate__inner">
        <div class="calculate__left"> <!--Левая колонка-->
            <div class="calculate__left__block1"><!--calculate__left__block1 BEGIN-->
                <div class="null"></div>
                <div class="blockContainer blockContainer__loanAmount"> <!--Сумма кредита (Цена автомобиля)-->
                    <div class="calculate__text">Цена автомобиля</div>
                    <input value="1000000" class="enter input__loanAmount" id="loanAmount">
                    <div class="ranges">
                        <input type="range" min="100000" max="7000000" class="range loanAmount__range" id="loanAmountRange" value="1000000">
                        <div class="range__info">
                            <div class="range__info__max">100 тыс.</div> <!--Минимальная сумма кредита-->
                            <div class="range__info__min">7 млн.</div> <!--Максимальная сумма кредита-->
                        </div>
                    </div>
                </div> <!--Сумма кредита (Цена автомобиля) END-->

                <div class="blockContainer blockContainer__initialPayment"> <!--Начальный платёж-->
                    <div class="calculate__text">Начальный платёж</div>
                    <input value="0" class="enter input__initialPayment" id="initialPayment">
                    <div class="ranges">
                        <input type="range" min="0" max="7000000" class="range initialPayment__range" id="initialPaymentRange" value="0">
                        <div class="range__info">
                            <div class="range__info__max">0</div> <!--Минимальная сумма кредита-->
                            <div class="range__info__min">7 млн.</div> <!--Максимальная сумма кредита-->
                        </div>
                    </div>
                </div> <!--Начальный платёж END-->

                <div class="blockContainer blockContainer__tradeIn"> <!--Trade-in-->

                    <div class="calculate__text">Trade-in</div>
                    <input value="0" class="enter input__tradeIn" id="tradeIn">
                    <div class="ranges">
                        <input type="range" min="0" max="7000000" class="range tradeIn__range" id="tradeInRange" value="0">
                        <div class="range__info">
                            <div class="range__info__max">0</div> <!--Минимальная сумма кредита-->
                            <div class="range__info__min">7 млн.</div> <!--Максимальная сумма кредита-->
                        </div>
                    </div>
                </div> <!--Trade-in END-->
            </div><!--calculate__left__block1 END-->

            <div class="calculate__left__block2"> <!--calculate__left__block2 BEGIN-->
                <div class="blockContainer blockContainer__monthsTimeYear"> <!--Срок кредита (Buttons)-->
                    <div class="calculate__text">Срок кредита</div>
                    <div class="loanTerm">
                        <div class="radioBtnsBlock radioBtnsBlock__1">
                            <button class="form_radio_btn" id="radioBtn1" data-name="1">1 Год</button>
                            <button class="form_radio_btn" id="radioBtn2" data-name="2">2 Года</button>
                        </div>
                        <div class="radioBtnsBlock radioBtnsBlock__2">
                            <button class="form_radio_btn" id="radioBtn3" data-name="3">3 Года</button>
                            <button class="form_radio_btn active" id="radioBtn4" data-name="4">4 Года</button>
                        </div>
                        <div class="radioBtnsBlock radioBtnsBlock__3">
                            <button class="form_radio_btn" id="radioBtn5" data-name="5">5 Лет</button>
                            <button class="form_radio_btn" id="radioBtn6" data-name="6">6 Лет</button>
                        </div>
                        <div class="radioBtnsBlock radioBtnsBlock__4">
                            <button class="form_radio_btn" id="radioBtn7" data-name="7">7 Лет</button>
                        </div>
                    </div>
                </div> <!--Срок кредита (Buttons) END-->

                <div class="timeLoan"> <!--Срок кредита-->
                    <div class="blockContainer blockContainer__monthsTime"> <!--Срок кредита (в месяцах) (Input,inputRange) BEGIN-->
                        <div class="calculate__text months__text">Срок кредита (в месяцах)</div>
                        <div class="ranges">
                            <input type="range" min="12" max="84" class="range months__range" id="monthsRange">
                            <div class="range__info range__info__big">
                                <div class="range__info__max">12</div> <!--Минимальное кол-во месяцев-->
                                <div class="range__info__current" data-value="48"></div>
                                <div class="range__info__min">84</div> <!--Максимальная кол-во месяцев-->
                            </div>
                        </div>
                    </div> <!--Срок кредита (в месяцах) (Input,inputRange) END-->
                </div> <!--Конец срока кредита-->

                <input type="checkbox" class="input__checkboxResidualPayment" id="checkboxResidualPayment">
                <label for="checkboxResidualPayment" class="calculate__text labelForCheckbox">Остаточный<div class="labelForCheckboxRed">&#160платёж</div></label>

                <div class="blockContainer blockContainer__residualPayment" id="blockContainerResidualPayment"> <!--Остаточный платёж BEGIN-->
                    <input value="50000" class="enter input__residualPayment" id="residualPayment">
                    <div class="ranges ranges__residualPayment">
                        <input type="range" min="50000" max="7000000" class="range residualPayment__range" id="residualPaymentRange" value="50000">
                        <div class="range__info range__info__residualPayment">
                            <div class="range__info__max">50 тыс.</div> <!--Минимальный остаточный платёж-->
                            <div class="range__info__min">7 млн.</div> <!--Максимальный остаточный платёж-->
                        </div>
                    </div>
                </div> <!--Остаточный платёж END-->

            </div> <!--calculate__left__block2 END-->
        </div> <!--Левая колонка END-->

        <div class="calculate__right"> <!--Правая колонка-->
            <div class="calculate__right__inner">
                <div class="blockContainer blockContainer__monthlyPayment">
                    <div class="null"></div>
                    <div class="null"></div>
                    <div class="nullToggle23"></div>

                    <div class="calculate__text">Ежемесячный платёж</div>
                    <div class="monthlyPayment">
                        <button class="btn__monthlyPayment btnMinus">-</button>
                        <div class="monthlyPayment__text" id="monthlyPayment">19 802</div>
                        <button class="btn__monthlyPayment btnPlus">+</button>
                    </div>

                    <div class="null"></div>

                    <div class="divInterestRate">
                        <div class="calculate__text">Процентная ставка</div>
                        <div class="interestRate__text" id="interestRate" data-value="15">
                            <input class="enter interestRate__input hide" value="15">
                            <div class="interestRate__text" id="interestRateText">15%</div>
                        </div>
                        <div class="change__InterestRate">изменить</div> <!--Процентную ставку менять и data-value -->
                    </div>

                    <button class="button__getCredit" id="getCredit">Получить кредит</button>

                    <div class="null"></div>
                    <div class="null"></div>
                    <div class="nullToggle"></div>
                    <div class="nullToggle2"></div>
                    <button class="button__getInfo" id="getInfo">Посмотреть информацию</button>
                </div>
            </div>

        </div> <!--Правая колонка END-->
    </div> <!--Calculate__inner END-->


    <div class="buttonAndBottom"> <!--buttonAndBottom BEGIN-->
        <div class="buttonsCurtain">
            <button class="button__curtain hide" id="buttonCurtain">
                <div class="">ˆ</div>
                <div class="">ˆ</div>
                <div class="">ˆ</div>
                <div class="">ˆ</div>
                <div class="">ˆ</div>
                <div class="">ˆ</div>
            </button>
        </div>

        <div class="claculate__inner__info"> <!--Calculate__inner-->

        </div><!--Calculate__inner__info END-->
    </div> <!--buttonAndBottom END-->
</div>
@endsection