// stub out function to prevent tons of errors
if (typeof(routeEvent) == 'undefined') {
  function routeEvent(event) {
  }
}

// expand acronyms for PTO types
var table = document.querySelector('table.Tabular.Timecard');
if (table) {
  var labels = {
    BRE: 'Bereavement',
    JYE: 'Jury Duty',
    PES: 'flexPTO (exempt)',
    PNS: 'flexPTO Scheduled (non-exempt)',
    PNU: 'flexPTO Unscheduled (non-exempt)',
    PLE: 'Paid Parental Leave (exempt)',
    PLN: 'Paid Parental Leave (non-exempt)',
    SES: 'Grandfathered Sick (exempt)',
    SNS: 'Grandfathered Sick Scheduled (non-exempt)',
    SNU: 'Grandfathered Sick Unscheduled (non-exempt)',
  };

  var selects = table.querySelectorAll('tbody td.Paycode select');
  for (var i = 0; i < selects.length; i++) {
    var select = selects[i];
    var options = select.querySelectorAll('option');
    for (var j = 0; j < options.length; j++) {
      var label = labels[options[j].textContent];
      if (label) {
        options[j].innerHTML = label;
      }
    }

    // find this select's accompanying amount input and auto-set to 8.0 on select
    (function(select) {
      var inputName = select.getAttribute('name').replace(/C3$/, "C4");
      var input = table.querySelector('tbody td.Amount input[name="' + inputName + '"]');
      if (input) {
        select.addEventListener('change', function(evt) {
          if (input.value === '') {
            input.value = '8.0';
          }
        });
      }
    })(select);
  }
}
