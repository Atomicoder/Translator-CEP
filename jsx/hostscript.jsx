/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[0];
var trkClips = oneTrack.clips;

function fillContent() {
    var csvFile = File.openDialog("Target CSV File", "*.csv"); // PROMPT FOR CSV FILE
    var csvFile = csvFile.fsName; // FORMAT CSV FILEPATH TO BE FRIENDLY

    var infoArray;

    // Following opens the text file and stores it in var CSVFILE. Then splits it by every new line, and COMA into a multi-tiered array, INFOARRAY.
    if (csvFile) {

        var file = File(csvFile) //OPEN, READ, AND CLOSE THE CSV FILE
        file.open("r");
        var fullText = file.read();
        file.close();



        infoArray = fullText.split("\n"); // SPLIT THE CSV FILE AT EVERY NEW LINE



        for (var a = 0; a < infoArray.length; a++) { // LOOP THROUGH EACH LINE, SPLIT THE LINE AT EVERY COMMA
            infoArray[a] = infoArray[a].split(",");
        }
    }


    if (infoArray[infoArray.length - 1] == "") { //SOMETIMES WHEN SPLITTING UP THE ARRAY, THE PROCESS CREATES AN EXTRA, EMPTY LINE. tHIS WILL JUST TEST AND REMOVE THAT IF IT HAPPENS
        infoArray.splice(infoArray.length - 1, 1)
    }

    for (var j = 1; j < trkClips.numItems + 1; j++) {

        var mog = trkClips[j - 1];
        var param = infoArray[j];
        var title = mog.components[2].properties;

        var jumpLine = (param[5] == "true" ? true : false);
        var square = (param[6] == "true" ? true : false);



        title[0].setValue(param[0]);
        title[1].setValue(Number(param[1]));
        title[2].setValue(Number(param[2]));
        title[4].setValue(Number(param[3]));
        title[5].setValue(Number(param[4]));
        title[6].setValue(jumpLine);
        title[7].setValue(square);
    };
};


function getContent() {

    var content = []
    var strCVS = " "


    for (var j = 1; j < trkClips.numItems + 1; j++) {

        var mog = trkClips[j - 1];
        var title = mog.components[2].properties;

        // var jumpLine = (param[5] == "true" ? true : false);
        // var square = (param[6] == "true" ? true : false);



        var textMog = title[0].getValue(); 
        var textObj = JSON.parse(textMog)
        // $.writeln(textObj.textEditValue)  

        strCVS += "," + textObj.textEditValue  + "\n"
    

        // title[1].getValue(Number(param[1]));
        // title[2].getValue(Number(param[2]));
        // title[4].getValue(Number(param[3]));
        // title[5].getValue(Number(param[4]));
        // title[6].getValue(jumpLine);
        // title[7].getValue(square);
    };




     

    $.writeln(strCVS)

    var saveCvs = File.saveDialog("Save CVS", "*.csv")
    saveCvs = saveCvs.fsName


    var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
    fileWrite.open("w");
    fileWrite.write(strCVS)
    fileWrite.close();


};
