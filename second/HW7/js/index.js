$('.buttons').click(function (event) {
    let target = event.target;
    let strLength = $('.display').val().length;
    if (target.className.includes('delete')) {
        $('.display').removeClass('err');
        $('.display').val('0');
    } else if (target.className.includes('equal') &&
        $('.display').val() !== '0' &&
        ($('.display').val().slice(0, -1).includes('+') ||
            $('.display').val().slice(0, -1).includes('-', 1) ||
            $('.display').val().slice(0, -1).includes('*') ||
            $('.display').val().slice(0, -1).includes('/'))
    ) {
        let result = calculate($('.display').val());
        if (result === 'ERROR') {
            $('.display').addClass('err');
            $('.display').val(result);
        } else {
            $('.display').removeClass('err');
            $('.logsBlock').prepend($(`<div class='logWrap'>
        <button class='toggleButton'></button>
        <p class='info'>${$('.display').val()}=${result}</p>
        <button class='closeButton'>x</button>
        </div>`));
            $('.display').val(result);
            $('.logWrap').css({
                'display': 'flex',
                'flex-direction': 'row',
                'justify-content': 'space-between',
                'align-items': 'center',
                'width': '100%',
                'height': '40px'
            });
            $('.toggleButton').css({
                'border': '2px solid red',
                'width': '20px',
                'height': '20px',
                'padding': '0',
                'border-radius': '50%'
            }).click(function (event) {
                $(event.target).toggleClass('redColor');
            })
            $('.closeButton').css({
                'border': 'none',
                'font-size': '20px',
                'background-color': '#fff'
            }).click(function (event) {
                event.target.parentNode.remove();
            })
            console.log($('.info'));
                Array.from($('.info')).forEach(element => {
                if (element.innerText.includes('48')) {
                    $(element).css({
                        'text-decoration':'underline'
                    })
                }
            });
            
        }
    }
    if ($('.display').val() === '0') {
        if (target.innerText === '-' || target.className.includes('number')) {
            $('.display').val(target.innerText);
        }
    } else {
        if (target.className.includes('number')) {
            $('.display').removeClass('err');
            if ($('.display').val()==='ERROR') {
                $('.display').val('');
            }
            $('.display').val($('.display').val() + target.innerText);
        } else if (target.className.includes('operator')) {
            $('.display').removeClass('err');
            if ($('.display').val()==='ERROR') {
                $('.display').val('');
            }
            if (
                !$('.display').val().slice(0, -1).includes('+') &&
                !$('.display').val().slice(0, -1).includes('-', 1) &&
                !$('.display').val().slice(0, -1).includes('*') &&
                !$('.display').val().slice(0, -1).includes('/') &&
                $('.display').val() !== '-'
            ) {
                if (!Number.isNaN(Number($('.display').val()[strLength - 1]))) {
                    $('.display').val($('.display').val() + target.innerText);
                } else {
                    $('.display').val($('.display').val().slice(0, -1) + target.innerText);
                }
            }
        }
    }
});
function calculate(equation) {
    let operands = equation.split(/\+|-|\*|\//);
    let sign = equation.split(/[0-9]+/);
    let first;
    let second;
    let result;
    if (operands.length > 2) {
        first = Number(operands[1]) * -1;
        second = Number(operands[2]);
    } else {
        first = Number(operands[0]);
        second = Number(operands[1]);
    }
    if (sign[1] === '/' && second === 0) {
        return 'ERROR';
    }
    switch (sign[1]) {
        case '+': result = first + second;
            break;
        case '-': result = first - second;
            break;
        case '*': result = first * second;
            break;
        case '/': result = first / second;
            break;
        default:
            break;
    }
    return result;
}
