const BASE_URL = 'http://127.0.0.1:5000/';

const $addCupcakeForm = $(".cupcake-form");

const $cupcakeList = $("#cupcake-list");

const $cupcakeDelBtns = $("#del");

function createCupcakeHTML(cupcake) {
    return `<div class="col-3 m-6">
            <span id="cupcake-id-${cupcake.id}"></span>
                <div class="card" style="height: 10rem;">
                    <img src="${cupcake.image}" class="card-img-top" style="width: 100; height: 200px;"  alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cupcake.flavor}</h5>
                        <p class="card-text">Rating: ${cupcake.rating} / Size: ${cupcake.size}</p>
                        <button id="del"class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>`;
}

async function getAllCupcakes() {

    const response = await axios ({
        url: `${BASE_URL}/api/cupcakes`,
        method: "GET"
    });

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = createCupcakeHTML(cupcakeData);
        $cupcakeList.append(newCupcake);
      }
}

function getCupcakeFormData(evt) {


    const flavor = $('#flavor').val();
    const size = $('#size').val();
    const rating = $('#rating').val();
    const image = $('#image').val();

    $('#flavor').val('');
    $('#size').val('');
    $('#rating').val('');
    $('#image').val('');

    return {flavor,size,rating,image};


}

async function createNewCupcake(flavor,size,rating,image) {    

    const response = await axios({
        url: `${BASE_URL}/api/cupcakes`,
        method: "POST",
        data: {
              flavor,
              size,
              rating,
              image
          }
      });

      console.log(response.data);

      return response.data.cupcake;

}

async function handleFormSubmit(evt){
    // evt.preventDefault();
    let cupcakeObj = getCupcakeFormData();
    let flavor = cupcakeObj.flavor;
    let size = cupcakeObj.size;
    let rating = cupcakeObj.rating;
    let image = cupcakeObj.image;

    const createdCupcake = await createNewCupcake(flavor,size,rating,image);
    // let allCupcakes = getAllCupcakes();
    cupcakeHTML = createCupcakeHTML(createdCupcake);
    $cupcakeList.append(cupcakeHTML);
}

async function handleDeleteCupcake(evt) {
    let cupcakeId = $(evt.target).closest('span').id


    await axios.delete(`${BASE_URL}/api/cupcakes/${cupcakeId}`);



}



$(document).ready(getAllCupcakes)


$cupcakeDelBtns.on('click', handleDeleteCupcake);
$addCupcakeForm.on('submit', handleFormSubmit);