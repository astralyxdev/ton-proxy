var configEnabled = {
    mode: "pac_script",
    pacScript: {
      data: `
        function FindProxyForURL(url, host) {
            if (host.endsWith('.ton') || host.endsWith('.adnl')) {
                return 'PROXY in2.ton.org:8080; PROXY in2.ton.org:8080; PROXY in3.ton.org:8080'
            }
            return 'DIRECT'
        }`
    }
};

var configDisabled = {
    mode: "pac_script",
    pacScript: {
      data: `
        function FindProxyForURL(url, host) {
            return 'DIRECT'
        }`
    }
};

setInterval(() => {
    chrome.storage.local.get(['enabled'], function(result) {
        console.log(result)
        if (result.enabled === "1") {
            chrome.proxy.settings.set({value: configEnabled, scope: 'regular'}, function() {});
        } else if (result.enabled === "0") {
            chrome.proxy.settings.set({value: configEnabled, scope: 'regular'}, function() {});
        } else {
            chrome.storage.local.set({enabled: "1"}, function() {
                console.log('Value is set to ' + "1");
            });
            chrome.proxy.settings.set({value: configEnabled, scope: 'regular'}, function() {});
        }
    });
}, 5000);
