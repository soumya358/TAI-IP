const container = document.querySelector('section div')
const images = document.querySelectorAll('section div img')
const prevBTN = document.getElementById('prev')
const nextBTN = document.getElementById('next')



for (let i = 0; i < images.length; i++) {
    images[i].style.left = `${i}` * 100 + '%'
}



images.forEach(e => {
    let containerWidth = container.clientWidth
    let margin = parseInt((containerWidth - e.clientWidth) / 2)
    e.style.marginLeft = `${margin}` + 'px'
    e.style.marginRight = `${margin}` + 'px'
})


window.onresize = () => {
    images.forEach(e => {
        let containerWidth = container.clientWidth
        const margin = parseInt((containerWidth - e.clientWidth) / 2)
        e.style.marginLeft = `${margin}` + 'px'
        e.style.marginRight = `${margin}` + 'px'
    })
}





let counter = 0

prevBTN.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        images.forEach(e => {
            e.style.left = (parseInt((e.style.left).replace('%', '')) + 100) + '%'
        })
    }
})

nextBTN.addEventListener('click', () => {
    if (counter < images.length - 1) {
        counter++;
        images.forEach(e => {
            e.style.left = (parseInt((e.style.left).replace('%', '')) - 100) + '%'
        })
    }
})