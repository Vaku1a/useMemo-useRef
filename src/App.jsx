import { useState, useMemo, useRef, useEffect, forwardRef } from "react";
import { useToggle } from "../src/hooks/useToggle";

import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Modal from "./Modal/Modal";
import Player from "./Player/Player";

export default function App() {
  // --- useMemo hook ---
  const [planets, setPlanets] = useState(["Earth", "Mars", "Jupiter", "Venus"]);
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);

  const filteredPlanets = useMemo(
    () => planets.filter((planet) => planet.includes(query)),
    [planets, query]
  );

  // --- useRef hook ---
  // -- 1 - Життєвий цикл рефа --

  const [value, setValue] = useState(0);
  const btnRef = useRef();

  // Буде undefined на першому рендері
  // і посиланням на DOM-елемент всі наступні
  console.log("App: ", btnRef.current);

  useEffect(() => {
    // Ефект виконується після монтування,
    // тому завжди буде посиланням на DOM-елемент
    console.log("useEffect: ", btnRef.current);
  });

  const handleClickCurrent = () => {
    // Кліки будуть після монтування,
    // тому завжди буде посиланням на DOM-елемент
    console.log("handleClick: ", btnRef.current);
  };

  // -- 2 Відсутність реактивності --

  const valueRef = useRef(0);

  useEffect(() => {
    // Виконається лише один раз під час монтування.
    // Наступні оновлення значення рефа не
    // викличуть оновлення компонента
    console.log(valueRef.current);
  });

  const handleClick = () => {
    valueRef.current += 1;
  };

  // 4 - Перенаправлення рефів

  const CustomButton = forwardRef((props, ref) => (
    <button ref={ref}>{props.children}</button>
  ));

  const btnRefForward = useRef();

  useEffect(() => btnRefForward.current.focus(), []);

  // 5 - Перенаправлення рефів

  // const [modalOpen, setModalOpen] = useState(false); // State for modal
  // // Function to open the modal
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // // Function to close the modal
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  // // Function to open the sidebar
  // const openSidebar = () => {
  //   setSidebarOpen(true);
  // };
  // // Function to close the sidebar
  // const closeSidebar = () => {
  //   setSidebarOpen(false);
  // };

  // Toggle
  const {
    isOpen: isSidebarOpen,
    open: openSidebar,
    close: closeSidebar,
  } = useToggle(false);

  // State for modal
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggle(false);

  return (
    <>
      <h2>useMemo hook</h2>
      <button onClick={() => setClicks(clicks + 1)}>
        Number of clicks: {clicks}
      </button>
      <ul>
        {filteredPlanets.map((planet) => (
          <li key={planet}>{planet}</li>
        ))}
      </ul>
      <h2>useRef hook</h2>
      <h3>1 - Життєвий цикл рефа</h3>
      <button onClick={() => setValue(value + 1)}>
        Update value to trigger re-render
      </button>
      <button ref={btnRef} onClick={handleClickCurrent}>
        Button with ref
      </button>
      <hr />
      <h3>2 - Відсутність реактивності</h3>
      <button onClick={handleClick}>Click to update ref value</button>
      <hr />
      <h3>3 - Відеоплеєр</h3>
      <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />
      <hr />
      <h3>4 - Перенаправлення рефів</h3>
      <CustomButton ref={btnRefForward}>Button with forwarded ref</CustomButton>
      <hr />
      <h3>5 - Власні хуки</h3>
      <div>
        <button onClick={openModal}>Open Modal</button>
        <button onClick={openSidebar}>Open Sidebar</button>

        {/* Render the Modal component conditionally based on modal state */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>This is a modal</h2>
            <p>Modal content goes here...</p>
          </Modal>
        )}

        {/* Render the Sidebar component conditionally based on sidebar state */}
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
            <h2>This is a sidebar</h2>
            <p>Sidebar content goes here...</p>
          </Sidebar>
        )}
      </div>
    </>
  );
}
