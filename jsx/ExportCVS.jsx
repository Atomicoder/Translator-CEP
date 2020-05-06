var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[1];
var trkClips = oneTrack.clips;
var excel;

var strCVS = ""






chooseGraphic()


function chooseGraphic() {
    for (var j = 0; j < trkClips.numItems; j++) {
        if (trkClips[j].name === "Lower thirds") {
            getLowerThird(j)
        } else if (trkClips[j].name === "Location") {
            getLocation(j)
        } else if (trkClips[j].name === "Big Subs 16x9") {
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

    exportCsv()

}




function getLowerThird(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties
    //Extract all the info
    var textName = title[0].getValue()
    var textTitle = title[1].getValue()

    $.writeln(typeof textName)

    strCVS += "Lower thirds" + "," + parseMOGText(textName) + "," + parseMOGText(textTitle) + "\n"

    //Populate VTT file

    // strVTT += clipNum + "Lower Third" + "\n" + secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" + textName.textEditValue + "\n" + textTitle.textEditValue + "\n" + "\n"




};

function getLocation(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()



    strCVS += "Location" + "," + parseMOGText(textName) + "," + parseMOGText(textTitle) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function bigTitle(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var text = title[0].getValue()






    // var mogObj = {}

    // mogObj.type = "Big Title"
    // mogObj.name = text.textEditValue


    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Big Title" + "," + parseMOGText(text) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function introEpisode(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var seriesOne = title[0].getValue()
    var seriesTwo = title[1].getValue()
    var seriesThree = title[2].getValue()
    var episodeOne = title[3].getValue()
    var episodeTwo = title[4].getValue()
    var episodeThree = title[5].getValue()



    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Intro Episode," + parseMOGText(seriesOne) +
        "," + parseMOGText(seriesTwo) +
        "," + parseMOGText(seriesThree) +
        "," + parseMOGText(episodeOne) +
        "," + parseMOGText(episodeTwo) +
        "," + parseMOGText(episodeThree) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function introSeries(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var seriesOne = title[0].getValue()
    var seriesTwo = title[1].getValue()
    var seriesThree = title[2].getValue()




    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Intro Series," + parseMOGText(seriesOne) +
        "," + parseMOGText(seriesTwo) +
        "," + parseMOGText(seriesThree) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function thumbnail(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var series = title[0].getValue()
    var episodeOne = title[1].getValue()
    var episodeTwo = title[2].getValue()




    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Thumbnail," + parseMOGText(series) +
        "," + parseMOGText(episodeOne) +
        "," + parseMOGText(episodeTwo) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function countDown(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var countNumber = title[0].getValue()
    var countText = title[1].getValue()




    // var mogObj = {}

    // mogObj.type = "Location"
    // mogObj.name = textName.textEditValue
    // mogObj.title = textTitle.textEditValue
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds

    // var expObj = JSON.stringify(mogObj)

    // subtitles.push(mogObj)

    strCVS += "Countdown," + parseMOGText(countNumber) +
        "," + parseMOGText(countText) + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function getBigSubs(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var highlight = title[1].getValue()
    var lineBrake = title[2].getValue()



    // var mogObj = {}

    // mogObj.type = "Big Subtitle"
    // mogObj.name = textName.textEditValue
    // mogObj.lineBrake = lineBrake
    // mogObj.startHi = startHi
    // mogObj.numHi = numHi
    // mogObj.timeIm = mog.start.seconds
    // mogObj.timeOut = mog.end.seconds


    // subtitles.push(mogObj) 

    strCVS += "Big Subtitle," + parseMOGText(textName) + "," + parseMOGText(highlight) + "," + lineBrake + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


};

function textScreen(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var highlight = title[1].getValue()
    var lineBrake = title[4].getValue()


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

    strCVS += "Text on Screen," + parseMOGText(textName) + "," + parseMOGText(highlight) + "," + lineBrake + "\n"

    //Populate VTT file

    // strVTT += clipNum + " Location" + "\n" +
    //     secondsToHms(mogObj.timeIm) + " --> " + secondsToHms(mogObj.timeOut) + "\n" +
    //     textName.textEditValue +
    //     "\n" + textTitle.textEditValue +
    //     "\n" + "\n"


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

function parseMOGText(text) {
    if (text.indexOf("textEditValue") != -1) {
        var textArray = text.split("textEditValue")
        var str = textArray[1].substring(3)
        str = str.substring(0, str.length - 2)

        return str

    } else {
        return text
    }

}