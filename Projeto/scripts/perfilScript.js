/*=============================== STORAGES ===============================*/

const StorageProfile = {
    get() {
        return JSON.parse(localStorage.getItem("Profiles")) || []
    },

    set(profileData) {
        localStorage.setItem("Profiles", JSON.stringify(profileData))
    }
}

const StorageWeight = {
    get() {
        return JSON.parse(localStorage.getItem("Weights")) || []
    },

    set(weightRegister) {
        localStorage.setItem("Weights", JSON.stringify(weightRegister))
    }
}

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
            value = `${hour}:${minutes}`
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

/*=============================== PROFILE BUTTONS ===============================*/
   /*============================ CREATE PROFILE ============================*/

   const Profiles = {
    all: StorageProfile.get(),

    add(profile) {
        Profiles.all.push(profile),

        Weights.all.push(profile.weight)
        
        App.reload()
    },

    remove(index) {
        Profiles.all.splice(index, 1),

        Modal.close()

        App.reload()

        document.querySelector('#profile-buttons')
        .classList
        .add('hidden-content')

        document.querySelector('#profile-body')
        .classList
        .add('hidden-content')

        document.querySelector('#button-profile-new')
        .classList
        .add('button-profile-new')

        document.querySelector('#button-profile-new')
        .classList
        .remove('hidden-content')
    }
}

const DOM = {
    profileNameContainer: document.querySelector('.img-body'),
    addProfileName(profile, index) {
        const div = document.createElement('div')
        div.innerHTML = DOM.innerHTMLName(profile, index)
        div.setAttribute('class', 'name-body-image')
        div.dataset.index = index

        DOM.profileNameContainer.appendChild(div)
    },
    innerHTMLName(profile, index) {
        const profileName = `
            <p id="name" class="profile-name">${profile.name}</p>
            <img id="body-figure" src="./components/images/Corpo-Dark.png" alt="Figura Corpo Humano">
        `
        return profileName
    },

    profileStatsContainer: document.querySelector('.inner-profile-stats'),
    addProfileStats(profile, index) {
        const div = document.createElement('div')
        div.innerHTML = DOM.innerHTMLStats(profile, index)
        div.setAttribute('class', 'inner-profile-stats')
        div.dataset.index = index

        DOM.profileStatsContainer.insertBefore(div, null)
    },
    innerHTMLStats(profile, index) {
        const height = Utils.formatStats(profile.height)
        const weight = Utils.formatStats(profile.weight)

        const profileStats = `
            <div id="profile-height-div" class="height">
                <p class="stats-title">Altura</p>
                <p id="height" class="stats-body height">${height} m</p>
            </div>
            <div id="profile-weight-div" class="weight">
                <p class="stats-title">Peso Atual</p>
                <p id="weight" class="stats-body weight">${weight} kg</p>
                <button onclick="Modal.openUpdateWeight()" class="update weight">Atualizar Peso</button>
            </div>
        `
        return profileStats
    },

    clearProfile() {
        DOM.profileNameContainer.innerHTML = ""
        DOM.profileStatsContainer.innerHTML = ""
    }
}

        /*======================== HEIGHT LIMIT =========================*/

const profileMasks = {
    height(value) {
        return value
        .replace(/(\d{3})\d+?$/, "$1")
    }
}

document.querySelectorAll('input#new-profile-height').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = profileMasks.height(e.target.value)
    }, false)
})

     /*=============================== UPDATE WEIGHT =========================*/

const Weights = {
    all: StorageWeight.get(),

    add(weight) {
        Weights.all.push(weight)

        Profiles.all[0].weight = weight

        App.reload()
    },

    weightDiff() {
        let diff = 0

        diff = Weights.all[0] - Weights.all[Weights.all.length - 1]
        diff = Utils.formatStats(diff)
        diff = Utils.formatDiff(diff)

        return diff
    },
}

const WDOM = {
    WeightRegisterContainer: document.querySelector('#weight-history tbody'),

    addWeightRegister(weight, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = WDOM.innerHTMLWeight(weight, index)

        WDOM.WeightRegisterContainer.appendChild(tr)
    },

    innerHTMLWeight(weight, index) {
        const weightValue = Utils.formatStats(weight)

        const register = `
        <td>${weightValue} kg</td>
        <td>${Utils.dateToday()}</td>
        `
        return register
    },

    clearWeights() {
        WDOM.WeightRegisterContainer.innerHTML = ""
    },

    updateTable() {
        document.querySelector('.stats-body.gainloss').innerHTML = `${Weights.weightDiff()} kg`
    }
}

/*=============================== FORMS ===============================*/

const NewProfileForm = {
    name: document.querySelector('input#new-profile-name'),
    height: document.querySelector('input#new-profile-height'),
    weight: document.querySelector('input#new-profile-weight'),

    getValues() {
        return {
            name: NewProfileForm.name.value,
            height: NewProfileForm.height.value,
            weight: NewProfileForm.weight.value
        }
    },

    validateFields() {
        const {name, height, weight} = NewProfileForm.getValues()

        if(name.trim() === "" || height.trim() === "" || weight.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {name, height, weight} = NewProfileForm.getValues()

        weight = Utils.formatWeight(weight)

        return {
            name,
            height,
            weight
        }
    },

    clearFields() {
        NewProfileForm.name.value = ""
        NewProfileForm.height.value = ""
        NewProfileForm.weight.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewProfileForm.validateFields()

            const profile = NewProfileForm.formatValues()

            Profiles.add(profile)

            NewProfileForm.clearFields()

            Modal.close()

            document.querySelector('#ov-create-profile .error')
            .classList
            .add('hidden-content')

            document.querySelector('#profile-buttons')
            .classList
            .remove('hidden-content')

            document.querySelector('#profile-body')
            .classList
            .remove('hidden-content')

            document.querySelector('#button-profile-new')
            .classList
            .add('hidden-content')

            document.querySelector('#button-profile-new')
            .classList
            .remove('button-profile-new')

        } catch (error) {
            document.querySelector('#ov-create-profile .error')
            .classList
            .remove('hidden-content')
        }
    }
}

const UpdateWeightForm = {
    weight: document.querySelector('input#update-profile-weight'),

    getValues() {
        return {
            weight: UpdateWeightForm.weight.value
        }
    },

    validateFields() {
        const {weight} = UpdateWeightForm.getValues()

        if(weight.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {weight} = UpdateWeightForm.getValues()

        weight = Utils.formatWeight(weight)

        return weight
    },

    clearFields() {
        UpdateWeightForm.weight.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            UpdateWeightForm.validateFields()

            const weight = UpdateWeightForm.formatValues()

            Weights.add(weight)

            UpdateWeightForm.clearFields()

            Modal.close()

            document.querySelector('#ov-update-weight .error')
            .classList
            .add('hidden-content')
            
        } catch (error) {
            document.querySelector('#ov-update-weight .error')
            .classList
            .remove('hidden-content')
        }
    }
}

/*=============================== APP ===============================*/

const App = {
    init() {
        Profiles.all.forEach((profile, index) => {
            DOM.addProfileName(profile, index),
            DOM.addProfileStats(profile, index)
        })

        Weights.all.forEach((weight, index) => {
            WDOM.addWeightRegister(weight, index)
        })

        WDOM.updateTable()

        StorageProfile.set(Profiles.all)
        StorageWeight.set(Weights.all)

    },

    reload() {
        DOM.clearProfile()
        WDOM.clearWeights()

        App.init()
    }
}

App.init()