import { CSVLink } from "react-csv";
import "./DownloadCsvStyles.css";

interface Props {
  fileName: string;
  csvData: any[];
}

function DownloadCSV({ fileName, csvData }: Props) {
  return (
    <div style={{ padding: "5px 0px 14px 3px" }}>
      <CSVLink className="downloadbtn align-self-xl-end" filename={fileName} data={csvData}>
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default DownloadCSV;
