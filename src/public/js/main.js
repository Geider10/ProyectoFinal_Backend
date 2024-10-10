const handleMenuActive =()=>{
    const contentMenu = document.getElementById('dropdown-menu')
    contentMenu.classList.toggle('active')
}
const btnDropDown = document.querySelector('.dropdown-toggle')
btnDropDown.addEventListener('click', handleMenuActive)

const handleLogout = () =>{
    fetch('endpint',{
        method : 'POST'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
const btnLogout = document.getElementById('btn-logout')
btnLogout.addEventListener('click',handleLogout)
