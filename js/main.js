// variables --- variables --- variables ---
// variables --- variables --- variables ---
// variables --- variables --- variables ---

var headerTitle = document.querySelector('header span')
var title = document.querySelector('title')
var body = document.querySelector('body')
var navTitle = document.querySelector('nav h3')
var section = document.querySelector('section')
var footer = document.querySelector('footer')
var loadingAnim = document.querySelector('.loadingAnim')
var hamburger = document.querySelector('#hamburger')

// functions --- functions --- functions --- 
// functions --- functions --- functions --- 
// functions --- functions --- functions --- 

function hideSpinner() {
  loadingAnim.classList.add('fadeout')
  setTimeout(() => {
    loadingAnim.style.display = 'none'
  }, 400);
  
}

async function getData() {
  let response = await fetch('./assets/data.json');
  let data = await response.json()
  hideSpinner()
  // console.log(data);
  return data;
}


// RUN THIS 🏃
// RUN THIS 🏃
// RUN THIS 🏃

// Get the Data

setTimeout(() => {
  // 👆 Data loaded too quick to see the loader so i put this timeOut in

  getData()
  //once data got start adding to the html
  .then(data => {
    
    // doc title
    document.title = data.header
    
    //<nav>
    navTitle.innerHTML = data.header

    // <menu>
    // map through the array to get menu items
    data.menu.map((menuItem) => {

      // for each 'menuItem' create a <li> <a> and href attr
      var menuMobLink = document.createElement('li');
      menuMobLink.innerHTML = `<a href="${menuItem.url}">${menuItem.title}</a>`
      
      // I made two two menus mob/desk
      // So I need to clone this node in order to append it twice
      var menuDeskLink = menuMobLink.cloneNode(true);

      // Append the <li> to the menu
      document.querySelector('.menu-mob').appendChild(menuMobLink)
      document.querySelector('.menu-desk').appendChild(menuDeskLink)

      //Check if the 'menuItem' has a submenu?
      if (menuItem.submenu) {
       
        //it does! so create the submenu <ul>
        var subMenuMob = document.createElement('ul');
        var subMenuDesk = document.createElement('ul') 
        
        //Add the <ul> to the current 'menuItem'
        menuMobLink.appendChild(subMenuMob)
        menuDeskLink.appendChild(subMenuDesk)

        //Map throught the submenu array 
        menuItem.submenu.map((subMenuItem) => {

          //Create <li> and add <a> and href attr
          var subMenuLink = document.createElement('li');
          subMenuLink.innerHTML = `<a href="${subMenuItem.url}">${subMenuItem.title}</a>`

          // Clone the <li> as we want to append it twice
          var subMenuLinkClone = subMenuLink.cloneNode(true);

          //append the <li> to the menuItem
          subMenuMob.appendChild(subMenuLink)
          subMenuDesk.appendChild(subMenuLinkClone)
        })
      }

    })

  // Body content
  section.innerHTML = `
    <h1>${data.title}</h1>

    <div class="text">
    ${data.body}
    </div>
            
  `

  // Footer Content
  footer.innerHTML = `
    <h3>${data.footer}</h3>
  `
    });

}, 3000);


// Menu Controls -- Menu Controls -- Menu Controls -- 
// Menu Controls -- Menu Controls -- Menu Controls -- 
// Menu Controls -- Menu Controls -- Menu Controls -- 

hamburger.addEventListener("click", function () {
  this.classList.toggle("open")
  console.log("it clicked")
  menuMob = document.querySelector('#menu-mob')
  menuMob.classList.toggle("show-menu")
})

