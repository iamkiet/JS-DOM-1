window.onload = function () {

    addOptionTag('month')
    addOptionTag('day')
    addOptionTag('year')

    Array.from(studentArr).forEach(function(s){
        createTable(s.id, s.name, s.sex, s.dob, s.courses);
    })
}
// -- CREATE STUDENT OBJECT
var student = function(_id, _name, _sex, _dob, _courses){
    this.id = _id,
    this.name = _name,
    this.sex = _sex,
    this.dob = _dob,
    this.courses = _courses
}
// -- STATIC STUDENT COURSES ARRAY
var courseStudentArr = [
    ['Object Oriented Programming', 'Applied Mathematics'],
    ['Software Testing'],
    ['Object Oriented Programming', 'Applied Mathematics', 'Software Testing'],
    ['Artificial Intelligence', 'Machine Learning']
]

// -- STATIC STUDENT ARRAY 
var studentArr = [
    new student('1500001', 'Linus Torvalds', 'Men', '26/03/1985', courseStudentArr[0]),
    new student('1500023', '​James Gosling', 'Men', '02/12/1975', courseStudentArr[1]),
    new student('1500016', 'Jade Raymond', 'Women', '05/04/1995', courseStudentArr[2]),
    new student('1500429', 'Bjarne Stroustrup', 'Men', '05/04/1965', courseStudentArr[3]),
]

// -- GET ELEMENT
var leftCourses = document.querySelector('#leftCourses');
var rightCourses = document.querySelector('#rightCourses');
var leftCoursesArr = document.querySelectorAll('#leftCourses div');
var rightCoursesArr = document.querySelectorAll('#rightCourses div');
var rowClass = document.querySelectorAll('#personal-info .row');
var inputTexts = document.querySelectorAll('input[type="text"]');


// -- ADD EVENT
// PERSONAL-INFO ROW CLASS
Array.from(rowClass).forEach(function(row){
    row.addEventListener('mouseover', addTooltip);
    row.addEventListener('mouseout', removeTooltip);
    row.addEventListener('keydown', removeTooltip);
    
})
Array.from(inputTexts).forEach(function(inputText){
    inputText.addEventListener('change', isNotNull);
    inputText.addEventListener('change', addAsterik);
})

// -- SORT RESULT
document.getElementById('s-id').addEventListener('click', sortEvent);
document.getElementById('s-name').addEventListener('click', sortEvent);
document.getElementById('s-sex').addEventListener('click', sortEvent);
document.getElementById('s-dob').addEventListener('click', sortEvent);

// ------------------------- FUNCTION ------------------------- //

function addOptionTag(selectId) {
    var i=0;
    var count = 0;
    var option;
    var optionId;
    var select = document.getElementById(selectId);

    switch (selectId) {
        
        case 'month':
            i = 1;
            count = 12;
            break;
        case 'day':
            i = 1;
            count = 31;
            break;
        case 'year':
            i = 1950;
            count = (new Date()).getFullYear();
            break;
    }

    for(i; i <= count; i++)
    {
        option = document.createElement('option');
        optionId = 'day-option-' + i;
        option.setAttribute('id', optionId);
        option.setAttribute('class', 'day-items');
        if(i < 10){
            option.innerHTML = '0' + i;
        }else{
            option.innerHTML = i;
        }
        select.appendChild(option);
    }
}
function createTable(_id, _name, _sex, _dob, _courses){
    var id = document.createElement('div');
    var name = document.createElement('div');
    var sex = document.createElement('div');
    var dob = document.createElement('div');
    var courses = document.createElement('div');

    
    id.setAttribute('class', 'item');
    name.setAttribute('class', 'item');
    sex.setAttribute('class', 'item');
    dob.setAttribute('class', 'item');
    courses.setAttribute('class', 'item');

    
    // alert(_courses.length);
    Array.from(_courses).forEach(function(courseName){
        var course = document.createElement('div');
        course.setAttribute('class', 'sub-item');
        course.innerHTML = '● ' + courseName;
        // i++;
        courses.appendChild(course);
    })


    id.innerHTML = _id;
    name.innerHTML = _name;
    sex.innerHTML = _sex;
    dob.innerHTML = _dob;
    // courses.innerHTML = _courses;
    
    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(sex);
    row.appendChild(dob);
    row.appendChild(courses);

    var result = document.querySelector('#result-list');
    result.appendChild(row);
}

function addTooltip(){
    var tooltip = this.lastChild;
    tooltip.setAttribute('style', 'display: block');
}
function removeTooltip(){
    var tooltip = this.lastChild;
    tooltip.setAttribute('style', 'display: none');
}


// --  TRANSFORM BETWEEN COURSES
function sendCourse(type, mode){
    var course;
    var deCourse;
    // 0 - left
    if(type === 0){
        course = leftCourses;
        deCourse = rightCourses;
    }else{
        course = rightCourses;
        deCourse = leftCourses;
    }
    switch (mode) {
        case 'single':
            if(course.innerHTML === ''){
                alert('Not any course in here!');
            }else{
                var flag = 0;
                Array.from(leftCoursesArr).forEach(function(c){
                    if(c.hasAttribute('style')){
                        var id = c.getAttribute('id'); 
                        var textContent = c.textContent;
                        var temp = document.getElementById(id);
                        temp.removeAttribute('style');
                        deCourse.appendChild(temp);
                        flag = 1;
                    }
                })
                if(flag === 0){
                    alert('You didn\'t choose any course!');
                }
            }
            break;
        case 'multi':
            if(course.innerHTML === ''){
                alert('You didn\'t choose any course!');
            }else{
                Array.from(leftCoursesArr).forEach(function(c){
                    var id = c.getAttribute('id'); 
                    var textContent = c.textContent;
                    var temp = document.getElementById(id);
                    temp.removeAttribute('style');
                    deCourse.appendChild(temp);
                })
                course.innerHTML = '';
            }
            break;
    }

    
}

function changeBgWhenSelected(e){
    if(e.hasAttribute('style')){        
        e.removeAttribute('style');
    }
    else{
        e.setAttribute('style', 'background: #232323; color: #fff');
    }
}
function getCoursesSelected(){
    var courses = [];
    var rightCoursesArr = document.querySelectorAll('#rightCourses div');
    Array.from(rightCoursesArr).forEach(function(c){
        courses.push(c.textContent);
    })
    return courses;
}


// -- HANDLING FORM
var registerForm = document.forms['register'];

// CHECK INPUT TEXT VALUE IS NULL
function isNull(e){
    if(e.value === ''){
        e.setAttribute('style', 'border-bottom: 3px solid #ED1A52');
        return 1;
    }
    return 0;
}
function isNotNull(){
    this.setAttribute('style', 'border-bottom: 1px solid #232323');
}
// VALIDATE INPUT TEXT VALUE
function validEmail(e){
    
    if(e.value.indexOf('@gmail.com') > -1 || e.value.indexOf('@yahoo.com') > -1){
        return 1;
    }
    return 0;
}

function validNumber(e, limit){
    if(!isNaN(e.value) && e.value.length <= limit){
        return 1;
    }
    return 0;
}

// ADD ASTERTK WHEN VALIDATE VALUE
function addAsterik(){
    var thisId = this.getAttribute('id');
    var asterik = this.nextSibling.nextSibling.nextSibling.nextSibling;
    flag = 0;
    switch (thisId) {
        case 'id':
            if(!validNumber(this, 7)){
                asterik.setAttribute('style', 'display: block');
                flag = 1;
            }else{
                asterik.setAttribute('style', 'display: none');
            }
            break;
        case 'mail':
            if(!validEmail(this)){
                asterik.setAttribute('style', 'display: block');
                flag = 1;
            }else{
                asterik.setAttribute('style', 'display: none');
            }
            break;
        case 'phone':
            if(!validNumber(this, 11)){
                asterik.setAttribute('style', 'display: block');
                flag = 1;
            }else{
                asterik.setAttribute('style', 'display: none');
            }
            break;
    }
    if(flag != 0){
        alert('Invalid this field!');
    }
}

registerForm.addEventListener('submit', function(e){
    
    e.preventDefault(); 

    var id = registerForm.querySelector('#id');
    var fullname = registerForm.querySelector('#fullname');
    var address = registerForm.querySelector('#address');
    var phone = registerForm.querySelector('#phone');
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var year = document.getElementById('year').value;
    var email = registerForm.querySelector('#mail');
    var sex = registerForm.querySelectorAll('input[type="radio"]');
    var sexValue;
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].type === 'radio' && sex[i].checked) {
            sexValue = sex[i].value;       
        }
    }
    isNull(id);
    isNull(fullname);
    isNull(address);
    isNull(phone);
    isNull(email);
    if(isNull(id) || isNull(fullname) || isNull(address) || isNull(phone) || isNull(email)){
        alert('Please fill out this field!');
    }
    else{
        var dayOfBirth = day + '/' + month + '/' + year;
        var temp = new student(id.value, fullname.value, sexValue, dayOfBirth, getCoursesSelected());
        studentArr.push(temp);
        createTable(id.value, fullname.value, sexValue, dayOfBirth, getCoursesSelected());

        // -- RESET VALUE AFTER SUBMIT
        registerForm.reset();
        Array.from(leftCoursesArr).forEach(function(c){
            var id = c.getAttribute('id'); 
            var textContent = c.textContent;
            var temp = document.getElementById(id);
            temp.removeAttribute('style');
            leftCourses.appendChild(temp);
        })
        rightCourses.innerHTML = '';
    }
})


// - SORTING - click title event
function sort(col, type){
    var result = document.querySelector('#result-list');
    result.innerHTML = '';
    switch (type) {
        case '+':
            studentArr.sort(function(a, b){
                if(col === 's-id'){
                    return a.id - b.id;
                }else if(col === 's-name'){
                    return a.name > b.name;
                }else if(col === 's-sex'){
                    return a.sex > b.sex;
                }else{
                    return a.dob > b.dob;
                }
            })
            break;
        case '-':
            studentArr.sort(function(a, b){
                if(col === 's-id'){
                    return b.id - a.id;
                }else if(col === 's-name'){
                    return b.name > a.name;
                }else if(col === 's-sex'){
                    return b.sex > a.sex;
                }else{
                    return b.dob > a.dob;
                }
            })
            break;
    }
}
function sortEvent(){
    var colId = this.getAttribute('id');
    if (this.classList.contains('des')){
        sort(colId, "-");
        this.classList.remove('des');
        this.classList.add('asc');
    }else{
        sort(colId, "+");
        this.classList.remove('asc');
        this.classList.add('des');
    }
    Array.from(studentArr).forEach(function(s){
        createTable(s.id, s.name, s.sex, s.dob, s.courses);
    })
}