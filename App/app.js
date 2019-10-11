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
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++)
	{
		var type = inputs[i].getAttribute("type");

		if (type === "checkbox")
		{
			inputs[i].checked = false;
		}
		else
		{
			inputs[i].value = "";
		}
	}
	 
	var comments = document.getElementsByTagName("textarea");
	for (var i = 0; i < comments.length; i++)
	{
		comments[i].value = "";
	}

	var dropdowns = document.getElementsByTagName("select");
	for (var i = 0; i < dropdowns.length; i++)
	{
		dropdowns[i].selectedIndex = 0;
	}

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