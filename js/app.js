




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

// displaying Single Product details
const loadPhoneDetails = phoneID => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
        .then(response => response.json())
        .then(PhoneIdData => displayPhoneDetails(PhoneIdData.data));
}
const displayPhoneDetails = singleData => {
    console.log(singleData)
    variableDeclared('details-card').textContent = "";;
    
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card">
        <img src="${singleData.image}" class="card-img-top w-20 mx-auto img-fluid" alt="...">
        <div class="card-body">

            <h2> Phone name : ${singleData.name} </h2>
            <p><span>Phone brand :</span> ${singleData.brand} </p>
            <p><span>Release Date :</span> ${singleData.releaseDate ? singleData.releaseDate : 'not Found' } </p>
                <div class="SpecificationSection">
                    <table class="table table-dark table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Main Feature Name</th>
                            <th scope="col">Main Feature Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th scope="row">Chipset</th>
                          <td>${singleData.mainFeatures.chipSet}</td>
                      
                        </tr>
                        <tr>
                          <td>Display</td>
                          <td>${singleData.mainFeatures.displaySize}</td>
                        </tr>
                        <tr>
                          <td>Memory</td>
                          <td>${singleData.mainFeatures.memory}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-dark table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Others Feature Name</th>
                            <th scope="col-6">Others Feature Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th scope="row">Bluetooth</th>
                          <td>${singleData.others.Bluetooth ? singleData.others.Bluetooth: "Not Found"}</td>
                      
                        </tr>
                        <tr>
                          <td>GPS</td>
                          <td>${singleData.others.GPS ? singleData.others.GPS: "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>NFC</td>
                          <td>${singleData.others.NFC ? singleData.others.NFC: "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Radio</td>
                          <td>${singleData.others.Radio ? singleData.others.Radio: "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>WLAN</td>
                          <td>${singleData.others.WLAN ? singleData.others.WLAN: "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>USB</td>
                          <td>${singleData.others.USB ? singleData.others.USB: "Not Found"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-dark table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Sensor Serial</th>
                            <th scope="col-7">Sensor Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th scope="row">Sensor One</th>
                          <td>${singleData.mainFeatures.sensors[0] ? singleData.mainFeatures.sensors[0] : "Not Found"}</td>
                      
                        </tr>
                        <tr>
                          <td>Sensor Two</td>
                          <td>${singleData.mainFeatures.sensors[1] ? singleData.mainFeatures.sensors[1] : "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Sensor Three</td>
                          <td>${singleData.mainFeatures.sensors[2] ? singleData.mainFeatures.sensors[2] : "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Sensor Four</td>
                          <td>${singleData.mainFeatures.sensors[3] ? singleData.mainFeatures.sensors[3] : "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Sensor Five</td>
                          <td>${singleData.mainFeatures.sensors[4] ? singleData.mainFeatures.sensors[4] : "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Sensor six</td>
                          <td>${singleData.mainFeatures.sensors[5] ? singleData.mainFeatures.sensors[5] : "Not Found"}</td>
                        </tr>
                        <tr>
                          <td>Sensor Seven</td>
                          <td>${singleData.mainFeatures.sensors[6] ? singleData.mainFeatures.sensors[6] : "Not Found"}</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                
        </div>
    </div>
    `;
    variableDeclared('details-card').appendChild(div);
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
