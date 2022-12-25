const addCarts = document.querySelectorAll("td button")
for(let i = 0 ; i < addCarts.length; i++){
    addCarts[i].addEventListener("click", (e) => {
        let parent = addCarts[i].parentElement.parentElement;
        let id = parent.querySelector("th").innerHTML;
        let quantity = parent.querySelector("input").value;
        
    })
}