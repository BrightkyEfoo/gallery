import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NavBar } from "./pages/Home/NavBar/NavBar";
import "./global.scss";
import PhotoPage from "./pages/Photo/PhotoPage";
import Connection from "./pages/Connection/Connection";
import CreatePhoto from "./pages/CreatePhoto/CreatePhoto";

export function App() {
  return (
    <Router>
      <div className="global-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/creer" element={<CreatePhoto />} />
          <Route path="/photo/:id" element={<PhotoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// export function App() {
//   const [i, setI] = useState(0);
//   useEffect(() => {
//     const inter = setInterval(() => {
//       setI((prev) => prev + 1);
//     }, 2000);

//     return () => {
//       clearInterval(inter);
//     };
//   }, []);

//   const Increment = () => {
//     setI((prev) => prev + 1);

//     console.log(i);
//   };
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         gap: "15px",
//         flexDirection: "column",
//       }}
//     >
//       <p>{i}</p>
//       <button style={{ color: "black", padding: "0 20px" }} onClick={Increment}>
//         increment
//       </button>
//     </div>
//   );
// }
