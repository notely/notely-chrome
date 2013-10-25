#!/bin/sh
handlebars src/templates/archivelistitem -f src/js/templates/archivelistitem.js
handlebars src/templates/pagelistitem -f src/js/templates/pagelistitem.js
handlebars src/templates/popuplistitem -f src/js/templates/popuplistitem.js
handlebars src/templates/popuplistview -f src/js/templates/popuplistview.js
handlebars src/templates/popuptoolbar -f src/js/templates/popuptoolbar.js
handlebars src/templates/exportmodal -f src/js/templates/exportmodal.js