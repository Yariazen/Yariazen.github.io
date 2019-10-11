var teamNum;
var matchType;
var matchNum;
var currentStatus;
var startPosition;
var startLevel;
var crossLine;
var playstyle;
var totalRocketHatch;
var totalRocketCargo;
var totalCargoshipHatch;
var totalCargoshipCargo;
var highestRocket;
var highestCargo;
var groundHatch;
var groundCargo;
var climbTime;
var climbLevel;
var climbAssist;
var assistedClimb;
var scoutName;
var SRocketHatch;
var SRocketCargo;
var SCargoshipHatch;
var SCargoshipCargo;
var TRocketHatch;
var TRocketCargo;
var TCargoshipHatch;
var TCargoshipCargo;

var SComment;
var TComment;
var EComment;

function calculate() {
    scoutName = document.getElementById('scoutName');
    teamNum = document.getElementById('teamNum');
    matchType = document.getElementById('matchType');
    matchNum = document.getElementById('matchNum');
    currentStatus = document.getElementById('currentStatus');
    startPosition = document.getElementById('startPosition');
    startLevel = document.getElementById('startLevel');

    SRocketHatch = document.getElementById('SRocketHatch');
    SRocketCargo = document.getElementById('SRocketCargo');
    SCargoshipHatch = document.getElementById('SCargoshipHatch');
    SCargoshipCargo = document.getElementById('SCargoshipCargo');
    crossLine = document.getElementById('crossLine');
    SComment = document.getElementById('SComment');

    TRocketHatch = document.getElementById('TRocketHatch');
    TRocketCargo = document.getElementById('TRocketCargo');
    TCargoshipHatch = document.getElementById('TCargoshipHatch');
    TCargoshipCargo = document.getElementById('TCargoshipCargo');
    playstyle = document.getElementById('playstyle');
    highestRocket = document.getElementById('highestRocket');
    highestCargo = document.getElementById('highestCargo');
    groundHatch = document.getElementById('groundHatch');
    groundCargo = document.getElementById('groundCargo');
    TComment = document.getElementById('TComment');

    climbTime = document.getElementById('climbTime');
    climbLevel = document.getElementById('climbLevel');
    var assisting = document.getElementById('assisting');
    var assisted = document.getElementById('assisted');
    EComment = document.getElementById('EComment');

    scoutName = scoutName.value;
    teamNum = teamNum.options[teamNum.selectedIndex].value;
    matchType = matchType.options[matchType.selectedIndex].value;
    matchNum = matchNum.value;
    currentStatus = currentStatus.options[currentStatus.selectedIndex].value;
    startPosition = startPosition.options[startPosition.selectedIndex].value;
    startLevel = startLevel.options[startLevel.selectedIndex].value;

    SRocketHatch = SRocketHatch.value;
    SRocketCargo = SRocketCargo.value;
    SCargoshipHatch = SCargoshipHatch.value;
    SCargoshipCargo = SCargoshipCargo.value;
    crossLine = crossLine.checked;
    SComment = SComment.value;

    TRocketHatch = TRocketHatch.value;
    TRocketCargo = TRocketCargo.value;
    TCargoshipHatch = TCargoshipHatch.value;
    TCargoshipCargo = TCargoshipCargo.value;
    playstyle = playstyle.options[playstyle.selectedIndex].value;
    highestRocket = highestRocket.options[highestRocket.selectedIndex].value;
    highestCargo = highestCargo.options[highestCargo.selectedIndex].value;
    groundHatch = groundHatch.checked;
    groundCargo = groundCargo.checked;
    TComment = TComment.value;

    climbTime = climbTime.options[climbTime.selectedIndex].value;
    climbLevel = climbLevel.options[climbLevel.selectedIndex].value;
    climbAssist = assisting.checked;
    assistedClimb = assisted.checked;
    EComment = EComment.value;

    totalRocketHatch = SRocketHatch + TRocketHatch;
    totalRocketCargo = SRocketCargo + TRocketCargo;
    totalCargoshipHatch = SCargoshipHatch + TCargoshipHatch;
    totalCargoshipCargo = SCargoshipCargo + TCargoshipCargo;

    var dataset = {
        scoutName: scoutName,
        teamNum: teamNum,
        matchType: matchType,
        matchNum: matchNum,
        currentStatus: currentStatus,
        startPosition: startPosition,
        startLevel: startLevel,
        crossLine: crossLine,
        playstyle: playstyle,
        totalRocketHarch: totalRocketHatch,
        totalRocketCargo: totalRocketCargo,
        totalCargoshipHatch: totalCargoshipHatch,
        totalCargoshipCargo: totalCargoshipCargo,
        highestRocket: highestRocket,
        highestCargo: highestCargo,
        groundHatch: groundHatch,
        groundCargo: groundCargo,
        climbTime: climbTime,
        climbLevel: climbLevel,
        climbAssist: climbAssist,
        assistedClimb: assistedClimb,
        SRocketHatch: SRocketHatch,
        SRocketCargo: SRocketCargo,
        SCargoshipHatch: SCargoshipHatch,
        SCargoshipCargo: SCargoshipCargo,
        TRocketHatch: TRocketHatch,
        TRocketCargo: TRocketCargo,
        TCargoshipHatch: TCargoshipHatch,
        TCargoshipCargo: TCargoshipCargo,
        SComment: SComment,
        TComment: TComment,
        EComment: EComment
    };

    var name = teamNum + "/" + matchNum + ".json";

    dbx.filesUpload({
        contents: [JSON.stringify(dataset)], path: '/' + name, mode: 'overwrite', autorename: false,
        mute: false, strict_conflict: false
    });
}

