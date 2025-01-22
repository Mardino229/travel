
const search = document.getElementById("search");
const clear = document.getElementById("clear");
const recommendation = document.getElementById("recommendation");

search.addEventListener("click", function () {
    const input = document.getElementById("data").value;
    recommendation.innerHTML = "";
    fetch("travel_recommendation_api.json", ).then(
        response => response.json()
    ).then(
        data => {
            console.log(data);
            const key = Object.keys(data).find(key=>(key===input.toLowerCase()||key.slice(0, -1)===input.toLowerCase())); 
            if (!key) {
                console.log("Resultat introuvable")
            } else {
                const result = data[key];
                console.log(data[key]);
                if (key === "countries") {
                    result.forEach(element => {
                    element.cities.forEach(city=>{
                        const div = document.createElement('div');
                        div.className = ["recom"];
                        div.innerHTML = `
                            <img src="${city.imageUrl}"alt="">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                            <button class="visit">Visit</button>
                        `;
                        recommendation.appendChild(div);
                        })
                    });
                } else {
                    result.forEach(element => {
                        const div = document.createElement('div');
                        div.className = ["recom"];
                        div.innerHTML = `
                            <img src="${element.imageUrl}" alt="">
                            <h3>${element.name}</h3>
                            <p>${element.description}</p>
                            <button class="visit">Visit</button>
                        `;
                        recommendation.appendChild(div);
                    });
                }
                
            }
        }
    ).catch(error => {
        console.error('Error:', error);
    });
    console.log("La recherche est lancée sur")
})

clear.addEventListener('click', function(){
    document.getElementById("data").value = "";
    recommendation.innerHTML = "";
})







