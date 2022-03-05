var typingTexts = ['là chúng ta~', ' là C2!', 'những con ngừi mặt mà của biển cả', 'là đàn em của đại kaa Phước~!', 'sẽ sửa lỗi và khum làm phụ lòng đại ca!', 'sẽ cố đậu đại học :3!!', "sẽ...hết òi, lại nhe :))"]

const textChange = document.querySelector('.type-text')

var textIndex = 0;
var textArrayIndex = 0;

var typingDelay = 200
var eraseDelay = 100

// typing
function type() {
    if (textIndex < typingTexts[textArrayIndex].length) {

        textChange.textContent += typingTexts[textArrayIndex].charAt(textIndex)
        textIndex++
        cursorStop()
        setTimeout(type, typingDelay)
    } else {
        cursorPlay()
        setTimeout(erase, 2000)
    }

}

function erase() {
    if (textIndex > 0) {
        textChange.textContent = typingTexts[textArrayIndex].substring(0, textIndex - 1)
        textIndex--
        cursorStop()
        setTimeout(erase, eraseDelay)
    } else {
        textArrayIndex++
        if (textArrayIndex >= typingTexts.length)
            textArrayIndex = 0
        setTimeout(type, typingDelay)
    }
}
var cursor = document.querySelector('.cursor')

function cursorStop() {
    cursor.classList.remove('animation')
}

function cursorPlay() {
    cursor.classList.add('animation')
}
type()
    ///////////////////////////////////////
    //img
var imgs = document.querySelectorAll('.picture-list img')
var image = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var nextBtn = document.querySelector('.down')
var prevBtn = document.querySelector('.up')
var sliceStart = 0
var sliceEnd = 3
var sliced;

function setUpImg() {
    let index = 0
    imgs.forEach(e => {
        e.src = `./image/${index}.JPG`
        index++
    })
}
setUpImg()

function renderImg() {
    sliced = image.slice(sliceStart, sliceEnd)
    if (sliced[0] < 1) {
        prevBtn.classList.add('preventActive')
    } else {
        prevBtn.classList.remove('preventActive')
    }
    if (!(sliced[2] < image.length - 1)) {
        nextBtn.classList.add('preventActive')
    } else {
        nextBtn.classList.remove('preventActive')
    }
    for (i = 0; i < imgs.length; i++) {
        imgs[i].src = `./image/${sliced[i]}.JPG`
    }
}
renderImg()
var x;
var y;
var lastImg = document.querySelector('.last')
var firstImg = document.querySelector('.first')

function nextImg() {
    ++sliceStart
    ++sliceEnd
    lastImg.classList.add('zoom')
    setTimeout(function() { lastImg.classList.remove('zoom') }, 200)
    renderImg()
}

function prevImg() {
    --sliceStart
    --sliceEnd
    firstImg.classList.add('zoom')
    setTimeout(function() { firstImg.classList.remove('zoom') }, 200)
    renderImg()
}
nextBtn.addEventListener('click', nextImg)
prevBtn.addEventListener('click', prevImg)
    // move img in the pic's main area 
var leftSide = document.querySelector('.left')
var rightSide = document.querySelector('.right')
var mainPicture = document.querySelector('.picture-wrapper img')

imgs.forEach(e => {
    e.addEventListener('click', function() {
        mainPicture.src = e.src
        mainPicture.classList.add('zoom')
        setTimeout(function() { mainPicture.classList.remove('zoom') }, 200)
    })
})
mainPicture.addEventListener('click', showImg)
var displayImgShow = document.querySelector('.img-display img')

function showImg() {
    displayImgShow.src = mainPicture.src
    getCurrentImage()
    displayImg.style.display = 'flex'
}
var closeDisplayImg = document.querySelector('.close')
var displayImg = document.querySelector('.img-display')
displayImg.addEventListener('click', closeImg)

function closeImg(e) {
    if (e.target === closeDisplayImg || e.target === displayImg) {
        displayImg.style.display = 'none'
    }
}
console.log(typeof(+displayImgShow.src.slice(28, 30)))
var currentImage;

function getCurrentImage(i) {
    //lấy số của hình
    if (displayImgShow.src.slice(28, 30) == displayImgShow.src.slice(28, 29) + '.') {
        currentImage = +displayImgShow.src.slice(28, 29) //xử lý nếu như hình đi từ 0 đến 10

    } else {
        currentImage = +displayImgShow.src.slice(28, 30) //xử lý nếu như hình đi từ 10 đến 99

    }
    //ẩn thanh di chuyển hếu hình = 0 || hình == ảnh cuối
    checkCurrentImg()
        // tăng hoặc giảm thứ tự hình
    if (i == 0) {
        currentImage--
        displayImgShow.src = `./image/${currentImage}.JPG`
        mainPicture.src = `./image/${currentImage}.JPG`
    } else if (i == 1) {
        currentImage++
        displayImgShow.src = `./image/${currentImage}.JPG`
        mainPicture.src = `./image/${currentImage}.JPG`
    }
    //check lại
    checkCurrentImg()
}

function checkCurrentImg() {
    if (currentImage == 0) {
        leftSide.classList.add('preventActive')
    } else {
        leftSide.classList.remove('preventActive')
    }
    if (currentImage == image.length - 1) {
        rightSide.classList.add('preventActive')
    } else {
        rightSide.classList.remove('preventActive')
    }
}