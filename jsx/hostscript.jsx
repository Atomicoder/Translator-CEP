/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//@include "./json2.js"


var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[1];
var trkClips = oneTrack.clips;
var excel;

var strCVS = ""
var strVTT = "WEBVTT" + "\n" + "\n"

// var subtitles = []
function sayBye() {
    alert("hola")
}

chooseGraphic()
// openSheetReplace()

// renderEncoder()

function openSheetReplace() {

    var csvFile = File.openDialog("Target CSV File", "*.csv"); // PROMPT FOR CSV FILE
    var csvFile = csvFile.fsName; // FORMAT CSV FILEPATH TO BE FRIENDLY


    // Following opens the text file and stores it in var CSVFILE. Then splits it by every new line, and COMA into a multi-tiered array, excel.
    if (csvFile) {

        var file = File(csvFile) //OPEN, READ, AND CLOSE THE CSV FILE
        file.open("r");
        var sheet = file.read();
        file.close();



        excel = sheet.split("\n"); // SPLIT THE CSV FILE AT EVERY NEW LINE



        for (var a = 0; a < excel.length; a++) { // LOOP THROUGH EACH LINE, SPLIT THE LINE AT EVERY COMMA
            excel[a] = excel[a].split(",");
        }
    }


    if (excel[excel.length - 1] == "") { //SOMETIMES WHEN SPLITTING UP THE ARRAY, THE PROCESS CREATES AN EXTRA, EMPTY LINE. tHIS WILL JUST TEST AND REMOVE THAT IF IT HAPPENS
        excel.splice(excel.length - 1, 1)
    }
    sheetGraphic()

}

function sheetGraphic() {
    for (var j = 0; j < excel.length; j++) {
        if (excel[j][0] == "Lower thirds") {
            populateLowerThird(j)
        } else if (excel[j][0] == "Location") {
            populateLocation(j)
        } else if (excel[j][0] == "Big Subs 16x6") {
            populateBigSubs(j)
        } else if (excel[j][0] == "Intro With Episode") {
            populateIntroEpisode(j)
        } else if (excel[j][0] == "Intro only Series") {
            populateIntroSeries(j)
        } else if (excel[j][0] == "Thumbnail") {
            populateThumbnail(j)
        } else if (excel[j][0] == "Big Title") {
            populateBigTitle(j)
        } else if (excel[j][0] == "Text on screen") {
            populateTextScreen(j)
        } else if (excel[j][0] == "Countdown") {
            populateCountDown(j)
        }
    };

}

function populateLowerThird(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);

}

function populateLocation(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);

}

function populateBigSubs(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
}

function populateIntroEpisode(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);
    mogPropertie[1].setValue(data[3]);
    mogPropertie[1].setValue(data[4]);
    mogPropertie[1].setValue(data[5]);
    mogPropertie[1].setValue(data[6]);

}

function populateIntroSeries(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);
    mogPropertie[1].setValue(data[3]);
    mogPropertie[1].setValue(data[4]);
    mogPropertie[1].setValue(data[5]);
    mogPropertie[1].setValue(data[6]);

}

function populateIntroEpisode(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);
    mogPropertie[1].setValue(data[3]);

}

function populateThumbnail(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);
    mogPropertie[1].setValue(data[3]);

}

function populateBigTitle(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);

}

function populateTextScreen(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[0].setValue(data[2]);
    mogPropertie[0].setValue(data[5]);

}

function populateCountDown(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.components[2].properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[0].setValue(data[2]);

}

function renderEncoder() {
    app.encoder.startBatch();

    app.encoder.encodeSequence(
        seq,
        "C:\\Users\\s.boldu\\Desktop\\translatorrrrrrrrrr.mp4",
        "C:\\Users\\s.boldu\\Desktop\\EncodePreset.epr",
        app.encoder.ENCODE_WORKAREA,
        true
    );

    app.encoder.startBatch();

}


function chooseGraphic() {
    for (var j = 0; j < trkClips.numItems; j++) {
        if (trkClips[j].name === "Lower thirds") {
            getLowerThird(j)
        } else if (trkClips[j].name === "Location") {
            getLocation(j)
        } else if (trkClips[j].name === "Big Subs 16x6") {
            getBigSubs(j)
        } else if (trkClips[j].name === "Intro With Episode") {
            introEpisode(j)
        } else if (trkClips[j].name === "Intro only Series") {
            introSeries(j)
        } else if (trkClips[j].name === "Thumbnail") {
            thumbnail(j)
        } else if (trkClips[j].name === "Big Title") {
            bigTitle(j)
        } else if (trkClips[j].name === "Text on Screen") {
            textScreen(j)
        } else if (trkClips[j].name === "Countdown") {
            countDown(j)
        }
    };

    exportCsv()
    // exportJson()
    // exportVtt()
}

function getLowerThird(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties
    //Extract all the info
    var textName = title[0].getValue()
    var textTitle = title[1].getValue()
    textName = JSON.parse(textName)
    textTitle = JSON.parse(textTitle)

    $.writeln(textName.textEditValue)
    $.writeln(textTitle.textEditValue)

    strCVS += "Lower thirds" + "," + textName.textEditValue + "," + textTitle.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + "Lower Third" + "\n" + secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" + textName.textEditValue + "\n" + textTitle.textEditValue + "\n" + "\n"




};

function getLocation(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()
    $.writeln(textName)
    $.writeln(textTitle)

    textName = JSON.parse(textName)
    textTitle = JSON.parse(textTitle)


    strCVS += "Location" + "," + textName.textEditValue + "," + textTitle.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function bigTitle(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var text = title[0].getValue()



    text = JSON.parse(text)


    // var mogObj = {}

    // mogObj.type = "Big Title"
    // mogObj.name = text.textEditValue


    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Big Title" + "," + text.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function introEpisode(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var seriesOne = title[0].getValue()
    var seriesTwo = title[1].getValue()
    var seriesThree = title[2].getValue()
    var episodeOne = title[3].getValue()
    var episodeTwo = title[4].getValue()
    var episodeThree = title[5].getValue()


    seriesOne = JSON.parse(seriesOne)
    seriesTwo = JSON.parse(seriesTwo)
    seriesThree = JSON.parse(seriesThree)
    episodeOne = JSON.parse(episodeOne)
    episodeTwo = JSON.parse(episodeTwo)
    episodeThree = JSON.parse(episodeThree)

    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Intro Episode," + seriesOne.textEditValue +
        "," + seriesTwo.textEditValue +
        "," + seriesThree.textEditValue +
        "," + episodeOne.textEditValue +
        "," + episodeTwo.textEditValue +
        "," + episodeThree.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function introSeries(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var seriesOne = title[0].getValue()
    var seriesTwo = title[1].getValue()
    var seriesThree = title[2].getValue()



    seriesOne = JSON.parse(seriesOne)
    seriesTwo = JSON.parse(seriesTwo)
    seriesThree = JSON.parse(seriesThree)


    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Intro Series," + seriesOne.textEditValue +
        "," + seriesTwo.textEditValue +
        "," + seriesThree.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function thumbnail(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var series = title[0].getValue()
    var episodeOne = title[1].getValue()
    var episodeTwo = title[2].getValue()



    seriesOne = JSON.parse(series)
    episodeOne = JSON.parse(episodeOne)
    episodeThree = JSON.parse(episodeTwo)


    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Thumbnail," + series.textEditValue +
        "," + episodeOne.textEditValue +
        "," + episodeThree.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function countDown(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var countNumber = title[0].getValue()
    var countText = title[1].getValue()




    countNumber = JSON.parse(countNumber)
    countText = JSON.parse(countText)



    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Countdown," + countNumber.textEditValue +
        "," + countText.textEditValue + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function getBigSubs(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var textName = title[0].getValue()
    var highlight = title[1].getValue()
    var lineBrake = title[2].getValue()
    textName = JSON.parse(textName)
    highlight = JSON.parse(textName)


    // var mogObj = {}

    // mogObj.type = "Big Subtitle"
    // mogObj.name = textName.textEditValue
    // mogObj.lineBrake = lineBrake
    // mogObj.startHi = startHi
    // mogObj.numHi = numHi
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Big Subtitle," + textName.textEditValue + "," + lineBrake + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function textScreen(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var textName = title[0].getValue()
    var highlight = title[1].getValue()
    var lineBrake = title[5].getValue()

    textName = JSON.parse(textName)
    highlight = JSON.parse(highlight)


    // var mogObj = {}

    // mogObj.type = "Text on screen"
    // mogObj.name = textName.textEditValue
    // mogObj.lineBrake = lineBrake
    // mogObj.startHi = startHi
    // mogObj.numHi = numHi
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Text on Screen," + textName.textEditValue + highlight.textEditValue + lineBrake + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


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


    // $.writeln(strCVS)

    var saveCvs = File.saveDialog("Save CVS", "*.csv")
    if (saveCvs) {

        saveCvs = saveCvs.fsName

        var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(strCVS)
        fileWrite.close();
    }


};

function exportCsv() {

    var saveCvs = File.saveDialog("Save CVS", "*.csv")
    if (saveCvs) {

        saveCvs = saveCvs.fsName

        var fileWrite = File(saveCvs) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(strCVS)
        fileWrite.close();
    }

}

function exportJson() {

    exportSubtitles = JSON.stringify(subtitles)

    var saveJson = File.saveDialog("Save Json", "*.json")
    if (saveJson) {

        saveJson = saveJson.fsName

        var fileWrite = File(saveJson) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(exportSubtitles)
        fileWrite.close();
    }

}

function exportVtt() {



    var saveVtt = File.saveDialog("Save VTT", "*.vtt")
    if (saveVtt) {

        saveVtt = saveVtt.fsName

        var fileWrite = File(saveVtt) //OPEN, WRITE, AND CLOSE THE CSV FILE
        fileWrite.open("w");
        fileWrite.write(strVTT)
        fileWrite.close();
    }

}


function floteToFrames(secs) {


    var decimals = secs.toString().substr(-2, 2)

    return parseInt(decimals) * 25 / 100


}


function secondsToHms(ti) {

    var secs = Math.floor(ti)

    var t = Math.round((ti - secs) * 100)
    if (t < 10) {
        t = "0" + t
    }

    var h = Math.floor(secs / 3600);
    var m = Math.floor(secs % 3600 / 60);
    var s = Math.floor(secs % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2) + "." + t + "0";
}