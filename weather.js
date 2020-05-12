document.getElementById("temp").onclick = show;
document.getElementById("news").onclick = show;
document.getElementById("photos").onclick = show;


function show() {
    let tables = document.getElementById("main").children;

    console.log(tables);
    for (let i = 0; i < tables.length; i++) {

        if (this.getAttribute("id") + "-table" == tables[i].getAttribute("id")) {
            tables[i].style.display = "table";
        } else {
            tables[i].style.display = "none";
        }

        let menu = document.getElementById("menu");

        for (let i = 0; i < menu.children.length; i++) {
            if (this.getAttribute('id') == menu.children[i].getAttribute("id")) {
                menu.children[i].setAttribute("class", "active");
            } else {
                menu.children[i].removeAttribute("class", "active");
                menu.children[i].setAttribute("class", "list-item");
            }
        }
    }
}
