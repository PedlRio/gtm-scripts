(function () {
  function isFilled(selector) {
    var el = document.querySelector(selector);
    var filled = el && el.value && el.value.trim().length > 0;
    return filled;
  }

  function allFieldsValid() {
    return (
      isFilled('#cardNumber4263621') &&
      isFilled('#cardExpiracy4263621') &&
      isFilled('#cardHolder') &&
      isFilled('#card-cvv')
    );
  }

  function showToast(message) {
    var oldToast = document.getElementById('custom-toast');
    if (oldToast) oldToast.remove();

    var toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.innerText = message;

    toast.style.cssText =
      'position: fixed;' +
      'top: 0;' +
      'left: 50%;' +
      'transform: translateX(-50%);' +
      'background-color: #d9534f;' +
      'color: white;' +
      'padding: 12px 24px;' +
      'border-radius: 0 0 6px 6px;' +
      'font-size: 14px;' +
      'z-index: 99999;' +
      'box-shadow: 0 2px 6px rgba(0,0,0,0.3);' +
      'opacity: 1;' +
      'transition: opacity 0.5s ease;';

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 600);
    }, 3000);
  }

  function validateFieldsAndToggleSelect() {
    var select = document.getElementById('card-instalment');
    if (!select) return;

    var filled = allFieldsValid();
    select.disabled = !filled;
  }

  function attachListeners() {
    var select = document.getElementById('card-instalment');
    if (!select) {
      setTimeout(attachListeners, 300);
      return;
    }

    // Inicialmente desabilita o select
    select.disabled = true;

    var blockInteraction = function (e) {
      if (!allFieldsValid()) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Preencha os dados do cartão antes de escolher o parcelamento.');
        select.blur();
        select.value = '';
      }
    };

    // Impede interação quando os campos não estão preenchidos
    select.addEventListener('mousedown', blockInteraction, true);
    select.addEventListener('click', blockInteraction, true);
    select.addEventListener('focus', blockInteraction, true);

    // Também valida dinamicamente os campos
    var campos = [
      '#cardNumber4263621',
      '#cardExpiracy4263621',
      '#cardHolder',
      '#card-cvv'
    ];

    for (var i = 0; i < campos.length; i++) {
      var input = document.querySelector(campos[i]);
      if (input) {
        input.addEventListener('input', validateFieldsAndToggleSelect, false);
        input.addEventListener('blur', validateFieldsAndToggleSelect, false);
      }
    }
  }

  // Executa assim que o script carregar via jsDelivr
  attachListeners();
})();
