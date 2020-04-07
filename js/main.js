/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



var csInterface = new CSInterface();

function init() {

    const myButton = document.querySelector("#btn_Import");
    const myOtherButton = document.querySelector("#btn_export");
    const renderButton = document.querySelector("#btn_render");
    const alButton = document.querySelector("#btn_ale");




    myButton.addEventListener('click', function () {
        csInterface.evalScript("openSheetReplace()");
    });

    myOtherButton.addEventListener('click', function () {
        csInterface.evalScript("chooseGraphic()");
    });
    
    renderButton.addEventListener('click', function () {
        csInterface.evalScript("renderEncoder()");
    });

    alButton.addEventListener('click', () => {
        csInterface.evalScript("sayBye()");

    });
}

init();

