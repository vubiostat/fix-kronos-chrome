// stub out function to prevent tons of errors
if (typeof(routeEvent) == 'undefined') {
  function routeEvent(event) {
  }
}

(function() {
  var abbrevs = {
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

  function replaceAbbrev(element, abbrev) {
    if (typeof(abbrev) == 'undefined') {
      abbrev = element.innerHTML;
    }
    var text = abbrevs[abbrev];
    if (text) {
      element.innerHTML = text;
    }
  }

  // expand acronyms for PTO types
  var table = document.querySelector('table.Tabular.Timecard');
  if (table) {
    // replace select option text
    var trs = table.querySelectorAll('tbody tr');
    for (var i = 0; i < trs.length; i++) {
      var tr = trs[i];
      var payCodeDiv = tr.querySelector('td.Paycode div');
      if (!payCodeDiv) {
        continue;
      }

      var payCodeSelect = payCodeDiv.querySelector('select');
      if (payCodeSelect) {
        var payCodeOptions = payCodeSelect.querySelectorAll('option');
        for (var j = 0; j < payCodeOptions.length; j++) {
          replaceAbbrev(payCodeOptions[j]);
        }

        (function(tr, payCodeSelect) {
          // find the accompanying amount input and auto-set to 8.0 on select change
          var amountInput = tr.querySelector('td.Amount input');
          if (amountInput) {
            payCodeSelect.addEventListener('change', function(evt) {
              if (amountInput.value === '') {
                amountInput.value = '8.0';
                amountInput.onchange()
              }
            });
          }
        })(tr, payCodeSelect);
      } else {
        // this is probably a previous timecard
        var md = payCodeDiv.innerHTML.match(/^&nbsp;([A-Z]{3})&nbsp;$/);
        if (md) {
          replaceAbbrev(payCodeDiv, md[1]);
        }
      }
    }
  }
})();
