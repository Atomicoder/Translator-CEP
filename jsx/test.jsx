/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[1];
var trkClips = oneTrack.clips;

var strCVS = ""
var strVTT = "WEBVTT" + "\n" + "\n"

var subtitles = []

var id = 0
var row = 1

function fillContent() {
    var csvFile = File.openDialog("Target CSV File", "*.csv"); // PROMPT FOR CSV FILE
    var csvFile = csvFile.fsName; // FORMAT CSV FILEPATH TO BE FRIENDLY

    var infoArray;

    // Following opens the text file and stores it in var CSVFILE. Then splits it by every new line, and COMA into a multi-tiered array, INFOARRAY.
    if (csvFile) {.

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
        } else if (trkClips[j].name === "Text on screen") {
            textScreen(j)
        } else if (trkClips[j].name === "Countdown") {
            countDown(j)
        }
    };

    exportFiles()
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
    //populate the JSON file
    var mogObj = {}

    mogObj.type = "Lower Third"
    mogObj.name = textName.textEditValue
    mogObj.title = textTitle.textEditValue
    mogObj.timeIm = mog.start.seconds
    mogObj.timeOut = mog.end.seconds

    subtitles.push(mogObj)

    //populate the CVS file

    strCVS += "Lower Third" + "," + "Name" + "," + textName.textEditValue + "\n" + "," + "Title" + "," + textTitle.textEditValue + "\n" + "\n"

    //Populate VTT file

    strVTT += clipNum + "Lower Third" + "\n" + secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" + textName.textEditValue + "\n" + textTitle.textEditValue + "\n" + "\n"

    id += id + 1
    row += row + 3


};

function getLocation(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()


    textName = JSON.parse(textName)
    textTitle = JSON.parse(textTitle)

    var mogObj = {}

    mogObj.type = "Location"
    mogObj.name = textName.textEditValue
    mogObj.title = textTitle.textEditValue
    mogObj.timeIm = mog.start.seconds
    mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    subtitles.push(mogObj)

    strCVS += "Locaion" + "," + "City" + "," + textName.textEditValue + "\n" + "," + "Country" + "," + textTitle.textEditValue + "\n" + "\n"

    //Populate VTT file

    strVTT += clipNum + " Location" + "\n" +
        secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
        textName.textEditValue +
        "\n" + textTitle.textEditValue +
        "\n" + "\n"


};

function bigTitle(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.components[2].properties

    var text = title[0].getValue()



    text = JSON.parse(text)


    var mogObj = {}

    mogObj.type = "Big Title"
    mogObj.name = text.textEditValue


    // var expObj = JSON.stringify(mogObj)

    subtitles.push(mogObj)

    strCVS += "Big Title" + ",Text," + text.textEditValue + "\n" + "\n"

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

    strCVS += "Intro,S1," + seriesOne.textEditValue + "\n" +
        ",S2," + seriesTwo.textEditValue + "\n" +
        ",S3," + seriesThree.textEditValue + "\n" +
        ",E1," + episodeOne.textEditValue + "\n" +
        ",E2," + episodeTwo.textEditValue + "\n" +
        ",E3," + episodeThree.textEditValue + "\n" + "\n"

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

    strCVS += "Intro,S1," + seriesOne.textEditValue + "\n" +
        ",S2," + seriesTwo.textEditValue + "\n" +
        ",S3," + seriesThree.textEditValue + "\n" + "\n"

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

    strCVS += "Thumbnail,Series," + series.textEditValue + "\n" +
        ",Episode 1," + episodeOne.textEditValue + "\n" +
        ",Episode 2," + episodeThree.textEditValue + "\n" + "\n"

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

    strCVS += "Countdown,Number," + countNumber.textEditValue + "\n" +
        ",Text," + countText.textEditValue + "\n" + "\n"

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
    var lineBrake = title[2].getValue()
    var startHi = title[3].getValue()
    var numHi = title[4].getValue()
    textName = JSON.parse(textName)


    var mogObj = {}

    mogObj.type = "Big Subtitle"
    mogObj.name = textName.textEditValue
    mogObj.lineBrake = lineBrake
    mogObj.startHi = startHi
    mogObj.numHi = numHi
    mogObj.timeIm = mog.start.seconds
    mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    subtitles.push(mogObj)

    strCVS += "Big Subtitle" + "," + "Text" + "," + textName.textEditValue + ",," + "Linebrake ," + lineBrake + ", Highlight word ," + startHi + ", Highlight number of words ," + numHi + "\n" + "\n"

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
    var lineBrake = title[5].getValue()
    var startHi = title[1].getValue()
    var numHi = title[2].getValue()
    textName = JSON.parse(textName)


    var mogObj = {}

    mogObj.type = "Text on screen"
    mogObj.name = textName.textEditValue
    mogObj.lineBrake = lineBrake
    mogObj.startHi = startHi
    mogObj.numHi = numHi
    mogObj.timeIm = mog.start.seconds
    mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    subtitles.push(mogObj)

    strCVS += "Text on screen" + "," + "Text" + "," + textName.textEditValue + ",," + "Linebrake ," + lineBrake + ", Highlight word ," + startHi + ", Highlight number of words ," + numHi + "\n" + "\n"

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

chooseGraphic()

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