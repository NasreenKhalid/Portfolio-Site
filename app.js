$(document).ready(function () {
  $(".collapsible").collapsible();
});

$(document).ready(function () {
  $(".slider").slider();
});

$("#gallery").mixItUp({});

function mixClear() {
  setTimeout(function () {
    $("#gallery").removeClass("waypoint");
  }, 2000);
}

$(document).ready(function () {
  $(".button-collapse").sideNav();
});

// Typewriter Animation
// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
  "Hello, My name is Nasreen Khalid", 
  "I'm a Full Stack Web Developer", 
  "Take some time to look at my projects below",
  "I have sound knowledge of web development and I love my work",
  "Also, you can contact me at nasreen.1@live.com",
  
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 25; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("p"); //Subheader element
  
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function(){ typeWriter(id, ar); }, 50);
      
    }
  }
}


// items
const menu = [
  {
    id: 1,
    title: "Social Media App for Developers",
    category: "Javascript",
    Genre: "https://fierce-ridge-69500.herokuapp.com/",
    img: "./projects/devbook.png",
    desc: `A complete Social Media Network type of application for Developers to stay connected. 
    Features include: Register,Login,Create/Update/Delete Profile, Add Posts, Likes/Dislikes and Comments.
        Using the MERN Stack with complete Redux functionality and Node JS for backend development. `,
  },
  {
    id: 2,
    title: "Covid-19 Tracker App",
    category: "React",
    Genre: "https://covid-19-tracker-nasreen.netlify.app/",
    img: "./projects/covid-19tracker.png",
    desc: `Covid-19 Tracker built using NODE JS as backend, React for front-end, Chart JS for the overall tracker application and Material UI for the icons. 
    Features include showing complete data analysis of live cases for every country, filtering results on the map and updating the statistics periodically. `,
  },
  {
    id: 3,
    title: "Google Maps Store Locator",
    category: "Javascript",
    Genre: "https://nasreenkhalid.github.io/Maps-Store-Locator/",
    img: "./projects/googlemaps.png",
    desc: `Display a list of stores based on zip codes, filter the results and mark the findings on the map alongwith the store open/close timings.`,
  },


  {
    id: 8,
    title: "Online Books Keeping App",
    category: "Node",
    Genre: "Express and Node JS",
    img: "./images/online_books_app.png",
    desc: `CRUD Node JS App to keep a record of books`,
  },

];

const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

// load items
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);

    return `<article class="menu-item">
          <img src=${item.img} class="photo" alt=${item.title} />
          <div class="item-info">
            <header>
              <h5>${item.title}</h5>
              <a class="price" href=${item.Genre} target="_blank">${item.Genre}</a>
                        </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join("");

  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map(function (category) {
      return `<button class="filter-btn" type="button" data-id=${category}>
      ${category}
      </button>`;
    })
    .join("");
  container.innerHTML = categoryBtns;
  const filterBtns = container.querySelectorAll(".filter-btn");
  // filter items
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      // console.log(menuCategory);
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
