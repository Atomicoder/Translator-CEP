/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



var csInterface = new CSInterface();

function init() {

    const myButton = document.querySelector("#btn_test");
    const myOtherButton = document.querySelector("#btn_two");
    const alButton = document.querySelector("#btn_imp");
    const imputAlert = document.querySelector("#imp_num").value;

    

    myButton.addEventListener('click', function () {
        csInterface.evalScript('sayHello()');
    });

    myOtherButton.addEventListener('click', function () {
        csInterface.evalScript('sayBye()');
    });

    alButton.addEventListener('click',  () => {

        
        csInterface.evalScript(`sayBye(${imputAlert})`);
    });
}

init();

