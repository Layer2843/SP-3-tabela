import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [pracownicy] = useState([
    { id: 1, imie: 'Anna', nazwisko: 'Kowalska', dzial: 'IT', pensja: 7200 },
    { id: 2, imie: 'Piotr', nazwisko: 'Nowak', dzial: 'Sprzedaż', pensja: 5400 },
    { id: 3, imie: 'Maria', nazwisko: 'Wiśniewska', dzial: 'Księgowość', pensja: 6100 },
    { id: 4, imie: 'Jan', nazwisko: 'Kowalczyk', dzial: 'IT', pensja: 8300 },
    { id: 5, imie: 'Katarzyna', nazwisko: 'Zielińska', dzial: 'Sprzedaż', pensja: 5900 },
    { id: 6, imie: 'Tomasz', nazwisko: 'Szymański', dzial: 'IT', pensja: 9100 },
    { id: 7, imie: 'Agnieszka', nazwisko: 'Woźniak', dzial: 'Księgowość', pensja: 6400 },
    { id: 8, imie: 'Michał', nazwisko: 'Kaczmarek', dzial: 'Sprzedaż', pensja: 5200 },
    { id: 9, imie: 'Magdalena', nazwisko: 'Mazur', dzial: 'IT', pensja: 7800 },
    { id: 10, imie: 'Paweł', nazwisko: 'Krawczyk', dzial: 'Księgowość', pensja: 6000 },
    { id: 11, imie: 'Joanna', nazwisko: 'Piotrowska', dzial: 'Sprzedaż', pensja: 5600 },
    { id: 12, imie: 'Łukasz', nazwisko: 'Grabowski', dzial: 'IT', pensja: 8700 }
  ]);

  const [szukaj, setSzukaj] = useState('');
  const [wybranyDzial, setWybranyDzial] = useState('');

  const filtrujPracownikow = (fraza, dzial) =>{
  const znormalizowanaFraza = fraza.trim().toLowerCase();

    return pracownicy.filter((p) => {
      const pasujeNazwisko = p.nazwisko.toLowerCase().includes(znormalizowanaFraza);
      const pasujeDzial = dzial === '' || p.dzial === dzial;
      return pasujeNazwisko && pasujeDzial;
    });
  };

  const handleSzukajChange = (e) => {
    const nowaFraza = e.target.value;
    setSzukaj(nowaFraza);
    const wynik = filtrujPracownikow(nowaFraza, wybranyDzial);
    console.log(`Wyniki: ${wynik.length}`);
  };

  const handleDzialChange = (e) => {
    const nowyDzial = e.target.value;
    setWybranyDzial(nowyDzial);
    const wynik = filtrujPracownikow(szukaj, nowyDzial);
    console.log(`Wyniki: ${wynik.length}`);
  };

  const przefiltrowani = filtrujPracownikow(szukaj, wybranyDzial);

  return (
    <div className="container mt-4">
      <h2>Pracownicy</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="szukaj" className="form-label">Szukaj:</label>
          <input
            type="text"
            id="szukaj"
            className="form-control"
            value={szukaj}
            onChange={handleSzukajChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="dzial" className="form-label">Dział:</label>
          <select
            id="dzial"
            className="form-select"
            value={wybranyDzial}
            onChange={handleDzialChange}
          >
            <option value="">Wszystkie</option>
            <option value="IT">IT</option>
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Księgowość">Księgowość</option>
          </select>
        </div>
      </div>

      <p className="fw-bold">Liczba pracowników: {przefiltrowani.length}</p>

      {przefiltrowani.length > 0 ? (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Dział</th>
              <th scope="col">Pensja</th>
            </tr>
          </thead>
          <tbody>
            {przefiltrowani.map((pracownik) => (
              <tr key={pracownik.id}>
                <td>{pracownik.imie}</td>
                <td>{pracownik.nazwisko}</td>
                <td>{pracownik.dzial}</td>
                <td>{pracownik.pensja}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          Brak pracowników spełniających kryteria
        </div>
      )}
    </div>
  );
}

export default App;