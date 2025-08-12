import { DATA as data } from "./assets/data";
import "./App.css";
import { useState } from "react";

const headers = {
  ru: "Russian",
  fi: "Suomi",
  es: "Español",
};
const LanguageTable = () => {
  const [visibleColumns, setVisibleColumns] = useState({
    ru: true,
    fi: true,
    es: true,
  });

  // локальное состояние видимости ячеек
  const [visibleCells, setVisibleCells] = useState(
    data.map(() => ({ ru: false, fi: false, es: false }))
  );

  // Переключение видимости столбца
  const toggleColumn = (lang) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [lang]: !prev[lang],
    }));
  };

  // Переключение видимости конкретной ячейки
  const toggleCell = (rowIndex, lang) => {
    setVisibleCells((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [lang]: !row[lang] } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto p-4 max-w-full">
      {/* Кнопки управления столбцами */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-end mb-4">
        {Object.keys(headers).map((lang) => (
          <button
            key={lang}
            onClick={() => toggleColumn(lang)}
            className="w-42 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {visibleColumns[lang]
              ? `Скрыть ${headers[lang]}`
              : `Показать ${headers[lang]}`}
          </button>
        ))}
      </div>

      <table className="min-w-full border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            {Object.entries(headers).map(([lang, title]) => (
              <th
                key={lang}
                className="w-1/3 px-2 sm:px-4 py-2 sm:text-base text-left text-sm font-semibold uppercase tracking-wider"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(headers).map((lang) => {
                const isColumnVisible = visibleColumns[lang];
                const isCellVisible = visibleCells[rowIndex][lang];

                return (
                  <td
                    key={lang}
                    className="px-2 sm:px-4 py-2 text-sm sm:text-base cursor-pointer hover:bg-gray-100 transition duration-200"
                    onClick={() => toggleCell(rowIndex, lang)}
                  >
                    {isColumnVisible || isCellVisible ? row[lang] : "•••"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-gray-500 mt-2">
        Нажмите на ячейку, чтобы показать/скрыть её. Даже если язык скрыт —
        отдельные ячейки можно открыть вручную.
      </p>
    </div>
  );
};

export default LanguageTable;
