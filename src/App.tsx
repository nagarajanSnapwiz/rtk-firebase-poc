import "./styles.css";
import { usePoint2Query, usePoint1Query } from "./FirebaseRTKQuery";

export default function App() {
  const { data: data1 } = usePoint1Query(null);
  const { data } = usePoint2Query(null);
  return (
    <div className="App">
      <h1>Hello CodeSandbox {data} </h1>
      <h2>Start editing to see some magic happen {data1}!</h2>
    </div>
  );
}
