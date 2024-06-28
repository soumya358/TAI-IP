const staticHeroImages = document.querySelectorAll('#staticHeroImages img')


function setStaticHeroImages() {
    let deviceWidth = window.innerWidth
    staticHeroImages[0].style.top = 0
    staticHeroImages[0].style.left = 0
    staticHeroImages[1].style.top = 0
    staticHeroImages[1].style.left = `${parseInt(deviceWidth / 2)}px`
    staticHeroImages[2].style.top = 0
    staticHeroImages[3].style.bottom = 0
    staticHeroImages[4].style.bottom = 0
    staticHeroImages[4].style.left = 0
}
setStaticHeroImages()
window.onresize = () => {
    setStaticHeroImages()
}