const imageInput = document.getElementById("imageInput");                                   //Iegūst info no Avota ievades
const descriptionTitleInput = document.getElementById("descriptionTitleInput");             //Iegūst info no Nosaukuma ievades
const descriptionParagraphInput = document.getElementById("descriptionParagraphInput");     //Iegūst info no Apraksta ievades

const descriptionInfo = [];         //Izveido massīvu kurā turēs visu informāciju

function handleSubmit(event) {
    event.preventDefault();         //Nepārlāde mājaslapu

    const info = {                      //Izveido javascript objektu!!
        image: imageInput.value,
        title: descriptionTitleInput.value,
        descriptionParagraph: descriptionParagraphInput.value,
    };

    descriptionInfo.push(info);   //Ieliek informāciju objektā un tad to ievada massīvā
    
    displayInfo();      //Izpilda funkciju, lai parādītos kartiņas
}

function displayInfo() {
    const inputHolder = document.getElementById("inputHolder");             //Izveido JS manīgo priekš kartiņu turētāja
    inputHolder.innerHTML = "";                                     //Noņem to, kas tika uzrakstīts ievadē, lai pašam nebūtu jāizdzēš

    console.log(descriptionInfo);       //Pārbauda array pirms izdzēšanas

    descriptionInfo.forEach((singleItem, id) => {       //DescriptionInfo izmanto forEach ciklu

        const imageDiv = document.createElement("div");             //Izveido <div></div>
        const imageLink = document.createElement("img");            //Izveido <img>
        const descriptionTitle = document.createElement("h1");      //Izveido <h1></h1>
        const descriptionParagraph = document.createElement("p");   //Izveido <p></p>

        imageDiv.onclick = () => deleteDiv(id);     //Izpildīs dzēšanas funkciju, ja uzklikšķinās uz jaunās kartiņas

        if (singleItem["image"] == "") {            //Ja neievadīja avotu bildei, izmanto šo
            imageLink.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/1200px-Minecraft_missing_texture_block.svg.png";
        } else {
            imageLink.src = singleItem["image"];        //Ja ievadīja, tad izmanto ievadīto
        }

        descriptionTitle.textContent = singleItem["title"];                         //Visiem mainīgajiem šajā paragrāfā pievieno
        descriptionParagraph.textContent = singleItem["descriptionParagraph"];      //informāciju, kas tiek iegūta no 2D massīva
        
        descriptionTitle.className = "descriptionTitle";                //Nosaukumam un aprakstam pievieno klasi
        descriptionParagraph.className = "descriptionParagraph";

        if (singleItem["descriptionParagraph"].length >=350 || singleItem["title"].length >=38) {    //Ja teksts ir pārāk garš, tad
            imageDiv.className = "imageDivLimited";                                                 //bildei pievieno citu klasi
            imageLink.className = "imageLinkLimited";                                              //div elementam pievieto citu klasi
        } else {
            imageDiv.className = "imageDiv";
            imageLink.className = "imageLink";
        }

        imageDiv.appendChild(imageLink);                //Jaunajai kartiņai pieliek attēlu
        imageDiv.appendChild(descriptionTitle);         //Jaunajai kartiņai pieliek nosaukumu
        imageDiv.appendChild(descriptionParagraph);     //Jaunajai kartiņai pieliek aprakstu
        
        inputHolder.appendChild(imageDiv);      //pilnā kartiņa tiek ielikta iepriekš izveidotajā html div

        imageInput.value = "";
        descriptionTitleInput.value = "";       //Input field izdzēšs visu kas tika ierakstīts
        descriptionParagraphInput.value = "";
    });
}

function deleteDiv(id) {                //Funkcija lai izdzēstu info no massīva
    descriptionInfo.splice(id, 1);
    console.log(descriptionInfo);       //Pārbauda array pēc izdzēšanas
    displayInfo();                      //Atkārto funkciju, lai viss parādītos
}