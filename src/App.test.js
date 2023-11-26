import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Main from "./components/Main"
import Difficulty from './components/Difficulty';
import Gameplay from './components/Gameplay';

test('renders Main component through BrowserRouter, Routes, Route', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  )

  const mainElement = screen.getByTestId('main-component')
  expect(mainElement).toBeInTheDocument()
});

test('renders Difficulty component through BrowserRouter, Routes, Route', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<Difficulty />} />
      </Routes>
    </Router>
  )

  const mainElement = screen.getByTestId('difficulty-component')
  expect(mainElement).toBeInTheDocument()
});


test('renders Gameplay component through BrowserRouter, Routes, Route', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<Gameplay />} />
      </Routes>
    </Router>
  )

  const mainElement = screen.getByTestId('gameplay-component')
  expect(mainElement).toBeInTheDocument()
});

