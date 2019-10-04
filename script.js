// ==UserScript==
// @name         Google Old Url Names
// @namespace    http://google.com/
// @version      1.0
// @author       AlekseySmirnov
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

(() => {

    const settings = {
        citeStyle: {
            color: '#1558d6', // Google's LightBlue
            marginLeft: '-4px',
            top: '-1px',
            position: 'relative'
        },
        maxLength: 42
    }

    // ======================
    // ==From underscore.js==
    // ======================

    function makeString(object) {
        if (object == null) return '';
        return '' + object;
    };

    function truncate(str, length, truncateStr) {
        str = makeString(str);
        truncateStr = truncateStr || '...';
        length = ~~length;
        return str.length > length ? str.slice(0, length) + truncateStr : str;
    };

    // ======================

    const processCites = (cites, textContent) => cites.forEach(cite => {
        cite.textContent = textContent
        Object.assign(cite.style, settings.citeStyle)
    })

    const processLinks = links => links.forEach(link => {
        const url = new URL(link.href)
        const cites = link.parentNode.querySelectorAll('cite')
        const textContent = truncate(decodeURI(`${url.hostname}${url.pathname}`), settings.maxLength)
        processCites(cites, textContent)
    })

    const links = document.querySelectorAll('.r > a')
    processLinks(links)
})()
