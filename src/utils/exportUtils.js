/**
 * CSV Export Utility for NIVOX Platform Admin
 * Generates formatted .csv files for download
 */

export const exportToCSV = (filename, data, headers) => {
  if (!data || !data.length) {
    return false;
  }

  const keys = headers ? Object.keys(headers) : Object.keys(data[0]);
  const headerLabels = headers ? Object.values(headers) : keys;

  const csvRows = [];
  csvRows.push(headerLabels.join(','));

  data.forEach((row) => {
    const values = keys.map((key) => {
      const val = row[key] !== undefined && row[key] !== null ? row[key] : '';
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
