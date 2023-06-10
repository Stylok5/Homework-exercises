function init() {
  const list = document.querySelector("#countries");

  async function fetchData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    console.log({ data });
    return data;
  }

  async function displayCountries() {
    const countries = await fetchData();
    const countriesStuff = countries.map(
      (country) => `<li>
          <div class = "countriesName"> ${country.name.common}
            </div>
         <img src = "${country.flags.png}"> 
         </li>`
    );
    list.innerHTML = countriesStuff.join(" ");
  }
  displayCountries();

  const drop = document.querySelector(".dropbtn");
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = async function (event) {
    if (!event.target.matches(".dropbtn")) {
      let dropdowns = document.querySelector(".dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  drop.addEventListener("click", myFunction);
}
window.addEventListener("DOMContentLoaded", init);
