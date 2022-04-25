import Datatable from "./Datatable";
import "./styles.css";
import rowsData from "./data.json";

export default function App() {
  const columnsData = [
    "id",
    "first_name",
    "last_name",
    "email",
    "gender",
    "ip_address"
  ];
  console.log(rowsData);
  return (
    <div className="App">
      <h1>react table compoennt</h1>
      <Datatable columnsData={columnsData} rowsData={rowsData} />
    </div>
  );
}
