import { useState } from "react";

const Table = (props) => {
  const minWidth = 1024;
  const [windowWith, setWindowWidth] = useState(window.innerWidth);
  const head = props.head || [];
  const rows = props.rows || [];
  
  window.onresize = () => setWindowWidth(window.innerWidth);

  return (<>{
    (windowWith<minWidth) ? (
      <div className="w100 zebra">
        { rows.map((row, rowIndex) => {
            return (
              <table key={ "table"+rowIndex }>
                <tbody>
                  <tr><td>Ligne { rowIndex + 1 }</td><td>Donnée</td></tr>
                  { head.map((cell, index) => <tr key={ "row"+index }><td style={{ width:"20%" }}>{ cell }</td><td>{ row[index] }</td></tr>) }
                </tbody>
              </table>
            );
        })}
      </div>
    ) : (
      <table>
        <thead><tr>{ head.map((cell, cellId) => <th key={ "cell"+cellId }>{ cell }</th>) }</tr></thead>
        <tbody className="zebra">{
          rows.map((row, rowIndex) => {
            return (<tr key={ "row"+rowIndex }>{ row.map((cell, cellId) => <td key={ "cell"+cellId }>{ cell }</td>)}</tr>)
          })
        }</tbody>
      </table>
    )
  }</>);
}

export default Table