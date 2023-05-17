
const searchFood=async ()=>{
    const searchField=document.getElementById('search-filed');
    const searchFieldText= searchField.value;
    // clear Data
    searchField.value='';
    if(searchFieldText=='')
    {
        const searchEmpty=document.getElementById('meal-detail');
        searchEmpty.innerHTML='';
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
                
                <img src="images/nice-food.jpg" class="img-fluid p-3  card-img-top" alt="...">
                <div class="card-body">
                  <h3  class="card-title text-center text-success">You really want Food Recipes !</h3>
                  <p class="card-text text-center text-warning">
                  If you really Want This kinds Of Delicious Food Recipes Then search Food name. And You Will get That Food Recipes.  
                  
                </div>
                `;
                searchEmpty.appendChild(div);
    }
    else
    {
        // Load Data
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;
    const res=await fetch(url);
    const data=await res.json();
    displaySearchResult(data);
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>displaySearchResult(data.meals))
    }
    
}
const displaySearchResult=data=>{
    // console.log(meals.length);
    const searchResult=document.getElementById('search-result');
    searchResult.innerHTML='';
    if(data.meals===null)
    {
        // console.log("You Are a Fool");

        const mealNotFound=document.getElementById('meal-detail');
        mealNotFound.innerHTML='';
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
                
                <img src="images/404.jpg" class="img-fluid p-3  card-img-top" alt="...">
                <div class="card-body">
                  <h3  class="card-title text-center text-danger">Food Not Found</h3>
                  <p class="card-text text-center text-info">Look like we don't have this kinds of food that you are looking for, maybe a little spelling mistake</p>
                  
                </div>
                `;
                mealNotFound.appendChild(div);
    }
    else
    {
        data.meals.forEach(meal => {
            
            // console.log(meal.length);
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <div onclick="leadMealDetails(${meal.idMeal})" class="card h-100 p-3 img-fluid">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                    </div>
                  </div>
            `;
            searchResult.appendChild(div);
        });
    }
       
    
        
    
    
}
const leadMealDetails=async (idMeal)=>{
    // console.log(idMeal);
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const res=await fetch(url);
    const data= await res.json();
    displayMealDetails(data.meals[0])
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>displayMealDetails(data.meals[0]))
}
const displayMealDetails=meal=>{
    console.log(meal);
    const mealDetails=document.getElementById('meal-detail');
    mealDetails.innerHTML='';
    const div=document.createElement('div');
    div.classList.add('card');
        div.innerHTML=`
                <img src="${meal.strMealThumb}" class="img-fluid p-3  card-img-top " alt="...">
                <div class="card-body">
                  <h3 class="card-title text-center text-warning">${meal.strMeal}</h3>
                  <p class="card-text text-justify text-success">${meal.strInstructions}</p>
                  <a href="${meal.strYoutube}" class="btn btn-primary">See The Full Cocking Process</a>
                </div>
                `;
    mealDetails.appendChild(div);
}