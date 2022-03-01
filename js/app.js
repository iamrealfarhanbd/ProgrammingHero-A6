




const variableDeclared = (value) => {
  const elementID = document.getElementById(value);
  return elementID;
  console.log(elementID)
}
// searching phone and  getting function 
const searchPhone = () => {

  
  // error message and sniper
  variableDeclared('error-message').style.display = 'none';
  variableDeclared('spinner-timeout-message').style.display = 'none';
  variableDeclared('spinner').style.display = 'block';
  variableDeclared('seeMore').style.display = 'none'
  
  // clearing search result  before start search
  variableDeclared('search_result_area').textContent = '';
  variableDeclared('details-card').textContent = '';
    // Getting search input 
    const searchText = variableDeclared('search_field').value;
    variableDeclared('spinner').style.display = 'block';

    if ( !isNaN(searchText)) {
        variableDeclared('error-message').style.display = 'block';
        variableDeclared('spinner').style.display = 'none';
    }else{

    // Fetching phoneDataApi API 
    const phoneDataApi = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(phoneDataApi)
        .then(response => response.json())
        .then(PhoneData => {
            if (PhoneData.data != '') {
                displayPhonedData(PhoneData.data.slice(0, 20))
                variableDeclared('seeMore').style.display = 'block'
    
            } else {
                setTimeout(spinnerTimeoutMessage, 2000);
                variableDeclared('seeMore').style.display = 'none'
            }
        });
}
}

const spinnerTimeoutMessage = () => {
  variableDeclared('spinner').style.display = 'none';
  variableDeclared('spinner-timeout-message').style.display = 'block';
}


// Phone display function 
const displayPhonedData = (phoneInfos) => {

  // Process of displaying 
    const searchResultArea = document.getElementById('search_result_area');
    phoneInfos.forEach(phoneInfo=>{

        const div = document.createElement('div');
        div.classList.add('p-2', 'bd-highlight','col-md-4');
        div.innerHTML = `
                  <div class="card gray" style="width: 18rem; ">
                        <img src="${phoneInfo.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phoneInfo.phone_name}</h5>
                            <p class="card-text"><span class='brandName'>Brand :</>${phoneInfo.brand}</p>
                            <a href="#" class="btn btn-dark" onclick="loadPhoneDetails('${phoneInfo.slug}')">
                            Details
                            </a>
                        </div>
                  </div>
                 
               
    `;
    searchResultArea.appendChild(div);
    })


    

    variableDeclared('spinner').style.display = 'none';
    // console.log(phoneInfos);
}


// see more Phone Function
const seeMore = ()=>{

  const takeInput = variableDeclared('search_field').value
      // clearing search result  before start search
      variableDeclared('search_result_area').textContent = '';
      variableDeclared('details-card').textContent = '';
      variableDeclared('seeMore').style.display = 'none';
      variableDeclared('spinner').style.display = 'block';

  // Fetching phoneDataApi API 
  const phoneDataApi = ` https://openapi.programming-hero.com/api/phones?search=${takeInput}`;

  fetch(phoneDataApi)
      .then(response => response.json())
      .then(PhoneData => {
          if (PhoneData.data != '') {
              displayPhonedData(PhoneData.data)
              
          } else {
              setTimeout(spinnerTimeoutMessage, 2000);
          }
      });
}
