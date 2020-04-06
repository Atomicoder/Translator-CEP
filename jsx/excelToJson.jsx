var csvFile = File.openDialog("Target CSV File", "*.csv"); // PROMPT FOR CSV FILE
var csvFile = csvFile.fsName; // FORMAT CSV FILEPATH TO BE FRIENDLY
var excel;

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




// $.writeln(excel[1][2])
// $.writeln(excel.length)
// $.writeln(excel[0])



var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[1];
var trkClips = oneTrack.clips;
for (var i = 0, len = excel.length; i < len; i++) {
    $.writeln(excel[i][0])

};



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

sheetGraphic()

app.encoder.startBatch();

app.encoder.encodeSequence(
    seq,
    "C:\\Users\\s.boldu\\Desktop\\translatorrrrrrrrrr.mp4",
    "C:\\Users\\s.boldu\\Desktop\\EncodePreset.epr",
    app.encoder.ENCODE_WORKAREA,
    true
);

app.encoder.startBatch();