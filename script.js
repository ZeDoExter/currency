const amount1 = document.getElementById('amount-1')
const amount2 = document.getElementById('amount-2')

amount1.addEventListener('input', selectCurren)
amount2.addEventListener('input', selectCurren)


const rateText = document.getElementById('rate')

$(document.body).on("change", "#currency-1, #currency-2", function () { selectCurren() });

function selectCurren() {
    const value1 = $('#currency-1').val();
    const value2 = $('#currency-2').val();

    let url = `https://v6.exchangerate-api.com/v6/783af3123abf81b701d8a83d/latest/${value1}`
    fetch(url).then(res => res.json()).then(data => {
        const rate = data.conversion_rates[value2]
        rateText.innerText = `1 ${value1} = ${rate} ${value2}`
        amount2.value = (amount1.value * rate).toFixed(3)
    })
}

function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    var img = `https://countryflagsapi.com/png/` + state.element.id.toLowerCase();
  
    var $state = $(
      '<span><img src="' + img + '" class="img-flag" crossOrigin="anonymous">' +
        '&nbsp;&nbsp;' +
        state.text +
        '</span>'
    );
    return $state;
  }



$("#currency-1, #currency-2").select2({
    createTag: selectCurren(),
    templateResult: formatState,
});

$(".btn").on('click', function () {
    var fromcurrency = $('#currency-1').val();
    var tocurrency = $('#currency-2').val();
    $('#currency-1').val(tocurrency).trigger('change');
    $('#currency-2').val(fromcurrency).trigger('change');
}); 