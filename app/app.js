function selectTab() {
	document.getElementById("startTab").click();	
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

function resetPage()
{
    document.getElementById('teamNum').selectedIndex = 0;
    document.getElementById('matchNum').value = parseInt(document.getElementById('matchNum').value) + 1;
    document.getElementById('currentStatus').selectedIndex = 0;
    document.getElementById('startLevel').selectedIndex = 0;

    document.getElementById('SRocketHatch').value = 0;
    document.getElementById('SRocketCargo').value = 0;
    document.getElementById('SCargoshipHatch').value = 0;
    document.getElementById('SCargoshipCargo').value = 0;
    document.getElementById('SComment').value = '';

    document.getElementById('TRocketHatch').value = 0;
    document.getElementById('TRocketCargo').value = 0;
    document.getElementById('TCargoshipHatch').value = 0;
    document.getElementById('TCargoshipCargo').value = 0;
    document.getElementById('playstyle').selectedIndex = 0;
    document.getElementById('highestRocket').selectedIndex = 0;
    document.getElementById('highestCargo').selectedIndex = 0;
    document.getElementById('groundHatch').checked = false;
    document.getElementById('groundCargo').checked = false;
    document.getElementById('TComment').value = '';

    document.getElementById('climbTime').selectedIndex = 0;
    document.getElementById('climbLevel').selectedIndex = 0;
    document.getElementById('assisting').checked = false;
    document.getElementById('assisted').checked = false;
    document.getElementById('EComment').value = '';

    selectTab();
}

function increment(id) {
    var textfield = document.getElementById(id);
    var value = parseInt(textfield.value) + 1;
    textfield.value = value;
}

function decrement(id) {
    var textfield = document.getElementById(id);
    var value = textfield.value;
    if (value != 0) {
        textfield.value = value - 1;
    }
}