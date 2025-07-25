// v4
(function () {

console.log("ta passando aqui");
  
var mmtr_exp = document.createElement("script");
mmtr_exp.src = "https://cdn.jsdelivr.net/gh/mymetric/scripts@main/experiment.js";
mmtr_exp.onload = function() {
    
    var bucket = bucket_sort();
      
    new_experiment("QE4Q6KWrppgygTa", "Bloqueio de Parcelas", experiment_changes);

};
document.head.appendChild(mmtr_exp);

function experiment_original(exp_id) {console.log("original");}
  
function experiment_changes(exp_id) {
console.log("variante de teste");  
function isFilledAndValid(selector) {
  var el = document.querySelector(selector);
  var filled = el && el.value && el.value.trim().length > 0;
  var isInvalid = el && el.classList.contains('ch-input-invalid');
  return filled && !isInvalid;
}

function allFieldsValid() {
  return (
    isFilledAndValid('#cardNumber4263621') &&
    isFilledAndValid('#cardExpiracy4263621') &&
    isFilledAndValid('#cardHolder') &&
    isFilledAndValid('#card-cvv')
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

function blockIfInvalid(e) {
  if (!allFieldsValid()) {
    e.preventDefault();
    e.stopPropagation();
    showToast('Preencha corretamente os dados do cartão antes de escolher o parcelamento.');
    e.target.blur();
    e.target.value = ''; // opcional: resetar a escolha
  }
}

function isVisible(el) {
  return el && el.offsetParent !== null;
}

function monitorVisibility() {
  var select = document.getElementById('card-instalment');
  if (!select) {
    setTimeout(monitorVisibility, 300);
    return;
  }

  if (isVisible(select)) {
    // Se já tiver listeners aplicados, não aplica de novo
    if (!select.dataset.listenersApplied) {
      select.disabled = false;
      select.addEventListener('mousedown', blockIfInvalid, true);
      select.addEventListener('click', blockIfInvalid, true);
      select.addEventListener('focus', blockIfInvalid, true);
      select.dataset.listenersApplied = 'true';
      console.log('✅ Listeners aplicados ao select para validação dinâmica.');
    }
  } else {
    // continua monitorando até ficar visível
    setTimeout(monitorVisibility, 300);
  }
}

// Inicia o monitoramento
monitorVisibility();

}
})();
