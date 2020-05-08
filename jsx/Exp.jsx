var seq = app.project.activeSequence;
var texto = "esto es una prueva"
var leng = ["_GR", "_ES", "_IT", "_NL", "_PT"]
var seqs = app.project.sequences
var items = app.project.rootItem.children
var itemToMove = seq.projectItem
var ActiveSeqName = seq.name
var lengCount = 0

var myBin = app.project.rootItem.createBin("Translations")


// $.writeln(seqs[1].projectItem.nodeId)
// seqs[1].clone()

// $.writeln(newSeq)
// var newProjItem = newSeq.projectItem

// seqs[1].clone().projectItem.moveBin(myBin)





var regex = new RegExp(ActiveSeqName + " Copy")


for (var i = 0; i < leng.length; i++) {
    seq.clone()
};

for (var i = 0; i < seqs.length; i++) {
    if (regex.test(seqs[i].name)) {
        seqs[i].name = ActiveSeqName + leng[lengCount]
        lengCount++
        var itemToBin = seqs[i].projectItem
        itemToBin.moveBin(myBin)
    }
}

// if (regex.test(seqs[i])) {
//     seqs[i].name = seq.name + leng[i]
// }






// function datePrint() {

//     var exportDate = new Date()
//     return exportDate.getDate() + "_" + exportDate.getMonth() + "_" + exportDate.getFullYear()
// }


// // $.writeln(datePrint())



// var expFilePath = File.saveDialog("SaveTxt", "*.txt")
// var expFolder = expFilePath.parent

// for (var i = 0; i < leng.length; i++) {

//     var expName = expFolder + "\\" + seq.name + "_" + datePrint() + leng[i] + ".txt"
//     var outfile = new File(expName)
//     // expFile = expFile.fsName
//     outfile.open("W")
//     outfile.write(texto)
//     outfile.close()
// }