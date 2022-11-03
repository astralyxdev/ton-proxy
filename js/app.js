let astralyx = `https://astralyx.dev`

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

window.onload = function() {
    document.querySelector('.button').addEventListener('click', function() {
        chrome.storage.local.get(['enabled'], function(result) {
            if (result.enabled === "1") {
                chrome.storage.local.set({enabled: "0"}, function() {
                    chrome.proxy.settings.set({value: configDisabled, scope: 'regular'}, function() {});
                });
                document.querySelector('.button img').classList.add('rotate')
                setTimeout(function() {
                    document.querySelector('.button img').src = "./assets/off.svg"
                    document.querySelector('.button img').classList.remove('rotate')
                    document.querySelector('.button p').innerHTML = 'Click here to turn on TON Proxy'
                }, 1000)
            } else {
                chrome.storage.local.set({enabled: "1"}, function() {
                    chrome.proxy.settings.set({value: configEnabled, scope: 'regular'}, function() {});
                });
                document.querySelector('.button img').classList.add('rotate')
                setTimeout(function() {
                    document.querySelector('.button img').src = "./assets/on.svg"
                    document.querySelector('.button img').classList.remove('rotate')
                    document.querySelector('.button p').innerHTML = 'Click here to turn off TON Proxy'
                }, 1000)
            }
        })
    })
    chrome.storage.local.get(['enabled'], function(result) {
        console.log(result)
        if (result.enabled === "1") {
            document.querySelector('.button img').src = "./assets/on.svg"
            document.querySelector('.button p').innerHTML = 'Click here to turn off TON Proxy'
        } else if (result.enabled === "0") {
            document.querySelector('.button img').src = "./assets/off.svg"
        } else {
            document.querySelector('.button img').src = "./assets/on.svg"
            document.querySelector('.button p').innerHTML = 'Click here to turn off TON Proxy'
        }
    });
}