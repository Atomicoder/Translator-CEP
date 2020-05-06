/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

//@include "./json2.js"


var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[5];
var trkClips = oneTrack.clips;
var excel;
var newExcel;

var strCVS = ""
// var strVTT = "WEBVTT" + "\n" + "\n"

// var subtitles = []


openSheetReplace()

// renderEncoder()

function openSheetReplace() {

    var csvFile = File.openDialog("Target TXT File", "*txt"); // PROMPT FOR CSV FILE
    var csvFile = csvFile.fsName; // FORMAT CSV FILEPATH TO BE FRIENDLY


    // Following opens the text file and stores it in var CSVFILE. Then splits it by every new line, and COMA into a multi-tiered array, excel.
    if (csvFile) {

        var file = File(csvFile) //OPEN, READ, AND CLOSE THE CSV FILE
        file.open("r");
        var sheet = file.read();
        file.close();

        var Reg = /\t<-->\n?/gm
        excel = sheet.split(Reg); // SPLIT THE CSV FILE AT EVERY NEW LINE




        for (var a = 0; a < excel.length; a++) {
            excel[a] = excel[a].split("\t");
        }


    }


    if (excel[excel.length - 1] == "") { //SOMETIMES WHEN SPLITTING UP THE ARRAY, THE PROCESS CREATES AN EXTRA, EMPTY LINE. tHIS WILL JUST TEST AND REMOVE THAT IF IT HAPPENS
        excel.splice(excel.length - 1, 1)
    }

    $.writeln(excel.length)

    // for (var j = 0; j < excel.length; j++) {
    //     var firstString = excel[j][0]
    //     firstString = firstString.replace(/(\r\n|\n|\r)/gm, "");
    //     excel[j][0] = firstString

    // }


    sheetGraphic()

}

function sheetGraphic() {
    for (var j = 0; j < excel.length; j++) {
        if (excel[j][0] == "Lower thirds") {
            populateLowerThird(j)
        } else if (excel[j][0] == "Location") {
            populateLocation(j)
        } else if (excel[j][0] == "Big Subtitle") {
            populateBigSubs(j)
        } else if (excel[j][0] == "Intro Episode") {
            populateIntroEpisode(j)
        } else if (excel[j][0] == "Intro Series") {
            populateIntroSeries(j)
        } else if (excel[j][0] == "Thumbnail") {
            populateThumbnail(j)
        } else if (excel[j][0] == "Big Title") {
            populateBigTitle(j)
        } else if (excel[j][0] == "Text on Screen") {
            populateTextScreen(j)
        } else if (excel[j][0] == "Countdown") {
            populateCountDown(j)
        } else if (excel[j][0] == "Social Media Entertainment") {
            populatesoMoEnt(j)
        } else if (excel[j][0] == "Subtitle") {
            populateSubtitle(j)
        } else if (excel[j][0] == "Quote") {
            populateQuote(j)
        } else if (excel[j][0] == "Cube Number") {
            cubeNumber(j)
        }
    };

}

function populateLowerThird(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);

}

function populateLocation(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);

}

function populateBigSubs(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(parseBoxText(data[1]));
    mogPropertie[1].setValue(data[2]);
}

function populateIntroEpisode(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(parseBoxText(data[1]));

}

function populateIntroSeries(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(parseBoxText(data[1]));
    mogPropertie[1].setValue(parseBoxText(data[2]));

}


function populateThumbnail(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(data[2]);
    mogPropertie[2].setValue(data[3]);

}

function populateBigTitle(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(data[1]);

}

function populateTextScreen(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(parseBoxText(data[1]));
    mogPropertie[1].setValue(data[2]);

}

function populateCountDown(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[1].setValue(data[0]);
    mogPropertie[2].setValue(data[1]);

}

function cubeNumber(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(parseBoxText(data[2]));

}

function populatesoMoEnt(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;
    // $.writeln(data[1])
    // $.writeln(data[2])

    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(parseBoxText(data[2]));

}

function populateQuote(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;
    mogPropertie[0].setValue(data[1]);
    mogPropertie[1].setValue(parseBoxText(data[2]));

}

function populateSubtitle(row) {
    var mog = trkClips[row];
    var data = excel[row];
    var mogPropertie = mog.getMGTComponent().properties;

    mogPropertie[0].setValue(parseBoxText(data[1]));

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

function parseBoxText(boxText) {
    var finalText = boxText.replace(/(^"|"$)/gm, "")
    return finalText
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