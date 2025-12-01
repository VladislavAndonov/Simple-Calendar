let date = new Date();;

let [activeDate, activeMonth, activeYear] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
]

const monthsDict = {
    0: ["January", 31],
    1: ["February", 28],
    2: ["March", 31],
    3: ["April", 30],
    4: ["May", 31],
    5: ["June", 30],
    6: ["July", 31],
    7: ["August", 31],
    8: ["September", 30],
    9: ["October", 31],
    10: ["November", 30],
    11: ["December", 31]
}

let activeMonthLength = monthsDict[activeMonth][1]
let activeMonthName = monthsDict[activeMonth][0]

const getFirstWeekday = () => {
    let firstWeekday = new Date(`1, ${activeMonthName}, ${activeYear}`).getDay();
    if (firstWeekday == 0) {
        firstWeekday = 7
    }

    return firstWeekday
}

getFirstWeekday()

const checkLeapYear = () => {
    if (activeYear % 400 == 0) {
        return true
    } else if (activeYear % 100 == 0) {
        return false
    } else if (activeYear % 4 == 0) {
        return true
    }

    return false
}


// Why does we use such type of functions instead of regular
const renderMonth = () => {
    document.querySelector(".display-month p").textContent = `${activeMonthName} ${activeYear}`
}


renderMonth()


const updateDate = () => {
    getFirstWeekday()
    date.setMonth(activeMonth)
    date.setFullYear(activeYear)

    activeMonthLength = monthsDict[activeMonth][1]
    activeMonthName = monthsDict[activeMonth][0]

    if (activeMonth == 1 && checkLeapYear()) {
        activeMonthLength = 29
    }
}

const showPrevMonth = () => {
    const prevArrow = document.querySelector(".prev")
    prevArrow.addEventListener(onclick, (() => {
        activeMonth = --activeMonth


        if (activeMonth < 0) {
            activeMonth = 11;
            activeYear = --activeYear;
        }

        updateDate()
        renderMonth()
        renderDates()

    })());
}

const showNextMonth = () => {
    const nextArrow = document.querySelector(".next")
    nextArrow.addEventListener(onclick, (() => {
        activeMonth = ++activeMonth

        if (activeMonth > 11) {
            activeMonth = 0;
            activeYear = ++activeYear;
        }

        updateDate()
        renderMonth()
        renderDates()

    })());
};


const renderDates = () => {
    for (let i = 1; i <= 42; i++) {

        if (i < getFirstWeekday() || i > activeMonthLength) {
            let dateCell = document.querySelector(`.grid-item-${i} p`)
            dateCell.textContent = "";

        } else {
            let date = 1
            for (let k = 1; k <= activeMonthLength; k++) {
                let dateCell = document.querySelector(`.grid-item-${i} p`)
                dateCell.textContent = date

                if (k >= activeMonthLength) {
                    break
                }

                date++;
                i++;
            }
            date = 1;
        }
    }

}

renderDates()