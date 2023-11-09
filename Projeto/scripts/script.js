/*=============================== HEADER BUTTONS ===============================*/

document.getElementById('button-header-profile').onclick = function() {accessProfile(), setTimeout(DST("./scripts/perfilScript.js"), 1000)};
function accessProfile() {
    var buttonOn = document.getElementById('button-header-profile');
    buttonOn.classList.add('on');
    var buttonOff = document.getElementById('button-header-controller');
    buttonOff.classList.remove('on');
    var buttonOff = document.getElementById('button-header-information');
    buttonOff.classList.remove('on');
}

document.getElementById('button-header-controller').onclick = function() {accessController(), setTimeout(DST("./scripts/controleScript.js"), 1000)};
function accessController() {
    var buttonOn = document.getElementById('button-header-controller');
    buttonOn.classList.add('on');
    var buttonOff = document.getElementById('button-header-profile');
    buttonOff.classList.remove('on');
    var buttonOff = document.getElementById('button-header-information');
    buttonOff.classList.remove('on');
}

document.getElementById('button-header-information').onclick = function() {accessInformation()};
function accessInformation() {
    var buttonOn = document.getElementById('button-header-information');
    buttonOn.classList.add('on');
    var buttonOff = document.getElementById('button-header-controller');
    buttonOff.classList.remove('on');
    var buttonOff = document.getElementById('button-header-profile');
    buttonOff.classList.remove('on');
}

/*=============================== STORAGES ===============================*/

// const StorageProfile = {
//     get() {
//         return JSON.parse(localStorage.getItem("Profiles")) || []
//     },

//     set(profileData) {
//         localStorage.setItem("Profiles", JSON.stringify(profileData))
//     }
// }

// const StorageWeight = {
//     get() {
//         return JSON.parse(localStorage.getItem("Weights")) || []
//     },

//     set(weightRegister) {
//         localStorage.setItem("Weights", JSON.stringify(weightRegister))
//     }
// }

/*=============================== UTILS ===============================*/

const Utils = {
    formatStats(value) {
        value = Number(value) / 100
        return value
    },

    formatWeight(value) {
        value = Number(value.replace(/\,\./g, "")) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatTime(value) {
        if(value < 10) {
            value = `0:0${value}`
        } else {
        if(value < 60) {
            value = `0:${value}`
        } else {
            hour = Math.floor(value / 60)
            minutes = value % 60
            if(minutes < 10) {
                value = `${hour}:0${minutes}`
            }
            else {
                value = `${hour}:${minutes}`
            }
        } }
        return value
    },

    formatName(value) {

        value = String(value)

        return value
    },

    dateToday() {
        const date = new Date()

        let currentDay = String(date.getDate()).padStart(2, '0')

        let currentMonth = String(date.getMonth()+1).padStart(2, '0')

        let currentYear = date.getFullYear()

        let currentDate = `${currentDay}/${currentMonth}/${currentYear}`

        return currentDate
    },

    formatDiff(value) {
        if(value < 0) {
            value = value * (-1)
            document.querySelector('#gain').classList.remove('hidden-content')
            document.querySelector('#loss').classList.add('hidden-content')
        } else {
            document.querySelector('#gain').classList.add('hidden-content')
            document.querySelector('#loss').classList.remove('hidden-content')
        }

        return value
    }
}

/*=============================== MODAL BUTTONS ===============================*/

const Modal = {
    openNewProfile() {
        document.querySelector('.overlay.create-profile')
        .classList
        .add('active');
    },

    openEditProfile() {
        document.querySelector('.overlay.edit-profile')
        .classList
        .add('active');
    },

    openUpdateWeight() {
        document
        .querySelector('.overlay.update-weight')
        .classList
        .add('active')
    },
    
    openConfirmDelete() {
        document
        .querySelector('.overlay.confirm-delete')
        .classList
        .add('active')
    },

    openAddExercise() {
        document
        .querySelector('.overlay.add-exercise')
        .classList
        .add('active')
    },

    openNewExercise() {
        document
        .querySelector('.overlay.create-exercise')
        .classList
        .add('active')
    },

    close() {
        let nodeList = document.querySelectorAll('.overlay');
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove('active');
        }
    },

    closeNewEx() {
        document
        .querySelector('.overlay.create-exercise')
        .classList
        .remove('active')
    }
}

function DST(url)
{
    var s = document.createElement(`script`);
    s.src= url;
    document.getElementsByTagName(`body`)[0].appendChild(s);
}