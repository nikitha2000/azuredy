//mobile header dynamic dislay
function toggleDroopdown(element){
    const currenltyOpenDropdowns = document.querySelectorAll('.dropdown-content.show');
    const dropdown = element.nextElementSibling;

    currenltyOpenDropdowns.forEach(openDropdown => {
        if(openDropdown !== dropdown) {
            openDropdown.classList.remove('show');
            openDropdown.previousElementSibling.classList.remove('active');
        }
    });

    dropdown.classList.toggle('shoow');
    element.classList.toggle('active');
}

window.onclick = function(event) {
    // Close dropdowns if clicked outside
    if (!event.target.matches('.barbtn') && !event.target.matches('.azuretxt') && !event.target.closest('.dropdown-content')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show'); // Close all dropdowns
            dropdown.previousElementSibling.classList.remove('active'); // Remove active class
        });
    }
};
//--------------------------------------------------------------------------------------
const searchButton = document.querySelector('.search-btn');

const searchContainer = document.querySelector('.search-container');
const aftersearch =document.querySelector('.search-section');
const hdList =document.querySelector('.hd-list')
const azure2 = document.querySelector('.azure2')

searchButton.addEventListener('click', function() {
    searchContainer.style.display = searchContainer.style.display === 'none' ? 'Flex' : 'none';

    if(searchContainer.style.display === 'flex'){
        aftersearch.style.display = 'none';
        hdList.style.display='none'
        azure2.style.display='none'
    }

});



document.getElementById('submit-search').addEventListener('click', function() {
    searchContainer.style.display = 'none';
    document.getElementById('search-input').value = ''; 
    
    if(aftersearch.style.display ==='none'){
        aftersearch.style.display='flex';
    }
    if(hdList.style.display ==='none'){
        hdList.style.display='flex';
    }

    if(azure2.style.display ==='none'){
        hdList.style.display='block';
    }

});


// --------------------------------------------
const searchbutton2 = document.querySelector('.barbtn2');
const barbtn = document.querySelector('.barbtnopen');
const backarrow =document.querySelector('.backarrow');


searchbutton2.addEventListener('click', function() {
    barbtn.style.display = barbtn.style.display === 'none' ? 'Flex' : 'none';
});



backarrow.addEventListener('click', function() {
    barbtn.style.display = barbtn.style.display === 'flex' ? 'none' : 'flex';
    });

//----------------------------------------------------------------------------------------------------------------------------------------

function toggleDropdown(element) {
    const currentlyOpenDropdown = document.querySelector('.dropdown-content.show');

    const dropdown = element.nextElementSibling;
    
     //is there anything opened and if yes does it equals to dropdown
    if(currentlyOpenDropdown && currentlyOpenDropdown !==  dropdown) {
        currentlyOpenDropdown.classList.remove('show');
    }
    dropdown.classList.toggle('show');
}


window.onclick = function(event) {
    if (!event.target.matches('.list-name')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show'); // Close all dropdowns
        });
    }
}

//---------------------------------------------banner----------

const topContent = document.getElementById('top-content')
let moveAmount = 0;

const moveSection = () =>{
    moveAmount+= 20;
    topContent.style.transform = `translateY(${moveAmount}px)`;

    if(moveAmount < 200) {
        setTimeout(moveSection, 50000)
    }
    
};


window.onload = () => {
    moveSection();
}
 

function toggleDropnav(element){
    const dropdown = element.querySelector('.drpnav');
    const arrow = element.querySelector('.drop-down-arrow')

    dropdown.classList.toggle('shownav')
    arrow.classList.toggle('active')

    document.addEventListener('click',function(event){
        if(!element.contains(event.target)){
            dropdown.classList.remove('shownav')
            arrow.classList.remove('active')
        }
    },{once: true});
    
 }
//----------------------------------------------solutions----------------------------
function toggleSlidedown(element){
    const slidedown = element.closest('li').querySelector('.slidedwon');
    if(slidedown) {
        slidedown.classList.toggle('active')
    } else{
        console.error("No element with class slidedwon")
    }
}



//------------------------------------blablabla-------------------------------------------------
async function fetchSolutions() {
    const response = await fetch('solutions.json');
    return await response.json();
}

function updateSolutions(solutionsData, category) {
    const solutionsList = document.querySelector('.solutions-content');
    solutionsList.innerHTML = solutionsData[category].map(solution => `
        <li class="solutions1-col1">
            <div class="solutions-content-indicator"></div>
            <div class="solution-list-content">
                <div class="solution1-col1-header" onclick="toggleSlidedown(this)">
                    <button class="s1c2">
                        <h3>${solution.title}</h3>
                    </button>
                </div>
            </div>
            <div class="slidedwon">
                <div class="s1c1-para">
                    <div class="para-cont">${solution.description}</div>
                    <div class="para-link">${solution.link}</div>
                </div>
                <div class="s1c1-img">
                    <img src="${solution.image}" alt="${solution.alt}">
                </div>
            </div>
        </li>
    `).join('');

    // Set the first item as active
    const firstSolution = solutionsList.querySelector('li');
    if (firstSolution) {
        document.querySelectorAll('.solutions-content li').forEach(li => li.classList.remove('active'));
        firstSolution.classList.add('active');
   }

   const firstHeader = firstSolution.querySelector('.slidedwon');
   if(firstHeader){
         firstHeader.classList.add('active')
   }
}

document.addEventListener('DOMContentLoaded', async () => {
    const solutionsData = await fetchSolutions();
    const buttons = document.querySelectorAll('.slide-button');

    // Load Featured solutions by default
    const defaultCategory = 'Featured solutions';
    updateSolutions(solutionsData, defaultCategory);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.backgroundColor = "#005597";
            button.style.color = 'white'
            const category = button.textContent.trim();
            updateSolutions(solutionsData, category);
        });
    });
});



//=======================================================resources===========================

async function fetchResources() {
    try {
        const response = await fetch('resources.json'); // Ensure the path is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch resources:', error);
        return {};
    }
}

function updateResources(resourcesData, category) {
    const resourcesList = document.querySelector('.resources-content');
    const resources = resourcesData[category];

    if (!resources) {
        resourcesList.innerHTML = `<p>No resources available for this category.</p>`;
        return;
    }

    resourcesList.innerHTML = resources.map(resource => `
        <div class="resource-optimize">
            <div class="optimize-header">${resource.title}</div>
            <div class="optimize-btn">
                <div class="solutions-nav">
                    <div class="explore-title">
                        <span class="optimize-content-btn">
                            <span class="optimize-btn-icon"></span>
                        </span>
                        <span class="optimize-content-text" style="padding-left: 8px;">${resource['btn-title']}</span>
                    </div>
                </div>
            </div>
            <div class="resources-image">
                <div class="resources-img-container">
                    <img src="${resource.image}" alt="${resource.title}">
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    const resourcesData = await fetchResources();
    const btns = document.querySelectorAll('.tab-btn');
    const initialCategory = 'IT professionals';
    updateResources(resourcesData, initialCategory);

    // Add active class to the initial button
    const initialButton = Array.from(btns).find(btn => btn.textContent.trim() === initialCategory);
    if (initialButton) {
        initialButton.classList.add('active-btn');
    }


    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            btns.forEach(button => button.classList.remove('active-btn'));
            btn.classList.add('active-btn');
            const category = btn.textContent.trim();
            updateResources(resourcesData, category);
        });
    });
});
//======================================================================================================
//========================================================customer======================================

let currentIndex = 0;
let customers = [];

fetch('customer.json')
  .then(res => res.json())
  .then(data => {
      customers=data;
      renderCustomerBoxes();
  })
  .catch(error => console.log('error fertching:',error));

  function renderCustomerBoxes() {
    const slider = document.querySelector('.customer-box-wrapper');
    slider.innerHTML = '';

 customers.forEach(customer => {
    const customerBox = document.createElement('div')
    customerBox.className = 'customer-box';

    customerBox.innerHTML = `
            <div class="customer-box-contents">
                <div class="customer-img">
                    <div class="content-img-container">
                        <img src="${customer.image}" alt="Customer Image">
                    </div>
                </div>
                <div class="content-txt">
                    <div class="lego-content">
                        <div class="lego-logo">
                            <div class="lego-logo-container">
                                <img src="${customer.logo}" alt="Customer Logo">
                            </div>
                        </div>
                        <div class="lego-text">${customer.text}</div>
                    </div>
                    <div class="products-content">
                        <div class="products-nav">
                            <div class="product-header">Products</div>
                            <div class="product-link">
                                ${customer.products.map(product => `
                                    <div class="AzureIoT">
                                        <img src="${product.logo}" alt="${product.name} Logo">
                                        <a href="${product.link}">${product.name}</a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="case-study"><a href="#"><span>Case Study</span></a></div>
                    </div>
                </div>
            </div>
        `;
        slider.appendChild(customerBox);
    });
  }

  function updateSliderPosition() {
    const sliderWrapper = document.querySelector('.customer-box-wrapper');
    const slideWidth = sliderWrapper.clientWidth; // Full width of the slider
    sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
  }

document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.cls-arrow-left');
    const rightArrow = document.querySelector('.cls-arrow-right');
    

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < customers.length - 1) {
            currentIndex++;
            updateSliderPosition();
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const logoListElements = document.querySelectorAll('.logo-list-element');

    // Add click event listeners to each logo list element
    logoListElements.forEach((li) => {
        li.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            currentIndex = parseInt(li.getAttribute('data-index')); // Set currentIndex based on clicked item
            updateSliderPosition(); // Update slider position
        });
    });
});

// -----------------------------------------products and services----------------------------------------------
let productsData = {};

fetch('products.json')
    .then(resp => {
        if(!resp.ok){
            throw new Error('Network response error');
        }
        return resp.json();
    })
    .then(data => {
        console.log(data);
        productsData = data;
        updateContent("Featured");
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    function updateContent(category) {
        const products = productsData.products[category];
        const productsContent = document.getElementById('productContent')
           

        console.log("Selected category:", category);
        console.log("Products data:", products);
    


        if (!products) {
            console.error(`No products found for category: ${category}`);
            return;
        }

      const col1HTML = `
        <div class="col1-ps">
            <div class="ps-col1" style="background-image: url(${products.col1.backgroundImage});">
                <div class="background-gardient");"></div>
                <div class="ps-empty"></div>
                <div class="ps-content1">
                    <div class="ps-col1-header1">${products.col1.header}</div>
                    <div class="ps-col1-para1">${products.col1.description}</div>
                    <div class="ps-col1-explore1">Explore the product</div>
                </div>
            </div>
        </div>
        <div class="col2-ps">
            <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[0].image}" alt="${products.col2[0].header}"></div>
                    <div class="ps-col1-header2">${products.col2[0].header}</div>
                    <div class="ps-col1-para2">${products.col2[0].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>
            <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[1].image}" alt="${products.col2[1].header}"></div>
                    <div class="ps-col1-header2">${products.col2[1].header}</div>
                    <div class="ps-col1-para2">${products.col2[1].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>
            
            <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[2].image}" alt="${products.col2[2].header}"></div>
                    <div class="ps-col1-header2">${products.col2[2].header}</div>
                    <div class="ps-col1-para2">${products.col2[2].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>
             
            <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[3].image}" alt="${products.col2[3].header}"></div>
                    <div class="ps-col1-header2">${products.col2[3].header}</div>
                    <div class="ps-col1-para2">${products.col2[3].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>

             <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[4].image}" alt="${products.col2[4].header}"></div>
                    <div class="ps-col1-header2">${products.col2[4].header}</div>
                    <div class="ps-col1-para2">${products.col2[4].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>

             <div class="ps-col2">
                <div class="ps-content2">
                    <div class="ps-col1-img2"><img src="${products.col2[5].image}" alt="${products.col2[5].header}"></div>
                    <div class="ps-col1-header2">${products.col2[5].header}</div>
                    <div class="ps-col1-para2">${products.col2[5].description}</div>
                    <div class="ps-col1-explore2">Explore the product</div>
                </div>
            </div>

        </div>
     `;

      productsContent.innerHTML = col1HTML;

      const buttons = document.querySelectorAll('.slide-button');
      let activeButton = null;

      buttons.forEach(button => {
            button.addEventListener('click', () => {
            
            const category = button.textContent.trim().replace(' ', '_');

            updateContent(category);

            button.classList.add('blue');

            console.log('Current activeButton:', activeButton ? activeButton.textContent : 'null');

            if( activeButton && activeButton !== button){
                console.log('Removing blue from:', activeButton.textContent)
                activeButton.classList.remove('blue');
            }

            activeButton = button;
            console.log('Active button now:', activeButton.textContent);
        });
      });

    }