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