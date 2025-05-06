const minWidth = 1024;

function toggleMenu(menu, state) {
    try {
        let element;
        if (typeof(menu) == "string" && menu != "") {
            element = document.getElementById(menu);
            if (!element) throw new Error ("The selected menu id doesn't exist!");
        } else if (typeof(menu) == "object") element = menu;
        else throw new Error ("Invalid type passed as an argument");

        if (state === false) element.classList.remove("active");
        else if (state === true) element.classList.add("active");
        else {
            if (element.classList.contains("active")) element.classList.remove("active");
            else element.classList.add("active");
        }
    
        if (window.innerWidth <= minWidth) {
            document.addEventListener("click", function close (event){
                const isClickInside = element.contains(event.target);
                if (!isClickInside) element.classList.remove("active");
                document.removeEventListener("click", close);
            });
        }
    } catch (error) {
        console.error(error);
    }
    
}

const menus = [...document.getElementsByClassName("autoOpenDesktop")];
window.onresize = () => (window.innerWidth <= minWidth) && menus.forEach(element => toggleMenu(element, false));

window.onload = () => {
    if (window.innerWidth > minWidth) {
        const menusToOpen = [...document.getElementsByClassName("autoOpenDesktop")];
        menusToOpen.forEach(element => toggleMenu(element, true));
    }

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    if (document.getElementById("todayDate")) document.getElementById("todayDate").innerText = new Date(Date.now()).toLocaleDateString("fr-FR", dateOptions);
};

    