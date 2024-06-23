import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import './style.css'

const data = require('../assets/Dataset.json');

const AverageCropsTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const cropData = {};

    data.forEach((row) => {
      const crop = row["Crop Name"];
      const yieldValue = parseFloat(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const area = parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

      if (!cropData[crop]) {
        cropData[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      }

      cropData[crop].totalYield += yieldValue;
      cropData[crop].totalArea += area;
      cropData[crop].count += 1;
    });

    const tableRows = Object.keys(cropData).map((crop) => {
      const avgYield = (cropData[crop].totalYield / cropData[crop].count).toFixed(3);
      const avgArea = (cropData[crop].totalArea / cropData[crop].count).toFixed(3);
      return (
        <tr key={crop}>
          <td>{crop}</td>
          <td>{avgYield}</td>
          <td>{avgArea}</td>
        </tr>
      );
    });

    setRows(tableRows);
  }, []);

  return (
    <div className="average-crops-table">
      <h2>Average Yield and Cultivation Area (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020</th>
            <th>Average Cultivation Area of the Crop between 1950-2020</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default AverageCropsTable;
