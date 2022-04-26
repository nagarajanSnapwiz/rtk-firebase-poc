import "./styles.css";
import { usePoint2Query, usePoint1Query } from "./FirebaseRTKQuery";

export default function App() {
  const { data: data1 } = usePoint1Query();
  const { data: data2 } = usePoint2Query();
  return (
    <div className="App">
      <h1>Test value from firebase: {data1} </h1>
      <h2>Some other value from firebase: {data2}</h2>
    </div>
  );
}
