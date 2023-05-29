var grades = [
    65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.0, 81.43, 86.22, 88.33,
    9.03, 49.93, 52.34, 53.11, 50.1, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54,
    90.0, 71.11, 80.01,
  ];
  
  // Definition of grade levels in descending order
  let order = ["max", "A+","A","A-","B+","B","B-","C+","C","C-","D","F",];
  
  // Select all input fields for grade boundaries
  let LB_input = document.querySelectorAll(".LB_input");
  
  // Object to store the grade boundaries
  let bounds = {};
  
  // the counts Initialize count of each grade to 0
  const counts = {"A+": 0,"A": 0,"A-": 0,"B+": 0,"B": 0,"B-": 0,"C+": 0,"C": 0,"C-": 0,"D": 0,"F": 0,
  };
  
  var totalGrades = grades.length;
  
  // Function to update grade counts in each bound
  function updateCounts() {
    for (let grade in counts) {
      counts[grade] = 0;
    }
    grades.forEach((grade) => {
      if (grade === bounds["max"]) {
        counts["A+"]++;
      } 
      else {
        for (let i = order.length - 1; i >= 0; i--) {
          if (
            grade >= bounds[order[i]] &&
            (i == 0 || grade < bounds[order[i - 1]])
          ) {
            counts[order[i]]++;
            break;
          }
        }
      }
    });
  
    totalGrades = grades.length;
  
    // this loop Updates histogram based on updated counts
    for (let grade in counts) {
      if (grade != "max") {
        let count = counts[grade];
        let percent = (count / totalGrades) * 100;
        let histogramBar = document.querySelector(
          ".histogram-person.person-" +
            grade.replace("+", "plus").replace("-", "minus") +
            " span"
        );
        histogramBar.style.width = `${percent}%`;
        histogramBar.textContent = count.toString();
      }
    }
  }
  
  // check to see if all bounds are entered
  function allBoundsEntered() {
    for (let grade of order) {
      if (bounds[grade] === undefined) {
        return false;
      }
    }
    return true;
  }

  // event listener for the lower bounds inputs
  LB_input.forEach((input) => {
    input.addEventListener("input", function () {
        let newValue = parseFloat(this.value);

        let index = order.indexOf(this.id);

        let prevVal = bounds[order[index - 1]];
        let nextVal = bounds[order[index + 1]];

        //validation
        let isValid =
        (prevVal === undefined || newValue < prevVal) &&
        (nextVal === undefined || newValue > nextVal);

        let newGradeInput = document.querySelector('input[name="newGrade"]');

        if (isValid){
            this.style.borderColor = "initial";
            LB_input.forEach((otherInput) => {
                otherInput.disabled = false;
            });

            bounds[this.id] = newValue;
            updateCounts();

            if(allBoundsEntered()){
                newGradeInput.disabled = false;
            }
        }
        else{
            this.style.borderColor = "red";
            inputFields.forEach((otherInput) => {
                if (otherInput !== this) {
                otherInput.disabled = true;
                }
            });

            newGradeInput.disabled = true;
            window.alert("Bound Error!");
        }
    });
  });
  

  
  // function for adding new grade (listener for button)
  document
    .querySelector(".newGradeButton")
    .addEventListener("click", function (event) {
        event.preventDefault();

        let newGradeInput = document.querySelector('input[name="newGrade"]');

        if (newGradeInput.disabled) {
        window.alert("Enter all bounds first.");
        return;
        }

        let newGrade = parseFloat(newGradeInput.value);
        
        if(isNaN(newGrade) && newGrade <= bounds["F"] && newGrade >= bounds["max"]){
            window.alert("New Grade Error.");
        }
        else{
            grades.push(newGrade);
            updateCounts();
            newGradeInput.value = "";
        }
    });
  