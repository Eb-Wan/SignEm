const minWidth = 1024;

class Table {
    constructor(head, body, containerId, tableId) {
        try {
            if (typeof(containerId) != "string") throw new Error("Got invalid containerId argument", typeof(containerId));
            const element = document.getElementById(containerId);
            if (!element) throw new Error("Could not find an element with id", containerId);
            
            this.head = head;
            this.body = body;
            this.container = element;
            this.id = tableId;
            
            this.table = this.drawTable();
            this.container.appendChild(this.table);

            window.onresize = () => {
                this.container.removeChild(this.table);
                this.table = this.drawTable();
                this.container.appendChild(this.table);
            }
        } catch (error) {
            console.error("Failed to create table :", error);
        }
    }
    drawTable() {
        if (window.innerWidth < minWidth) {
            const table = document.createElement("div");
            table.className = "w100 zebra";
            
            let content = "";
            
            this.body.forEach(element => {
                content += "<table>";
                
                this.head.forEach((th, index) => {
                    content += "<tr>";
                    content += `<th>${th.replace("script", "p")}</th>`;
                    content += `<td>${element[index].replace("script", "p")}</td>`;
                    content += "</tr>";
                });
                content += "</table>";
            });
            
            table.innerHTML = content;
            return table;
        } else {
            const table = document.createElement("table");
            table.id = this.id;
            
            let content = "<tr>";
            this.head.forEach(element => content += `<th>${element.replace("script", "p")}</th>`);
            content += "</tr>";
            this.body.forEach(element => {
                content += "<tr>";
                element.forEach(cell => content += `<td>${cell.replace("script", "p")}</td>`);
                content += "</tr>";
            });
            table.innerHTML = content;
            return table;
        }
    }
}
export {Table};