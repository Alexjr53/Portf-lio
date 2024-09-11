//-----------------------------clique fora do menu mobile----------------------------
document.addEventListener("click", function(event) {
    const btnMenuMobile = document.querySelector('.menuMobile'); 
    const btnMenuSpan = document.querySelector('.menuIcon'); 
    const checkboxMenuMobile = document.getElementById('mobile-menu-toggle'); 
    const menuMobile = document.querySelector('.menuList');
    const darkModeBtn = document.querySelector('.darkModeBtn')
    
    //if para garantir que o clique foi fora do menu
    if (!btnMenuMobile.contains(event.target) && !btnMenuSpan.contains(event.target) && !checkboxMenuMobile.contains(event.target) && !menuMobile.contains(event.target) && !darkModeBtn.contains(event.target) ) {
        if (checkboxMenuMobile.checked) {
            checkboxMenuMobile.checked = false;
        }
    }
});