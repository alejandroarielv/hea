export class CsvDataService {

    static exportToCsv(rows: object[], separator: string): string  {
    
        let csvString = "";
        
        if (!rows || !rows.length) {
            console.log('Error. Empty rows recived. Nothing to do.');
            return csvString;
        }

        const keys = Object.keys(rows[0]);
        const csvData = keys.join(separator) + '\n' +
            rows.map(row => {
                return keys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');

                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join('\n');

        csvString = csvData;
        return csvString;
    }
}
