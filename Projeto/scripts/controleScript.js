/*=============================== STORAGES ===============================*/

const StorageRegister = {
    get() {
        return JSON.parse(localStorage.getItem("Registers")) || []
    },

    set(registers) {
        localStorage.setItem("Registers", JSON.stringify(registers))
    }
}

const StorageExercise = {
    get() {
        return JSON.parse(localStorage.getItem("Exercises")) || []
    },

    set(exercises) {
        localStorage.setItem("Exercises", JSON.stringify(exercises))
    }
}

/*=============================== CONTROLLER BUTTONS ===============================*/
   /*=============================== ADD EXERCISE ===============================*/

   const Exercises = {
    all: StorageRegister.get(),
    add(exercise) {
        Exercises.all.push(exercise),

        ExApp.reload()
    },

    remove(index) {
        Exercises.all.splice(index, 1),

        ExApp.reload()
    },

    totalRegisters() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            total = total + 1;
        })

        return total;
    },

    totalTime() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            total = total + Number(exercise.time);
        })

        return total;
    },

    caloryBurn() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            calory = 7 * StorageWeight.get() * (Number(exercise.time) / 60)
            total = total + calory;
        })

        return total
    }
}

const EXDOM = {
    RegisterContainer: document.querySelector('#exercises-added tbody'),

    addRegister(exercise, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = EXDOM.innerHTMLRegisters(exercise, index)
        tr.dataset.index = index

        EXDOM.RegisterContainer.appendChild(tr)
    },

    innerHTMLRegisters(exercise, index) {
        const register = `
        <td>${exercise.name}</td>
        <td>${exercise.series}</td>
        <td>${exercise.reps}</td>
        <td>${exercise.time}min</td>
        <td>${exercise.date}</td>
        <td><img class="lixopng" onclick="Exercises.remove(${index})" src="./components/images/Lixo-Dark.png" alt="Excluir Exercício"></td>
        `
        return register
    },

    clearExercises() {
        EXDOM.RegisterContainer.innerHTML = ""
    },

    updateStats() {
        document.querySelector('.stats-body.te').innerHTML = Exercises.totalRegisters()
        document.querySelector('.stats-body.tt').innerHTML = Utils.formatTime(Exercises.totalTime())
        document.querySelector('.stats-body.td').innerHTML = Utils.formatStats(Exercises.caloryBurn()).toFixed(2)
    }
}
  
  /*=============================== CREATE EXERCISE ===============================*/

  const exercises = [
    "Bicicleta",
    "Abdominal",
    "Flexão",
    "Panturrilha"
]

// const baseEx = {
//     all: exercises
// }

const NewExercises = {
    all: exercises,
    add(exercise) {
        NewExercises.all.push(exercise),

        ExApp.reload()
    },
}

const NEDOM = {
    ExerciseContainer: document.querySelector('select#exercises-list'),
    createExercise(exercise, index) {
        const option = document.createElement('option')
        option.innerHTML = `${exercise}`
        option.dataset.index = index
        // option.setAttribute('value', `${Utils.formatName(exercise.name)}`)

        NEDOM.ExerciseContainer.appendChild(option)
    },

    clearExercises() {
        NEDOM.ExerciseContainer.innerHTML = ""
    }
}

/*=============================== FORMS ===============================*/

const NewRegisterForm = {
    series: document.querySelector('input#add-exercise-series'),
    reps: document.querySelector('input#add-exercise-reps'),
    time: document.querySelector('input#add-exercise-time'),
    date: document.querySelector('input#add-exercise-date'),

    getExerciseName() {
        var select = document.getElementById('exercises-list');
        var exerciseSelected = select.options[select.selectedIndex].text;

        return exerciseSelected;
    },

    getValues() {
        return {
            name: NewRegisterForm.getExerciseName(),
            series: NewRegisterForm.series.value,
            reps: NewRegisterForm.reps.value,
            time: NewRegisterForm.time.value,
            date: NewRegisterForm.date.value
        }
    },

    validateFields() {
        const {name, series, reps, time, date} = NewRegisterForm.getValues()

        if(series.trim() === "" || reps.trim() === "" || time.trim() === "" || date.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {name, series, reps, time, date} = NewRegisterForm.getValues()

        date = Utils.formatDate(date)

        return {
            name,
            series,
            reps,
            time,
            date
        }
    },

    clearFields() {
        NewRegisterForm.series.value = ""
        NewRegisterForm.reps.value = ""
        NewRegisterForm.time.value = ""
        NewRegisterForm.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewRegisterForm.validateFields()

            const exercise = NewRegisterForm.formatValues()

            Exercises.add(exercise)

            NewRegisterForm.clearFields()

            Modal.close()

            document.querySelector('#ov-add-exercise .error')
            .classList
            .add('hidden-content')

            document.querySelector('#exercises-added thead')
            .classList
            .remove('hidden-content')
            
        } catch (error) {
            document.querySelector('#ov-add-exercise .error')
            .classList
            .remove('hidden-content')
        }
    }
}

const NewExerciseForm = {
    Exname: document.querySelector('input#exercise-name'),

    getValues() {
        return {
            Exname: NewExerciseForm.Exname.value
        }
    },

    validateFields() {
        const {Exname} = NewExerciseForm.getValues()

        if(Exname.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {Exname} = NewExerciseForm.getValues()

        Exname = Utils.formatName(Exname)

        return Exname
    },

    clearFields() {
        NewExerciseForm.Exname.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewExerciseForm.validateFields()

            const exercise = NewExerciseForm.formatValues()

            NewExercises.add(exercise)

            NewExerciseForm.clearFields()

            Modal.closeNewEx()

            document.querySelector('#ov-create-exercise .error')
            .classList
            .add('hidden-content')

        } catch (error) {
            document.querySelector('#ov-create-exercise .error')
            .classList
            .remove('hidden-content')
        }
    }
}

/*=============================== APP ===============================*/

const ExApp = {
    init() {
        // console.log(Exercises.caloryBurn());
        Exercises.all.forEach((exercise, index) => {
            EXDOM.addRegister(exercise, index)
        })

        NewExercises.all.forEach((exercise, index) => {
            NEDOM.createExercise(exercise, index)
        })

        EXDOM.updateStats()

        StorageRegister.set(Exercises.all)
        StorageExercise.set(NewExercises.all)
    
        NewExercises.all = StorageExercise.get()
    },

    reload() {
        EXDOM.clearExercises()
        NEDOM.clearExercises()

        ExApp.init()
    }
}

ExApp.init()