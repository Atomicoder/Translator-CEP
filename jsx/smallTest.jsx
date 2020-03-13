var seq = app.project.activeSequence;
var vTracks = seq.videoTracks;
var oneTrack = vTracks[2];
var trkClips = oneTrack.clips;

var mog = trkClips[0];

var prps = mog.components[3].properties


$.writeln(prps[0].getValue().length)

// for (var i = 0, len = prps.length; i < len; i++) {
//     $.writeln(i)
//     $.writeln(prps[i].displayName)
//     $.writeln(prps[i].getValue())
// };