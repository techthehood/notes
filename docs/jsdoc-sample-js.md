# jsdoc sample js

docs.js
```
  // alert("docs.tmpl running!");

  document.addEventListener('DOMContentLoaded', async function () {
    let sb_nav = document.querySelector(".sidebarNav");
    let categories = document.querySelectorAll(".category");

    console.log("[category]",categories);

    console.log("[categories] length", categories.length);

    categories = (categories) ? Array.from(categories) : categories;

    console.log("[category] from",categories);

    categories.forEach((category) => {
      // category.classList.add("collapse");

      let h2 = category.querySelector("h2");

      if(h2 == null)return;// if there is no h2 then its the default jsdoc variation. i don't want to work with that menu

      h2.addEventListener("click", toggle_category);

      let h3 = Array.from(category.querySelectorAll("h3"));

      h3.forEach((elem,ndx) => {

        let sub_txt = elem.innerHTML;
        sub_txt = (sub_txt.indexOf("/") != -1) ? sub_txt.split("/") : [sub_txt];
        if(sub_txt.length > 1) elem.innerHTML = `${sub_txt[1].trim()} (${lower(sub_txt[0])})`;

        elem.addEventListener("click", (e) => {
          toggle_list(e,{ndx})
        });
      })//h3.forEach

    })

  });

  const lower = (str) => {
    // somehow this lower case fn isn't working - after it fires the template must fire a different one
    let new_str = str.toLowerCase();
    new_str = new_str.trim();
    return new_str;
  }//lower

  const toggle_category = (e) => {
    let category = e.target.parentNode;// get the h2's parent
    category.classList.toggle("expand");
  }//toggle_category

  const toggle_list = (e,{ndx}) => {
    let category = e.target.parentNode;// get the h2's parent

    let ul = category.querySelectorAll('ul');
    ul[ndx].classList.toggle("expand");
  }//toggle_list

```
