
periodicTablefilePath = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';

elements = [];

importJson(periodicTablefilePath, onLoadJson);

function onLoadJson(response) {
    jsonData = JSON.parse(response['currentTarget']['responseText']);
    elements = jsonData.elements;
    init();
}

function importJson(filePath, onLoadJson) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            return res;
        }
    };
    xmlhttp.addEventListener("load", onLoadJson);
    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
}

function init() {
    main_table = document.getElementById("main_table");
    generatedHTML = '';

    elements.forEach((element, index) => {
        // console.log(element);
        if (element.xpos === 1) {
            generatedHTML += insertRowStart();
        }
        //
        if ((element.number < 57 || element.number > 71) && ( element.number < 89 || element.number > 103)) {
            generatedHTML += insertElement(element, index);
        }
        
        if (element.number === 57 || element.number === 89) {
            generatedHTML += insertEmptyElement(element, index);
        }

        if (element.ypos === 1 && element.xpos === 1 && element.number === 1) {
            for (let index = 1; index < 17; index++) {
                generatedHTML += insertEmptyElement();
            }
        }

        if ((element.ypos === 2 || element.ypos === 3) && element.xpos === 2 && (element.number === 4 || element.number === 12)) {
            for (let index = 1; index < 11; index++) {
                generatedHTML += insertEmptyElement();
            }
        }

        if (element.xpos === 18) {
            generatedHTML += insertRowEnd();
        }
    });

    main_table.innerHTML += generatedHTML;
}


function insertElement(element, index) {

    color = 'cat-' + element.category.replace(/ /g,"_");
    html = '';
    html += '<td class="element-box '+ color + '">';
    html += '<div class="element-num">' + element.number + '</div>';
    html += '<div class="element-symbol">' + element.symbol + '</div>';
    html += '<div class="element-name">' + element.name + '</div>';
    html += '</td>';
    return html;
}

function insertEmptyElement() {
    html = '';
    html += '<td class="element-box-emtpy">';
    html += '</td>';
    return html;
}

function insertRowStart() {
    return '<tr class="elements-row">';
}

function insertRowEnd() {
    return '</tr>';
}

