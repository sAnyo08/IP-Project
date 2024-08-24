let http = new XMLHttpRequest();

http.open('get','data.json', true);

http.send();

http.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        let products= JSON.parse(this.responseText);
        let output ="";

        for(let item of products){
            output = output + `
            <div class="card">
            <img class="playerimg"src="${item.image}" alt="${item.name}">
            <h1>${item.name}</h1>
            <p class="title">${item.title}</p>
            <button class="buttons"><a href="${item.link}">${item.button}</a></button>
            </div>
            `
        };
        document.querySelector(".products").innerHTML= output;
    }
}
