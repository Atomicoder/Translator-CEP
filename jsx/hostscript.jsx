/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[0];
var trkClips = oneTrack.clips;

var strCVS = ""

var subtitles = []

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



function chooseGraphic() {
    for (var j = 0; j < trkClips.numItems; j++) {
        if (trkClips[j].name == "Lower thirds") {
            getLowerThird()
        }
        if (trkClips[j].name == "Lcation") {
            getLocation()
        }




    };

    exportFiles()
}

function getLowerThird() {

    var content = []


    for (var j = 1; j < trkClips.numItems + 1; j++) {

        var mog = trkClips[j - 1];
        var title = mog.components[2].properties

        var textName = title[0].getValue()
        var textTitle = title[1].getValue()
        textName = JSON.parse(textName)
        textTitle = JSON.parse(textTitle)

        var mogObj = {}

        mogObj.type = "Lower Third"
        mogObj.name = textName.textEditValue
        mogObj.title = textTitle.textEditValue
        mogObj.timeIm = mog.start.seconds
        mogObj.timeOut = mog.end.seconds

        // var expObj = JSON.stringify(mogObj)

        subtitles.push(mogObj)

        strCVS += "Lower Third" + "," + "Name" + "," + textName.textEditValue + "\n" + "," + "Title" + "," + textTitle.textEditValue + "\n"

    };


    $.writeln(textName.textEditValue)
    // $.writeln(mog.start.seconds)
    // $.writeln(strCVS)
    // $.writeln(mogObj.timeIm)

    // var saveCvs = File.saveDialog("Save CVS", "*.csv")
    // if (saveCvs) {

    //     saveCvs = saveCvs.fsName

    //     var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
    //     fileWrite.open("w");
    //     fileWrite.write(strCVS)
    //     fileWrite.close();
    // }


    // var saveJson = File.saveDialog("Save Json", "*.json")
    // saveJson.encoding = "UTF-8";
    // if (saveJson) {

    //     saveJson = saveJson.fsName

    //     var fileWrite = File(saveJson) //OPEN, WRITE, AND CLOSE THE CSV FILE
    //     fileWrite.open("w");
    //     fileWrite.write(expObj)

    //     fileWrite.close();

    // }

};

function getLocation() {

    var content = []


    for (var j = 1; j < trkClips.numItems + 1; j++) {

        var mog = trkClips[j - 1];
        var title = mog.components[2].properties

        var textCity = title[0].getValue()
        var textCountry = title[1].getValue()
        textCity = JSON.parse(textCity)
        textCountry = JSON.parse(textCountry)

        var mogObj = {}

        mogObj.type = "Location"
        mogObj.city = textCity.textEditValue
        mogObj.country = textCountry.textEditValue
        mogObj.timeIm = mog.start.seconds
        mogObj.timeOut = mog.end.seconds

        // var expObj = JSON.stringify(mogObj)

        subtitles.push(mogObj)

        strCVS += "Location" + "," + "City" + "," + textCity.textEditValue + "\n" + "," + "Country" + "," + textCountry.textEditValue + "\n"

    };

};

function getContent() {

    var content = []


    for (var j = 1; j < trkClips.numItems + 1; j++) {

        var mog = trkClips[j - 1];
        var title = mog.components[2].properties;

        var textMog = title[0].getValue();
        var textObj = JSON.parse(textMog)


        strCVS += textObj.textEditValue + "\n"



    };


    $.writeln(strCVS)

    var saveCvs = File.saveDialog("Save CVS", "*.csv")
    if (saveCvs) {

        saveCvs = saveCvs.fsName

        var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(strCVS)
        fileWrite.close();
    }


};

function readName() {

    for (var j = 0; j < trkClips.numItems; j++) {
        var objTime = trkClips[j].name

        $.writeln(objTime)
    }




    // $.writeln(floteToFrames(objTime))

    // for (var j = 1; j < trkClips.numItems + 1; j++) {

    //     var nameClip = trkClips[j - 1];
    //     $.writeln( nameClip.inPoint)
}

function exportFiles() {

    var saveCvs = File.saveDialog("Save CVS", "*.csv")
    if (saveCvs) {

        saveCvs = saveCvs.fsName

        var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(strCVS)
        fileWrite.close();
    }

}



chooseGraphic()


function floteToFrames(secs) {


    var decimals = secs.toString().substr(-2, 2)

    return parseInt(decimals) * 25 / 100


}