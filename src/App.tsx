import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{`Jude Morrissey`}</h1>
        <code>{`This site under construction :)`}</code>
        <p>
          {`Please check out my `}
          <a
            className="App-link"
            href="https://www.linkedin.com/in/judemorrissey"
            rel="noreferrer noopener"
            target="_blank">{`LinkedIn`}</a>
          {` and `}
          <a
            className="App-link"
            href="https://www.github.com/judemorrissey"
            rel="noreferrer noopener"
            target="_blank">{`GitHub`}</a>
          {` in the meantime.`}
        </p>
      </header>
    </div>
  );
}

export default App;
