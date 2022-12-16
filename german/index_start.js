function myFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function zehn() {
  document.getElementById("zehn").scrollIntoView(true);

}

function zwanzig() {
  document.getElementById("zwanzig").scrollIntoView(true);

}

function einhundert() {
  document.getElementById("einhundert").scrollIntoView(true);

}

function zweihundert() {
  document.getElementById("zweihundert").scrollIntoView(true);

}

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// the used links
let text = "-de.html";


openStuff = function () {
    // get a random number between 0 and the number of links
    var randIdx = Math.random() * 30+ 1;
    randIdx = parseInt(randIdx, 10);
    // construct the link to be opened
    var link =  [randIdx]+text;
    // open it in a new window / tab (depends on browser setting)
    window.open(link);
};
