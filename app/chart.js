// JavaScript source code
var matchList = [];

function init() {
    var graphs = document.getElementById('graphs');

    dbx.filesListFolder({
        path: '', recursive: false, include_media_info: true, include_deleted: false,
        include_has_explicit_shared_members: false, include_mounted_folders: false, include_non_downloadable_files: true
    }).then(response => {
        var teams = response.entries;

        for (var x = 0; x < teams.length; x++) {
            var teamNum = teams[x].name;
            var btn = document.createElement("button");
            btn.innerHTML = teamNum;
            btn.classList.add('btn');
            btn.classList.add('btn-secondary');
            btn.classList.add('tablinks');
            btn.classList.add('mx-2');
            btn.onclick = function () {
                openTab(event, this.innerHTML);
                populate(this.innerHTML);
            }
            buttonGroup.appendChild(btn);

            var div = document.createElement("div");
            div.classList.add('tabcontent');
            div.id = teamNum.toString();

            var avgPlaystyle = document.createElement('p');
            var avgSHatch = document.createElement('p');
            var avgSCargo = document.createElement('p');
            var avgTHatch = document.createElement('p');
            var avgTCargo = document.createElement('p');
            var highestRocket = document.createElement('p');
            var highestCargo = document.createElement('p');
            var groundCargo = document.createElement('p');
            var groundHatch = document.createElement('p');
            var avgClimbTime = document.createElement('p');
            var climbLevel = document.createElement('p');

            var graph = document.createElement('div');

            var comment = document.createElement('table');

            avgPlaystyle.id = teamNum + 'avgPlaystyle';
            avgSHatch.id = teamNum + 'avgSHatch';
            avgSCargo.id = teamNum + 'avgSCargo';
            avgTHatch.id = teamNum + 'avgTHatch';
            avgTCargo.id = teamNum + 'avgTCargo';
            highestRocket.id = teamNum + 'highestRocket';
            highestCargo.id = teamNum + 'highestCargo';
            groundCargo.id = teamNum + 'groundCargo';
            groundHatch.id = teamNum + 'groundHatch';
            avgClimbTime.id = teamNum + 'avgClimbTime';
            climbLevel.id = teamNum + 'climbLevel';

            graph.id = teamNum + 'graph';

            comment.id = teamNum + 'comment';

            div.appendChild(avgPlaystyle);
            div.appendChild(avgSHatch);
            div.appendChild(avgSCargo);
            div.appendChild(avgTHatch);
            div.appendChild(avgTCargo);
            div.appendChild(highestRocket);
            div.appendChild(highestCargo);
            div.appendChild(groundCargo);
            div.appendChild(groundHatch);
            div.appendChild(avgClimbTime);
            div.appendChild(climbLevel);
            div.appendChild(comment);
            div.appendChild(graph);

            graphs.appendChild(div);

            data(teamNum);
        }
    })
}

function data(teamNum) {
    dbx.filesListFolder({
        path: `/${teamNum}`, recursive: false, include_media_info: true, include_deleted: false,
        include_has_explicit_shared_members: false, include_mounted_folders: false, include_non_downloadable_files: true
    }).then(response => {
        var matches = response.entries;

        for (var x = 0; x < matches.length; x++) {
            var matchNum = matches[x].name;
            download(teamNum, matchNum);
        }
    })
}

function download(teamNum, matchNum) {
    dbx.filesDownload({ path: `/${teamNum}/${matchNum}` }).then(response => {
        var blob = response.fileBlob;
        fileData(teamNum, matchNum, blob.text());
    })
}

function fileData(teamNum, matchNum, blob) {
    blob.then(function (value) {
        var dataset = JSON.parse(value);
        matchList.push({ teamNum: teamNum, matchNum: matchNum, data: dataset });
    })
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function populate(team) {
    var matchNumList = compute(team, 'matchNum');
    var totalRocketHatchList = compute(team, 'totalRocketHatch');
    var totalRocketCargoList = compute(team, 'totalRocketCargo');
    var totalCargoshipHatchList = compute(team, 'totalCargoshipHatch');
    var totalCargoshipCargoList = compute(team, 'totalCargoshipCargo');

    for (var i = 0; i < matchNumList.length; i++) {
        var sum = 0;
        try {
            totalRocketHatchList[i].split('').forEach(function (x) {
                sum += parseInt(x);
            });
        } catch (err) {}
        totalRocketHatchList[i] = sum;
    }
    for (var i = 0; i < matchNumList.length; i++) {
        var sum = 0;
        try {
            totalRocketCargoList[i].split('').forEach(function (x) {
                sum += parseInt(x);
            });
        } catch (err) { }
        totalRocketCargoList[i] = sum;
    }
    for (var i = 0; i < matchNumList.length; i++) {
        var sum = 0;
        try {
            totalCargoshipHatchList[i].split('').forEach(function (x) {
                sum += parseInt(x);
            });
        } catch (err) { }
        totalCargoshipHatchList[i] = sum;
    }
    for (var i = 0; i < matchNumList.length; i++) {
        var sum = 0;
        try {
            totalCargoshipCargoList[i].split('').forEach(function (x) {
                sum += parseInt(x);
            });
        } catch (err) { }
        totalCargoshipCargoList[i] = sum;
    }

    var rocketHatch = [];
    var rocketCargo = [];
    var cargoshipHatch = [];
    var cargoshipCargo = [];
    for (var i = 0; i < matchNumList.length; i++) {
        rocketHatch.push({ label: matchNumList[i], y: parseInt(totalRocketHatchList[i]) });
        rocketCargo.push({ label: matchNumList[i], y: parseInt(totalRocketCargoList[i]) });
        cargoshipHatch.push({ label: matchNumList[i], y: parseInt(totalCargoshipHatchList[i]) });
        cargoshipCargo.push({ label: matchNumList[i], y: parseInt(totalCargoshipCargoList[i]) });
    }

    var chart = new CanvasJS.Chart(team + 'graph', {
        title: {
            text: "Number of Hatch and Cargo"
        },
        axisX: {
            title: "Match Number",
            labelAngle: -60
        },
        axisY: {
            title: "Number of Hatch/Cargo"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true
        },
        data: [{
            type: "line",
            axisYType: "secondary",
            name: "Rocket Hatch",
            showInLegend: true,
            markerSize: 0,
            dataPoints: rocketHatch
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Rocket Cargo",
            showInLegend: true,
            markerSize: 0,
            dataPoints: rocketCargo
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Cargoship Hatch",
            showInLegend: true,
            markerSize: 0,
            dataPoints: cargoshipHatch
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Cargoship Cargo",
            showInLegend: true,
            markerSize: 0,
            dataPoints: cargoshipCargo
        }]
    });
    chart.render();

    var avgPlaystyle = document.getElementById(team+'avgPlaystyle');
    var playstyle = compute(team, 'playstyle');
    var defense = 0;
    var scoring = 0;
    playstyle.forEach(function (x) {
        if (x == 'Defense')
            defense++;
        if (x == 'Scoring')
            scoring++;
    });
    avgPlaystyle.innerHTML = "Avg Playstyle: " + ((defense > scoring) ? "Defense" : "Scoring");

    var avgSHatch = document.getElementById(team+'avgSHatch');
    var SRocketHatch = compute(team, 'SRocketHatch');
    var SCargoshipHatch = compute(team, 'SCargoshipHatch');
    var SHatch = [];
    for (var i = 0; i < SRocketHatch.length; i++) {
        SHatch.push(Number(SRocketHatch[i]) + Number(SCargoshipHatch[i]));
    }
    avgSHatch.innerHTML = "Avg Sandstorm Hatches: " + (SHatch.reduce((a, b) => a + b, 0) / SHatch.length).toFixed(2);

    var avgSCargo = document.getElementById(team+'avgSCargo');
    var SRocketCargo = compute(team, 'SRocketCargo');
    var SCargoshipCargo = compute(team, 'SCargoshipCargo');
    var SCargo = [];
    for (var i = 0; i < SRocketCargo.length; i++) {
        SCargo.push(Number(SRocketCargo[i]) + Number(SCargoshipCargo[i]));
    }
    avgSCargo.innerHTML = "Avg Sandstorm Cargo: " + (SCargo.reduce((a, b) => a + b, 0) / SCargo.length).toFixed(2);

    var avgTHatch = document.getElementById(team+'avgTHatch');
    var TRocketHatch = compute(team, 'TRocketHatch');
    var TCargoshipHatch = compute(team, 'TCargoshipHatch');
    var THatch = [];
    for (var i = 0; i < TRocketHatch.length; i++) {
        THatch.push(Number(TRocketHatch[i]) + Number(TCargoshipHatch[i]));
    }
    avgTHatch.innerHTML = "Avg Teleop Hatches: " + (THatch.reduce((a, b) => a + b, 0) / THatch.length).toFixed(2);

    var avgTCargo = document.getElementById(team+'avgTCargo');
    var TRocketCargo = compute(team, 'TRocketCargo');
    var TCargoshipCargo = compute(team, 'TCargoshipCargo');
    var TCargo = [];
    for (var i = 0; i < TRocketCargo.length; i++) {
        TCargo.push(Number(TRocketCargo[i]) + Number(TCargoshipCargo[i]));
    }
    avgTCargo.innerHTML = "Avg Teleop Cargo: " + (TCargo.reduce((a, b) => a + b, 0) / TCargo.length).toFixed(2);

    var highestRocket = document.getElementById(team + 'highestRocket');
    var highRocket = compute(team, 'highestRocket');
    highestRocket.innerHTML = "Highest Rocket Level: " + Math.max.apply(null, highRocket);

    var highestCargo = document.getElementById(team + 'highestCargo');
    var highCargo = compute(team, 'highestCargo');
    highestCargo.innterHTML = "Highest Cargo Level: " + Math.max.apply(null, highCargo);

    var groundCargo = document.getElementById(team + 'groundCargo');
    var groundC = compute(team, 'groundCargo');
    var yes = 0;
    var no = 0;
    groundC.forEach(function (x) {
        if (x)
            yes++;
        else {
            no++;
        }
    });
    groundCargo.innerHTML = "Ground Cargo: " + ((yes > no) ? "True" : "False");

    var groundHatch = document.getElementById(team + 'groundHatch');
    var groundH = compute(team, 'groundHatch');
    yes = 0;
    no = 0;
    groundH.forEach(function (x) {
        if (x)
            yes++;
        else {
            no++;
        }
    });
    groundHatch.innerHTML = "Ground Hatch: " + ((yes > no) ? "True" : "False");

    var climbLevel = document.getElementById(team + 'climbLevel');
    var climbLvl = compute(team, 'climbLevel');
    climbLevel.innerHTML = "Highest Climb Level: " + Math.max.apply(null, climbLvl);

    var comment = document.getElementById(team + 'comment');
    var SComment = compute(team, 'SComment');
    var TComment = compute(team, 'TComment');
    var EComment = compute(team, 'EComment');
    var length = SComment.length;
    for (var i = 0; i < length; i++) {
        var row = comment.insertRow();
        row.insertCell().innerHTML = SComment[i];
        row = comment.insertRow();
        row.insertCell().innerHTML = TComment[i];
        row = comment.insertRow();
        row.insertCell().innerHTML = EComment[i];
    }
}

function compute(team, variable) {
    matchList.sort((a, b) => (parseInt(a.matchNum) > parseInt(b.matchNum)) ? 1 : -1);
    var list = [];
    for (var i = 0; i < matchList.length; i++) {
        if (matchList[i].teamNum == team) {
            list.push(matchList[i].data[variable]);
        }
    }
    return list;
}