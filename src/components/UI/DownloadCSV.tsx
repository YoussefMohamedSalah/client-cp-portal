import { CSVLink } from "react-csv";
import "./DownloadCsvStyles.css";

interface Props {
  fileName: string;
  csvData: any[];
}

function DownloadCSV({ fileName, csvData }: Props) {
  return (
    <div>
      <CSVLink className="downloadbtn" filename={fileName} data={csvData}>
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default DownloadCSV;
