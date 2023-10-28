class NepaliDatePicker{constructor(config){this.today=new Date,this.currentYear=this.today.getFullYear(),this.currentMonth=this.today.getMonth(),this.currentDay=this.today.getDate(),this.triggerDataAttributeLabel="data-nepali-date-picker",this.options={format:"YYYY-MM-DD",closeOnDateSelect:!0,disableAfterToday:!1,disableBeforeToday:!1,markHolidays:!0,holidays:["Saturday"],indicateCurrentDate:!0,setCurrentDate:!1,position:"left",daysFormat:"dd",locale:"np",theme:"flat"},"object"==typeof config&&(this.options={...this.options,...config}),this.dynamicClassValues={trGap:"ap-gap",trAndTdWidth:"ddd"===this.options.daysFormat?"np"===this.options.locale?"ap-width-np-ddd":"ap-width-ddd":"ap-width-tr-td",position:this.getPositionClasses()},this.init()}init(){this.setCurrentDate(),this.setupTriggers(),this.setupOpeners(),this.setupClosers()}setCurrentDate(){var{year,month,date}=this.convertToNepaliDate(this.currentYear,this.currentMonth+1,this.currentDay);this.currentYear=+year,this.currentMonth=+month,this.currentDay=+date}setupTriggers(){this.setupInputTriggers(),this.setupInputFieldConfiguration(),this.setupCellButtonClickTriggers()}setupInputFieldConfiguration(){}setupCellButtonClickTriggers(){document.addEventListener("click",event=>{if(event.preventDefault(),event.target.classList.contains("ap-cell-button")){document.querySelectorAll(".ap-cell-button");const parentTable=event.target.closest("table"),apCells=parentTable.querySelectorAll(".ap-cell-button");apCells.forEach(function(apCell){apCell&&"selected".split(" ").forEach(className=>apCell.classList.remove(className))}),"selected".split(" ").forEach(className=>event.target.classList.add(className));var currentYear=parseInt(event.target.closest(".ap-card").querySelector(".ap-calendar-year").value),showMonth=parseInt(event.target.closest(".ap-card").querySelector(".ap-calendar-month").value)+1,value=this.decodeUnicodeToEnglishText(event.target.textContent),showMonth=("0"+showMonth).slice(-2),value=("0"+value).slice(-2),value=this.getFormattedDate(currentYear,showMonth,value);let apCalendar=event.target.closest(".ap-card").previousElementSibling;if(apCalendar&&(apCalendar.value=value),this.options.closeOnDateSelect){const apCards=document.querySelectorAll(".ap-card");apCards.forEach(function(apCard){apCard.style.display="none"})}}})}setupInputTriggers(){const triggers=document.querySelectorAll(`[${this.triggerDataAttributeLabel}]`);0<triggers.length&&triggers.forEach(trigger=>{this.options.setCurrentDate&&(trigger.value=this.getFormattedDate(this.currentYear,this.currentMonth+1,this.currentDay)),trigger.hasAttribute("placeholder")||trigger.setAttribute("placeholder",this.options.format),trigger.addEventListener("click",event=>{event.preventDefault();const nextSibling=event.target.nextElementSibling;nextSibling&&nextSibling.classList.contains("ap-card")||this.setupDatePickers({pickerId:event.target.getAttribute(this.triggerDataAttributeLabel)})})})}setupOpeners(){document.addEventListener("click",function(targetDataNepaliDatePickerValue){if(targetDataNepaliDatePickerValue.target.classList.contains("ap-calendar")){const nextSibling=targetDataNepaliDatePickerValue.target.nextElementSibling,nextSiblingClasses=nextSibling.classList,parentElement=targetDataNepaliDatePickerValue.target.parentElement;parentElement.style.position="relative";targetDataNepaliDatePickerValue=targetDataNepaliDatePickerValue.target.getAttribute("data-nepali-date-picker");const apCards=document.querySelectorAll(".ap-card");apCards.forEach(function(apCard){apCard.style.display="none"}),nextSibling&&nextSiblingClasses.contains("ap-calendar-"+targetDataNepaliDatePickerValue)&&(nextSibling.style.display="block")}})}setupClosers(){document.addEventListener("click",function(e){if(!e.target.matches(".ap-calendar, .ap-card, .ap-card *")){const apCards=document.querySelectorAll(".ap-card");apCards.forEach(function(apCard){apCard.style.display="none"})}})}setupDatePickers({pickerId}){const inputField=document.querySelector(`[${this.triggerDataAttributeLabel}="${pickerId}"]`);inputField.classList.add("ap-calendar");var themeClass=this.getThemeClasses(),previousButton=`
            <button type="button" class="btn-previous ap-header__button ${themeClass}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"></path>
                </svg>
            </button>
        `,nextButton=`
            <button type="button" class="btn-next ap-header__button ${themeClass}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
                </svg>
            </button>
        `,appendData=this.getDaysHeaderList(),monthsOptionList=this.getMonthsOptionList(),yearsOptionList=this.getYearsOptionList(),appendData=`
            <div class="ap-card ap-calendar-${pickerId} ${this.dynamicClassValues.position}">
                <div class="ap-header">
                    <div class="ap-header-wrapper">
                        ${previousButton}
                        <div class="ap-header__selects">
                            <select class="ap-calendar-month month-${pickerId} ap-header__select month-input ${themeClass}">
                                ${monthsOptionList}
                            </select>
                            <select class="ap-calendar-year year-${pickerId} ap-header__select year-input ${themeClass}">
                                ${yearsOptionList}
                            </select>
                        </div>
                        ${nextButton}
                    </div>
                </div>
                <table class="ap-table" id="calendar">
                    <thead>
                        <tr class="ap-table__thead__tr ${this.dynamicClassValues.trGap}">
                            ${appendData}
                        </tr>
                    </thead>
                    <tbody class="calendar-body ap-table__tbody">
                    </tbody>
                </table>
            </div>
        `;inputField.insertAdjacentHTML("afterend",appendData),this.initializeCalendar(inputField,this.currentMonth,this.currentYear),this.initializeDatePickerButtonsEventListeners(inputField)}initializeDatePickerButtonsEventListeners(inputField){const nextButton=inputField.nextElementSibling.querySelector(".btn-next"),previousButton=inputField.nextElementSibling.querySelector(".btn-previous");var selectedYear=inputField.nextElementSibling.querySelector(".ap-calendar-year"),selectedMonth=inputField.nextElementSibling.querySelector(".ap-calendar-month");let year=parseInt(selectedYear.value),month=parseInt(selectedMonth.value);nextButton.addEventListener("click",event=>{event.preventDefault(),year=11===month?year+1:year,month=(month+1)%12,this.initializeCalendar(inputField,month,year)}),previousButton.addEventListener("click",event=>{event.preventDefault(),year=0===month?year-1:year,month=0===month?11:month-1,this.initializeCalendar(inputField,month,year)})}initializeCalendar(inputField,month,year){const nextSibling=inputField.nextElementSibling;let calenderCard=void 0;if(nextSibling&&nextSibling.classList.contains("ap-card")&&(calenderCard=nextSibling),calenderCard&&void 0!==this.getNepaliDates()[year]){var firstDay=this.getNepaliDates()[year][1][month]-1,nepaliDatePickerDataAttribute=inputField.getAttribute(this.triggerDataAttributeLabel);calenderCard=document.querySelector(".ap-calendar-"+nepaliDatePickerDataAttribute);const tableDOM=calenderCard.querySelector(".calendar-body"),selectedYear=calenderCard.querySelector(".ap-calendar-year"),selectedMonth=calenderCard.querySelector(".ap-calendar-month");selectedYear.addEventListener("change",event=>{this.initializeCalendar(inputField,month,event.target.value)}),selectedMonth.addEventListener("change",event=>{this.initializeCalendar(inputField,event.target.value,year)}),selectedYear.value=year,selectedMonth.value=month;var themeClasses=this.getThemeClasses();if(tableDOM)for(;tableDOM.firstChild;)tableDOM.removeChild(tableDOM.firstChild);let date=1;for(let i=0;i<6;i++){const row=document.createElement("tr");row.classList.add("ap-table__tbody__tr");const holidayIndices=this.options.markHolidays&&this.options.holidays.map(selectedHoliday=>this.getDaysInNepali().findIndex(dayInNepali=>dayInNepali.day.toLowerCase()===selectedHoliday.toLowerCase()));for(let j=0;j<7;j++){var nepaliDate=holidayIndices&&holidayIndices.includes(j)?"holiday-marker-color":null;if(0===i&&j<firstDay){const cell=document.createElement("td");cell.classList.add("ap-table__thead__tr_td",this.dynamicClassValues.trAndTdWidth,"ap-cell",nepaliDate);const cellButton=document.createElement("button");cellButton.classList.add("no-hover"),cellButton.classList.remove("ap-cell-button"),cellButton.appendChild(document.createTextNode("")),cell.appendChild(cellButton),row.append(cell)}else{if(date>this.getDaysInMonth(month,year))break;const cell=document.createElement("td");cell.classList.add("ap-table__thead__tr_td",this.dynamicClassValues.trAndTdWidth,"ap-cell",nepaliDate);const cellButton=document.createElement("button");cellButton.classList.add("ap-cell-button",themeClasses),this.options.indicateCurrentDate&&date===parseInt(this.currentDay)&&year===parseInt(this.currentYear)&&month===parseInt(this.currentMonth)&&(cell.classList.add("active"),cellButton.classList.add("bordered-dashed"));nepaliDate="np"===this.options.locale?this.unicodeText(date):date;cellButton.appendChild(document.createTextNode(nepaliDate)),cell.appendChild(cellButton),row.append(cell),date++}}tableDOM.append(row)}}}triggerYearOrMonthChange(select){const card=select.closest(".ap-card");console.log(card,card.querySelector(".ap-calendar-year").value)}getYearsOptionList(){return Array.from({length:91},(_,index)=>{return`<option value="${index+2e3}">${"np"===this.options.locale?this.unicodeText(index+2e3):index+2e3}</option>`}).join("")}getDaysHeaderList(){return this.getDaysInNepali().map(day=>{return`<th class="ap-table__thead__tr_th ${this.options.markHolidays&&this.options.holidays.includes(day.day)?this.dynamicClassValues.trAndTdWidth+" holiday-marker-color":""+this.dynamicClassValues.trAndTdWidth}">${day[this.options.locale][this.options.daysFormat]}</th>`}).join("")}getMonthsOptionList(){return this.getMonthsInNepali().map((month,index)=>`<option value="${index}">${month[this.options.locale]}</option>`).join("")}closeDatePicker(){console.log("close date picker")}getMonthsInNepali(){return[{en:"Baishak",np:"बैशाख"},{en:"Jestha",np:"जेठ"},{en:"Ashad",np:"असार"},{en:"Shrawn",np:"साउन"},{en:"Bhadra",np:"भदौ"},{en:"Ashwin",np:"असोज"},{en:"Kartik",np:"कार्तिक"},{en:"Mangshir",np:"मंसिर"},{en:"Poush",np:"पुष"},{en:"Magh",np:"माघ"},{en:"Falgun",np:"फाल्गुन"},{en:"Chaitra",np:"चैत्र"}]}getLeapMonths(){return[31,29,31,30,31,30,31,31,30,31,30,31]}getNormalMonths(){return[31,28,31,30,31,30,31,31,30,31,30,31]}getNepaliDates(){return{2e3:[[30,32,31,32,31,30,30,30,29,30,29,31],[4,6,3,6,3,6,1,3,5,6,1,2]],2001:[[31,31,32,31,31,31,30,29,30,29,30,30],[5,1,4,1,4,7,3,5,6,1,2,4]],2002:[[31,31,32,32,31,30,30,29,30,29,30,30],[6,2,5,2,6,2,4,6,7,2,3,5]],2003:[[31,32,31,32,31,30,30,30,29,29,30,31],[7,3,7,3,7,3,5,7,2,3,4,6]],2004:[[30,32,31,32,31,30,30,30,29,30,29,31],[2,4,1,4,1,4,6,1,3,4,6,7]],2005:[[31,31,32,31,31,31,30,29,30,29,30,30],[3,6,2,6,2,5,1,3,4,6,7,2]],2006:[[31,31,32,32,31,30,30,29,30,29,30,30],[4,7,3,7,4,7,2,4,5,7,1,3]],2007:[[31,32,31,32,31,30,30,30,29,29,30,31],[5,1,5,1,5,1,3,5,7,1,2,4]],2008:[[31,31,31,32,31,31,29,30,30,29,29,31],[7,3,6,2,6,2,5,6,1,3,4,5]],2009:[[31,31,32,31,31,31,30,29,30,29,30,30],[1,4,7,4,7,3,6,1,2,4,5,7]],2010:[[31,31,32,32,31,30,30,29,30,29,30,30],[2,5,1,5,2,5,7,2,3,5,6,1]],2011:[[31,32,31,32,31,30,30,30,29,29,30,31],[3,6,3,6,3,6,1,3,5,6,7,2]],2012:[[31,31,31,32,31,31,29,30,30,29,30,30],[5,1,4,7,4,7,3,4,6,1,2,4]],2013:[[31,31,32,31,31,31,30,29,30,29,30,30],[6,2,5,2,5,1,4,6,7,2,3,5]],2014:[[31,31,32,32,31,30,30,29,30,29,30,30],[7,3,6,3,7,3,5,7,1,3,4,6]],2015:[[31,32,31,32,31,30,30,30,29,29,30,31],[1,4,1,4,1,4,6,1,3,4,5,7]],2016:[[31,31,31,32,31,31,29,30,30,29,30,30],[3,6,2,5,2,5,1,2,4,6,7,2]],2017:[[31,31,32,31,31,31,30,29,30,29,30,30],[4,7,3,7,3,6,2,4,5,7,1,3]],2018:[[31,32,31,32,31,30,30,29,30,29,30,30],[5,1,5,1,5,1,3,5,6,1,2,4]],2019:[[31,32,31,32,31,30,30,30,29,30,29,31],[6,2,6,2,6,2,4,6,1,2,4,5]],2020:[[31,31,31,32,31,31,30,29,30,29,30,30],[1,4,7,3,7,3,6,1,2,4,5,7]],2021:[[31,31,32,31,31,31,30,29,30,29,30,30],[2,5,1,5,1,4,7,2,3,5,6,1]],2022:[[31,32,31,32,31,30,30,30,29,29,30,30],[3,6,3,6,3,6,1,3,5,6,7,2]],2023:[[31,32,31,32,31,30,30,30,29,30,29,31],[4,7,4,7,4,7,2,4,6,7,2,3]],2024:[[31,31,31,32,31,31,30,29,30,29,30,30],[6,2,5,1,5,1,4,6,7,2,3,5]],2025:[[31,31,32,31,31,31,30,29,30,29,30,30],[7,3,6,3,6,2,5,7,1,3,4,6]],2026:[[31,32,31,32,31,30,30,30,29,29,30,31],[1,4,1,4,1,4,6,1,3,4,5,7]],2027:[[30,32,31,32,31,30,30,30,29,30,29,31],[3,5,2,5,2,5,7,2,4,5,7,1]],2028:[[31,31,32,31,31,31,30,29,30,29,30,30],[4,7,3,7,3,6,2,4,5,7,1,3]],2029:[[31,31,32,31,32,30,30,29,30,29,30,30],[5,1,4,1,4,1,3,5,6,1,2,4]],2030:[[31,32,31,32,31,30,30,30,29,29,30,31],[6,2,6,2,6,2,4,6,1,2,3,5]],2031:[[30,32,31,32,31,30,30,30,29,30,29,31],[1,3,7,3,7,3,5,7,2,3,5,6]],2032:[[31,31,32,31,31,31,30,29,30,29,30,30],[2,5,1,5,1,4,7,2,3,5,6,1]],2033:[[31,31,32,32,31,30,30,29,30,29,30,30],[3,6,2,6,3,6,1,3,4,6,7,2]],2034:[[31,32,31,32,31,30,30,30,29,29,30,31],[4,7,4,7,4,7,2,4,6,7,1,3]],2035:[[30,32,31,32,31,31,29,30,30,29,29,31],[6,1,5,1,5,1,4,5,7,2,3,4]],2036:[[31,31,32,31,31,31,30,29,30,29,30,30],[7,3,6,3,6,2,5,7,1,3,4,6]],2037:[[31,31,32,32,31,30,30,29,30,29,30,30],[1,4,7,4,1,4,6,1,2,4,5,7]],2038:[[31,32,31,32,31,30,30,30,29,29,30,31],[2,5,2,5,2,5,7,2,4,5,6,1]],2039:[[31,31,31,32,31,31,29,30,30,29,30,30],[4,7,3,6,3,6,2,3,5,7,1,3]],2040:[[31,31,32,31,31,31,30,29,30,29,30,30],[5,1,4,1,4,7,3,5,6,1,2,4]],2041:[[31,31,32,32,31,30,30,29,30,29,30,30],[6,2,5,2,6,2,4,6,7,2,3,5]],2042:[[31,32,31,32,31,30,30,30,29,29,30,31],[7,3,7,3,7,3,5,7,2,3,4,6]],2043:[[31,31,31,32,31,31,29,30,30,29,30,30],[2,5,1,4,1,4,7,1,3,5,6,1]],2044:[[31,31,32,31,31,31,30,29,30,29,30,30],[3,6,2,6,2,5,1,3,4,6,7,2]],2045:[[31,32,31,32,31,30,30,29,30,29,30,30],[4,7,4,7,4,7,2,4,5,7,1,3]],2046:[[31,32,31,32,31,30,30,30,29,29,30,31],[5,1,5,1,5,1,3,5,7,1,2,4]],2047:[[31,31,31,32,31,31,30,29,30,29,30,30],[7,3,6,2,6,2,5,7,1,3,4,6]],2048:[[31,31,32,31,31,31,30,29,30,29,30,30],[1,4,7,4,7,3,6,1,2,4,5,7]],2049:[[31,32,31,32,31,30,30,30,29,29,30,30],[2,5,2,5,2,5,7,2,4,5,6,1]],2050:[[31,32,31,32,31,30,30,30,29,30,29,31],[3,6,3,6,3,6,1,3,5,6,1,2]],2051:[[31,31,31,32,31,31,30,29,30,29,30,30],[5,1,4,7,4,7,3,5,6,1,2,4]],2052:[[31,31,32,31,31,31,30,29,30,29,30,30],[6,2,5,2,5,1,4,6,7,2,3,5]],2053:[[31,32,31,32,31,30,30,30,29,29,30,30],[7,3,7,3,7,3,5,7,2,3,4,6]],2054:[[31,32,31,32,31,30,30,30,29,30,29,31],[1,4,1,4,1,4,6,1,3,4,6,7]],2055:[[31,31,32,31,31,31,30,29,30,29,30,30],[3,6,2,6,2,5,1,3,4,6,7,2]],2056:[[31,31,32,31,32,30,30,29,30,29,30,30],[4,7,3,7,3,7,2,4,5,7,1,3]],2057:[[31,32,31,32,31,30,30,30,29,29,30,31],[5,1,5,1,5,1,3,5,7,1,2,4]],2058:[[30,32,31,32,31,30,30,30,29,30,29,31],[7,2,6,2,6,2,4,6,1,2,4,5]],2059:[[31,31,32,31,31,31,30,29,30,29,30,30],[1,4,7,4,7,3,6,1,2,4,5,7]],2060:[[31,31,32,32,31,30,30,29,30,29,30,30],[2,5,1,5,2,5,7,2,3,5,6,1]],2061:[[31,32,31,32,31,30,30,30,29,29,30,31],[3,6,3,6,3,6,1,3,5,6,7,2]],2062:[[30,32,31,32,31,31,29,30,29,30,29,31],[5,7,4,7,4,7,3,4,6,7,2,3]],2063:[[31,31,32,31,31,31,30,29,30,29,30,30],[6,2,5,2,5,1,4,6,7,2,3,5]],2064:[[31,31,32,32,31,30,30,29,30,29,30,30],[7,3,6,3,7,3,5,7,1,3,4,6]],2065:[[31,32,31,32,31,30,30,30,29,29,30,31],[1,4,1,4,1,4,6,1,3,4,5,7]],2066:[[31,31,31,32,31,31,29,30,30,29,29,31],[3,6,2,5,2,5,1,2,4,6,7,1]],2067:[[31,31,32,31,31,31,30,29,30,29,30,30],[4,7,3,7,3,6,2,4,5,7,1,3]],2068:[[31,31,32,32,31,30,30,29,30,29,30,30],[5,1,4,1,5,1,3,5,6,1,2,4]],2069:[[31,32,31,32,31,30,30,30,29,29,30,31],[6,2,6,2,6,2,4,6,1,2,3,5]],2070:[[31,31,31,32,31,31,29,30,30,29,30,30],[1,4,7,3,7,3,6,7,2,4,5,7]],2071:[[31,31,32,31,31,31,30,29,30,29,30,30],[2,5,1,5,1,4,7,2,3,5,6,1]],2072:[[31,32,31,32,31,30,30,29,30,29,30,30],[3,6,3,6,3,6,1,3,4,6,7,2]],2073:[[31,32,31,32,31,30,30,30,29,29,30,31],[4,7,4,7,4,7,2,4,6,7,1,3]],2074:[[31,31,31,32,31,31,30,29,30,29,30,30],[6,2,5,1,5,1,4,6,7,2,3,5]],2075:[[31,31,32,31,31,31,30,29,30,29,30,30],[7,3,6,3,6,2,5,7,1,3,4,6]],2076:[[31,32,31,32,31,30,30,30,29,29,30,30],[1,4,1,4,1,4,6,1,3,4,5,7]],2077:[[31,32,31,32,31,30,30,30,29,30,29,31],[2,5,2,5,2,5,7,2,4,5,7,1]],2078:[[31,31,31,32,31,31,30,29,30,29,30,30],[4,7,3,6,3,6,2,4,5,7,1,3]],2079:[[31,31,32,31,31,31,30,29,30,29,30,30],[5,1,4,1,4,7,3,5,6,1,2,4]],2080:[[31,32,31,32,31,30,30,30,29,29,30,30],[6,2,6,2,6,2,4,6,1,2,3,5]],2081:[[31,31,32,32,31,30,30,30,29,30,30,30],[7,3,6,3,7,3,5,7,2,3,5,7]],2082:[[30,32,31,32,31,30,30,30,29,30,30,30],[2,4,1,4,1,4,6,1,3,4,6,1]],2083:[[31,31,32,31,31,30,30,30,29,30,30,30],[3,6,2,6,2,5,7,2,4,5,7,2]],2084:[[31,31,32,31,31,30,30,30,29,30,30,30],[4,7,3,7,3,6,1,3,5,6,1,3]],2085:[[31,32,31,32,30,31,30,30,29,30,30,30],[5,1,5,1,5,7,3,5,7,1,3,5]],2086:[[30,32,31,32,31,30,30,30,29,30,30,30],[7,2,6,2,6,2,4,6,1,2,4,6]],2087:[[31,31,32,31,31,31,30,30,29,30,30,30],[1,4,7,4,7,3,6,1,3,4,6,1]],2088:[[30,31,32,32,30,31,30,30,29,30,30,30],[3,5,1,5,2,4,7,2,4,5,7,2]],2089:[[30,32,31,32,31,30,30,30,29,30,30,30],[4,6,3,6,3,6,1,3,5,6,1,3]],2090:[[30,32,31,32,31,30,30,30,29,30,30,30],[5,7,4,7,4,7,2,4,6,7,2,4]]}}getDaysInNepali(){return[{day:"Sunday",en:{ddd:"Sunday",dd:"Sun",d:"S"},np:{ddd:"आइतबार",dd:"आइत",d:"आ"}},{day:"Monday",en:{ddd:"Monday",dd:"Mon",d:"M"},np:{ddd:"सोमबार",dd:"सोम",d:"सो"}},{day:"Tuesday",en:{ddd:"Tuesday",dd:"Tue",d:"T"},np:{ddd:"मंगलबार",dd:"मंगल",d:"मं"}},{day:"Wednesday",en:{ddd:"Wednesday",dd:"Wed",d:"W"},np:{ddd:"बुधबार",dd:"बुध",d:"बु"}},{day:"Thursday",en:{ddd:"Thursday",dd:"Thu",d:"T"},np:{ddd:"बिहिबार",dd:"बिहि",d:"बि"}},{day:"Friday",en:{ddd:"Friday",dd:"Fri",d:"F"},np:{ddd:"शुक्रबार",dd:"शुक्र",d:"शु"}},{day:"Saturday",en:{ddd:"Saturday",dd:"Sat",d:"S"},np:{ddd:"शनिबार",dd:"शनि",d:"श"}}]}getDaysInMonth(month,year){return this.getNepaliDates()[year][0][month]}unicodeText(text){const chars={0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९"};return text.toString().replace(/[0123456789]/g,m=>chars[m])}decodeUnicodeToEnglishText(text){const chars={"०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9"};return text.toString().replace(/[०१२३४५६७८९]/g,m=>chars[m])}getPositionClasses(){switch(this.options.position){case"left":default:return"ap-position-left";case"right":return"ap-position-right";case"center":return"ap-position-center"}}convertToNepaliDate(nepaliDate,nepaliYear,nepaliMonth){var nepaliDate=this.calculateTotalEnglishDays(nepaliDate=+nepaliDate,nepaliYear=+nepaliYear,nepaliMonth=+nepaliMonth),{nepaliYear,nepaliMonth,nepaliDate}=this.performCalculationBasedOnEnglishDays(nepaliDate);return{year:nepaliYear,month:nepaliMonth-1,date:nepaliDate}}calculateTotalEnglishDays(year,month,day){let totalEnglishDays=0;for(let i=0;i<year-1944;i++)if(this.isLeapYear(1944+i))for(let j=0;j<12;j++)totalEnglishDays+=this.getLeapMonths()[j];else for(let j=0;j<12;j++)totalEnglishDays+=this.getNormalMonths()[j];for(let i=0;i<month-1;i++)totalEnglishDays+=(this.isLeapYear(year)?this.getLeapMonths():this.getNormalMonths())[i];return totalEnglishDays+=day,totalEnglishDays}isLeapYear(year){return(year=+year)%100==0?year%400==0:year%4==0}performCalculationBasedOnEnglishDays(totalEnglishDays){totalEnglishDays=+totalEnglishDays;let i=0,j=9,nepaliYear=2e3,nepaliMonth=9,nepaliDay=16,dayOfWeek=6;for(;0!==totalEnglishDays;){var lastDayOfMonth=this.getNepaliDates()[nepaliYear][0][j-1];nepaliDay++,dayOfWeek++,nepaliDay>lastDayOfMonth&&(nepaliMonth++,nepaliDay=1,j++),7<dayOfWeek&&(dayOfWeek=1),12<nepaliMonth&&(nepaliYear++,nepaliMonth=1),12<j&&(j=1,i++),totalEnglishDays--}return{nepaliYear:nepaliYear,nepaliMonth:nepaliMonth,nepaliDate:nepaliDay}}getFormattedDate(year,month,day){var format=this.options.format;switch(month=("0"+month).slice(-2),day=("0"+day).slice(-2),format){case"YYYY/MM/DD":return year+`/${month}/`+day;case"YYYY.MM.DD":return year+`.${month}.`+day;case"DD-MM-YYYY":return day+`-${month}-`+year;case"DD/MM/YYYY":return day+`/${month}/`+year;case"DD.MM.YYYY":return day+`.${month}.`+year;default:return year+`-${month}-`+day}}getParsedDateFromFormattedDate(date,format){var dateParts=date.split(/[./-]/);switch(format){case"DD-MM-YYYY":case"DD/MM/YYYY":case"DD.MM.YYYY":return{year:parseInt(dateParts[2]),month:parseInt(dateParts[1]),day:parseInt(dateParts[0])};default:return{year:parseInt(dateParts[0]),month:parseInt(dateParts[1]),day:parseInt(dateParts[2])}}}getThemeClasses(){switch(this.options.theme){case"bordered":return"bordered-theme";case"soft":return"soft-theme";default:return"flat-theme"}}}module.exports=NepaliDatePicker;