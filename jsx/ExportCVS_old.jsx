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
        } else if (trkClips[j].name === "Social Media Entertainment") {
            soMoEntertainment(j)
        } else if (trkClips[j].name === "Subtitles") {
            getSubtitle(j)
        } else if (trkClips[j].name === "Quote") {
            getQuote(j)
        } else if (trkClips[j].name === "cube Number + Text") {
            getCubeNumber(j)
        }
    };

    exportCsv()

}




function getLowerThird(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()
    strCVS += "Lower thirds" + "\t" + parseMOGText(textName) + "\t" + parseMOGText(textTitle) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"

};

function getLocation(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()



    strCVS += "Location" + "\t" + parseMOGText(textName) + "\t" + parseMOGText(textTitle) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"



};

function bigTitle(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var text = title[0].getValue()

    strCVS += "Big Title" + "\t" + parseMOGText(text) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"


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


    strCVS += "Intro Episode\t" + parseMOGText(seriesOne) +
        "\t" + parseMOGText(seriesTwo) +
        "\t" + parseMOGText(seriesThree) +
        "\t" + parseMOGText(episodeOne) +
        "\t" + parseMOGText(episodeTwo) +
        "\t" + parseMOGText(episodeThree) + "\t" + "<-->" + "\n"


};

function introSeries(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var seriesOne = title[0].getValue()
    var seriesTwo = title[1].getValue()
    var seriesThree = title[2].getValue()

    strCVS += "Intro Series\t" + parseMOGText(seriesOne) +
        "\t" + parseMOGText(seriesTwo) +
        "\t" + parseMOGText(seriesThree) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"


};

function thumbnail(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var series = title[0].getValue()
    var episodeOne = title[1].getValue()
    var episodeTwo = title[2].getValue()



    strCVS += "Thumbnail\t" + parseMOGText(series) +
        "\t" + parseMOGTextRet(episodeOne) +
        "\t" + parseMOGTextRet(episodeTwo) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"




};

function countDown(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var countNumber = title[0].getValue()
    var countText = title[1].getValue()


    strCVS += "Countdown\t" + parseMOGText(countNumber) +
        "\t" + parseMOGText(countText) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"



}




function textScreen(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var highlight1 = title[1].getValue()
    var highlight2 = title[2].getValue()
    var lineBrake = title[5].getValue()




    strCVS += "Text on Screen\t" + parseMOGText(textName) + "\t" + highlight1 + "\t" + highlight2 + "\t" + lineBrake + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"


};

function getCubeNumber(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textNum = title[0].getValue()
    var textName = title[1].getValue()
    var lineBrake = title[4].getValue()




    strCVS += "Cube Number" + "\t" + parseMOGText(textNum) + "\t" + parseMOGText(textName) + "\t" + lineBrake + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"

};

function getBigSubs(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties;

    var textName = title[0].getValue();
    var highlight = title[1].getValue();
    var lineBrake = title[2].getValue();


    strCVS += "Big Subtitle" + "\t" + parseMOGText(textName) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n";
};

function soMoEntertainment(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()




    strCVS += "Social Media Entertainment" + "\t" + parseMOGText(textName) + "\t" + parseMOGTextRet(textTitle) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"

};

function getQuote(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties

    var textName = title[0].getValue()
    var textTitle = title[1].getValue()

    strCVS += "Quote" + "\t" + parseMOGText(textName) + "\t" + parseMOGTextRet(textTitle) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"

};

function getSubtitle(clipNum) {


    var mog = trkClips[clipNum];
    var title = mog.getMGTComponent().properties
    var textName = title[0].getValue()


    strCVS += "Subtitle" + "\t" + parseMOGTextRet(textName) + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "---" + "\t" + "<-->" + "\n"

};

function exportCsv() {

    var saveCvs = File.saveDialog("SaveTxt", "*.txt")
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

function parseMOGTextRet(text) {
    if (text.indexOf("textEditValue") != -1) {
        var textArray = text.split("textEditValue")
        var str = textArray[1].substring(3)
        str = str.substring(0, str.length - 2)


        var longStr = str.replace(/\\r/g, "\n")
        return "\"" + longStr + "\""

    } else {
        var longStr = text.replace(/\\r/g, "\n")
        return "\"" + longStr + "\""
    }

}