## How to run ##

```npm install```

```npm test```

## Scenarios ##

"search_test" - test of Browser
Steps:
1. User enters home page address: http://rekruwut.pl/.
2. User inserts text "Prog" into the searchbox.
3. User cllcks the "Szukaj" button.
Result:
1. User sees the filtered list of job offers in which the position name contains text "Prog".

"login_no_password_test" - test of logging in without the login_no_password_test
Steps:
1. User enters page address: http://rekruwut.pl/login.
2. User enters his/her email: "kuba.pilach@gmail.com" in the "Email" field.
3. User leaves the "Hasło" field empty.
4. User clicks the "Zaloguj" button.
Result:
1. User sees an error message below the "Hasło" field: "Hasło jest wymagane".
2. User can't log in to his/her account without the password.

"password_match_error" - test of registration password values validation
Steps:
1. User enters page address: http://rekruwut.pl/register.
2. User enters his/her password: "JA18LaIor" in the "Hasło" field.
3. User enters his/her password with a typo: "JA19LaIor" in the "Potwierdź hasło" field .
4. User clicks the "Zarejestruj" button.
Result:
1. User sees an error message below the "Potwierdź hasło" field: "Hasła muszą się zgadzać".
2. User can't regstier when passwords doesn't match.

"logout_test" - test of logging out the logged User
Steps:
1. User enters page address: http://rekruwut.pl/login.
2. User enters his/her email: "kuba.pilach@gmail.com" in the "Email" field.
3. User enters his/her password: "JA18LaIor;" in the "Hasło" field.
4. User clicks the "Zaloguj" button.
5. User who's now logged in clicks the button "Wyloguj" in the upper right corner of the page.
Result:
1. User successfully logs out of the System.
2. User sees the option "Logowanie" that's used for logging in after his log out
Additional comments:
1. User can't see the "Logowanie" button while he's/she's logged in to the System

"cv_details_preview_test" - test for the CV generator
Steps:
1. User enters page address: http://rekruwut.pl/login.
2. User enters his/her email: "jakub.pilachowski@xle.pl" in the "Email" field.
3. User enters his/her password: "JA18LaIor;" in the "Hasło" field.
4. User clicks the "Zaloguj" button.
5. User enters page address: http://rekruwut.pl/my-cvs.
6. User inputs the text "testoweCV" in the "Nazwa CV..." field.
7. User clicks the "Stwórz nowe CV" button.
8. User click the "Dane ogólne" bookmark to unfold it.
9. User inputs text: "Gdańsk" in the "Miasto" field.
Results:
1. The form automatically saves the changes
2. In "Dane ogólne" bookmark there's text: "Gdańsk" in "Miasto" field

"changing_company_address_with_blank_field_test" - test for validation of empty city field
Steps:
1. Company user enters page address: http://rekruwut.pl/login.
2. Company user enters his/her email: "s17402@pjwstk.edu.pl" in the "Email" field.
3. Company user enters his/her password: "Rekruola12!" in the "Hasło" field.
4. Company user clicks the "Zaloguj" button.
5. Company user enters page address: http://rekruwut.pl/company.
6. Company user clicks the "Edytuj adres" button.
7. Company user deletes the input from the "Miasto" field.
8. Company user tries to save changes by clicking the "Edytuj adres" button.
Results:
1. Company user can't save the form without any input in the "Miasto" field.
2. Company user sees the error message: "Miasto jest wymagane" below the "Miasto" field

"changing_company_address_with_blank_field_test" - test of edition of company address
Steps:
1. Company user enters page address: http://rekruwut.pl/login.
2. Company user enters his/her email: "s17402@pjwstk.edu.pl" in the "Email" field.
3. Company user enters his/her password: "Rekruola12!" in the "Hasło" field.
4. Company user clicks the "Zaloguj" button.
5. Company user enters page address: http://rekruwut.pl/company.
6. Company user clicks the "Edytuj adres" button.
7. Company user deletes the input from the "Miasto" field.
8. Company user inputs text: "Gdynia" into the "Miasto" field.
9. Company user saves changes in the "Miasto" field by clicking the "Edytuj adres" button.
Reults:
1. Company user successfully saves changes done in the edit mode.
2. On the page http://rekruwut.pl/company company user sees that address was updated and in the city place.
3. "Gdańsk" in the address section was replaces by "Gdynia"

"adding_recruiter_test" - test of adding new recuiter
Steps:
1. Company user enters page address: http://rekruwut.pl/login.
2. Company user enters his/her email: "s17402@pjwstk.edu.pl" in the "Email" field.
3. Company user enters his/her password: "Rekruola12!" in the "Hasło" field.
4. Company user clicks the "Zaloguj" button.
5. Company user enters page address: http://rekruwut.pl/employess.
6. Company user clicks the "+" button responsible for new recruiter additions.
7. Company user inserts text: "Anna" in the "Imię" field.
8. Company user inserts text: "Kowalska" in the "Nazwisko" field.
9. Company user inserts email containing of "tk" + timestamp + "@rekruwut" in the "Email" field.
10. Company user inserts text: "Magaviera28!" in the "Hasło" field.
11. Company user inserts text: "Magaviera28!" in the "Potwierdź hasło" field.
12. Company user clicks the "Zapisz" button.
Results:
1. Company user successfully adds new recruiter.
2. Added user has the same personal data as the input.
Additional comments:
1. To avoid duplication of e-mails a function: addingAccountEmail = "tk" + timestamp + "@rekruwut.pl" was used

"editing_recruiter_test" - test of editing_recruiter_test recuiter
Steps:
1. Company user enters page address: http://rekruwut.pl/login.
2. Company user enters his/her email: "s17402@pjwstk.edu.pl" in the "Email" field.
3. Company user enters his/her password: "Rekruola12!" in the "Hasło" field.
4. Company user clicks the "Zaloguj" button.
5. Company user enters page address: http://rekruwut.pl/employess.
6. Company user clicks the button with pencil icon responsible for recruiter edition.
7. Company deletes text in the "Imię" field.
8. Company user inserts text: "Alina" in the "Nazwisko" field.
9. Company user clicks the "Zapisz" button.
Results:
1. Company user successfully changed the name of the recruiter.
2. Changed reruiter has the name: "Alina" now, instead of the name from before the edition.

