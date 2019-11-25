function validate() {
    var name = document.student.name.value;
    var surname = document.student.surname.value;
    var email = document.student.email.value;
    var studyYear = document.student.studyYear.value;

    if (name.charAt(0) != 'A') {
        alert("Imię musi zaczynać się na literę A!");
        return false;
    }
    return true;
}