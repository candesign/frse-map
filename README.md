# FRSE Mapping

Proszę o zapoznanie się z tym krótkim dokumentem. Powinien odpowiedzieć on na główne pytania związane z działaniem aplikacji.

## ADRESY TESTOWE

Frontend: https://stronypreview.pl
Backend: https://xlsfrse.adpdev.click

Obecnie backend jest hostowany na naszej instancji AWS EC2. Wiąże się to jednak z dodatkowymi kosztami z naszej strony, dlatego chciałbym prosić o przeniesienie go do siebie w ciągu najbliższych kilku miesięcy.

## DZIAŁANIE APLIKACJI

- Wchodzimy w backend i wgrywamy odpowiednio przygotowany plik Excela z danymi.
- Generujemy plik JSON. Wyświetli się nam jego ID.
- Na frontendzie wyświetla się domyślnie zawsze plik JSON o najwyższym ID. Można też z łatwością podejrzeć poprzednie pliki, ustawiając parametr URL, np.: https://stronypreview.pl/?id=6

## FRONTEND

Frontend zbudowany jest w oparciu o bibliotekę React. Główny skrypt znajduje się w pliku ./src/App.js. Wykonuje on kolejno następujące zadania:

- Pobiera wybrany plik JSON z backendu.
- Tworzy globalny obiekt z danymi, poprawiając przy okazji niektóre błędy i literówki z pliku JSON.
- Konfiguruje mapę i łączy ją z danymi.
- Wyświetla mapę i dane w tabeli.
- Zmienia wyświetlany przedział danych w oparciu o wybór uzytkownika.

Frontend mozna edytować localhoście, używając w terminalu komendy `npm start`. Szczegóły edycji aplikacji Reacta są przystępnie opisane w jego dokumentacji oraz dokumentacji Create React App.

Po zakończeniu wprowadzania zmian, należy użyć komendy `npm run-script build`. Utworzony zostanie folder _build_, którego zawartość można wrzucić na wybrany serwer. Domyślnie aplikacja powinna znajdować się w katalogu nadrzędnym, czyli np. pod adresem https://testowyadres.pl, a nie https://testowyadres.pl/mapa/. Konieczny jest także działający certyfikat SSL.

## BACKEND

Backend jest bardzo prosty i działa na NodeJS. Zwracam uwagę, że NodeJS nie jest wspierany na wielu hostingach współdzielonych, np. home.pl.

Główny skrypt znajduje się w pliku index.js. W katalogu public zapisywane są: najnowszy plik Excela, wszystkie wygenerowane pliki JSON oraz plik id.txt z informacją o ID, które zostanie przydzielone kolejnemu plikowi JSON.

Serwer najlepiej uruchomić z użyciem aplikacji typu nodemon, dzięki czemu będzie on działał bez przerwy.

### Endpointy:

- /download/ - pobiera najnowszy plik JSON
- /download/2/ - pobiera plik JSON o ID równym 2
- /json/ – generuje plik JSON z aktualnie znajdującego się na serwerze pliku Excela
- /currentId/ – podgląd zawartości pliku id.txt
