var seq = app.project.activeSequence;
var texto = "esto es una prueva"
var leng = ["_GR", "_ES", "_IT", "_NL"]


function datePrint() {

    var exportDate = new Date()
    return exportDate.getDate() + "_" + exportDate.getMonth() + "_" + exportDate.getFullYear()
}


// $.writeln(datePrint())



var expFilePath = File.saveDialog("SaveTxt", "*.txt")
var expFolder = expFilePath.parent

for (var i = 0; i < leng.length; i++) {

    var expName = expFolder + "\\" + seq.name + "_" + datePrint() + leng[i] + ".txt"
    var outfile = new File(expName)
    // expFile = expFile.fsName
    outfile.open("W")
    outfile.write(texto)
    outfile.close()
}