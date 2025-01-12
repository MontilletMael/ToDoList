let listeTaches = ["test 1", "test 2"]; // Etape 3
let TableauTermine = new Array(listeTaches.length).fill("pas terminé"); // Etape 18 et 26
console.log(listeTaches);

function ajoutTache() {
    /* Etape 4
    const tache = document.getElementById("tache").value;
    listeTaches.push(tache);
    console.log(tache);
    console.log(listeTaches);
    */
    const tache = document.getElementById("tache").value;

    if (tache.trim() === "") { //Etape 13
        console.log("La variable tache est vide.");
    } else {
        listeTaches.push(tache);
        TableauTermine.push(false);
        console.log(tache);
        console.log(listeTaches);

        // Etape 11
        AjouterTacheHTML(tache);

        // Etape 12
        document.getElementById("tache").value = "";
    }
}

function creerTableau() {
    //  Etape 6 à 9
    const premiereOccurence = document.querySelector("table");
    if (premiereOccurence) {
        const nouvelleCellule = document.createElement("td");

        nouvelleCellule.setAttribute("width", "10px");
        nouvelleCellule.textContent = "Balise TD";

        const nouvelleLigne = premiereOccurence.insertRow();
        nouvelleLigne.appendChild(nouvelleCellule);
    }
}

function AjouterTacheHTML(item) {
    // Etape 11
    let table = document.querySelector("table");

    if (!table) {
        table = document.createElement("table");
        document.body.appendChild(table);

        const caption = document.createElement("caption");
        caption.textContent = "Liste des tâches";
        table.appendChild(caption);

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const thCheckbox = document.createElement("th");
        thCheckbox.textContent = "Terminée";
        thCheckbox.setAttribute("width", "10px");
        thCheckbox.style.textAlign = "center";

        const thNum = document.createElement("th");
        thNum.textContent = "Numéro";
        thNum.setAttribute("width", "10px");

        const thLibelle = document.createElement("th");
        thLibelle.textContent = "Libellé";

        const thSupprimer = document.createElement("th");
        thSupprimer.textContent = "Actions";

        headerRow.appendChild(thCheckbox);
        headerRow.appendChild(thNum);
        headerRow.appendChild(thLibelle);
        headerRow.appendChild(thSupprimer);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    let tbody = table.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    if (!(tbody instanceof HTMLTableSectionElement)) {
        console.error("L'élément tbody est invalide !");
        return;
    }

    const newRow = document.createElement("tr");

    const tdCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${tbody.rows.length}`; // Etape 19
    tdCheckbox.style.textAlign = "center";
    tdCheckbox.style.verticalAlign = "middle";
    tdCheckbox.appendChild(checkbox);

    // Etape 20 et 21
    checkbox.addEventListener("change", Cocher);

    const tdNum = document.createElement("td");
    tdNum.textContent = tbody.rows.length + 1;
    tdNum.style.textAlign = "center";
    tdNum.style.verticalAlign = "middle";

    const tdLibelle = document.createElement("td");
    tdLibelle.textContent = item;

    const tdSupprimer = document.createElement("td");
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.dataset.index = tbody.rows.length;
    boutonSupprimer.addEventListener("click", supprimerTache);
    tdSupprimer.appendChild(boutonSupprimer);

    newRow.appendChild(tdCheckbox);
    newRow.appendChild(tdNum);
    newRow.appendChild(tdLibelle);
    newRow.appendChild(tdSupprimer);
    tbody.appendChild(newRow);
}

function ajouterTacheAvecEtat(tache) {
    // Etape 18
    if (tache.trim() === "") {
        console.log("La tâche est vide.");
    } else {
        listeTaches.push(tache);
        TableauTermine.push("pas terminé"); // Etape 26
        AjouterTacheHTML(tache);
        document.getElementById("tache").value = "";

        console.log("Tâche ajoutée :", tache);
        console.log("État des tâches :", TableauTermine);
    }
}

function Cocher(event) {
    // Etape 22, 23 et 26
    const isChecked = event.target.checked;
    const id = event.target.id;
    const index = parseInt(id.split("-")[1]);

    TableauTermine[index] = isChecked ? "terminé" : "pas terminé"; // Etape 26

    const tousLesTD = document.querySelectorAll("td"); // Etape 27
    const texteBrut = tousLesTD[(index * 4) + 2].textContent;

    if (isChecked) {
        // Etape 29
        tousLesTD[(index * 4) + 2].innerHTML = `<s>${texteBrut}</s>`;
    } else {
        tousLesTD[(index * 4) + 2].innerHTML = texteBrut;
    }

    if (isChecked) { // Etape 24 et 25
        console.log(`La case à cocher avec l'ID "${id}" a été cochée. La tâche ${index} est maintenant terminée.`);
    } else {
        console.log(`La case à cocher avec l'ID "${id}" a été décochée. La tâche ${index} est maintenant marquée comme non terminée.`);
    }

    console.log("État mis à jour des tâches :", TableauTermine);
}

function supprimerTache(event) {
    // Etape 34
    const index = parseInt(event.target.dataset.index);

    listeTaches.splice(index, 1);
    TableauTermine.splice(index, 1);

    const table = document.querySelector("table tbody");
    table.deleteRow(index);

    console.log("Tâche supprimée :", listeTaches);
    console.log("État mis à jour des tâches :", TableauTermine);

    Array.from(table.rows).forEach((row, i) => {
        const boutonSupprimer = row.querySelector("button");
        boutonSupprimer.dataset.index = i;
        row.cells[1].textContent = i + 1;
    });
}

function filterTasks(filterType) {
    const tableRows = document.querySelectorAll("table tbody tr");

    tableRows.forEach((row, index) => {
        const isCompleted = TableauTermine[index] === "terminé";

        if (
            filterType === "all" ||
            (filterType === "completed" && isCompleted) ||
            (filterType === "uncompleted" && !isCompleted)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Etape 5
document.addEventListener("DOMContentLoaded", () => {
    const boutonAjouter = document.getElementById("envoyer");
    boutonAjouter.addEventListener("click", () => {
        const tache = document.getElementById("tache").value;
        ajouterTacheAvecEtat(tache);
    });

    listeTaches.forEach((tache) => {
        AjouterTacheHTML(tache);
    });

    // Etape 27
    const tousLesTD = document.querySelectorAll("td");
    console.log("Toutes les balises <td> :", tousLesTD);

    // Etape 31
    const form = document.querySelector("form");
    const selectFilter = document.createElement("select");
    selectFilter.id = "filter-selector";

    const optionAll = document.createElement("option");
    optionAll.value = "all";
    optionAll.textContent = "Toutes les tâches";

    const optionCompleted = document.createElement("option");
    optionCompleted.value = "completed";
    optionCompleted.textContent = "Tâches terminées";

    const optionUncompleted = document.createElement("option");
    optionUncompleted.value = "uncompleted";
    optionUncompleted.textContent = "Tâches non terminées";

    selectFilter.appendChild(optionAll);
    selectFilter.appendChild(optionCompleted);
    selectFilter.appendChild(optionUncompleted);

    form.appendChild(selectFilter);

    // Etape 32
    selectFilter.addEventListener("change", (event) => {
        filterTasks(event.target.value);
    });
});
